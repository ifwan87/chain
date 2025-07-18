// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title EnergyCredits
 * @dev ERC20 token representing energy credits in the PowerChain ecosystem
 * @notice This contract manages the energy credits (EC) used for trading renewable energy
 */
contract EnergyCredits is ERC20, ERC20Burnable, Ownable, Pausable, ReentrancyGuard {
    
    // Events
    event EnergyPurchased(address indexed buyer, address indexed seller, uint256 amount, uint256 energyAmount);
    event EnergyCreditsIssued(address indexed to, uint256 amount, string reason);
    event EnergyCreditsRedeemed(address indexed from, uint256 amount, uint256 energyAmount);
    
    // Constants
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10**18; // 1 million EC
    uint256 public constant MAX_SUPPLY = 100000000 * 10**18; // 100 million EC max
    
    // State variables
    mapping(address => bool) public authorizedMinters;
    mapping(address => uint256) public energyBalance; // Track actual energy in kWh
    
    // Energy trading parameters
    uint256 public energyToTokenRatio = 100; // 1 kWh = 100 EC (adjustable)
    uint256 public minimumEnergyAmount = 1 * 10**18; // Minimum 1 kWh in wei
    
    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }
    
    constructor() ERC20("PowerChain Energy Credits", "EC") Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
        authorizedMinters[msg.sender] = true;
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
     * @dev Set energy to token conversion ratio
     * @param _ratio New ratio (e.g., 100 means 1 kWh = 100 EC)
     */
    function setEnergyToTokenRatio(uint256 _ratio) public onlyOwner {
        require(_ratio > 0, "Ratio must be positive");
        energyToTokenRatio = _ratio;
    }
    
    /**
     * @dev Issue energy credits for renewable energy production
     * @param _to Address to receive credits
     * @param _energyAmount Amount of energy in kWh (in wei)
     * @param _reason Reason for issuance
     */
    function issueEnergyCredits(
        address _to,
        uint256 _energyAmount,
        string memory _reason
    ) public onlyAuthorizedMinter nonReentrant {
        require(_energyAmount >= minimumEnergyAmount, "Energy amount too small");
        
        uint256 creditsToIssue = (_energyAmount * energyToTokenRatio) / 10**18;
        require(totalSupply() + creditsToIssue <= MAX_SUPPLY, "Would exceed max supply");
        
        _mint(_to, creditsToIssue);
        energyBalance[_to] += _energyAmount;
        
        emit EnergyCreditsIssued(_to, creditsToIssue, _reason);
    }
    
    /**
     * @dev Redeem energy credits for actual energy consumption
     * @param _energyAmount Amount of energy to redeem in kWh (in wei)
     */
    function redeemEnergyCredits(uint256 _energyAmount) public nonReentrant {
        require(_energyAmount >= minimumEnergyAmount, "Energy amount too small");
        require(energyBalance[msg.sender] >= _energyAmount, "Insufficient energy balance");
        
        uint256 creditsToRedeem = (_energyAmount * energyToTokenRatio) / 10**18;
        require(balanceOf(msg.sender) >= creditsToRedeem, "Insufficient credits");
        
        _burn(msg.sender, creditsToRedeem);
        energyBalance[msg.sender] -= _energyAmount;
        
        emit EnergyCreditsRedeemed(msg.sender, creditsToRedeem, _energyAmount);
    }
    
    /**
     * @dev Transfer energy credits between users (for trading)
     * @param _to Recipient address
     * @param _amount Amount of credits to transfer
     * @param _energyAmount Corresponding energy amount
     */
    function transferEnergyCredits(
        address _to,
        uint256 _amount,
        uint256 _energyAmount
    ) public nonReentrant returns (bool) {
        require(_amount > 0, "Amount must be positive");
        require(_energyAmount > 0, "Energy amount must be positive");
        require(balanceOf(msg.sender) >= _amount, "Insufficient credits");
        
        // Transfer credits
        _transfer(msg.sender, _to, _amount);
        
        // Update energy balances
        uint256 energyToTransfer = (_amount * 10**18) / energyToTokenRatio;
        require(energyBalance[msg.sender] >= energyToTransfer, "Insufficient energy balance");
        
        energyBalance[msg.sender] -= energyToTransfer;
        energyBalance[_to] += energyToTransfer;
        
        emit EnergyPurchased(_to, msg.sender, _amount, _energyAmount);
        return true;
    }
    
    /**
     * @dev Get energy balance for an address
     */
    function getEnergyBalance(address _user) public view returns (uint256) {
        return energyBalance[_user];
    }
    
    /**
     * @dev Convert energy amount to token amount
     */
    function energyToTokens(uint256 _energyAmount) public view returns (uint256) {
        return (_energyAmount * energyToTokenRatio) / 10**18;
    }
    
    /**
     * @dev Convert token amount to energy amount
     */
    function tokensToEnergy(uint256 _tokenAmount) public view returns (uint256) {
        return (_tokenAmount * 10**18) / energyToTokenRatio;
    }
    
    // Override required functions for Pausable
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override whenNotPaused {
        super._update(from, to, value);
    }
} 