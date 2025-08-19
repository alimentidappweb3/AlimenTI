import { Ad } from "../entities/Ad";
import {ethers} from 'ethers'
import { contractAddresses } from "../config/config";
import abi from "../config/AdsManager.json"

export default class {

    async getAds(window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const AdsContract = new ethers.Contract(contractAddresses.adsContract, abi, signer);
        const Ads = await AdsContract.getAdsList();
        return Ads;
    }

    async checkDonationStatus(window: any, adId: number | undefined, orgAddress: string) {
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const AdsContract = new ethers.Contract(contractAddresses.adsContract, abi, signer);
        console.log(AdsContract)
        const status = await AdsContract.checkDonationStatus(adId, orgAddress);
        return status;
    }
}