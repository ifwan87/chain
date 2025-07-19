// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CarbonCredits
 * @dev ERC20 token representing carbon credits in the PowerChain ecosystem
 * @notice This contract manages carbon credits (CC) earned through renewable energy trading
 */
contract CarbonCredits is ERC20, ERC20Burnable, Ownable, Pausable, ReentrancyGuard {
    
    // Events
    event CarbonCreditsEarned(address indexed user, uint256 amount, uint256 energyAmount, string energyType);
    event CarbonCreditsRetired(address indexed user, uint256 amount, string reason);
    event CarbonCreditsTransferred(address indexed from, address indexed to, uint256 amount);
    
    // Constants
    uint256 public constant INITIAL_SUPPLY = 0; // No initial supply - only earned
    uint256 public constant MAX_SUPPLY = 50000000 * 10**18; // 50 million CC max
    
    // Carbon credit rates per kWh of different energy types (in CC tokens * 10^18)
    mapping(string => uint256) public carbonCreditRates;
    
    // Track carbon credit history
    struct CarbonRecord {
        uint256 amount;
        uint256 timestamp;
        string energyType;
        uint256 energyAmount;
        bool retired;
    }
    
    mapping(address => CarbonRecord[]) public carbonHistory;
    mapping(address => uint256) public totalCarbonEarned;
    mapping(address => uint256) public totalCarbonRetired;
    
    // Energy trading contract addresses (authorized to issue credits)
    mapping(address => bool) public authorizedIssuers;
    
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner(), "Not authorized to issue credits");
        _;
    }
    
    constructor() ERC20("PowerChain Carbon Credits", "CC") Ownable(msg.sender) {
        // Set initial carbon credit rates (CC per kWh)
        carbonCreditRates["solar"] = 50 * 10**15;    // 0.05 CC per kWh
        carbonCreditRates["wind"] = 45 * 10**15;     // 0.045 CC per kWh
        carbonCreditRates["hydro"] = 40 * 10**15;    // 0.04 CC per kWh
        carbonCreditRates["storage"] = 30 * 10**15;  // 0.03 CC per kWh (battery storage)
        
        authorizedIssuers[msg.sender] = true;
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
     * @dev Add authorized issuer
     */
    function addIssuer(address _issuer) public onlyOwner {
        authorizedIssuers[_issuer] = true;
    }
    
    /**
     * @dev Remove authorized issuer
     */
    function removeIssuer(address _issuer) public onlyOwner {
        authorizedIssuers[_issuer] = false;
    }
    
    /**
     * @dev Set carbon credit rate for energy type
     * @param _energyType Type of energy (solar, wind, hydro, storage)
     * @param _rate Rate in CC tokens per kWh (in wei)
     */
    function setCarbonCreditRate(string memory _energyType, uint256 _rate) public onlyOwner {
        require(_rate > 0, "Rate must be positive");
        carbonCreditRates[_energyType] = _rate;
    }
    
    /**
     * @dev Issue carbon credits for renewable energy production/trading
     * @param _to Address to receive credits
     * @param _energyAmount Amount of energy in kWh (in wei)
     * @param _energyType Type of renewable energy
     */
    function issueCarbonCredits(
        address _to,
        uint256 _energyAmount,
        string memory _energyType
    ) public onlyAuthorizedIssuer nonReentrant {
        require(_energyAmount > 0, "Energy amount must be positive");
        require(carbonCreditRates[_energyType] > 0, "Energy type not supported");
        
        uint256 creditsToIssue = (_energyAmount * carbonCreditRates[_energyType]) / 10**18;
        require(totalSupply() + creditsToIssue <= MAX_SUPPLY, "Would exceed max supply");
        
        _mint(_to, creditsToIssue);
        
        // Record carbon credit history
        carbonHistory[_to].push(CarbonRecord({
            amount: creditsToIssue,
            timestamp: block.timestamp,
            energyType: _energyType,
            energyAmount: _energyAmount,
            retired: false
        }));
        
        totalCarbonEarned[_to] += creditsToIssue;
        
        emit CarbonCreditsEarned(_to, creditsToIssue, _energyAmount, _energyType);
    }
    
    /**
     * @dev Retire carbon credits (remove from circulation)
     * @param _amount Amount of credits to retire
     * @param _reason Reason for retirement
     */
    function retireCarbonCredits(uint256 _amount, string memory _reason) public nonReentrant {
        require(_amount > 0, "Amount must be positive");
        require(balanceOf(msg.sender) >= _amount, "Insufficient credits");
        
        _burn(msg.sender, _amount);
        totalCarbonRetired[msg.sender] += _amount;
        
        emit CarbonCreditsRetired(msg.sender, _amount, _reason);
    }
    
    /**
     * @dev Transfer carbon credits (override to add tracking)
     */
    function transfer(address _to, uint256 _amount) public override returns (bool) {
        bool success = super.transfer(_to, _amount);
        if (success) {
            emit CarbonCreditsTransferred(msg.sender, _to, _amount);
        }
        return success;
    }
    
    /**
     * @dev Transfer carbon credits from (override to add tracking)
     */
    function transferFrom(address _from, address _to, uint256 _amount) public override returns (bool) {
        bool success = super.transferFrom(_from, _to, _amount);
        if (success) {
            emit CarbonCreditsTransferred(_from, _to, _amount);
        }
        return success;
    }
    
    /**
     * @dev Get carbon credit history for an address
     */
    function getCarbonHistory(address _user) public view returns (CarbonRecord[] memory) {
        return carbonHistory[_user];
    }
    
    /**
     * @dev Get carbon credit statistics for an address
     */
    function getCarbonStats(address _user) public view returns (
        uint256 totalEarned,
        uint256 totalRetired,
        uint256 currentBalance,
        uint256 recordCount
    ) {
        return (
            totalCarbonEarned[_user],
            totalCarbonRetired[_user],
            balanceOf(_user),
            carbonHistory[_user].length
        );
    }
    
    /**
     * @dev Calculate carbon credits for energy amount and type
     */
    function calculateCarbonCredits(uint256 _energyAmount, string memory _energyType) 
        public view returns (uint256) {
        require(carbonCreditRates[_energyType] > 0, "Energy type not supported");
        return (_energyAmount * carbonCreditRates[_energyType]) / 10**18;
    }
    
    /**
     * @dev Get carbon credit rate for energy type
     */
    function getCarbonCreditRate(string memory _energyType) public view returns (uint256) {
        return carbonCreditRates[_energyType];
    }
    
    /**
     * @dev Get total carbon credits in circulation
     */
    function getTotalCarbonCredits() public view returns (uint256) {
        return totalSupply();
    }
    
    /**
     * @dev Get environmental impact metrics
     */
    function getEnvironmentalImpact() public view returns (
        uint256 totalCreditsIssued,
        uint256 totalCreditsRetired,
        uint256 netEnvironmentalImpact
    ) {
        uint256 totalIssued = totalSupply() + getTotalRetired();
        uint256 totalRetired = getTotalRetired();
        
        return (
            totalIssued,
            totalRetired,
            totalIssued - totalRetired
        );
    }
    
    /**
     * @dev Get total retired carbon credits across all users
     */
    function getTotalRetired() public view returns (uint256) {
        // This would need to be tracked globally in a real implementation
        // For now, we'll return a calculated value
        return 0; // Placeholder - implement global tracking if needed
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