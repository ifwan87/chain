# PowerChain Smart Contract Deployment Guide

This guide walks you through deploying PowerChain smart contracts to MasChain testnet.

## 🚀 Prerequisites

1. **Node.js** (v18 or higher)
2. **npm** or **yarn**
3. **MasChain wallet** with testnet tokens
4. **Private key** or **mnemonic** for deployment

## 📋 Step 1: Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- Hardhat development environment
- OpenZeppelin contracts
- Ethers.js for blockchain interaction

## 🔧 Step 2: Environment Configuration

1. Copy the environment template:
```bash
cp env.example .env
```

2. Edit `.env` with your configuration:
```bash
# Required: Your private key for deployment
PRIVATE_KEY=your-private-key-here

# MasChain Testnet RPC URL (verify this URL)
MASCHAIN_TESTNET_RPC_URL=https://blockchain-testnet.maschain.com

# Optional: MasChain Explorer API key
MASCHAIN_EXPLORER_API_KEY=your-api-key-here
```

⚠️ **Security Warning**: Never commit your private key to version control!

## 🏗️ Step 3: Compile Contracts

```bash
npm run compile
```

This compiles all smart contracts and generates the artifacts needed for deployment.

## 🧪 Step 4: Test Contracts (Optional)

Run the test suite to verify contracts work correctly:

```bash
npm run test:contracts
```

Expected output:
```
✅ 15 passing tests
✅ All integration tests pass
✅ Gas usage within limits
```

## 🚀 Step 5: Deploy to MasChain Testnet

```bash
npm run deploy:testnet
```

**Expected Deployment Process:**
1. Deploy EnergyCredits contract
2. Deploy CarbonCredits contract  
3. Deploy EnergyTrading contract
4. Deploy GovernanceDAO contract
5. Set up contract permissions
6. Issue initial tokens for testing
7. Save deployment addresses

**Sample Output:**
```
🚀 Starting PowerChain Contract Deployment...

📦 Deploying EnergyCredits contract...
✅ EnergyCredits deployed to: 0x1234567890123456789012345678901234567890

📦 Deploying CarbonCredits contract...
✅ CarbonCredits deployed to: 0x2345678901234567890123456789012345678901

📦 Deploying EnergyTrading contract...
✅ EnergyTrading deployed to: 0x3456789012345678901234567890123456789012

📦 Deploying GovernanceDAO contract...
✅ GovernanceDAO deployed to: 0x4567890123456789012345678901234567890123

🔧 Setting up contract permissions...
✅ EnergyTrading authorized to issue carbon credits
✅ EnergyTrading authorized to mint energy credits
✅ GovernanceDAO authorized for token operations

🎯 Initializing contracts with demo data...
✅ Initial energy credits issued
✅ Initial governance tokens issued

📊 Deployment Summary:
==================================================
EnergyCredits:  0x1234567890123456789012345678901234567890
CarbonCredits:  0x2345678901234567890123456789012345678901
EnergyTrading:  0x3456789012345678901234567890123456789012
GovernanceDAO:  0x4567890123456789012345678901234567890123
==================================================

💾 Deployment info saved to: deployments/maschain_testnet_deployment.json
💾 Frontend config saved to: app/config/contracts.json

🎉 PowerChain deployment completed successfully!
```

## 📝 Step 6: Verify Contracts (Optional)

Verify contracts on MasChain explorer:

```bash
npm run verify
```

Or manually verify each contract:
```bash
npx hardhat verify --network maschain_testnet <CONTRACT_ADDRESS>
```

## 🔗 Step 7: Update Frontend Configuration

The deployment script automatically updates `app/config/contracts.json` with the deployed contract addresses. Your frontend will now connect to the real smart contracts!

## 📊 Deployed Contracts Overview

### EnergyCredits (EC)
- **Purpose**: Token for energy trading
- **Initial Supply**: 1,000,000 EC
- **Conversion**: 1 kWh = 100 EC
- **Key Functions**: `issueEnergyCredits()`, `transferEnergyCredits()`

### CarbonCredits (CC)
- **Purpose**: Environmental impact rewards
- **Initial Supply**: 0 (earned through trading)
- **Rates**: 0.05 CC per kWh (solar), 0.045 CC per kWh (wind)
- **Key Functions**: `issueCarbonCredits()`, `getCarbonStats()`

### EnergyTrading
- **Purpose**: Marketplace for energy trading
- **Trading Fee**: 2.5%
- **Key Functions**: `createEnergyOffer()`, `purchaseEnergy()`

### GovernanceDAO (GT)
- **Purpose**: Community governance
- **Initial Supply**: 1,000,000 GT
- **Voting Period**: 7 days
- **Key Functions**: `createProposal()`, `castVote()`

## 🧪 Testing the Deployment

1. **Check Token Balances**:
```bash
# Your deployer address should have initial tokens
# Check in MasChain explorer or use frontend
```

2. **Test Energy Trading**:
```bash
# Use the frontend to create an energy offer
# Purchase energy from another account
# Verify carbon credits are issued
```

3. **Test Governance**:
```bash
# Create a governance proposal
# Vote on proposals
# Check voting power
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Insufficient funds for gas"**
   - Ensure your account has enough MAS tokens
   - Check gas price settings in hardhat.config.js

2. **"Contract creation failed"**
   - Verify network configuration
   - Check RPC URL is correct
   - Ensure private key is valid

3. **"Nonce too high"**
   - Reset account nonce in your wallet

4. **"Contract not found"**
   - Verify contract addresses in config
   - Check if contracts were deployed successfully

### Debug Commands:

```bash
# Check account balance
npx hardhat run scripts/check-balance.js --network maschain_testnet

# Verify contract deployment
npx hardhat run scripts/verify-deployment.js --network maschain_testnet
```

## 📈 Next Steps

1. **Connect Frontend**: Your app will now use real blockchain transactions
2. **Test Trading**: Create and fulfill energy offers
3. **Monitor Transactions**: Check MasChain explorer for transaction history
4. **Scale Up**: Deploy to mainnet when ready

## 🔒 Security Considerations

- [ ] Contracts are pausable by owner
- [ ] Trading fees are capped at 10%
- [ ] All major functions have reentrancy protection
- [ ] Authorization is required for minting tokens
- [ ] Consider multi-sig wallet for production

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Verify MasChain network status
3. Review deployment logs in `deployments/` folder
4. Test with a minimal amount first

## 🎯 Production Deployment

For mainnet deployment:
1. Use a hardware wallet or multi-sig
2. Audit smart contracts thoroughly
3. Test all functions on testnet first
4. Set up monitoring and alerting
5. Have emergency procedures ready

```bash
# Deploy to mainnet (when ready)
npm run deploy:mainnet
```

---

**🌟 Congratulations! Your PowerChain smart contracts are now live on MasChain testnet!** 