import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import MagniquakePage from './pages/magniquake/index';
import PreviewPage from './pages/magniquake/preview';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/magniquake" element={<MagniquakePage />} />
        <Route path="/magniquake/preview" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
