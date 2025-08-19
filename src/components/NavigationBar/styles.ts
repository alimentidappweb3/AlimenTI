import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';


export const AppBarStyled = styled(AppBar)(({ theme }) => ({
    backgroundColor: '#FFDD59',
    padding: theme.spacing(1),
    boxShadow: 'none',
    justifyContent: 'space-between'
  }));