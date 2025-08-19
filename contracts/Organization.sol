// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./AdsManager.sol";
import "./Magazine.sol";

contract Organization {
    
    struct organization{
        uint id;
        string nomeFantasia;
        uint CNPJ;
        address orgAddress;
    }

    AdsManager public adsManager;
    Magazine public magazine;

    constructor(AdsManager _adsManager, Magazine _magazine) {
        adsManager = _adsManager;
        magazine = _magazine;
    }

    mapping(address => organization) userOrganization;
    
    uint public orgCount;

    event userOrgCreated(uint id, string nomeFantasia, uint CNPJ, address orgAddress);

    function createUserOrg(string memory _nomeFantasia, uint _CNPJ) public {
        require(userOrganization[msg.sender].orgAddress == address(0), "Address already registered");
        orgCount++;
        userOrganization[msg.sender] = organization(orgCount, _nomeFantasia, _CNPJ, msg.sender);
        emit userOrgCreated(orgCount, _nomeFantasia, _CNPJ, msg.sender);
    }

    function getUserOrg(address _orgAddress) public view returns (organization memory){
        require(userOrganization[_orgAddress].orgAddress != address(0), "Organization does not exist");
        organization memory userOrg = userOrganization[_orgAddress];
        return (userOrg);
    }

    function getAllAds() public view returns(AdsManager.Ad[] memory){
        return adsManager.getAdsList();
    }

    function registerForAd(uint _adId) public {
        require(userOrganization[msg.sender].orgAddress != address(0), "Organization does not exist");
        adsManager.registerForAd(_adId, msg.sender);
    }

    function getAllOrgAds() public view returns (uint[] memory){
        return adsManager.getOrgAds(msg.sender);
    }

    function getAllOrgAdsDetails() public view returns (AdsManager.Ad[] memory) {
        return adsManager.getOrgAdsDetails(msg.sender);
    }

    function createOrgMagazine(string memory _ipfsHash, string memory _description) public {
        require(userOrganization[msg.sender].orgAddress != address(0), "Organization does not exist");
        magazine.createOrgMagazine(msg.sender, _ipfsHash, _description);
    }

    function getAllMagazines() public view returns (Magazine.magazine[] memory) {
        return magazine.getMagazinesList();
    }

    function getOrgMagazines() public view returns (Magazine.magazine[] memory){
        return magazine.getOrgMagazine(msg.sender);
    }

    function registerDonationRecipient(uint _adId, string memory _name, string memory _documentId) public {
        require(userOrganization[msg.sender].orgAddress != address(0), "Organization does not exist");
        adsManager.registerRecipient(_adId, _name, _documentId, msg.sender);
    }

    function getOrgRecipients () public view returns (AdsManager.Recipient[] memory) {
        require(userOrganization[msg.sender].orgAddress != address(0), "Organization does not exist");
        return adsManager.getOrgRecipients(msg.sender);
    }

}