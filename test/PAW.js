const BN = require("bn.js");
const chai = require("chai");
const { expect, assert } = require("chai");
const expectRevert = require("./utils/expectRevert.js");
const helper = require("openzeppelin-test-helpers/src/time.js");
/*
timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
await helper.increase(LAUNCH_TIME.add(ROUND_TIME.mul(currentDay.add(FIVE))).sub(timeNow).add(ONE));
*/
chai.use(require("chai-bn")(BN));

require('dotenv').config();
const {
    NAME,
    SYMBOL,
    INITIAL_TOKEN_PRICE,
    PRICE_STEP_DEBUG,
    PRICE_INCREASE_NUMERATOR,
    PRICE_INCREASE_DENOMINATOR,
    ETH_TO_GAME_NUMERATOR,
    ETH_TO_GAME_DENOMINATOR
} = process.env;

const MINUS_ONE = new BN(-1);
const ZERO = new BN(0);
const ONE = new BN(1);
const TWO = new BN(2);
const THREE = new BN(3);
const FOUR = new BN(4);
const FIVE = new BN(5);
const SIX = new BN(6);
const SEVEN = new BN(7);

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const PAW = artifacts.require('PAW');

contract(
    'PAW-test',
    ([
        PawAdmin,
        admin2,
        game,
        game2,
        customer1
    ]) => {
        let Paw;

        beforeEach(async () => {
            // Init contracts

            Paw = await PAW.new(
                NAME,
                SYMBOL,
                INITIAL_TOKEN_PRICE,
                PRICE_STEP_DEBUG,
                PRICE_INCREASE_NUMERATOR,
                PRICE_INCREASE_DENOMINATOR,
                ETH_TO_GAME_NUMERATOR,
                ETH_TO_GAME_DENOMINATOR,
                PawAdmin,
                {from: PawAdmin}
            );
            await Paw.grantRole(await Paw.GAME_ROLE(), game);
        })

        it("#0 Deploy test", async () => {
            expect(await Paw.name()).to.be.equals(NAME);
            expect(await Paw.symbol()).to.be.equals(SYMBOL);
            expect(await Paw.gameEntrances()).to.be.bignumber.that.equals(ZERO);
            expect(await Paw.isEndedPreSale()).to.be.equals(false);
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(ZERO);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(ZERO);
            expect(await Paw.tokenPrice()).to.be.bignumber.that.equals(INITIAL_TOKEN_PRICE);
        })

        it("#1 Test pre-sale", async () => {
            await expectRevert(
                Paw.mintForPreSale(ONE, {from: customer1}),
                "PAW: Caller is not a admin role"
            );
            await expectRevert(
                Paw.closePreSale({from: customer1}),
                "PAW: Caller is not a admin role"
            );
            await expectRevert(
                Paw.buyToken({from: customer1,
                              value: INITIAL_TOKEN_PRICE}),
                "PAW: Pre-sale is not ended"
            );

            await Paw.mintForPreSale(ONE, {from: PawAdmin});
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(ONE);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(ONE);
            expect(await Paw.totalSupply()).to.be.bignumber.that.equals(ONE);
            expect(await Paw.balanceOf(PawAdmin)).to.be.bignumber.that.equals(ONE);
            expect(await Paw.ownerOf(ZERO)).to.be.equals(PawAdmin);

            await Paw.grantRole(await Paw.DEFAULT_ADMIN_ROLE(), admin2);
            await Paw.mintForPreSale(ONE, {from: admin2});
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(TWO);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(TWO);
            expect(await Paw.totalSupply()).to.be.bignumber.that.equals(TWO);
            expect(await Paw.balanceOf(admin2)).to.be.bignumber.that.equals(ONE);
            expect(await Paw.ownerOf(ONE)).to.be.equals(admin2);

            await Paw.mintForPreSale(THREE, {from: PawAdmin});
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.totalSupply()).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.balanceOf(PawAdmin)).to.be.bignumber.that.equals(FOUR);
            expect(await Paw.ownerOf(TWO)).to.be.equals(PawAdmin);
            expect(await Paw.ownerOf(THREE)).to.be.equals(PawAdmin);
            expect(await Paw.ownerOf(FOUR)).to.be.equals(PawAdmin);

            await Paw.closePreSale();
            expect(await Paw.isEndedPreSale()).to.be.equals(true);

            await Paw.buyToken({from: PawAdmin, value: INITIAL_TOKEN_PRICE});
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(SIX);
            expect(await Paw.totalSupply()).to.be.bignumber.that.equals(SIX);
            expect(await Paw.balanceOf(PawAdmin)).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.ownerOf(FIVE)).to.be.equals(PawAdmin);

            await Paw.buyToken({from: customer1, value: INITIAL_TOKEN_PRICE});
            expect(await Paw.tokenIdOfLastPreSaled()).to.be.bignumber.that.equals(FIVE);
            expect(await Paw.tokenIdLast()).to.be.bignumber.that.equals(SEVEN);
            expect(await Paw.totalSupply()).to.be.bignumber.that.equals(SEVEN);
            expect(await Paw.balanceOf(customer1)).to.be.bignumber.that.equals(ONE);
            expect(await Paw.ownerOf(SIX)).to.be.equals(customer1);
        })

        it("#2 Test withdraw", async () => {
            await Paw.closePreSale();
            expect(await Paw.isEndedPreSale()).to.be.equals(true);

            await Paw.buyToken({from: customer1, value: INITIAL_TOKEN_PRICE});
            await Paw.buyToken({from: customer1, value: INITIAL_TOKEN_PRICE});
            await Paw.buyToken({from: PawAdmin, value: INITIAL_TOKEN_PRICE});
            await expectRevert(
                Paw.buyToken({from: customer1, value: INITIAL_TOKEN_PRICE - 1}),
                "PAW: Value is not equal to token price"
            );
            await expectRevert(
                Paw.buyToken({from: customer1, value: INITIAL_TOKEN_PRICE + 1}),
                "PAW: Value is not equal to token price"
            );

            let rawAmount = (new BN(INITIAL_TOKEN_PRICE)).mul(THREE);

            let gameEthBalanceBefore = new BN(await web3.eth.getBalance(game));
            await expectRevert(
                Paw.withdrawGame({from: customer1}),
                "PAW: Caller is not a game role"
            );
            await expectRevert(
                Paw.withdrawDev({from: customer1}),
                "PAW: Caller is not a admin role"
            );
            await Paw.withdrawGame({from: game, gasPrice: 0});
            let gameEthBalanceAfter = new BN(await web3.eth.getBalance(game));
            let ethToGame = rawAmount.mul(new BN(ETH_TO_GAME_NUMERATOR))
                                     .div(new BN(ETH_TO_GAME_DENOMINATOR));
            expect(gameEthBalanceAfter.sub(gameEthBalanceBefore)).to.be.bignumber.that.equals(ethToGame);

            let devEthBalanceBefore = new BN(await web3.eth.getBalance(PawAdmin));
            await Paw.withdrawDev({from: PawAdmin, gasPrice: 0});
            let devEthBalanceAfter = new BN(await web3.eth.getBalance(PawAdmin));
            expect(devEthBalanceAfter.sub(devEthBalanceBefore)).to.be.bignumber.that.equals(rawAmount.sub(ethToGame));
        })

        it("#3 Test price increase", async () => {
            await expectRevert(
                Paw.increaseGameEntrances({from: customer1}),
                "PAW: Caller is not a game role"
            );
            expect(await Paw.tokenPrice()).to.be.bignumber.that.equals(INITIAL_TOKEN_PRICE);
            for(i = 0; i < PRICE_STEP_DEBUG - 1; ++i)
                Paw.increaseGameEntrances({from: game});
            expect(await Paw.tokenPrice()).to.be.bignumber.that.equals(INITIAL_TOKEN_PRICE);
            Paw.increaseGameEntrances({from: game});
            let newPrice = (new BN(INITIAL_TOKEN_PRICE)).
                           mul(new BN(PRICE_INCREASE_NUMERATOR)).
                           div(new BN(PRICE_INCREASE_DENOMINATOR));
            expect(await Paw.tokenPrice()).to.be.bignumber.that.equals(newPrice);
        })
    }
)