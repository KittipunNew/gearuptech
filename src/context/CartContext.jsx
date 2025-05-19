import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState(null);

  const { getToken, userDetails } = useContext(AuthContext);

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
    fetchCartList();
  }, [userDetails]);

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

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = async (productId, quantity = 1) => {
    try {
      if (!userDetails || !userDetails._id) {
        toast.warning('⚠️ Please login.');
        return;
      }
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

  return (
    <CartContext.Provider
      value={{
        cartList,
        setCartList,
        cartCount,
        fetchCartList,
        total,
        removeFromCart,
        clearCart,
        updateItemQuantity,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
