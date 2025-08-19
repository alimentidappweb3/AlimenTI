import { useEffect, useState } from 'react';
import './styles.css';
import SupermarketService from '../../services/SupermarketService';
import OrganizationService from '../../services/OrganizationService';
import { Magazine } from '../../entities/Magazine';
import MagImageCard from './../../components/MagImageCard';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';
import Popup from '../../pages/MagPopup'; // Import Popup component

const marketService = new SupermarketService();

function OrgsMagazinePage() {
    const [marketNames, setMarketNames] = useState<{ [address: string]: string }>({});
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null); // State to handle the selected magazine for the popup
    const [orgName, setOrgName] = useState('')

    async function fetchMagazines() {
        try {
            const user = sessionStorage.getItem("user_id");
            if (user) {
                const orgService = new OrganizationService();
                const organization = await orgService.getOrg(user, window);
                console.log("Organização:", organization);

                if (organization && organization.id) {
                    setOrgName(organization.nomeFantasia)
                    console.log("Entrou");
                    const orgMags = await orgService.getAllMags(window);
                    console.log(orgMags);
                    setMagazines(orgMags);

                    // Fetch market names for each magazine
                    const marketNamesTemp: { [address: string]: string } = {};
                    for (const mag of orgMags) {
                        const market = await marketService.getMarket(mag.marketAddress, window);
                        marketNamesTemp[mag.marketAddress] = market[0]; // Assuming market[0] is the market name
                    }
                    setMarketNames(marketNamesTemp);
                }
            }
        } catch (error) {
            console.error('Erro ao buscar doações:', error);
        }
    }

    useEffect(() => {
        fetchMagazines();
    }, []);

    const handleCardClick = (magazine: Magazine) => {
        setSelectedMagazine(magazine);
    };

    const closePopup = () => {
        setSelectedMagazine(null);
    };

    return (
        <div>
            <Header userType='organization' userName={orgName}></Header>
            <div className='page-container'>
                <div className='header-section'>
                    <div className='welcome-section'>
                        <h2>Supermercados Parceiros</h2>
                        <h3>Conheça nossos supermercados parceiros. Eles fazem tudo acontecer!</h3>
                    </div>
                    <div className='search-section'>
                        <div className='inputs-container'>
                        </div>
                    </div>
                </div>
                <div
                    className='cards-section'
                    style={{
                        justifyContent: magazines.length > 0 ? 'flex-start' : 'center',
                    }}
                >
                    {magazines.length > 0 ? (
                        magazines.map((mag, index) => (
                            <MagImageCard
                                key={index}
                                marketName={marketNames[mag.marketAddress]}
                                ipfsHash={mag.description}
                                description={mag.ipfsHash}
                                onClick={() => handleCardClick(mag)}
                            />
                        ))
                    ) : (
                        <EmptyState message="Ainda não há anúncios postados." />
                    )}
                </div>
            </div>
            {selectedMagazine && (
                <Popup
                    ipfsHash={selectedMagazine.description}
                    description={selectedMagazine.ipfsHash}
                    marketName={marketNames[selectedMagazine.marketAddress]}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}

export default OrgsMagazinePage;
