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

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="font-rajdhani">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productlist" element={<ProductsList />} />
        <Route path="/productlist/:category" element={<CategoryPage />} />
        <Route
          path="/productdetail/:id"
          element={
            <Layout>
              <ProductDetail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" />
            ) : (
              <div className="bg-base-300 border-2 border-base-300">
                <Layout>
                  <Register />
                </Layout>
              </div>
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
