require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
        accountsBalance: "10000000000000000000000" // 10,000 ETH
      }
    },
    maschain_testnet: {
      url: process.env.MASCHAIN_TESTNET_RPC_URL || "https://blockchain-testnet.maschain.com",
      chainId: 421613, // MasChain Testnet Chain ID (please verify this)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 Gwei
      gas: 2100000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    maschain_mainnet: {
      url: process.env.MASCHAIN_MAINNET_RPC_URL || "https://blockchain.maschain.com",
      chainId: 42161, // MasChain Mainnet Chain ID (please verify this)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000, // 20 Gwei
      gas: 2100000,
      confirmations: 3,
      timeoutBlocks: 200,
      skipDryRun: false
    }
  },
  etherscan: {
    // MasChain block explorer API key (if available)
    apiKey: {
      maschain_testnet: process.env.MASCHAIN_EXPLORER_API_KEY || "your-api-key-here",
      maschain_mainnet: process.env.MASCHAIN_EXPLORER_API_KEY || "your-api-key-here"
    },
    customChains: [
      {
        network: "maschain_testnet",
        chainId: 421613,
        urls: {
          apiURL: "https://explorer-testnet.maschain.com/api",
          browserURL: "https://explorer-testnet.maschain.com"
        }
      },
      {
        network: "maschain_mainnet",
        chainId: 42161,
        urls: {
          apiURL: "https://explorer.maschain.com/api",
          browserURL: "https://explorer.maschain.com"
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY
  }
}; 