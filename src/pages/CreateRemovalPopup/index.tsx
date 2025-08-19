import React, { useState } from 'react';
import './styles.css';
import { toast } from 'react-toastify';
import DefaultButton from '../../components/DefaultButton';
import CancelButton from '../../components/CancelButton';
import { Recipient } from '../../entities/Recipient';
import SupermarketService from '../../services/SupermarketService';
import OrganizationService from '../../services/OrganizationService';
import { Ad } from '../../entities/Ad';

interface CreateRemovalPopupProp {
    ad: Ad;
    onClose: () => void;
}

function CreateRemovalPopup({ ad, onClose }: CreateRemovalPopupProp) {
  const [name, setName] = useState('');
  const [Cpf, setCpf] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [adId, setAdId] = useState(ad.adId)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newRecipient: Recipient = {
      adId,
      name,
      Cpf,
      orgAddress
    };

    const orgService = new OrganizationService();
    await orgService.registerDonationRecipient(newRecipient, window)
    toast.success("Doação realizada com sucesso!")

    onClose();
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container-removal'>
        <div className='popup-header'>
          <span className='close-button' onClick={onClose}>&times;</span>
          <h2>Registrar retirada</h2>
          <div className='separator'></div>
        </div>
        <div className='popup-content'>
          <form className='popup-form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nome do recebedor'
              />
              <input
                type='text'
                value={Cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder='CPF do recebedor'
              />
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

export default CreateRemovalPopup;
