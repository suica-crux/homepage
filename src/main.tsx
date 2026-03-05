import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/index';
import MagniquakePage from './pages/magniquake/index';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/magniquake" element={<MagniquakePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
