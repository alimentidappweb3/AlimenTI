import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const RegisterRemovalButton = styled(Button)(({ theme }) => ({
  borderRadius: '8px',
  textTransform: 'none',
  border: '1px solid #FFDD59',
  color: 'black', 
  fontFamily: 'Open-sans, sans-serif',
  backgroundColor: '#FFDD59',
  '&:hover': {
    boxShadow: theme.shadows[1],
    border: '1px solid #FFDD59',
    backgroundColor: '#fffdf6',
  },
}));

export const WarnRemovalText = styled('div')(({ theme }) => ({
  textTransform: 'none',
  color: 'black', 
  fontFamily: 'Open-sans, sans-serif',
  padding: '2px 2px',
  backgroundColor: '#f5f5f5', // Cor de fundo clara para parecer destacado
  textAlign: 'center',
}));

