// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract vipPaw is ERC721, Ownable
{
    using SafeMath for uint256;

    uint256 public tokenPrice;
    uint256 public softCapInTokens;
    uint256 public moneyCollected;

    uint256 private lastTokenId;
    uint256 public maxSupply = 10000;

    uint256 public openCrowdsaleTime;
    uint256 public closeCrowdsaleTime;

    string public defaultTokenURI;

    uint256 public maxTokensToBuyInTx = 100;

    bool public isOpenTransfers = false;

    event TokensPurchased(
        address user,
        uint256 count,
        uint256 timestamp
    );

    constructor(
        string memory name,
        string memory symbol,
        uint256 _tokenPrice,
        uint256 _softCapInTokens,
        uint256 _maxSupply,
        uint256 _openCrowdsaleTime,
        uint256 _closeCrowdsaleTime
    )
        public
        ERC721(name, symbol)
    {
        require(
            _softCapInTokens <= _maxSupply,
            "vipPaw: Wrong soft cap"
        );
        /* require(
            _closeCrowdsaleTime > now &&
            _openCrowdsaleTime <= _closeCrowdsaleTime,
            "vipPaw: Wrong open and close time of crowdsale"
        ); */

        tokenPrice = _tokenPrice;
        softCapInTokens = _softCapInTokens;
        maxSupply = _maxSupply;
        openCrowdsaleTime = _openCrowdsaleTime;
        closeCrowdsaleTime = _closeCrowdsaleTime;
    }

    bool isFirstTime = true;
    function startCrowdsale() external onlyOwner
    {
        require(
            isFirstTime == true,
            "vipPaw: Can not open crowdsale twice"
        );
        openCrowdsaleTime = now;
        closeCrowdsaleTime = now + 10 minutes;
        isFirstTime = false;
    }

    function setBaseUri(string memory newBaseUri) external onlyOwner
    {
        _setBaseURI(newBaseUri);
    }

    function setTokenURI(uint256 tokenId, string memory newTokenUri) external onlyOwner
    {
        _setTokenURI(tokenId, newTokenUri);
    }

    function setDefaultTokenURI(string memory newDefaultTokenUri) external onlyOwner
    {
        defaultTokenURI = newDefaultTokenUri;
    }

    function setMaxTokensToBuyInTx(uint256 newMax) external onlyOwner
    {
        maxTokensToBuyInTx = newMax;
    }

    function openTransfers() external onlyOwner
    {
        require(
            isOpenTransfers == false,
            "vipPaw: Transfers is already opened"
        );
        isOpenTransfers = true;
    }

    function buyToken(uint256 count) external payable
    {
        require(
            isClosedCrowdsale() == false,
            "vipPaw: Crowdsale is closed"
        );

        address sender = _msgSender();
        uint256 rawAmount = msg.value;

        require(
            count > 0 && count <= maxSupply.sub(lastTokenId),
            "vipPaw: Wrong amount of tokens to purchase"
        );
        require(
            rawAmount == tokenPrice.mul(count),
            "vipPaw: Wrong amount of money"
        );

        for(uint256 token = 0; token < count; token = token.add(1))
        {
            // mint token
            _mint(sender, lastTokenId);

            _setTokenURI(lastTokenId, defaultTokenURI);

            lastTokenId = lastTokenId.add(1);
        }

        moneyCollected = moneyCollected.add(rawAmount);

        emit TokensPurchased(sender, count, now);
    }

    function withdraw() external
    {
        require(
            isClosedCrowdsale() == true,
            "vipPaw: Crowdsale is not closed"
        );
        address payable sender = _msgSender();
        require(
            sender == owner(),
            "vipPaw: Sender must be owner of the contract"
        );
        require(
            isRefund() == false,
            "vipPaw: Owner can not withdraw when it is refund"
        );
        uint256 amountToReturn = moneyCollected;
        require(
            amountToReturn > 0,
            "vipPaw: Nothing to return"
        );
        sender.transfer(amountToReturn);
        moneyCollected = 0;
    }

    function burnTokensToRefund(uint256 count) external
    {
        require(
            isClosedCrowdsale() == true,
            "vipPaw: Crowdsale is not closed"
        );
        require(
            isRefund() == true,
            "vipPaw: Can not refund"
        );
        address payable sender = _msgSender();
        uint256 len = balanceOf(sender);
        require(
            len > 0,
            "vipPaw: Need to have vip paw cards to refund"
        );

        uint256 amountToBurn;
        if (count == 0)
            amountToBurn = len;
        else
            amountToBurn = count;
        require(
            len >= count,
            "vipPaw: Does not have this much tokens"
        );

        uint256 amountToRefund;
        uint256 tokenId;
        for(uint256 ind = 0; ind < amountToBurn; ind = ind.add(1))
        {
            tokenId = tokenOfOwnerByIndex(sender, 0);

            _burn(tokenId);
        }

        amountToRefund = tokenPrice.mul(amountToBurn);
        moneyCollected = moneyCollected.sub(amountToRefund);

        sender.transfer(amountToRefund);
    }

    function isClosedCrowdsale() public view returns(bool)
    {
        if (now < openCrowdsaleTime)
            return true;
        else if (now < closeCrowdsaleTime)
        {
            if (lastTokenId >= maxSupply)
                return true;
            else
                return false;
        }
        else
            return true;
    }

    function isRefund() public view returns(bool)
    {
        if (now < openCrowdsaleTime)
            return false;
        else if (now < closeCrowdsaleTime)
        {
            require(
                lastTokenId >= maxSupply,
                "vipPaw: Crowdsale is not ended"
            );
            return false;
        }
        else
        {
            if (lastTokenId >= softCapInTokens)
                return false;
            else
                return true;
        }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override
    {
        if (from == address(0) || to == address(0))
            return;
        require(
            isOpenTransfers == true,
            "vipPaw: Transfers is not opened yet"
        );
    }
}