import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ShopDataProvider } from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopDataProvider>
      <App />
    </ShopDataProvider>
  </StrictMode>
);
