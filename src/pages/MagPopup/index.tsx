import React from 'react';
import './styles.css';

interface PopupProps {
    ipfsHash: string;
    description: string;
    marketName: string;
    onClose: () => void;
}

function Popup({ ipfsHash, description, marketName, onClose }: PopupProps) {
    const ipfsUrl = `https://ipfs.io/ipfs/${ipfsHash}`;

    return (
        <div className='popup-overlay-mag'>
            <div className='popup-container-mag'>
                <span className='close-button-mag' onClick={onClose}>&times;</span>
                <img src={ipfsUrl} alt="Anúncio" className='popup-image-mag' />
                <div className='popup-content-mag'>
                    <h2 className='popup-market-name'>{marketName}</h2>
                    <div className='popup-description-mag'>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Popup;
