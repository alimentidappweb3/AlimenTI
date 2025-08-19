import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Button, Collapse, List, ListItem, ListItemText } from '@mui/material';
import SupermarketService from '../../services/SupermarketService';
import { Ad } from '../../entities/Ad';
import { Recipient } from '../../entities/Recipient';
import { CustomButton, CustomStepIcon, StyledStepLabel } from './styles';

const steps = [
  'Aguardando retirada',
  'Doação realizada',
  'Doação retirada na instituição'
];

interface RemovalTrackProps {
  donationStatus: boolean;
  adId: Ad; // Adiciona adId como propriedade
}

const marketService = new SupermarketService();

const RemovalTrack: React.FC<RemovalTrackProps> = ({ donationStatus, adId }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [recipients, setRecipients] = useState<Recipient[]>([]); // Estado para armazenar recipients
  const [showRecipients, setShowRecipients] = useState(false); // Estado para controlar a exibição dos recipients

  useEffect(() => {
    const fetchRecipients = async () => {
      try {
        const response = await marketService.getAdRecipients(adId, window);
        if (response && response.length > 0) {
          setRecipients(response); // Armazena recipients se houver
        }
      } catch (error) {
        console.error('Erro ao buscar recipients:', error);
      }
    };

    fetchRecipients();
  }, [adId]); // Executa quando adId mudar

  useEffect(() => {
    // Define o activeStep com base no status da doação e na lista de recipients
    if (!donationStatus) {
      setActiveStep(0); // Apenas "Aguardando retirada" ativo
    } else if (recipients.length > 0) {
      setActiveStep(2); // Se houver recipients, "Doação retirada na instituição" ativo
    } else {
      setActiveStep(1); // Caso contrário, "Doação realizada" ativo
    }
  }, [donationStatus, recipients]); // Executa quando donationStatus ou recipients mudar

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const CustomStepLabel = ({ label, ...props }: any) => (
    <StepLabel StepIconComponent={CustomStepIcon} {...props}>
      {label}
    </StepLabel>
  );

  const toggleRecipients = () => {
    setShowRecipients((prev) => !prev); // Alterna a visibilidade dos recipients
  };

  return (
    <div>
      <h3>Rastreio de Entrega</h3>
      <div>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StyledStepLabel>{label}</StyledStepLabel>
            </Step>
          ))}
        </Stepper>
        {recipients.length > 0 && activeStep === 2 && ( // Exibe a lista de recipients se houver
          <div>
            <CustomButton onClick={toggleRecipients}>
            {showRecipients ? 'Ocultar Recebedores' : 'Mostrar Recebedores'}
          </CustomButton>
            <Collapse in={showRecipients}>
              <List>
                {recipients.map((recipient) => (
                  <ListItem key={recipient.name}>
                    <ListItemText primary={recipient.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemovalTrack;
