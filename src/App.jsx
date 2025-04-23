import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductsList from './pages/ProductsList';

import 'boxicons/css/boxicons.min.css';
import Layout from './layout/Layout';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import Register from './pages/Register';

const App = () => {
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
            <Layout>
              <Register />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
