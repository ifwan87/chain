const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Check deployer balance
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  // Track deployed contracts
  const deployedContracts = {};

  console.log("\n🚀 Starting PowerChain Contract Deployment...\n");

  // 1. Deploy EnergyCredits contract
  console.log("📦 Deploying EnergyCredits contract...");
  const EnergyCredits = await ethers.getContractFactory("EnergyCredits");
  const energyCredits = await EnergyCredits.deploy();
  await energyCredits.waitForDeployment();
  
  const energyCreditsAddress = await energyCredits.getAddress();
  deployedContracts.EnergyCredits = energyCreditsAddress;
  console.log("✅ EnergyCredits deployed to:", energyCreditsAddress);

  // 2. Deploy CarbonCredits contract
  console.log("\n📦 Deploying CarbonCredits contract...");
  const CarbonCredits = await ethers.getContractFactory("CarbonCredits");
  const carbonCredits = await CarbonCredits.deploy();
  await carbonCredits.waitForDeployment();
  
  const carbonCreditsAddress = await carbonCredits.getAddress();
  deployedContracts.CarbonCredits = carbonCreditsAddress;
  console.log("✅ CarbonCredits deployed to:", carbonCreditsAddress);

  // 3. Deploy EnergyTrading contract
  console.log("\n📦 Deploying EnergyTrading contract...");
  const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
  const energyTrading = await EnergyTrading.deploy(energyCreditsAddress, carbonCreditsAddress);
  await energyTrading.waitForDeployment();
  
  const energyTradingAddress = await energyTrading.getAddress();
  deployedContracts.EnergyTrading = energyTradingAddress;
  console.log("✅ EnergyTrading deployed to:", energyTradingAddress);

  // 4. Deploy GovernanceDAO contract
  console.log("\n📦 Deploying GovernanceDAO contract...");
  const GovernanceDAO = await ethers.getContractFactory("GovernanceDAO");
  const governanceDAO = await GovernanceDAO.deploy();
  await governanceDAO.waitForDeployment();
  
  const governanceDAOAddress = await governanceDAO.getAddress();
  deployedContracts.GovernanceDAO = governanceDAOAddress;
  console.log("✅ GovernanceDAO deployed to:", governanceDAOAddress);

  console.log("\n🔧 Setting up contract permissions...");

  // 5. Set up permissions and links between contracts
  try {
    // Add EnergyTrading as authorized issuer for CarbonCredits
    console.log("🔗 Adding EnergyTrading as authorized issuer for CarbonCredits...");
    await carbonCredits.addIssuer(energyTradingAddress);
    console.log("✅ EnergyTrading authorized to issue carbon credits");

    // Add EnergyTrading as authorized minter for EnergyCredits
    console.log("🔗 Adding EnergyTrading as authorized minter for EnergyCredits...");
    await energyCredits.addMinter(energyTradingAddress);
    console.log("✅ EnergyTrading authorized to mint energy credits");

    // Add GovernanceDAO as authorized minter for both tokens
    console.log("🔗 Adding GovernanceDAO as authorized minter...");
    await energyCredits.addMinter(governanceDAOAddress);
    await carbonCredits.addIssuer(governanceDAOAddress);
    console.log("✅ GovernanceDAO authorized for token operations");

  } catch (error) {
    console.error("❌ Error setting up permissions:", error.message);
  }

  // 6. Initialize contracts with demo data
  console.log("\n🎯 Initializing contracts with demo data...");

  try {
    // Issue initial energy credits to deployer for testing
    console.log("💰 Issuing initial energy credits for testing...");
    await energyCredits.issueEnergyCredits(
      deployer.address,
      ethers.parseEther("1000"), // 1000 kWh
      "Initial deployment credits"
    );
    console.log("✅ Initial energy credits issued");

    // Issue initial governance tokens to deployer
    console.log("🗳️ Issuing initial governance tokens for testing...");
    await governanceDAO.issueGovernanceTokens(
      deployer.address,
      ethers.parseEther("10000"), // 10000 GT
      "Initial deployment tokens"
    );
    console.log("✅ Initial governance tokens issued");

  } catch (error) {
    console.error("❌ Error initializing contracts:", error.message);
  }

  console.log("\n📊 Deployment Summary:");
  console.log("=".repeat(50));
  console.log(`EnergyCredits:  ${deployedContracts.EnergyCredits}`);
  console.log(`CarbonCredits:  ${deployedContracts.CarbonCredits}`);
  console.log(`EnergyTrading:  ${deployedContracts.EnergyTrading}`);
  console.log(`GovernanceDAO:  ${deployedContracts.GovernanceDAO}`);
  console.log("=".repeat(50));

  // 7. Save deployment info to file
  const network = await ethers.provider.getNetwork();
  const deploymentInfo = {
    network: hre.network.name,
    chainId: network.chainId.toString(), // Convert BigInt to string
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
    contracts: deployedContracts,
    contractABIs: {
      EnergyCredits: "artifacts/contracts/EnergyCredits.sol/EnergyCredits.json",
      CarbonCredits: "artifacts/contracts/CarbonCredits.sol/CarbonCredits.json",
      EnergyTrading: "artifacts/contracts/EnergyTrading.sol/EnergyTrading.json",
      GovernanceDAO: "artifacts/contracts/GovernanceDAO.sol/GovernanceDAO.json"
    }
  };

  // Create deployments directory if it doesn't exist
  if (!fs.existsSync("deployments")) {
    fs.mkdirSync("deployments");
  }

  // Save deployment info
  const deploymentFile = `deployments/${hre.network.name}_deployment.json`;
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));
  console.log(`\n💾 Deployment info saved to: ${deploymentFile}`);

  // 8. Create frontend configuration file
  const frontendConfig = {
    contracts: deployedContracts,
    network: {
      name: hre.network.name,
      chainId: network.chainId.toString(), // Convert BigInt to string
      rpcUrl: hre.network.config.url
    }
  };

  fs.writeFileSync("app/config/contracts.json", JSON.stringify(frontendConfig, null, 2));
  console.log("💾 Frontend config saved to: app/config/contracts.json");

  console.log("\n🎉 PowerChain deployment completed successfully!");
  console.log("\n📋 Next steps:");
  console.log("1. Update your frontend to use the deployed contract addresses");
  console.log("2. Test the contracts with the deployed addresses");
  console.log("3. Verify contracts on the block explorer (optional)");
  console.log("\n🔗 To verify contracts, run:");
  console.log(`npx hardhat verify --network ${hre.network.name} ${deployedContracts.EnergyCredits}`);
  console.log(`npx hardhat verify --network ${hre.network.name} ${deployedContracts.CarbonCredits}`);
  console.log(`npx hardhat verify --network ${hre.network.name} ${deployedContracts.EnergyTrading} ${deployedContracts.EnergyCredits} ${deployedContracts.CarbonCredits}`);
  console.log(`npx hardhat verify --network ${hre.network.name} ${deployedContracts.GovernanceDAO}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }); 