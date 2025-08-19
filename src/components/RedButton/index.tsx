import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const RedButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  textTransform: 'none',
  border: '1px solid #FF7759',
  color: '#000000', 
  fontFamily: 'Open-sans, sans-serif',
  backgroundColor: '#FF7759',
  height: '30px',
  width: '140px',
  alignSelf: 'center',
  fontWeight: 200,
  '&:hover': {
    boxShadow: theme.shadows[1],
    border: '1px solid #FF7759',
    backgroundColor: '#FF7759',
  },
}));

export default RedButton;
