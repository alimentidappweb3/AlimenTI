import React from 'react';
import './styles.css';

interface MagImageCardProps {
    marketName: string;
    ipfsHash: string;
    description: string;
    onClick: () => void; // New prop for handling click events
}

function MagImageCard({ marketName, ipfsHash, description, onClick }: MagImageCardProps) {
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

    return (
        <div className='magazine-card' onClick={onClick}>
            <img src={ipfsUrl} alt={`Anúncio de ${marketName}`} className='magazine-image' />
            <div className='card-overlay'>
                <h3 className='market-name'>{marketName}</h3>
                <p className='market-description'>{description}</p>
            </div>
        </div>
    );
}

export default MagImageCard;
