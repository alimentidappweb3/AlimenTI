import { useEffect, useState } from 'react';
import './styles.css';
import DonationDetailsPopup from '../../pages/DonationDetails';
import CreateDonationPopup from '../../pages/CreateDonationPopup';
import DonationSubscribersPopup from '../../pages/DonationSubscribersPopup';
import { Ad } from '../../entities/Ad';
import SupermarketService from '../../services/SupermarketService';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DefaultButton from '../DefaultButton';

interface DonationCardProps {
  ad: Ad;
  userType: 'supermarket' | 'organization';
  text: string;
  onButtonClick: (ad: Ad) => void; // Adicionar a função como prop
}

const marketService = new SupermarketService();

function DonationCard({ ad, userType, text, onButtonClick }: DonationCardProps) {
  const [marketName, setMarketName] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    async function fetchMarketName() {
      try {
        const market = await marketService.getMarket(ad.marketAddress, window);
        const marketName = market[0]; // Assumindo que o nome do supermercado está no índice 0
        setMarketName(marketName);
      } catch (error) {
        console.error('Erro ao buscar o nome do supermercado:', error);
      }
    }

    fetchMarketName();
  }, [ad.marketAddress]);

  useEffect(() => {
    if (ad.date) {
      const parsedDate = parseISO(ad.date);
      const formatted = format(parsedDate, 'dd MMM yyyy', { locale: ptBR });
      setFormattedDate(formatted);
    }
  }, [ad.date]);

  return (
    <div className='donation-card'>
      <div className='donation-card-content'>
        <div className='card-header'>
          <div className='donation-title-status'>
            <p className='announcement-title'>{ad.tittle}</p>
            <p className='market-name-card'>{marketName}</p>
          </div>
          <div className='donation-container-status'>
            {userType === 'supermarket' ? (
              <p className='donation-status'>{ad.isOpen ? 'Aberta' : 'Fechada'}</p>
            ) : (
              <p className='donation-status'>{formattedDate}</p>
            )}
          </div>
        </div>
        <div className='card-content'>
          <p className='donation-description'>{ad.description}</p>
        </div>
        <div className='card-footer'>
          <DefaultButton onClick={() => onButtonClick(ad)}>{text}</DefaultButton> {/* Usa a função recebida */}
        </div>
      </div>
    </div>
  );
}

export default DonationCard;
