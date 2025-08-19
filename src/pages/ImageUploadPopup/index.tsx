import React, { useState } from 'react';
import './styles.css';
import { FaUpload } from 'react-icons/fa';
import IPFSService from '../../services/IPFSService';
import { Magazine } from '../../entities/Magazine';
import SupermarketService from '../../services/SupermarketService';
import { toast } from 'react-toastify';

interface ImageUploadPopupProps {
  onClose: () => void;
}

const ImageUploadPopup: React.FC<ImageUploadPopupProps> = ({ onClose }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const ipfsService = new IPFSService();
  const marketService = new SupermarketService();
  const [description, setDescription] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const magazine: Magazine = {
      marketAddress: '',
      ipfsHash: '',
      description: ''
    };
    if (selectedFile) {
      const ipfsHash = await ipfsService.uploadToIpfs(selectedFile);
      magazine.ipfsHash = ipfsHash;
      magazine.description = description;
      await marketService.createMag(magazine, window);
      toast.success("Anúncio postado com sucesso!")

      onClose();
    } else {
      console.log("No file selected");
      toast.error("Nenhum arquivo selecionado")
    }
  };

  return (
    <div className='popup-overlay'>
      <div className='popup-container-image'>
        <div className='popup-header'>
          <h2>Criar novo anúncio</h2>
          <span className='close-button' onClick={onClose}>&times;</span>
        </div>
        <div className='popup-content'>
          <form className='popup-form' onSubmit={handleSubmit}>
            <div className='upload-icon-container'>
              <label htmlFor='file-upload' className='custom-file-upload'>
                <FaUpload className='upload-icon' />
                {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo"}
              </label>
              <input id='file-upload' type='file' accept='image/*' onChange={handleFileChange} />
              <input type='text' placeholder='Descrição' value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='popup-footer'>
              <button type='button' className='cancel-button-upload' onClick={onClose}>Cancelar</button>
              <button type='submit' className='upload-button'>Upload</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPopup;
