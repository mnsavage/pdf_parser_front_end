import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  listItemText: {
    fontSize:'5px'
  },
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
      fontSize: 48,
      color: '#9E1B32'
    },
    h2: {
      fontSize: 24,
      color: '#000000',
      fontWeight: 'bold'
    },
    h3: {
      fontSize: 24,
      color: '#FFFFFF',
      fontWeight: 'bold'
    },
    body1: {
      fontSize: 20,
      color: '#000000',
    },
    body2: {
      fontSize: 20,
      color: '#FFFFFF',
    },
    body3: {
      fontSize: 18,
      color: '#000000',
      fontFamily: ['Roboto','Helvetica','Arial','sans-serif']
    },
    button: {
      textTransform: 'none',
      fontSize: '20px',
    }
  }
});

export default theme;
