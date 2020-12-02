const BN = require("bn.js");
const chai = require("chai");
const { expect, assert } = require("chai");
const expectRevert = require("./utils/expectRevert.js");
const helper = require("openzeppelin-test-helpers/src/time.js");
const time = require("openzeppelin-test-helpers/src/time.js");
/*
timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
await helper.increase(LAUNCH_TIME.add(ROUND_TIME.mul(currentDay.add(FIVE))).sub(timeNow).add(ONE));
*/
chai.use(require("chai-bn")(BN));

require('dotenv').config();
const {
    TOKEN_PRICE,
    SOFTCAP_IN_TOKENS,
    PERCENT_OF_CASHBACK,
    OPEN_CROWDSALE_TIME,
    CLOSE_CROWDSALE_TIME,
    MAX_SUPPLY,
    NAME,
    SYMBOL,
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

const vipPaw = artifacts.require('vipPaw');

contract(
    'vipPaw-test',
    ([
        vipPawOwner,
        user1
    ]) => {
        let vipPawInst;

        beforeEach(async () => {
            // Init contracts

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                PERCENT_OF_CASHBACK,
                OPEN_CROWDSALE_TIME,
                CLOSE_CROWDSALE_TIME,
                {from: vipPawOwner}
            );
        })

        it("#0 Deploy test", async () => {
            expect((await vipPawInst.tokenPrice()).toString()).to.be.equals(TOKEN_PRICE)
            expect((await vipPawInst.softCapInTokens()).toString()).to.be.equals(SOFTCAP_IN_TOKENS)
            expect(await vipPawInst.moneyCollectedAll()).to.be.bignumber.that.equals(ZERO)
            expect(await vipPawInst.moneyForCashback()).to.be.bignumber.that.equals(ZERO)
            expect((await vipPawInst.maxSupply()).toString()).to.be.equals(MAX_SUPPLY)
            expect((await vipPawInst.percentOfCashback()).toString()).to.be.equals(PERCENT_OF_CASHBACK)
            expect(await vipPawInst.name()).to.be.equals(NAME);
            expect(await vipPawInst.symbol()).to.be.equals(SYMBOL);
            expect(await vipPawInst.totalSupply()).to.be.bignumber.that.equals(ZERO)
            expect(await vipPawInst.owner()).to.be.equals(vipPawOwner);
        })

        it("#1 Test open and close time of crowdsale", async () => {
            // test buy before open time
            let timeNow = new BN((await web3.eth.getBlock("latest")).timestamp);
            let openTime = timeNow.add(new BN(60 * 60 * 24));
            let closeTime = openTime.add(new BN(60 * 60 * 24));

            vipPawInst = await vipPaw.new(
                NAME,
                SYMBOL,
                TOKEN_PRICE,
                SOFTCAP_IN_TOKENS,
                MAX_SUPPLY,
                PERCENT_OF_CASHBACK,
                openTime,
                closeTime,
                {from: vipPawOwner}
            );

            await expectRevert(
                vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE}),
                "vipPaw: Crowdsale is closed"
            );

            await helper.increase(openTime.sub(timeNow));
            await vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE});

            await helper.increase(closeTime.sub(timeNow));
            await expectRevert(
                vipPawInst.buyToken(ONE, {from: user1, value: TOKEN_PRICE}),
                "vipPaw: Crowdsale is closed"
            );
        })

        it("#2 Test token buy and cashback", async () => {
            let tokenPrice = new BN(TOKEN_PRICE);
            let numTokens = ONE;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.sub(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.add(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(THREE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = TWO;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(THREE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = THREE;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens).add(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens).sub(ONE)}),
                "vipPaw: Wrong amount of money"
            );
            numTokens = new BN(10001);
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)}),
                "vipPaw: Wrong amount of tokens to purchase"
            );
            numTokens = ZERO;
            await expectRevert(
                vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)}),
                "vipPaw: Wrong amount of tokens to purchase"
            );

            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ZERO);
            numTokens = ONE;
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(ONE);

            expect(await vipPawInst.moneyCollectedAll()).to.be.bignumber.that.equals(tokenPrice.mul(ONE));
            let percentOfCashback = new BN(PERCENT_OF_CASHBACK);
            let defaultCashback = tokenPrice.mul(percentOfCashback).div(new BN(1000));
            expect(await vipPawInst.moneyForCashback()).to.be.bignumber.that.equals(defaultCashback.mul(ONE));
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, ZERO)).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.cashbackOfToken(ZERO)).to.be.bignumber.that.equals(defaultCashback);
            let ethBalanceOfUser1Before = new BN(await web3.eth.getBalance(user1));
            await vipPawInst.getCashback(ZERO);
            let ethBalanceOfUser1After = new BN(await web3.eth.getBalance(user1));
            expect(ethBalanceOfUser1After.sub(ethBalanceOfUser1Before)).to.be.bignumber.that.equals(defaultCashback);
            expect(await vipPawInst.moneyCollectedAll()).to.be.bignumber.that.equals(tokenPrice.mul(ONE).sub(defaultCashback));
            expect(await vipPawInst.moneyForCashback()).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.cashbackOfToken(ZERO)).to.be.bignumber.that.equals(ZERO);

            numTokens = THREE;
            await vipPawInst.buyToken(numTokens, {from: user1, value: tokenPrice.mul(numTokens)});
            expect(await vipPawInst.balanceOf(user1)).to.be.bignumber.that.equals(FOUR);
            expect(await vipPawInst.moneyCollectedAll()).to.be.bignumber.that.equals(tokenPrice.mul(FOUR).sub(defaultCashback));
            expect(await vipPawInst.moneyForCashback()).to.be.bignumber.that.equals(defaultCashback.mul(THREE));
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, ZERO)).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, ONE)).to.be.bignumber.that.equals(ONE);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, TWO)).to.be.bignumber.that.equals(TWO);
            expect(await vipPawInst.tokenOfOwnerByIndex(user1, THREE)).to.be.bignumber.that.equals(THREE);
            expect(await vipPawInst.cashbackOfToken(ZERO)).to.be.bignumber.that.equals(ZERO);
            expect(await vipPawInst.cashbackOfToken(ONE)).to.be.bignumber.that.equals(defaultCashback);
            expect(await vipPawInst.cashbackOfToken(TWO)).to.be.bignumber.that.equals(defaultCashback);
            expect(await vipPawInst.cashbackOfToken(THREE)).to.be.bignumber.that.equals(defaultCashback);
        })

        it("#3 Test end of crowdsale with reach of hard cap", async () => {

        })
    }
)