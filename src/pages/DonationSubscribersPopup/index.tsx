import React, { useEffect, useState } from 'react';
import './styles.css';
import { Ad } from '../../entities/Ad';
import MarketService from '../../services/SupermarketService';
import OrganizationService from '../../services/OrganizationService';
import EmptyState from '../../components/EmptyState';
import { toast } from 'react-toastify';
import AdsManagerService from '../../services/AdsManagerService';
import CancelButton from '../../components/CancelButton';
import RedButton from '../../components/RedButton';
import Drawer from '@mui/material/Drawer';
import RemovalTrack from '../../components/RemovalTrack';
import { RegisterRemovalButton, WarnRemovalText,  } from '../../components/RegisterRemovalButton';

interface DonationSubProps {
    ad: Ad;
    onClose: () => void;
}

const marketService = new MarketService();
const organizationService = new OrganizationService();
const adsManager = new AdsManagerService();

function DonationSubscribersPopup({ ad, onClose }: DonationSubProps) {
    const [organizations, setOrganizations] = useState<{ name: string, address: string, donationStatus: boolean }[]>([]);
    const [marketLocation, setMarketLocation] = useState<string>('');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar o Drawer
    const [selectedOrganization, setSelectedOrganization] = useState<{ name: string, address: string, donationStatus: boolean } | null>(null); // Estado para armazenar a organização selecionada
    
    useEffect(() => {
        async function fetchOrganizations() {
            try {
                if (ad.adId) {
                    const adRegistrations = await marketService.getAdRegist(ad.adId, window);
                    const organizationPromises = adRegistrations.map(async (reg: any) => {
                        const organization = await organizationService.getOrg(reg, window);
                        const name = organization[1];
                        const address = organization[3];
                        const donationStatus = await adsManager.checkDonationStatus(window, ad.adId, address);
                        return { name, address, donationStatus };
                    });
                    const organizationsInfo = await Promise.all(organizationPromises);
                    setOrganizations(organizationsInfo);

                    const market = await marketService.getMarket(ad.marketAddress, window);
                    if (market && market[2]) {
                        console.log(market)
                        setMarketLocation(market[2]);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar organizações inscritas:', error);
            }
        }

        fetchOrganizations();
    }, [ad.adId]);

    async function finishDonation() {
        if (ad.adId) {
            await marketService.updateAd(false, ad.adId, window);
            toast.success("Doação finalizada com sucesso!");
        }
    }

    const handleRemovalClick = async (adId: number | undefined, orgAddress: string) => {
        await marketService.registerAdDonated(adId, orgAddress, window);
        toast.success("Doação feita com sucesso!");
    };

    const handleDrawerOpen = (org: { name: string, address: string, donationStatus: boolean }) => {
        setSelectedOrganization(org); // Armazena a organização selecionada
        setIsDrawerOpen(true); // Abre o Drawer
    };

    return (
        <div className='popup-overlay'>
            <div className='popup-container'>
                <div className='popup-header'>
                    <span className='close-button' onClick={onClose}>&times;</span>
                    <h2>{ad.tittle}</h2>
                </div>
                <div className='popup-content'>
                    <div className='popup-content-header'>
                        <div className='popup-description-container'>
                            <strong>Descrição:</strong>
                            <p className='popup-description'>{ad.description}</p>
                        </div>
                        <div className='popup-location-date'>
                            <p><strong>Localização: </strong>{marketLocation}</p>
                            <p><strong>Data: </strong>{ad.date}</p>
                        </div>
                    </div>
                    <div className='separator-subscriber'></div>
                    <h3>Inscritos</h3>

                    {organizations.length > 0 ? (
    organizations.map((org, index) => (
        <div className="table-container" key={index}>
            <table className="subscribers-table">
                <tbody>
                    <tr>
                        <td>{org.name}</td>
                        <td>
                            {org.donationStatus ? (
                                <WarnRemovalText
                                >
                                    Doação realizada
                                </WarnRemovalText>
                            ) : (
                                <RegisterRemovalButton
                                    onClick={() => handleRemovalClick(ad.adId, org.address)}
                                    variant="outlined"
                                >
                                    Realizar doação
                                </RegisterRemovalButton>
                            )}
                        </td>
                        <td>
                            {/* Botão que abre o Drawer e passa a organização selecionada */}
                            <button className="link-button" onClick={() => handleDrawerOpen(org)}>
                                Ver rastreio
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    ))
) : (
                        <div className='empty-container'>
                            <EmptyState message="A doação ainda não possui inscritos." />
                        </div>
                    )}
                    <div className='popup-footer'>
                        <CancelButton onClick={onClose}>Cancelar</CancelButton>
                        <RedButton onClick={finishDonation}>Finalizar doação</RedButton>
                    </div>
                </div>
            </div>

            {/* Drawer que exibe a tela de rastreio */}
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <div style={{ width: '300px', padding: '20px' }}>
                    {selectedOrganization && (
                        <RemovalTrack donationStatus={selectedOrganization.donationStatus} adId={ad}/>
                    )}
                </div>
            </Drawer>
        </div>
    );
}

export default DonationSubscribersPopup;
