import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ShopDataProvider } from './context/ShopContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { TokenProvider } from './context/TokenContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TokenProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ShopDataProvider>
          <App />
        </ShopDataProvider>
      </BrowserRouter>
    </TokenProvider>
  </StrictMode>
);
