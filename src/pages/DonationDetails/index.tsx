import React, { useEffect, useState } from 'react';
import './styles.css';
import { Ad } from '../../entities/Ad';
import SupermarketService from '../../services/SupermarketService';
import OrganizationService from '../../services/OrganizationService';
import { toast } from 'react-toastify';
import DefaultButton from '../../components/DefaultButton';

interface DonationDetailProps {
    ad: Ad;
    onClose: () => void;
}

function DonationDetailsPopup({ ad, onClose }: DonationDetailProps) {
    const [supermarketName, setSupermarketName] = useState<string>('');
  const supermarketService = new SupermarketService();
  const organizationService = new OrganizationService();

  useEffect(() => {
    const fetchSupermarketName = async () => {
      try {
        const market = await supermarketService.getMarket(ad.marketAddress, window);
        setSupermarketName(market[0]);
      } catch (error) {
        console.error("Erro ao buscar o nome do supermercado:", error);
      }
    };

    fetchSupermarketName();
  }, [ad.marketAddress]);
  

  const handleSubscribe = async () => {
    console.log("entrou:", ad.adId)
    try {
        if(ad.adId){
            console.log("ad existe")
            await organizationService.registerAd(ad.adId, window);
            console.log("cadastrou")
            toast.success("Inscrição realizada com sucesso!")
        }
      
    } catch (error) {
      console.error("Erro ao se inscrever na doação:", error);
      toast.error("Erro ao se inscrever na doação.");
    }
  };


    return (
        <div className='popup-overlay-details'>
            <div className='popup-container-details'>
                <div className='popup-header-details'>
                    <span className='close-button' onClick={onClose}>&times;</span>
                    <h2>{ad.tittle}</h2>
                </div>
                <div className='popup-content-details'>
                    <p><strong>Doador: </strong>{supermarketName}</p>
                    <strong>Descrição:</strong>
                    <p>{ad.description}</p>
                    <p><strong>Localização: </strong>{ad.localization}</p>
                    <p><strong>Data: </strong>{ad.date}</p>
                    <DefaultButton onClick={handleSubscribe}>Inscrever-se</DefaultButton>
                  </div>
                
                    
            </div>
        </div>
    );
};

export default DonationDetailsPopup;
