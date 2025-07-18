// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./EnergyCredits.sol";
import "./CarbonCredits.sol";

/**
 * @title EnergyTrading
 * @dev Main contract for managing energy trading in the PowerChain ecosystem
 * @notice This contract handles energy offers, purchases, and rewards distribution
 */
contract EnergyTrading is Ownable, Pausable, ReentrancyGuard {
    
    // Contract references
    EnergyCredits public energyCredits;
    CarbonCredits public carbonCredits;
    
    // Events
    event EnergyOfferCreated(uint256 indexed offerId, address indexed seller, uint256 energyAmount, uint256 pricePerKWh, string energyType);
    event EnergyOfferCancelled(uint256 indexed offerId, address indexed seller);
    event EnergyOfferUpdated(uint256 indexed offerId, uint256 newPrice, uint256 newAmount);
    event EnergyPurchased(uint256 indexed offerId, address indexed buyer, address indexed seller, uint256 energyAmount, uint256 totalCost);
    event EnergyDelivered(uint256 indexed transactionId, address indexed buyer, uint256 energyAmount);
    event TradingFeeUpdated(uint256 oldFee, uint256 newFee);
    
    // Structs
    struct EnergyOffer {
        uint256 id;
        address seller;
        uint256 energyAmount;     // in kWh (wei format)
        uint256 pricePerKWh;      // in Energy Credits per kWh
        string energyType;        // solar, wind, hydro, storage
        string location;
        uint256 timestamp;
        bool active;
        uint256 expiresAt;
    }
    
    struct EnergyTransaction {
        uint256 id;
        uint256 offerId;
        address buyer;
        address seller;
        uint256 energyAmount;
        uint256 totalCost;
        uint256 timestamp;
        TransactionStatus status;
        string deliveryDetails;
    }
    
    enum TransactionStatus {
        Pending,
        Confirmed,
        Delivered,
        Cancelled,
        Disputed
    }
    
    // State variables
    uint256 public nextOfferId = 1;
    uint256 public nextTransactionId = 1;
    uint256 public tradingFeeRate = 250; // 2.5% in basis points
    uint256 public constant MAX_TRADING_FEE = 1000; // 10% maximum
    
    mapping(uint256 => EnergyOffer) public energyOffers;
    mapping(uint256 => EnergyTransaction) public energyTransactions;
    mapping(address => uint256[]) public userOffers;
    mapping(address => uint256[]) public userTransactions;
    
    // Trading statistics
    mapping(address => uint256) public totalEnergyTraded;
    mapping(address => uint256) public totalTransactionCount;
    mapping(string => uint256) public energyTypeVolume;
    
    // Price tracking
    mapping(string => uint256) public currentMarketPrice;
    mapping(string => uint256) public priceUpdateTime;
    
    modifier validOffer(uint256 _offerId) {
        require(energyOffers[_offerId].active, "Offer not active");
        require(energyOffers[_offerId].expiresAt > block.timestamp, "Offer expired");
        _;
    }
    
    modifier onlySeller(uint256 _offerId) {
        require(energyOffers[_offerId].seller == msg.sender, "Not the seller");
        _;
    }
    
    constructor(address _energyCredits, address _carbonCredits) {
        energyCredits = EnergyCredits(_energyCredits);
        carbonCredits = CarbonCredits(_carbonCredits);
        
        // Set initial market prices (in Energy Credits per kWh)
        currentMarketPrice["solar"] = 19 * 10**16;   // 0.19 EC per kWh
        currentMarketPrice["wind"] = 18 * 10**16;    // 0.18 EC per kWh
        currentMarketPrice["hydro"] = 17 * 10**16;   // 0.17 EC per kWh
        currentMarketPrice["storage"] = 20 * 10**16; // 0.20 EC per kWh
    }
    
    /**
     * @dev Create a new energy offer
     */
    function createEnergyOffer(
        uint256 _energyAmount,
        uint256 _pricePerKWh,
        string memory _energyType,
        string memory _location,
        uint256 _expiresInHours
    ) public whenNotPaused nonReentrant returns (uint256) {
        require(_energyAmount > 0, "Energy amount must be positive");
        require(_pricePerKWh > 0, "Price must be positive");
        require(_expiresInHours > 0 && _expiresInHours <= 168, "Expiry must be 1-168 hours");
        
        // Check if seller has enough energy to sell
        require(energyCredits.getEnergyBalance(msg.sender) >= _energyAmount, "Insufficient energy balance");
        
        uint256 offerId = nextOfferId++;
        uint256 expiresAt = block.timestamp + (_expiresInHours * 1 hours);
        
        energyOffers[offerId] = EnergyOffer({
            id: offerId,
            seller: msg.sender,
            energyAmount: _energyAmount,
            pricePerKWh: _pricePerKWh,
            energyType: _energyType,
            location: _location,
            timestamp: block.timestamp,
            active: true,
            expiresAt: expiresAt
        });
        
        userOffers[msg.sender].push(offerId);
        
        // Update market price
        updateMarketPrice(_energyType, _pricePerKWh);
        
        emit EnergyOfferCreated(offerId, msg.sender, _energyAmount, _pricePerKWh, _energyType);
        return offerId;
    }
    
    /**
     * @dev Purchase energy from an offer
     */
    function purchaseEnergy(uint256 _offerId, uint256 _energyAmount) 
        public 
        whenNotPaused 
        nonReentrant 
        validOffer(_offerId) 
        returns (uint256) {
        
        EnergyOffer storage offer = energyOffers[_offerId];
        require(offer.seller != msg.sender, "Cannot buy from yourself");
        require(_energyAmount > 0, "Energy amount must be positive");
        require(_energyAmount <= offer.energyAmount, "Not enough energy available");
        
        // Calculate costs
        uint256 totalCost = (_energyAmount * offer.pricePerKWh) / 10**18;
        uint256 tradingFee = (totalCost * tradingFeeRate) / 10000;
        uint256 sellerAmount = totalCost - tradingFee;
        
        // Check buyer has enough credits
        require(energyCredits.balanceOf(msg.sender) >= totalCost, "Insufficient credits");
        
        // Transfer energy credits
        require(energyCredits.transferFrom(msg.sender, offer.seller, sellerAmount), "Transfer to seller failed");
        
        // Transfer trading fee to contract owner
        if (tradingFee > 0) {
            require(energyCredits.transferFrom(msg.sender, owner(), tradingFee), "Fee transfer failed");
        }
        
        // Update energy balances
        energyCredits.transferEnergyCredits(offer.seller, msg.sender, totalCost, _energyAmount);
        
        // Issue carbon credits to buyer
        carbonCredits.issueCarbonCredits(msg.sender, _energyAmount, offer.energyType);
        
        // Create transaction record
        uint256 transactionId = nextTransactionId++;
        energyTransactions[transactionId] = EnergyTransaction({
            id: transactionId,
            offerId: _offerId,
            buyer: msg.sender,
            seller: offer.seller,
            energyAmount: _energyAmount,
            totalCost: totalCost,
            timestamp: block.timestamp,
            status: TransactionStatus.Confirmed,
            deliveryDetails: ""
        });
        
        userTransactions[msg.sender].push(transactionId);
        userTransactions[offer.seller].push(transactionId);
        
        // Update statistics
        totalEnergyTraded[msg.sender] += _energyAmount;
        totalEnergyTraded[offer.seller] += _energyAmount;
        totalTransactionCount[msg.sender]++;
        totalTransactionCount[offer.seller]++;
        energyTypeVolume[offer.energyType] += _energyAmount;
        
        // Update offer
        offer.energyAmount -= _energyAmount;
        if (offer.energyAmount == 0) {
            offer.active = false;
        }
        
        emit EnergyPurchased(_offerId, msg.sender, offer.seller, _energyAmount, totalCost);
        return transactionId;
    }
    
    /**
     * @dev Cancel an energy offer
     */
    function cancelEnergyOffer(uint256 _offerId) 
        public 
        whenNotPaused 
        validOffer(_offerId) 
        onlySeller(_offerId) {
        
        energyOffers[_offerId].active = false;
        emit EnergyOfferCancelled(_offerId, msg.sender);
    }
    
    /**
     * @dev Update energy offer price and amount
     */
    function updateEnergyOffer(uint256 _offerId, uint256 _newPrice, uint256 _newAmount) 
        public 
        whenNotPaused 
        validOffer(_offerId) 
        onlySeller(_offerId) {
        
        require(_newPrice > 0, "Price must be positive");
        require(_newAmount > 0, "Amount must be positive");
        
        EnergyOffer storage offer = energyOffers[_offerId];
        require(energyCredits.getEnergyBalance(msg.sender) >= _newAmount, "Insufficient energy balance");
        
        offer.pricePerKWh = _newPrice;
        offer.energyAmount = _newAmount;
        
        updateMarketPrice(offer.energyType, _newPrice);
        
        emit EnergyOfferUpdated(_offerId, _newPrice, _newAmount);
    }
    
    /**
     * @dev Mark energy as delivered
     */
    function markEnergyDelivered(uint256 _transactionId, string memory _deliveryDetails) 
        public 
        whenNotPaused {
        
        EnergyTransaction storage transaction = energyTransactions[_transactionId];
        require(transaction.seller == msg.sender, "Not the seller");
        require(transaction.status == TransactionStatus.Confirmed, "Invalid transaction status");
        
        transaction.status = TransactionStatus.Delivered;
        transaction.deliveryDetails = _deliveryDetails;
        
        emit EnergyDelivered(_transactionId, transaction.buyer, transaction.energyAmount);
    }
    
    /**
     * @dev Update market price for energy type
     */
    function updateMarketPrice(string memory _energyType, uint256 _price) internal {
        // Simple price update - in production, this would use a more sophisticated algorithm
        currentMarketPrice[_energyType] = _price;
        priceUpdateTime[_energyType] = block.timestamp;
    }
    
    /**
     * @dev Set trading fee rate (only owner)
     */
    function setTradingFeeRate(uint256 _newRate) public onlyOwner {
        require(_newRate <= MAX_TRADING_FEE, "Fee rate too high");
        uint256 oldRate = tradingFeeRate;
        tradingFeeRate = _newRate;
        emit TradingFeeUpdated(oldRate, _newRate);
    }
    
    /**
     * @dev Get active offers for an energy type
     */
    function getActiveOffers(string memory _energyType) public view returns (uint256[] memory) {
        uint256[] memory activeOffers = new uint256[](100); // Temporary array
        uint256 count = 0;
        
        for (uint256 i = 1; i < nextOfferId; i++) {
            EnergyOffer storage offer = energyOffers[i];
            if (offer.active && 
                offer.expiresAt > block.timestamp && 
                keccak256(bytes(offer.energyType)) == keccak256(bytes(_energyType))) {
                activeOffers[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeOffers[i];
        }
        
        return result;
    }
    
    /**
     * @dev Get user's offers
     */
    function getUserOffers(address _user) public view returns (uint256[] memory) {
        return userOffers[_user];
    }
    
    /**
     * @dev Get user's transactions
     */
    function getUserTransactions(address _user) public view returns (uint256[] memory) {
        return userTransactions[_user];
    }
    
    /**
     * @dev Get market statistics
     */
    function getMarketStats() public view returns (
        uint256 totalActiveOffers,
        uint256 totalTransactions,
        uint256 totalVolumeTraded
    ) {
        uint256 activeOffers = 0;
        uint256 volumeTraded = 0;
        
        for (uint256 i = 1; i < nextOfferId; i++) {
            if (energyOffers[i].active && energyOffers[i].expiresAt > block.timestamp) {
                activeOffers++;
            }
        }
        
        for (uint256 i = 1; i < nextTransactionId; i++) {
            volumeTraded += energyTransactions[i].energyAmount;
        }
        
        return (activeOffers, nextTransactionId - 1, volumeTraded);
    }
    
    /**
     * @dev Get current market price for energy type
     */
    function getMarketPrice(string memory _energyType) public view returns (uint256, uint256) {
        return (currentMarketPrice[_energyType], priceUpdateTime[_energyType]);
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
     * @dev Emergency withdraw (only owner)
     */
    function emergencyWithdraw() public onlyOwner {
        uint256 balance = energyCredits.balanceOf(address(this));
        if (balance > 0) {
            energyCredits.transfer(owner(), balance);
        }
    }
} 