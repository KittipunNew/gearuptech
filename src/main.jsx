import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ShopDataProvider } from './context/ShopContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <WishlistProvider>
            <OrderProvider>
              <ShopDataProvider>
                <App />
              </ShopDataProvider>
            </OrderProvider>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
