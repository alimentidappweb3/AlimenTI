import React, { useState } from 'react';
import './styles.css';
import { Ad } from '../../entities/Ad';
import SupermarketService from '../../services/SupermarketService';
import { toast } from 'react-toastify';
import DefaultButton from '../../components/DefaultButton';
import CancelButton from '../../components/CancelButton';

function CreateDonationPopup({ onClose }: { onClose: () => void }) {
  const [tittle, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [marketAddress, setMarketAddress] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [limQuantity, setLimQuan] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [localization, setLocalization] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newAd: Ad = {
      tittle,
      description,
      quantity: quantity as number,
      limQuantity: limQuantity as number,
      date,
      isOpen,
      localization,
      marketAddress,
    };

    const supermarketService = new SupermarketService();
    await supermarketService.createAd(newAd, window);
    toast.success("Doação cadastrada com sucesso!")

    onClose();
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container-create'>
        <div className='popup-header'>
          <span className='close-button' onClick={onClose}>&times;</span>
          <h2>Criar nova doação</h2>
          <div className='separator'></div>
        </div>
        <div className='popup-content'>
          <form className='popup-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <input
                type='text'
                value={tittle}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Título'
              />
              <input
                type='text'
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || '')}
                placeholder='Quantidade'
                inputMode='numeric'
                pattern='[0-9]*'
              />
            </div>
            <div className='form-row'>
              <input
                type='text'
                value={limQuantity}
                onChange={(e) => setLimQuan(Number(e.target.value) || '')}
                placeholder='Limite por organização'
                inputMode='numeric'
                pattern='[0-9]*'
              />
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder='Data'
              />
            </div>
            <div className='form-row'>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Descrição da Doação'
              ></textarea>
            </div>
            <div className='popup-footer'>
              <CancelButton onClick={onClose}>Cancelar</CancelButton>
              <DefaultButton type='submit'> Criar doação</DefaultButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateDonationPopup;
