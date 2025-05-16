import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductsList from './pages/ProductsList';

import 'boxicons/css/boxicons.min.css';
import Layout from './layout/Layout';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import { AuthContext } from './context/AuthContext';
import Register from './pages/Register';

import SidebarAccount from './components/SidebarAccount';
import AccountOverview from './pages/AccountOverview';
import AccountInfo from './pages/AccountInfo';
import Wishlist from './pages/Wishlist';
import ShippingAddress from './pages/ShippingAddress';
import OrderRoutes from './components/OrderRoutes/OrderRoutes';
import Cart from './pages/Cart';
import CartEmptyPage from './pages/CartEmptyPage';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentSuccess from './pages/PaymentSuccess';
import { CartContext } from './context/CartContext';
import CODSuccessPage from './pages/CODSuccessPage';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const stripePromise = loadStripe(
  'pk_test_51RNVoK2KGxMaZqvhPkAjExjBw0OUFIopKDDxQpe3TajVDvORR9hIOExh1VYPypyUuylrCiILSylpoPzXMkuzq6FF00poLAQzEW'
);

const App = () => {
  const { user } = useContext(AuthContext);
  const { cartList } = useContext(CartContext);

  const accountRoutes = [
    {
      path: '/account/overview',
      element: <AccountOverview />,
    },
    {
      path: '/account/account-information',
      element: <AccountInfo />,
    },
    {
      path: '/account/wishlist',
      element: <Wishlist />,
    },
    {
      path: '/account/orders/*',
      element: <OrderRoutes />,
    },
    {
      path: '/account/shipping-address',
      element: <ShippingAddress />,
    },
  ];

  return (
    <div className="font-rajdhani">
      <ToastContainer position="bottom-right" autoClose={2000} />
      <Navbar />
      <Routes>
        {/* หน้าแรก */}
        <Route path="/" element={<Home />} />

        {/* รายการสินค้าทั้งหมด */}
        <Route
          path="/productlist"
          element={
            <div className="bg-base-300">
              <Layout>
                <ProductsList />
              </Layout>
            </div>
          }
        />

        {/* รายการสินค้าเฉพาะหมวดหมู่ */}
        <Route
          path="/productlist/:category"
          element={
            <div className="bg-base-300">
              <Layout>
                <CategoryPage />
              </Layout>
            </div>
          }
        />

        {/* รายละเอียดสินค้า */}
        <Route
          path="/productdetail/:id"
          element={
            <div>
              <Layout>
                <ProductDetail />
              </Layout>
            </div>
          }
        />
        {/* สมัครสมาชิก */}
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <div className="bg-base-300">
                <Layout>
                  <Register />
                </Layout>
              </div>
            )
          }
        />

        <Route
          path="/cart"
          element={
            user ? (
              <div className="bg-base-300">
                <Layout>
                  {!cartList?.items.length ? (
                    <CartEmptyPage />
                  ) : (
                    <Elements stripe={stripePromise}>
                      <Cart />
                    </Elements>
                  )}
                </Layout>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/place-order-success"
          element={
            user ? (
              <div className="bg-base-300">
                <Layout>
                  <CODSuccessPage />
                </Layout>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/payment-success"
          element={
            user ? (
              <div className="bg-base-300">
                <Layout>
                  <PaymentSuccess />
                </Layout>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <>
          {accountRoutes.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={
                user ? (
                  <div className="bg-base-300 border-2 border-base-300">
                    <Layout>
                      <div className="flex flex-col lg:flex-row gap-2">
                        <SidebarAccount />
                        {item.element}
                      </div>
                    </Layout>
                  </div>
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          ))}
        </>
      </Routes>

      <Footer />
    </div>
  );
};
export default App;
