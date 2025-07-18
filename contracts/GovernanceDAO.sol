// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title GovernanceDAO
 * @dev DAO governance contract for PowerChain community decision making
 * @notice This contract manages governance tokens and voting on platform proposals
 */
contract GovernanceDAO is ERC20, ERC20Burnable, Ownable, Pausable, ReentrancyGuard {
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title, string description);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId, bool successful);
    event ProposalCancelled(uint256 indexed proposalId);
    event GovernanceTokensIssued(address indexed to, uint256 amount, string reason);
    event DelegatePowerChanged(address indexed delegator, address indexed oldDelegate, address indexed newDelegate);
    
    // Structs
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        bool executed;
        bool cancelled;
        ProposalType proposalType;
        bytes executionData;
    }
    
    enum ProposalType {
        General,
        TradingFeeChange,
        TokenMinting,
        ContractUpgrade,
        ParameterChange,
        Emergency
    }
    
    enum VoteType {
        Against,
        For,
        Abstain
    }
    
    // Constants
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million GT
    uint256 public constant MAX_SUPPLY = 10000000 * 10**18; // 10 million GT max
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant VOTING_DELAY = 1 days;
    uint256 public constant PROPOSAL_THRESHOLD = 1000 * 10**18; // 1000 GT to create proposal
    uint256 public constant QUORUM_VOTES = 50000 * 10**18; // 50000 GT for quorum
    
    // State variables
    uint256 public nextProposalId = 1;
    uint256 public totalProposals = 0;
    uint256 public totalVotesCast = 0;
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(uint256 => mapping(address => VoteType)) public votes;
    mapping(address => address) public delegates;
    mapping(address => uint256) public votingPower;
    mapping(address => uint256) public delegatedPower;
    
    // Authorized addresses for token minting
    mapping(address => bool) public authorizedMinters;
    
    // Proposal execution targets
    mapping(uint256 => address) public executionTargets;
    
    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }
    
    modifier validProposal(uint256 _proposalId) {
        require(_proposalId > 0 && _proposalId < nextProposalId, "Invalid proposal ID");
        require(!proposals[_proposalId].cancelled, "Proposal cancelled");
        _;
    }
    
    modifier votingActive(uint256 _proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp >= proposal.startTime, "Voting not started");
        require(block.timestamp <= proposal.endTime, "Voting ended");
        _;
    }
    
    constructor() ERC20("PowerChain Governance Token", "GT") {
        _mint(msg.sender, INITIAL_SUPPLY);
        authorizedMinters[msg.sender] = true;
        
        // Set initial voting power
        votingPower[msg.sender] = INITIAL_SUPPLY;
    }
    
    /**
     * @dev Create a new governance proposal
     */
    function createProposal(
        string memory _title,
        string memory _description,
        ProposalType _proposalType,
        address _executionTarget,
        bytes memory _executionData
    ) public whenNotPaused nonReentrant returns (uint256) {
        require(balanceOf(msg.sender) >= PROPOSAL_THRESHOLD, "Insufficient tokens to create proposal");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        
        uint256 proposalId = nextProposalId++;
        uint256 startTime = block.timestamp + VOTING_DELAY;
        uint256 endTime = startTime + VOTING_PERIOD;
        
        proposals[proposalId] = Proposal({
            id: proposalId,
            proposer: msg.sender,
            title: _title,
            description: _description,
            startTime: startTime,
            endTime: endTime,
            forVotes: 0,
            againstVotes: 0,
            abstainVotes: 0,
            executed: false,
            cancelled: false,
            proposalType: _proposalType,
            executionData: _executionData
        });
        
        executionTargets[proposalId] = _executionTarget;
        totalProposals++;
        
        emit ProposalCreated(proposalId, msg.sender, _title, _description);
        return proposalId;
    }
    
    /**
     * @dev Cast a vote on a proposal
     */
    function castVote(uint256 _proposalId, VoteType _voteType) 
        public 
        whenNotPaused 
        nonReentrant 
        validProposal(_proposalId) 
        votingActive(_proposalId) {
        
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        
        uint256 weight = getVotingPower(msg.sender);
        require(weight > 0, "No voting power");
        
        Proposal storage proposal = proposals[_proposalId];
        
        if (_voteType == VoteType.For) {
            proposal.forVotes += weight;
        } else if (_voteType == VoteType.Against) {
            proposal.againstVotes += weight;
        } else {
            proposal.abstainVotes += weight;
        }
        
        hasVoted[_proposalId][msg.sender] = true;
        votes[_proposalId][msg.sender] = _voteType;
        totalVotesCast++;
        
        emit VoteCast(_proposalId, msg.sender, _voteType == VoteType.For, weight);
    }
    
    /**
     * @dev Execute a proposal if it has passed
     */
    function executeProposal(uint256 _proposalId) 
        public 
        whenNotPaused 
        nonReentrant 
        validProposal(_proposalId) {
        
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.endTime, "Voting still active");
        require(!proposal.executed, "Already executed");
        
        // Check if proposal passed
        bool passed = hasProposalPassed(_proposalId);
        
        if (passed && executionTargets[_proposalId] != address(0)) {
            // Execute the proposal
            (bool success, ) = executionTargets[_proposalId].call(proposal.executionData);
            proposal.executed = true;
            emit ProposalExecuted(_proposalId, success);
        } else {
            proposal.executed = true;
            emit ProposalExecuted(_proposalId, false);
        }
    }
    
    /**
     * @dev Cancel a proposal (only proposer or owner)
     */
    function cancelProposal(uint256 _proposalId) 
        public 
        whenNotPaused 
        validProposal(_proposalId) {
        
        Proposal storage proposal = proposals[_proposalId];
        require(msg.sender == proposal.proposer || msg.sender == owner(), "Not authorized");
        require(!proposal.executed, "Already executed");
        require(block.timestamp < proposal.endTime, "Voting ended");
        
        proposal.cancelled = true;
        emit ProposalCancelled(_proposalId);
    }
    
    /**
     * @dev Delegate voting power to another address
     */
    function delegate(address _delegatee) public whenNotPaused {
        address oldDelegate = delegates[msg.sender];
        delegates[msg.sender] = _delegatee;
        
        uint256 userBalance = balanceOf(msg.sender);
        
        // Remove from old delegate
        if (oldDelegate != address(0)) {
            delegatedPower[oldDelegate] -= userBalance;
        }
        
        // Add to new delegate
        if (_delegatee != address(0)) {
            delegatedPower[_delegatee] += userBalance;
        }
        
        // Update voting power
        updateVotingPower(msg.sender);
        if (oldDelegate != address(0)) {
            updateVotingPower(oldDelegate);
        }
        if (_delegatee != address(0)) {
            updateVotingPower(_delegatee);
        }
        
        emit DelegatePowerChanged(msg.sender, oldDelegate, _delegatee);
    }
    
    /**
     * @dev Issue governance tokens (only authorized minters)
     */
    function issueGovernanceTokens(
        address _to,
        uint256 _amount,
        string memory _reason
    ) public onlyAuthorizedMinter nonReentrant {
        require(_amount > 0, "Amount must be positive");
        require(totalSupply() + _amount <= MAX_SUPPLY, "Would exceed max supply");
        
        _mint(_to, _amount);
        updateVotingPower(_to);
        
        emit GovernanceTokensIssued(_to, _amount, _reason);
    }
    
    /**
     * @dev Update voting power for an address
     */
    function updateVotingPower(address _user) internal {
        uint256 balance = balanceOf(_user);
        uint256 delegated = delegatedPower[_user];
        
        if (delegates[_user] != address(0)) {
            // User has delegated their tokens
            votingPower[_user] = delegated;
        } else {
            // User votes with their own tokens + delegated tokens
            votingPower[_user] = balance + delegated;
        }
    }
    
    /**
     * @dev Get voting power for an address
     */
    function getVotingPower(address _user) public view returns (uint256) {
        return votingPower[_user];
    }
    
    /**
     * @dev Check if a proposal has passed
     */
    function hasProposalPassed(uint256 _proposalId) public view returns (bool) {
        Proposal storage proposal = proposals[_proposalId];
        
        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        
        // Check quorum
        if (totalVotes < QUORUM_VOTES) {
            return false;
        }
        
        // Check if more for votes than against
        return proposal.forVotes > proposal.againstVotes;
    }
    
    /**
     * @dev Get proposal details
     */
    function getProposal(uint256 _proposalId) public view returns (
        uint256 id,
        address proposer,
        string memory title,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        uint256 forVotes,
        uint256 againstVotes,
        uint256 abstainVotes,
        bool executed,
        bool cancelled,
        ProposalType proposalType
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.startTime,
            proposal.endTime,
            proposal.forVotes,
            proposal.againstVotes,
            proposal.abstainVotes,
            proposal.executed,
            proposal.cancelled,
            proposal.proposalType
        );
    }
    
    /**
     * @dev Get voting statistics
     */
    function getVotingStats() public view returns (
        uint256 totalProposalsCount,
        uint256 totalVotesCastCount,
        uint256 activeProposals,
        uint256 executedProposals
    ) {
        uint256 active = 0;
        uint256 executed = 0;
        
        for (uint256 i = 1; i < nextProposalId; i++) {
            if (!proposals[i].cancelled) {
                if (proposals[i].executed) {
                    executed++;
                } else if (block.timestamp <= proposals[i].endTime) {
                    active++;
                }
            }
        }
        
        return (totalProposals, totalVotesCast, active, executed);
    }
    
    /**
     * @dev Add authorized minter
     */
    function addMinter(address _minter) public onlyOwner {
        authorizedMinters[_minter] = true;
    }
    
    /**
     * @dev Remove authorized minter
     */
    function removeMinter(address _minter) public onlyOwner {
        authorizedMinters[_minter] = false;
    }
    
    /**
     * @dev Pause the contract (only owner)
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract (only owner)
     */
    function unpause() public onlyOwner {
        _unpause();
    }
    
    // Override transfer functions to update voting power
    function transfer(address to, uint256 amount) public override returns (bool) {
        bool success = super.transfer(to, amount);
        if (success) {
            updateVotingPower(msg.sender);
            updateVotingPower(to);
        }
        return success;
    }
    
    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        bool success = super.transferFrom(from, to, amount);
        if (success) {
            updateVotingPower(from);
            updateVotingPower(to);
        }
        return success;
    }
    
    // Override required functions for Pausable
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
} 