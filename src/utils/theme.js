import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9E1B32'
    },
    secondary: {
      main: '#DADADA'
    }
  },
  typography: {
    h1: {
      font: 'Open Sans',
      fontSize: 48,
      color: '#9E1B32'
    }
  }
});

export default theme;
