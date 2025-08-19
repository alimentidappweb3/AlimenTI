// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AdsManager {

    struct Ad {
        uint adId;
        string tittle;
        string description;
        uint quantity;
        uint limQuantity;
        string date;
        bool isOpen;
        string localization;
        address marketAddress;
        uint orgsDonated;
    }

    struct Recipient {
        uint id;
        string name;
        string CPF;
        address orgAddress;
    }

    

    Ad[] public adsList;
    mapping(address => Ad[]) public marketAds; // mapping Market Ads
    mapping(uint => address[]) public adRegistrations; // Mapping to store registrations
    mapping(address => uint[]) public organizationAds; // Mapping to organization Ads
    mapping(uint => Ad) public singleAd; // Mapping to get a single Ad
    mapping(uint => mapping(address => bool)) public adRegistrationStatus;
    mapping(uint => Recipient[]) public adRecipients;
    mapping(address => Recipient[]) public orgRecipients;
    mapping(address => Ad[]) public donatedAds;
    mapping(uint => mapping(address => bool)) public donationReceived; // Registro de retirada da doação
    

    uint public adCount;

    event AdCreated(uint adId, address marketAddress);
    event OrganizationRegistered(uint adId, address orgAddress);
    event AdDeleted(uint adId);
    event AdStatusUpdated(uint adId, bool isOpen);
    event AdDonated(uint adId, address orgAddress);
    event DonationReceived(uint adId, address orgAddress, string recipientName, string recipientDocumentId);

    function createAd(address marketAddress, string memory _tittle, string memory _description, uint _quantity, uint _limQuantity, string memory _date, bool _isOpen, string memory _localization) public {
        uint adId = adsList.length;
        Ad memory newAd = Ad(adId, _tittle, _description, _quantity, _limQuantity, _date, _isOpen, _localization, marketAddress, 0);
        marketAds[marketAddress].push(newAd);
        adsList.push(newAd);
        emit AdCreated(adId, marketAddress);
    }

    function getMarketAds(address _marketAddress) public view returns (Ad[] memory) {
        return marketAds[_marketAddress];
    }

    function getAdsList() public view returns(Ad[] memory) {
        return adsList;
    }

   function registerForAd(uint _adId, address _orgAddress) public {
        require(_adId < adsList.length, "Invalid Ad ID");
        require(!adRegistrationStatus[_adId][_orgAddress], "Organization already registered for this ad");

        Ad storage ad = adsList[_adId];
        require(adRegistrations[_adId].length < ad.limQuantity, "Registration limit reached for this ad");

        adRegistrations[_adId].push(_orgAddress);
        organizationAds[_orgAddress].push(_adId);
        adRegistrationStatus[_adId][_orgAddress] = true;
        emit OrganizationRegistered(_adId, _orgAddress);
    }


    function getAdRegistrations(uint _adId) public view returns (address[] memory) {
        require(_adId < adsList.length, "Invalid Ad ID");
        return adRegistrations[_adId];
    }

    function getOrgAds(address _orgAddress) public view returns(uint[] memory) {
        return organizationAds[_orgAddress];
    }

    function getAd(uint _adId) public view returns(Ad memory) {
        require(_adId < adsList.length, "Invalid Ad ID");
        return singleAd[_adId];
    }

    function getOrgAdsDetails(address _orgAddress) public view returns (Ad[] memory) {
        uint[] memory adIds = organizationAds[_orgAddress];
        Ad[] memory ads = new Ad[](adIds.length);
        for (uint i = 0; i < adIds.length; i++) {
            ads[i] = adsList[adIds[i]];
        }
        return ads;
    }

    function deleteAd(address _marketAddress, uint _adId) public  {
        require(_adId < adsList.length, "Invalid Ad ID");
        require(adsList[_adId].marketAddress != msg.sender, "Not authorized");

        // Remove ad from marketAds mapping
        for (uint i = 0; i < marketAds[_marketAddress].length; i++) {
            if (marketAds[_marketAddress][i].adId == _adId) {
                marketAds[_marketAddress][i] = marketAds[_marketAddress][marketAds[_marketAddress].length - 1];
                marketAds[_marketAddress].pop();
                break;
            }
        }

        // Remove ad from adsList array
        adsList[_adId] = adsList[adsList.length - 1];
        adsList.pop();

        address[] storage orgs = adRegistrations[_adId];
        for (uint i = 0; i < orgs.length; i++) {
            address orgAddress = orgs[i];
            for (uint j = 0; j < organizationAds[orgAddress].length; j++) {
                if (organizationAds[orgAddress][j] == _adId) {
                    organizationAds[orgAddress][j] = organizationAds[orgAddress][organizationAds[orgAddress].length - 1];
                    organizationAds[orgAddress].pop();
                    break;
                }
            }
        }
        delete adRegistrations[_adId];

        emit AdDeleted(_adId);
    }

    function updateAdStatus(address _marketAddress, uint _adId, bool _isOpen) public {
        require(_adId < adsList.length, "Invalid Ad ID");
        require(adsList[_adId].marketAddress != msg.sender, "Not authorized");

        // Update the ad in adsList
        adsList[_adId].isOpen = _isOpen;

        // Update the ad in marketAds mapping
        for (uint i = 0; i < marketAds[_marketAddress].length; i++) {
            if (marketAds[_marketAddress][i].adId == _adId) {
                marketAds[_marketAddress][i].isOpen = _isOpen;
                break;
            }
        }

        emit AdStatusUpdated(_adId, _isOpen);
    }

    function confirmDonation(uint _adId, address _orgAddress) public {
        require(_adId < adsList.length, "Invalid Ad ID");
        require(adRegistrationStatus[_adId][_orgAddress], "Organization is not registered for this ad");
        require(!donationReceived[_adId][_orgAddress], "Organization has already received the donation");

        Ad storage ad = adsList[_adId];
        require(ad.orgsDonated < ad.limQuantity, "All donations have been collected");

        donationReceived[_adId][_orgAddress] = true; // Marca como recebido
        ad.orgsDonated++; // Incrementa o número de doações feitas
        donatedAds[_orgAddress].push(ad); // Armazena o anúncio na lista de doações da organização

        emit AdDonated(_adId, _orgAddress);
    }

    function registerRecipient(uint _adId, string memory _name, string memory _documentId, address _orgAddress) public {
        require(donationReceived[_adId][_orgAddress] == true, "Organization does not received the donation");

        uint recipientId = adRecipients[_adId].length;
        Recipient memory newRecipient = Recipient(recipientId, _name, _documentId, _orgAddress);
        adRecipients[_adId].push(newRecipient);
        orgRecipients[_orgAddress].push(newRecipient);

        emit DonationReceived(_adId, msg.sender, _name, _documentId);
    }

    function getAdRecipients(uint _adId) public view returns (Recipient[] memory) {
        return adRecipients[_adId];
    }

    function getOrgRecipients(address _orgAddress) public view returns (Recipient[] memory) {
        return orgRecipients[_orgAddress];
    }

    function checkDonationStatus(uint _adId, address _orgAddress) public view returns (bool) {
    return donationReceived[_adId][_orgAddress];
   }
   }
