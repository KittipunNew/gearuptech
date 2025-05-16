import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(null);

  const { getToken, userDetails } = useContext(AuthContext);

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

  useEffect(() => {
    fetchWishlist();
  }, [userDetails]);

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

  return (
    <WishlistContext.Provider
      value={{ wishlist, fetchWishlist, handleDeleteWishlist, addToWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
