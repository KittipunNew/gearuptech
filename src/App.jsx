import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import ProductsList from './pages/ProductsList';

import 'boxicons/css/boxicons.min.css';
import Layout from './layout/Layout';

const App = () => {
  return (
    <div className="font-rajdhani">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/productlist"
          element={
            <Layout>
              <ProductsList />
            </Layout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};
export default App;
