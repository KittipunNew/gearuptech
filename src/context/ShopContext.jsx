import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { backendUrl } from '../App';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/product`);
        setProducts(response.data.products.reverse());
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    };
    fetchList();
  }, []);

  return (
    <ShopDataContext.Provider value={{ products }}>
      {children}
    </ShopDataContext.Provider>
  );
};
