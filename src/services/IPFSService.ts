// IPFSService.js
import axios from 'axios';

const pinataApiKey = 'c05dcf72fe4f53c1d622';
const pinataSecretApiKey = '2903be26a66acfe603343e601f1b242dabc295a657392dc68e953f5aafb62b77';

export default class IPFSService {
  async uploadToIpfs(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });

      console.log(response.data);
      return response.data.IpfsHash;
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw error;
    }
  }
}
