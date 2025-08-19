import { contractAddresses } from "../config/config";

export default class LoginService {

    async login (window: any): Promise<string | undefined> {
        try {
			const { ethereum } = window;
			console.log(`Window é ${ethereum}`);

			if (!ethereum) {
				console.log("Metamask not detected");
				return;
			}

			const chainId = await ethereum.request({ method: 'eth_chainId' });
			console.log(chainId)
			
			const bearChainId = '0x4f8e'; 

			if (chainId !== bearChainId) {
				alert("You are not connected to Build Bear network");
				return;
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

			return accounts[0];

		} catch (error) {
			console.log("Error connecting to Metamask:", error);
		}

    }
}