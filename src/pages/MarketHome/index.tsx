import { useEffect, useState } from 'react';
import "./../../main";
import './styles.css';
import Header from '../../components/Header';
import DonationCard from '../../components/DonationCard';
import AddButton from '../../components/AddButton';
import SearchInput from '../../components/SeachInput';
import FilterInput from '../../components/FilterInput';
import SupermarketService from '../../services/SupermarketService';
import { Ad } from '../../entities/Ad';
import EmptyState from '../../components/EmptyState';
import { ToastContainer } from 'react-toastify';
import CreateDonationPopup from '../CreateDonationPopup';
import DonationDetailsPopup from '../DonationDetails';
import DonationSubscribersPopup from '../DonationSubscribersPopup';

declare let window: any;

function MarketHome() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [marketId, setMarketId] = useState<number | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loggedUser, setLoggedUser] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [marketName, setMarketName] = useState('')

  const fetchAds = async (user: string) => {
    const supermarketService = new SupermarketService();
    const ads = await supermarketService.getAds(user, window);
    setAds(ads);
    setFilteredAds(ads);
  };
  const [currentPopup, setCurrentPopup] = useState<JSX.Element | null>(null);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDonationClick = (ad: Ad) => {
      setIsPopupOpen(true);
      setCurrentPopup(<DonationSubscribersPopup ad={ad} onClose={handleClosePopup} />);
  };

  useEffect(() => {
    const user = sessionStorage.getItem("user_id");
    if (user) {
      setLoggedUser(user);
      const getMarket = async () => {
        const supermarketService = new SupermarketService();
        const market = await supermarketService.getMarket(user, window);
        if (market) {
          setMarketId(market.id);
          fetchAds(user);
          setMarketName(market.nomeFantasia)
        }
      };
      getMarket();
    }
  }, []);

  useEffect(() => {
    let filtered = ads;

    if (searchTerm) {
      filtered = filtered.filter(ad =>
        ad.tittle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      const isOpen = statusFilter === 'open';
      filtered = filtered.filter(ad => ad.isOpen === isOpen);
    }

    setFilteredAds(filtered);
  }, [searchTerm, statusFilter, ads]);

  return (
    <div>
      <Header userType='supermarket' userName={marketName}></Header>
      <ToastContainer/>
      <div className='page-container'>
        <div className='header-section'>
          <div className='welcome-section'>
            <h2>Bem vindo ao AlimenTI, {marketName}!</h2>
            <h3>Minhas doações</h3>
          </div>

          <div className='search-section'>
            <div className='inputs-container'>
              <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <FilterInput userType='supermarket' screenType='donations' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
            </div>
            <AddButton text='Criar doação' onAdd={() => loggedUser && fetchAds(loggedUser)} />
          </div>
        </div>
        <div
          className='cards-section'
          style={{
            justifyContent: filteredAds.length > 0 ? 'flex-start' : 'center',
          }}
        >
          {filteredAds.length > 0 ? (
            filteredAds.map(ad => (
              <DonationCard key={ad.adId} ad={ad} userType='supermarket' text='Ver detalhes' onButtonClick={handleDonationClick} />
            ))
          ) : (
            <EmptyState message="Você ainda não possui doações cadastradas." />
          )}
        </div>
         {/* Render the popup only if isPopupOpen is true */}
      {isPopupOpen && (
        <div className="popup-wrapper">
          {currentPopup}
        </div>
      )}
      </div>
    </div>
  );
}

export default MarketHome;
