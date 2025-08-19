import { Button, StepLabel, styled } from "@mui/material";

export const CustomButton = styled(Button)(({ theme }) => ({
    color: '#FFDD59',
    '&:hover': {
      backgroundColor: '#fff9e2',
    },
  }));

  export const CustomStepIcon = styled('div')(({ theme }) => ({
    '& .MuiStepIcon-text': {
      fill: '#FFDD5',
    },
  }));

 export const StyledStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .MuiStepIcon-root': {
      color: '#b9b49f', // Cor para os steps inativos
      '&.Mui-active': {
        color: '#FFDD59', // Cor para o step ativo
      },
      '&.Mui-completed': {
        color: '#FFDD59', // Cor para os steps concluídos
      },
    },
  }));