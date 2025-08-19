// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Magazine{

    struct magazine {
        uint magazineId;
        address marketAddress;
        string description;
        string ipfsHash;
    }

    magazine[] public magazinesList;
    mapping (address => magazine[]) marketMagazines;
    mapping (address => magazine[]) orgMagazines;

    event createdMagazine(uint magazineId, address marketAddress);

    function createMagazine(address _marketAddress, string memory _ipfsHash, string memory _description) public {
        uint magazineId = magazinesList.length;
        magazine memory newMagazine = magazine(magazineId, _marketAddress, _ipfsHash, _description);
        marketMagazines[_marketAddress].push(newMagazine);
        magazinesList.push(newMagazine);
        emit createdMagazine(magazineId, _marketAddress);
    }

    function getMarketMagazine(address _marketAddress) public view returns(magazine[] memory){
        return marketMagazines[_marketAddress];
    }

    function getMagazinesList() public view returns(magazine[] memory){
        return magazinesList;
    }

    function createOrgMagazine(address _orgAddress, string memory _ipfsHash, string memory _description) public {
        uint magazineId = magazinesList.length;
        magazine memory newMagazine = magazine(magazineId, _orgAddress, _ipfsHash, _description);
        orgMagazines[_orgAddress].push(newMagazine);
        magazinesList.push(newMagazine);
        emit createdMagazine(magazineId, _orgAddress);
    }

    function getOrgMagazine(address _orgAddress) public view returns(magazine[] memory){
        return orgMagazines[_orgAddress];
    }

}
