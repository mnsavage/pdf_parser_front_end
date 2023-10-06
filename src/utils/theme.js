import { createTheme } from '@mui/material/styles';
import OpenSansRegular from '../assets/fonts/OpenSans-Regular.ttf';
import OpenSansBold from '../assets/fonts/OpenSans-Bold.ttf';
import OpenSansSemiBold from '../assets/fonts/OpenSans-SemiBold.ttf';

const openSansRegular = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  src: `
    local('Open Sans'),
    local('OpenSans-Regular')
    url(${OpenSansRegular}) format('ttf')
  `,
};

const openSansSemibold = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  src: `
    local('Open Sans'),
    local('OpenSans-SemiBold')
    url(${OpenSansSemiBold}) format('ttf')
  `,
};

const openSansBold = {
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  src: `
    local('Open Sans'),
    local('OpenSans-Bold')
    url(${OpenSansBold}) format('ttf')
  `,
};

var customFontFamily = [openSansRegular, openSansSemibold, openSansBold];

const theme = createTheme({
  // MuiCssBaseline: {
  //   '@global': {
  //     '@font-face': [customFontFamily]
  //   }
  // },
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
