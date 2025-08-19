import { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../components/Header';
import DonationCard from '../../components/DonationCard';
import SearchInput from '../../components/SeachInput';
import FilterInput from '../../components/FilterInput';
import OrganizationService from '../../services/OrganizationService';
import EmptyState from '../../components/EmptyState';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdsManagerService from '../../services/AdsManagerService';
import { Organization } from '../../entities/Organization';
import { Ad } from '../../entities/Ad';
import CreateDonationPopup from '../CreateDonationPopup';
import DonationDetailsPopup from '../DonationDetails';
import CreateRemovalPopup from '../CreateRemovalPopup';

declare let window: any;

function OrgHome() {
  const [donations, setDonations] = useState<Ad[]>([]);
  const [orgAds, setOrgAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [orgName, setOrgName] = useState('');
  const [donationStatusMap, setDonationStatusMap] = useState<{ [key: number]: boolean }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<JSX.Element | null>(null);


  const user = sessionStorage.getItem("user_id");

  useEffect(() => {
    async function fetchDonations() {
      try {
        if (user) {
          const orgService = new OrganizationService();
          const organization: Organization | false | undefined = await orgService.getOrg(user, window);
          console.log("Organização:", organization);

          if (organization && organization.id) {
            console.log("Entrou");
            setOrgName(organization.nomeFantasia);
            const ads = await orgService.getAllAds(window);
            const openAds = ads.filter((ad: any) => ad.isOpen); // Filtrar apenas as doações abertas
            const orgAds = await orgService.getOrgAds(window);
            setDonations(openAds); // Usar apenas as doações abertas
            setOrgAds(orgAds);
            setFilteredAds(openAds); // Inicialmente exibir todas as doações abertas

            // Verificar status de doação para todos os anúncios
            const statusMap: { [key: number]: boolean } = {};
            await Promise.all(
              openAds.map(async (ad: any) => {
                const isDonated = await checkDonationStatus(ad.adId);
                statusMap[ad.adId] = isDonated;
              })
            );
            setDonationStatusMap(statusMap);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar doações:', error);
      }
    }

    fetchDonations();
  }, []);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  async function checkDonationStatus(adId: number | undefined): Promise<boolean> {
    try {
      if (user) {
        const adsManager = new AdsManagerService();
        return await adsManager.checkDonationStatus(window, adId, user);
      }
    } catch (error) {
      console.error('Erro ao verificar status da doação:', error);
      return false;
    }
    return false;
  }

  const handleDonationClick = (ad: Ad) => {
    const isDonated = ad.adId !== undefined && donationStatusMap[ad.adId];
  
    setIsPopupOpen(true);
    setCurrentPopup(
      isDonated ? (
        <CreateRemovalPopup ad={ad} onClose={handleClosePopup} />
      ) : (
        <DonationDetailsPopup ad={ad} onClose={handleClosePopup} />
      )
    );
  };
  

  useEffect(() => {
    async function filterAds() {
      let filtered = donations;

      if (filter === 'subscribed') {
        filtered = donations.filter(ad =>
          orgAds.some(orgAd => orgAd.adId === ad.adId)
        );
      } else if (filter === 'donated') {
        // Filtrar com base no status de doação
        filtered = donations.filter(ad => ad.adId !== undefined && donationStatusMap[ad.adId]);
      }

      filtered = filtered.filter(ad =>
        ad.tittle.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredAds(filtered);
    }

    filterAds();
  }, [filter, searchTerm, donations, orgAds, donationStatusMap]);

  return (
    <div>
      <Header userType='organization' userName={orgName}></Header>
      <ToastContainer />
      <div className='page-container'>
        <div className='header-section'>
          <div className='welcome-section'>
            <h2>Bem vindo ao AlimenTI!</h2>
            <h3>Doações</h3>
          </div>

          <div className='up-section'>
            <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <FilterInput userType='organization' screenType='donations' value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
        </div>
        <div
          className='cards-section'
          style={{
            justifyContent: filteredAds.length > 0 ? 'flex-start' : 'center',
          }}
        >
          {filteredAds.length > 0 ? (
  filteredAds.map(ad => {
    const isDonated = ad.adId !== undefined && donationStatusMap[ad.adId]; // Verificação de ad.adId

    return (
      <DonationCard
        key={ad.adId}
        ad={ad}
        userType='organization'
        text={isDonated ? 'Registrar retirada' : 'Ver detalhes'}
        onButtonClick={handleDonationClick}
      />
    );
  })
) : (
  <EmptyState message="Ainda não há doações cadastradas." />
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

export default OrgHome;
