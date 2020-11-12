require('dotenv').config();
const {
    INITIAL_TOKEN_PRICE,
    PRICE_STEP,
    PRICE_INCREASE_NUMERATOR,
    PRICE_INCREASE_DENOMINATOR,
    ETH_TO_GAME_NUMERATOR,
    ETH_TO_GAME_DENOMINATOR,
    OWNER
} = process.env;

const NFT = artifacts.require("NFT");

module.exports = async function (deployer) {
    let NFTInst = await deployer.deploy(
        NFT,
        INITIAL_TOKEN_PRICE,
        PRICE_STEP,
        PRICE_INCREASE_NUMERATOR,
        PRICE_INCREASE_DENOMINATOR,
        ETH_TO_GAME_NUMERATOR,
        ETH_TO_GAME_DENOMINATOR,
        OWNER
    );
};