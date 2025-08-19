import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CancelButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  textTransform: 'none',
  border: '2px solid #FFDD59',
  color: '#000000', 
  fontFamily: 'Open-sans, sans-serif',
  height: '30px',
  width: '120px',
  alignSelf: 'center',
  fontWeight: 200,
  '&:hover': {
    boxShadow: theme.shadows[1],
    border: '2px solid #FFDD59',
    backgroundColor: '#fffdf6',
  },
}));

export default  CancelButton;
