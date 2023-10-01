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
    },
    h2: {
      font: 'Open Sans',
      fontSize: 24,
      color: '#000000',
      fontWeight: 'bold'
    },
    h3: {
      font: 'Open Sans',
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    body1: {
      font: 'Open Sans',
      fontSize: 24,
      color: '#000000',
    },
    button: {
      textTransform: 'none',
      fontSize: '20px',
      font: 'Open Sans'
    }
  }
});

export default theme;
