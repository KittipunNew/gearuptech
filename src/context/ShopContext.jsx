import axios from 'axios';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { backendUrl } from '../App';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const { getToken, userDetails } = useContext(AuthContext);

  const userCart = useMemo(() => {
    return cartList.find((item) => item.userId === userDetails?._id);
  }, [cartList, userDetails?._id]);

  // const total = useMemo(() => {
  //   const qty =
  //   // return (
  //   //   userCart?.items?.reduce((sum, item) => sum + item.productId.price, 0) || 0
  //   // );
  // });

  console.log(userCart);

  const bestSeller = useMemo(() => {
    return products.filter((item) => item.bestseller === true);
  }, [products]);

  //  ดึงข้อมูลรายการสินค้าทั้งหมด
  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product`);
      setProducts(response.data.products.reverse());
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  // ดึงข้อมูลรายการ wishlist
  const fetchWishlist = async () => {
    if (!userDetails || !userDetails._id) return;
    try {
      const token = await getToken();
      const response = await axios.get(
        `${backendUrl}/api/wishlist/${userDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(response.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const fetchCartList = async () => {
    if (!userDetails || !userDetails._id) return;
    try {
      const token = await getToken();
      const response = await axios.get(
        `${backendUrl}/api/cart/${userDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartList(response.data);
    } catch (error) {
      console.error('Error fetching Cart list:', error);
    }
  };

  useEffect(() => {
    if (!userDetails) return;
    fetchList();
    fetchWishlist();
    fetchCartList();
  }, [userDetails]);

  useEffect(() => {
    const totalQuantity =
      userCart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    setCartCount(totalQuantity);
  }, [cartList]);

  // เพิ่มจำนวนสินค้า
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

  // เพิ่มสินค้าไปยัง wishlist
  const addToWishlist = async (productId) => {
    try {
      const token = await getToken();
      const response = await axios.post(
        `${backendUrl}/api/add-wishlist`,
        {
          userId: userDetails._id,
          productId: productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success('Added the item to your wish list.');
        return true;
      }
    } catch (err) {
      toast.error('This product is already in your Wishlist.');
      return false;
    }
  };

  const handleDeleteWishlist = async (productId) => {
    try {
      const token = await getToken();
      await axios.delete(`${backendUrl}/api/delete-wishlist`, {
        data: {
          userId: userDetails._id,
          productId: productId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const token = await getToken();

      const response = await axios.post(
        `${backendUrl}/api/add-cart`,
        {
          userId: userDetails._id,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCartList();
      toast.success('✅ Added to cart');
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const updateItemQuantity = async (productId, newQty) => {
    try {
      const token = await getToken();
      await axios.put(
        `${backendUrl}/api/update-cart/${userDetails._id}`,
        {
          productId,
          quantity: newQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCartList();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <ShopDataContext.Provider
      value={{
        products,
        productCount,
        setProductCount,
        handleInputProductCount,
        addToWishlist,
        wishlist,
        fetchWishlist,
        handleDeleteWishlist,
        addToCart,
        cartList,
        setCartList,
        updateItemQuantity,
        fetchCartList,
        cartCount,
        setCartCount,
        userCart,
        bestSeller,
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};
