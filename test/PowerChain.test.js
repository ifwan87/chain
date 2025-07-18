const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PowerChain Smart Contracts", function () {
  let energyCredits, carbonCredits, energyTrading, governanceDAO;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy EnergyCredits
    const EnergyCredits = await ethers.getContractFactory("EnergyCredits");
    energyCredits = await EnergyCredits.deploy();
    await energyCredits.waitForDeployment();

    // Deploy CarbonCredits
    const CarbonCredits = await ethers.getContractFactory("CarbonCredits");
    carbonCredits = await CarbonCredits.deploy();
    await carbonCredits.waitForDeployment();

    // Deploy EnergyTrading
    const EnergyTrading = await ethers.getContractFactory("EnergyTrading");
    energyTrading = await EnergyTrading.deploy(
      await energyCredits.getAddress(),
      await carbonCredits.getAddress()
    );
    await energyTrading.waitForDeployment();

    // Deploy GovernanceDAO
    const GovernanceDAO = await ethers.getContractFactory("GovernanceDAO");
    governanceDAO = await GovernanceDAO.deploy();
    await governanceDAO.waitForDeployment();

    // Setup permissions
    await carbonCredits.addIssuer(await energyTrading.getAddress());
    await energyCredits.addMinter(await energyTrading.getAddress());
  });

  describe("EnergyCredits", function () {
    it("Should have correct initial supply", async function () {
      const totalSupply = await energyCredits.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("1000000"));
    });

    it("Should allow issuing energy credits", async function () {
      const energyAmount = ethers.parseEther("100"); // 100 kWh
      
      await energyCredits.issueEnergyCredits(
        addr1.address,
        energyAmount,
        "Test energy production"
      );

      const balance = await energyCredits.balanceOf(addr1.address);
      // The function calculates: (100 * 10^18 * 100) / 10^18 = 10,000 tokens
      // But this is raw token amount, so we need to multiply by 10^18 for wei format
      expect(balance).to.equal(10000); // 10,000 raw tokens (not in wei)
    });

    it("Should track energy balance", async function () {
      const energyAmount = ethers.parseEther("50"); // 50 kWh
      
      await energyCredits.issueEnergyCredits(
        addr1.address,
        energyAmount,
        "Test energy production"
      );

      const energyBalance = await energyCredits.getEnergyBalance(addr1.address);
      expect(energyBalance).to.equal(energyAmount);
    });
  });

  describe("CarbonCredits", function () {
    it("Should have zero initial supply", async function () {
      const totalSupply = await carbonCredits.totalSupply();
      expect(totalSupply).to.equal(0);
    });

    it("Should issue carbon credits for solar energy", async function () {
      const energyAmount = ethers.parseEther("100"); // 100 kWh
      
      await carbonCredits.issueCarbonCredits(
        addr1.address,
        energyAmount,
        "solar"
      );

      const balance = await carbonCredits.balanceOf(addr1.address);
      // 100 kWh * 0.05 CC/kWh = 5 CC
      expect(balance).to.equal(ethers.parseEther("5"));
    });

    it("Should track carbon credit history", async function () {
      const energyAmount = ethers.parseEther("50"); // 50 kWh
      
      await carbonCredits.issueCarbonCredits(
        addr1.address,
        energyAmount,
        "solar"
      );

      const [totalEarned, , currentBalance, recordCount] = await carbonCredits.getCarbonStats(addr1.address);
      expect(totalEarned).to.equal(ethers.parseEther("2.5"));
      expect(currentBalance).to.equal(ethers.parseEther("2.5"));
      expect(recordCount).to.equal(1);
    });
  });

  describe("EnergyTrading", function () {
    beforeEach(async function () {
      // Issue some energy credits to addr1 for testing
      await energyCredits.issueEnergyCredits(
        addr1.address,
        ethers.parseEther("1000"), // 1000 kWh
        "Test energy production"
      );
    });

    it("Should create an energy offer", async function () {
      const energyAmount = ethers.parseEther("100"); // 100 kWh
      const pricePerKWh = ethers.parseEther("0.2"); // 0.2 EC per kWh
      
      await energyTrading.connect(addr1).createEnergyOffer(
        energyAmount,
        pricePerKWh,
        "solar",
        "Kuala Lumpur",
        24 // 24 hours
      );

      const offer = await energyTrading.energyOffers(1);
      expect(offer[1]).to.equal(addr1.address); // seller
      expect(offer[2]).to.equal(energyAmount); // energyAmount
      expect(offer[3]).to.equal(pricePerKWh); // pricePerKWh
      expect(offer[7]).to.equal(true); // active
    });

    it("Should get market statistics", async function () {
      const [activeOffers, totalTransactions, totalVolume] = await energyTrading.getMarketStats();
      expect(activeOffers).to.equal(0);
      expect(totalTransactions).to.equal(0);
      expect(totalVolume).to.equal(0);
    });

    it("Should get market price for energy type", async function () {
      const [price, timestamp] = await energyTrading.getMarketPrice("solar");
      expect(price).to.equal(ethers.parseEther("0.19")); // Initial price
      expect(timestamp).to.equal(0); // No updates yet
    });
  });

  describe("GovernanceDAO", function () {
    it("Should have correct initial supply", async function () {
      const totalSupply = await governanceDAO.totalSupply();
      expect(totalSupply).to.equal(ethers.parseEther("1000000"));
    });

    it("Should allow creating proposals", async function () {
      await governanceDAO.createProposal(
        "Test Proposal",
        "This is a test proposal",
        0, // General
        ethers.ZeroAddress,
        "0x"
      );

      const [id, proposer, title, description] = await governanceDAO.getProposal(1);
      expect(id).to.equal(1);
      expect(proposer).to.equal(owner.address);
      expect(title).to.equal("Test Proposal");
      expect(description).to.equal("This is a test proposal");
    });

    it("Should track voting power", async function () {
      const initialBalance = await governanceDAO.balanceOf(owner.address);
      const votingPower = await governanceDAO.getVotingPower(owner.address);
      expect(votingPower).to.equal(initialBalance);
    });

    it("Should get voting statistics", async function () {
      const [totalProposals, totalVotes, activeProposals, executedProposals] = await governanceDAO.getVotingStats();
      expect(totalProposals).to.equal(0);
      expect(totalVotes).to.equal(0);
      expect(activeProposals).to.equal(0);
      expect(executedProposals).to.equal(0);
    });
  });

  describe("Integration Tests", function () {
    it("Should complete a full energy trading cycle", async function () {
      // 1. Issue energy credits to seller
      await energyCredits.issueEnergyCredits(
        addr1.address,
        ethers.parseEther("1000"), // 1000 kWh
        "Solar energy production"
      );
      
      // Give seller some initial token balance
      await energyCredits.transfer(addr1.address, ethers.parseEther("100")); // 100 EC tokens

      // 2. Issue energy credits to buyer - give them enough credits
      // We need to transfer some EC tokens to the buyer to purchase energy
      await energyCredits.transfer(addr2.address, ethers.parseEther("100")); // 100 EC tokens

      // 3. Create an energy offer
      const energyAmount = ethers.parseEther("100"); // 100 kWh
      const pricePerKWh = ethers.parseEther("0.2"); // 0.2 EC per kWh
      
      await energyTrading.connect(addr1).createEnergyOffer(
        energyAmount,
        pricePerKWh,
        "solar",
        "Kuala Lumpur",
        24 // 24 hours
      );

      // 4. Buyer approves energy trading contract to spend their credits
      const totalCost = (energyAmount * pricePerKWh) / ethers.parseEther("1");
      await energyCredits.connect(addr2).approve(await energyTrading.getAddress(), totalCost);

      // 5. Purchase energy
      await energyTrading.connect(addr2).purchaseEnergy(1, energyAmount);

      // 6. Verify balances
      const buyerBalance = await energyCredits.balanceOf(addr2.address);
      const sellerBalance = await energyCredits.balanceOf(addr1.address);
      
      // Buyer should have less credits (they paid for energy)
      expect(buyerBalance).to.be.lessThan(ethers.parseEther("100")); // Less than initial 100 EC
      
      // Seller should have more credits (they received payment)
      expect(sellerBalance).to.be.greaterThan(ethers.parseEther("100")); // More than initial 100 EC

      // 7. Check carbon credits were issued to buyer
      const carbonBalance = await carbonCredits.balanceOf(addr2.address);
      expect(carbonBalance).to.equal(ethers.parseEther("5")); // 100 kWh * 0.05 CC/kWh
    });
  });
}); 