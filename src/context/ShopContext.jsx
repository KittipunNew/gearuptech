import axios from 'axios';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { backendUrl } from '../App';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(1);

  const { userDetails } = useContext(AuthContext);

  // เก็บข้อมูลสินค้าขายดี
  const bestSeller = useMemo(() => {
    return products.filter((item) => item.bestseller === true);
  }, [products]);

  //  ดึงข้อมูลรายการสินค้าทั้งหมด
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product`);
      setProducts(response.data?.products?.reverse() || []);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, [userDetails]);

  // เพิ่มจำนวนสินค้าในหน้ารายละเอียกสินค้า
  function handleInputProductCount(e) {
    const value = e.target.value;
    if (value === '') {
      setProductCount(0); // ตั้งค่าเป็น 0 เมื่อ input ว่างเปล่า
    } else {
      const number = parseInt(value, 10);
      if (!isNaN(number) && number >= 0) {
        setProductCount(number); // อัปเดต count เฉพาะค่าที่ถูกต้อง
      }
    }
  }

  return (
    <ShopDataContext.Provider
      value={{
        handleInputProductCount,
        products,
        productCount,
        setProductCount,
        bestSeller,
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};
