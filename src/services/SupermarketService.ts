import { Supermarket } from "../entities/Supermarket";
import {ethers} from 'ethers'
import { contractAddresses } from "../config/config";
import abi from '../config/SuperMarket.json'
import { Ad } from "../entities/Ad";
import { Magazine } from "../entities/Magazine";

export default class {

    async create(newMarket: Supermarket, window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        console.log(MarketContract)
        let marketTx = await MarketContract.createUserMarket(newMarket.nomeFantasia, newMarket.CNPJ, newMarket.Localizacao,{
            gasLimit: 300000
          });

        console.log(marketTx)
        const receipt = await provider.getTransactionReceipt(marketTx.hash);
        console.log(receipt)

        return marketTx;
    }

    async getMarket(marketAddress: string, window: any) {
        const { ethereum } = window;
        if (!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        try {
          const market = await MarketContract.getUserMarket(marketAddress);
          console.log(market[2]);
          return market;
        } catch (error) {
          console.log("Retornou erro do contrato:", error)
          if (error instanceof Error && error.message.includes("Market does not exist")) {
            return false;
          } else {
            throw error;
          }
        }
      }

    async createAd(newAd: Ad, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        console.log(newAd.tittle)
        const ad = await MarketContract.createAd(newAd.tittle, newAd.description, newAd.quantity, newAd.limQuantity, newAd.date, newAd.isOpen);
        console.log(ad.title)
        return ad;
    }

    async getAds(marketAddress: string ,window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const ads = await MarketContract.getMarketAds(marketAddress)
        return ads;
    }

    async getAdRegist(adId:number, window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const adRegist = await MarketContract.getAdRegistrations(adId)
        return adRegist;
    }

    async deleteAd(adId: number, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        await MarketContract.deleteAd(adId)
    }

    async createMag(newMag: Magazine, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const mag = await MarketContract.createMagazine(newMag.ipfsHash, newMag.description);
        return mag;
    }

    async getMagazines(window:any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const mags = await MarketContract.getMarketMagazines();
        return mags;
    }

    async updateAd(isOpen: boolean, adId: number, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const updatedAd = await MarketContract.updateAdStatus(adId, isOpen)
        return updatedAd;
    }

    async registerAdDonated(adId: number | undefined, orgAddress: string, window: any){
        const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const registerDonate = await MarketContract.registerAdDonated(adId, orgAddress)
        return registerDonate;
    }

    async getAdRecipients(adId: Ad, window: any){
      const {ethereum} = window;
        if(!ethereum) throw new Error("Ethereum does not exist.");
        const provider = new ethers.BrowserProvider(ethereum);
        const signer = await provider.getSigner();
        const MarketContract = new ethers.Contract(contractAddresses.marketContract, abi, signer);
        const adRecipients = await MarketContract.getAdRecipients(adId.adId)
        return adRecipients;
    }
}