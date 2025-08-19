// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./AdsManager.sol";
import "./Magazine.sol";

contract SuperMarket {

    struct superMarket {
        string nomeFantasia;
        uint CNPJ;
        string Localizacao;
        address marketAddress;
        uint id; 
    }

    AdsManager public adsManager;
    Magazine public magazine;

    constructor(AdsManager _adsManager, Magazine _magazine) {
        adsManager = _adsManager;
        magazine = _magazine;
    }

    mapping(address => superMarket) public userSuperMarkets;
    
    uint public marketCount;

    event userMarketCreated(string nomeFantasia, uint CNPJ, address marketAddress, uint id);
    event userMarketDeleted(uint id);

    function createUserMarket(string memory _nomeFantasia, uint _CNPJ, string memory _Localizacao) public {
        require(userSuperMarkets[msg.sender].marketAddress == address(0), "Address already registered");
        marketCount++;
        userSuperMarkets[msg.sender] = superMarket(_nomeFantasia, _CNPJ, _Localizacao, msg.sender, marketCount);
        emit userMarketCreated(_nomeFantasia, _CNPJ, msg.sender, marketCount);
    }

    function getUserMarket(address _marketAddress) public view returns (superMarket memory){
        require(userSuperMarkets[_marketAddress].marketAddress != address(0), "Market does not exist");
        superMarket memory userMarket = userSuperMarkets[_marketAddress];
        return (userMarket);
    }

   function createAd(string memory _tittle, string memory _description, uint _quantity, uint _limQuantity, string memory _date, bool _isOpen) public {
    require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
    adsManager.createAd(msg.sender, _tittle, _description, _quantity, _limQuantity, _date, _isOpen, userSuperMarkets[msg.sender].Localizacao);
   }

   function getMarketAds(address marketAddress) public view returns (AdsManager.Ad[] memory){
    require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
    return adsManager.getMarketAds(marketAddress);
   }

   function getAdRegistrations(uint adId) public view returns (address[] memory) {
        return adsManager.getAdRegistrations(adId);
    }

    function deleteAd(uint _adId) public {
        adsManager.deleteAd(msg.sender,_adId);
    }

    function createMagazine(string memory _ipfsHash, string memory _description) public{
        require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
        magazine.createMagazine(msg.sender, _ipfsHash, _description);
    }

    function getMarketMagazines() public view returns (Magazine.magazine[] memory){
        require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
        return magazine.getMarketMagazine(msg.sender);
    }

    function updateAdStatus(uint _adId,bool _isOpen) public {
        require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
        adsManager.updateAdStatus(msg.sender, _adId, _isOpen);
    }

    function registerAdDonated(uint _adId, address _orgAddress) public {
        require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
        adsManager.confirmDonation(_adId, _orgAddress);
    }

    function getAdRecipients(uint _adId) public view returns (AdsManager.Recipient [] memory) {
        require(userSuperMarkets[msg.sender].marketAddress != address(0), "Market does not exist");
        return adsManager.getAdRecipients(_adId);
    }

 }