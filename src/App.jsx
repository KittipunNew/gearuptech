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

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import SidebarAccount from './components/SidebarAccount';
import AccountOverview from './pages/AccountOverview';
import AccountInfo from './pages/AccountInfo';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="font-rajdhani">
      <ToastContainer />
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
            <Layout>
              <CategoryPage />
            </Layout>
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
          path="/account/overview"
          element={
            user ? (
              <div className="bg-base-300 border-2 border-base-300">
                <Layout>
                  <SidebarAccount />
                  <AccountOverview />
                </Layout>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/account/account-information"
          element={
            user ? (
              <div className="bg-base-300 border-2 border-base-300">
                <Layout>
                  <SidebarAccount />
                  <AccountInfo />
                </Layout>
              </div>
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
