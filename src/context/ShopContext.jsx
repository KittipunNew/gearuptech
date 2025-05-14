import axios from 'axios';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { backendUrl } from '../App';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(1);
  const [wishlist, setWishlist] = useState(null);
  const [cartList, setCartList] = useState(null);

  const { getToken, userDetails } = useContext(AuthContext);

  console.log(products);

  // จำนวนสินค้าในตะกร้า
  const cartCount = useMemo(() => {
    return cartList?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  }, [cartList]);

  // ผลรวมราคาสินค้าทั้งหมดในตะกร้า
  const total = useMemo(() => {
    return cartList?.items?.reduce((total, item) => {
      const price = item.productId?.price || 0;
      const quantity = item.quantity || 0;
      return total + price * quantity;
    }, 0);
  }, [cartList]);

  // เก็บข้อมูลสินค้าขายดี
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

  // ดึงข้อมูลสินค้าในตะกร้า
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
    fetchList();
    fetchWishlist();
    fetchCartList();
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

  // เพิ่มสินค้าลงตะกร้า
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

  // เพิ่มหรือลดจำนวนสินค้าในตะกร้า
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

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = async (productId) => {
    try {
      const token = await getToken();
      await axios.delete(`${backendUrl}/api/delete-cart`, {
        data: {
          userId: userDetails._id,
          productId: productId,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCartList();
    } catch (error) {
      console.error(
        'Error removing item:',
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    try {
      const token = await getToken();
      await axios.delete(`${backendUrl}/api/clear-cart`, {
        data: { userId: userDetails._id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartList({ items: [], totalPrice: 0 });
      fetchCartList();
    } catch (err) {
      console.error('Error clearing cart:', err);
      throw err;
    }
  };

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

  // ลบรายการ wishlist
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
        bestSeller,
        total,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </ShopDataContext.Provider>
  );
};
