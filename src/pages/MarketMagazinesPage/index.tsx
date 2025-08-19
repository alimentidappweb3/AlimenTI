import { useEffect, useState } from 'react';
import './styles.css';
import SupermarketService from '../../services/SupermarketService';
import { Magazine } from '../../entities/Magazine';
import MagImageCard from './../../components/MagImageCard';
import Header from '../../components/Header';
import AddButton from '../../components/AddButton';
import SearchInput from '../../components/SeachInput';
import FilterInput from '../../components/FilterInput';
import EmptyState from '../../components/EmptyState';
import Popup from '../../pages/MagPopup'; // Import Popup component
import { ToastContainer } from 'react-toastify';

const marketService = new SupermarketService();

function MarketMagazines() {
    const [marketName, setMarketName] = useState('');
    const [magazines, setMagazines] = useState<Magazine[]>([]);
    const [marketAddress, setMarketAddress] = useState('');
    const [selectedMagazine, setSelectedMagazine] = useState<Magazine | null>(null); // State to handle the selected magazine for the popup
    const [filter, setFilter] = useState('all'); // State for filter
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    async function fetchMarketData() {
        try {
            const user = sessionStorage.getItem("user_id");
            if (user) {
                const market = await marketService.getMarket(user, window);
                const marketName = market[0];
                setMarketAddress(user);
                setMarketName(marketName);

                const magazines = await marketService.getMagazines(window);
                setMagazines(magazines);
                console.log("cada hash:", magazines.map((mag: any) => (mag.description)));
            }
        } catch (error) {
            console.error('Erro ao buscar os dados do supermercado:', error);
        }
    }

    useEffect(() => {
        fetchMarketData();
    }, [marketAddress]);

    const handleCardClick = (magazine: Magazine) => {
        setSelectedMagazine(magazine);
    };

    const closePopup = () => {
        setSelectedMagazine(null);
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredMagazines = magazines.filter(mag => {
        if (filter === 'all') return true;
        if (filter === 'open') return mag.status === 'open'; // Example condition
        if (filter === 'closed') return mag.status === 'closed'; // Example condition
        return true;
    }).filter(mag => mag.description.toLowerCase().includes(searchTerm.toLowerCase())); // Search based on description

    return (
        <div>
            <Header userType='supermarket' userName={marketName}></Header>
            <ToastContainer/>
            <div className='page-container'>
                <div className='header-section'>
                    <div className='welcome-section'>
                        <h2>Anúncios</h2>
                        <h3>Publique seus anúncios aqui</h3>
                    </div>
                    <div className='search-section'>
                        <div className='inputs-container'>
                            <SearchInput value={searchTerm} onChange={handleSearchChange} />
                            <FilterInput value={filter} onChange={handleFilterChange} userType='supermarket' screenType='announcements' />
                        </div>
                        <AddButton text='Criar anúncio' onAdd={() => fetchMarketData()} />
                    </div>
                </div>
                <div
                    className='mags-section'
                    style={{
                        justifyContent: filteredMagazines.length > 0 ? 'flex-start' : 'center',
                    }}
                >
                    {filteredMagazines.length > 0 ? (
                        filteredMagazines.map((mag, index) => (
                            <MagImageCard
                                key={index}
                                marketName={marketName}
                                ipfsHash={mag.description}
                                description={mag.ipfsHash}
                                onClick={() => handleCardClick(mag)}
                            />
                        ))
                    ) : (
                        <EmptyState message="Você ainda não possui anúncios cadastrados." />
                    )}
                </div>
            </div>
            {selectedMagazine && (
                <Popup
                    ipfsHash={selectedMagazine.description}
                    description={selectedMagazine.ipfsHash}
                    marketName={marketName}
                    onClose={closePopup}
                />
            )}
        </div>
    );
}

export default MarketMagazines;
