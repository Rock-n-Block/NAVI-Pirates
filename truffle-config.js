const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();
const {
    ETHERSCAN_API_KEY,
    MNEMONIC,
    DEPLOY_GAS_LIMIT,
    DEPLOY_GAS_PRICE
} = process.env;

const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
    plugins: [
        'truffle-plugin-verify'
    ],

    api_keys: {
        etherscan: ETHERSCAN_API_KEY
    },

    networks: {
        ropsten: {
            provider: () => new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/d8c3a96fe7ad4c6cb75acdacfad74ff6`),
            network_id: 3,
            gas: DEPLOY_GAS_LIMIT,
            confirmations: 2,
            skipDryRun: true
        },
        mainnet: {
            provider: () => new HDWalletProvider(MNEMONIC, `https://mainnet.infura.io/v3/d8c3a96fe7ad4c6cb75acdacfad74ff6`),
            network_id: 1,
            gasPrice: web3.utils.toWei(DEPLOY_GAS_PRICE, 'gwei'),
            gas: DEPLOY_GAS_LIMIT,
            skipDryRun: false
        },
    },

    compilers: {
        solc: {
            version: "0.6.12",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 999999
                },
            }
        },
    },
};