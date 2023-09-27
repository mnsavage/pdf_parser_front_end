import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import Header from './components/Header/Header'
import Navigation from './components/Navigation/Navigation';
import Title from './components/Title/Title'
import Confirm from './views/Confirm/Confirm';
import Upload from './views/Upload/Upload';
import NoPage from './views/NoPage/NoPage';
import Inspect from './views/Inspect/Inspect';
import theme from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Header />
    <Title />
    <Navigation />
      <Routes>
        <Route index element={<Upload />} />
        <Route path="confirm" element={<Confirm />} />
        <Route path="inspect" element={<Inspect />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
