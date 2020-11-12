// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/access/AccessControl.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract PAW is ERC721, AccessControl
{
    using SafeMath for uint256;

    bytes32 public constant GAME_ROLE = keccak256("GAME_ROLE");
    modifier onlyGame {
        require(
            hasRole(GAME_ROLE, _msgSender()),
            "PAW: Caller is not a game role"
        );
        _;
    }
    modifier onlyAdmin {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()),
            "PAW: Caller is not a admin role"
        );
        _;
    }

    uint256 public gameEntrances;

    bool public isEndedPreSale;
    uint256 public tokenIdOfLastPreSaled;
    uint256 public tokenIdLast;

    uint256 public tokenPrice;
    uint256 internal priceStep;
    uint256 internal priceIncreaseNumerator;
    uint256 internal priceIncreaseDenominator;
    uint256 internal valueToDev;
    uint256 internal valueToGame;
    uint256 internal ethToGameNumerator;
    uint256 internal ethToGameDenominator;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _tokenPrice,
        uint256 _priceStep,
        uint256 _priceIncreaseNumerator,
        uint256 _priceIncreaseDenominator,
        uint256 _ethToGameNumerator,
        uint256 _ethToGameDenominator,
        address owner
    )
        public
        ERC721(_name, _symbol)
    {
        require(_priceStep != 0, "PAW: Wrong priceStep");
        require(_priceIncreaseNumerator <= _priceIncreaseDenominator, "PAW: Wrong inputs");
        require(_priceIncreaseDenominator != 0, "PAW: Wrong inputs");
        require(_ethToGameNumerator <= _ethToGameDenominator, "PAW: Wrong inputs");
        require(_ethToGameDenominator != 0, "PAW: Wrong inputs");
        require(owner != address(0), "PAW: Wrong owner");

        tokenPrice = _tokenPrice;
        priceStep = _priceStep;
        priceIncreaseNumerator = _priceIncreaseNumerator;
        priceIncreaseDenominator = _priceIncreaseDenominator;
        ethToGameNumerator = _ethToGameNumerator;
        ethToGameDenominator = _ethToGameDenominator;
        isEndedPreSale = false;
        _setupRole(DEFAULT_ADMIN_ROLE, owner);
    }

    function closePreSale() external onlyAdmin {
        require(isEndedPreSale == false, "PAW: Pre-sale is already closed");

        isEndedPreSale = true;
    }

    function mintForPreSale(uint256 count) external onlyAdmin {
        require(isEndedPreSale == false,  "PAW: Pre-sale is ended");
        require(count != 0, "PAW: count must be bigger than zero");

        for (uint256 i = 0; i < count; ++i)
        {
            _mint(_msgSender(), tokenIdOfLastPreSaled);
            tokenIdOfLastPreSaled = tokenIdOfLastPreSaled.add(1);
            tokenIdLast = tokenIdLast.add(1);
        }
    }

    function buyToken() external payable {
        require(isEndedPreSale == true,  "PAW: Pre-sale is not ended");
        require(msg.value == tokenPrice, "PAW: Value is not equal to token price");

        uint256 rawAmount = msg.value;
        // To game
        uint256 toGame = rawAmount.mul(ethToGameNumerator).div(ethToGameDenominator);
        valueToGame = valueToGame.add(toGame);
        // To dev
        valueToDev = valueToDev.add(rawAmount.sub(toGame));

        _mint(_msgSender(), tokenIdLast);
        tokenIdLast = tokenIdLast.add(1);
    }

    function increaseGameEntrances() external onlyGame {
        gameEntrances = gameEntrances.add(1);
        if (gameEntrances.mod(priceStep) == 0)
            tokenPrice = tokenPrice.mul(priceIncreaseNumerator)
                                   .div(priceIncreaseDenominator);
    }

    function withdrawGame() external onlyGame {
        require(valueToGame != 0, "TMP: Nothing to withdraw");

        _msgSender().transfer(valueToGame);
        valueToGame = 0;
    }

    function withdrawDev() external onlyAdmin {
        require(valueToDev != 0, "TMP: Nothing to withdraw");

        _msgSender().transfer(valueToDev);
        valueToDev = 0;
    }
}