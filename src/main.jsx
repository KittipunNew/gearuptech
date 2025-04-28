import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ShopDataProvider } from './context/ShopContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ShopDataProvider>
          <App />
        </ShopDataProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
