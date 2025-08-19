import { Ad } from "../entities/Ad";
import {ethers} from 'ethers'
import { contractAddresses } from "../config/config";
import abi from "../config/Organization.json"
import { Organization } from "../entities/Organization";
import { Recipient } from "../entities/Recipient";

export default class {

    async create(newOrg: Organization, window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const Org = await Orgontract.createUserOrg(newOrg.nomeFantasia, newOrg.CNPJ)
        return Org;
    }

    async getOrg(orgAddress: string, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);

        try {
            const Org = await Orgontract.getUserOrg(orgAddress)
            return Org;
            
        } catch (error) {
            if (error instanceof Error && error.message.includes("Organization does not exist")) {
                return false;
            } else {
                throw error;
            }
        }
        
    }

    async getAllAds(window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const ads = await Orgontract.getAllAds();
        console.log("Ads aqui:",ads)
        return ads;
    }

    async registerAd(adId: number, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const ads = await Orgontract.registerForAd(adId)
        return ads;
    }

    async getOrgAds(window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const ads = await Orgontract.getAllOrgAdsDetails()
        return ads;
    }

    async getAllMags(window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const mags = await Orgontract.getAllMagazines()
        return mags;
    }

    async registerDonationRecipient(newRecipient: Recipient, window: any) {
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const donationsRecipient = await Orgontract.registerDonationRecipient(newRecipient.adId, newRecipient.name, newRecipient.Cpf)
        return donationsRecipient;
    }

    async getOrgRecipients(window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const Orgontract = new ethers.Contract(contractAddresses.organizationAddress, abi, signer);
        const donationsRecipient = await Orgontract.getOrgRecipients()
        return donationsRecipient;
    }
    
}