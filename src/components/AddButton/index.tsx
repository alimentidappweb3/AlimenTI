import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import CreateDonationPopup from "../../pages/CreateDonationPopup";
import ImageUploadPopup from "../../pages/ImageUploadPopup";
import CreateButton from "./styles";

interface AddButtonProps {
  onAdd: () => void;
  text: 'Criar doação' | 'Criar anúncio'
}

const AddButton: React.FC<AddButtonProps> = ({ onAdd, text}) => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleButtonClick = () => {
          setIsPopupOpen(true);
          console.log(isPopupOpen)
    };
  
    const handleClosePopup = () => {
          setIsPopupOpen(false);
    };

    return(
    <div>
    <div className='button-container'>
      <CreateButton onClick={handleButtonClick} startIcon={<FaPlus/>}> {text}</CreateButton>
    </div>
    {isPopupOpen && text == 'Criar doação' && (<CreateDonationPopup onClose={handleClosePopup}></CreateDonationPopup>)}
    {isPopupOpen && text == 'Criar anúncio' && (<ImageUploadPopup onClose={handleClosePopup}></ImageUploadPopup>)}
  </div>
    )
}

export default AddButton;