require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/block-numbers");
require("hardhat-gas-reporter");
// require('solidity-coverage')

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "http://0.0.0.0:6737";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "apiKey";
const COINMARKET_API_KEY = process.env.COINMARKET_API_KEY || "keyApi";

/*
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
      // accounts: [],
      chainId: 31337,
    },
  },
  solidity: "0.8.19",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: "gasReport.txt",
    noColors: true,
    currency: "INR",
    coinmarketcap: COINMARKET_API_KEY,
    token: "MATIC",
  },
};
