import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import Confirm from './views/Confirm/Confirm';
import Inspect from './views/Inspect/Inspect';
import Upload from './views/Upload/Upload';
import NoPage from './views/NoPage/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Upload />} />
          <Route path="confirm" element={<Confirm />} />
          <Route path="inspect" element={<Inspect />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
