import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const DefaultButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  textTransform: 'none',
  border: '1px solid #FFDD59',
  color: '#000000', 
  fontFamily: 'Open-sans, sans-serif',
  backgroundColor: '#FFDD59',
  height: '30px',
  width: '150px',
  alignSelf: 'center',
  fontWeight: 200,
  '&:hover': {
    boxShadow: theme.shadows[1],
    border: '1px solid #FFDD59',
    backgroundColor: '#FFDD59',
  },
}));

export default DefaultButton;
