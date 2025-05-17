import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { backendUrl } from '../App';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderList, setOrderList] = useState(null);

  const { getToken, userDetails } = useContext(AuthContext);

  const fetchOrder = async () => {
    if (!userDetails || !userDetails._id) return;
    try {
      const token = await getToken();
      const response = await axios.get(
        `${backendUrl}/api/order/${userDetails._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderList(response.data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [userDetails]);

  const pending = useMemo(() => {
    return orderList?.filter((item) => item.orderStatus === 'pending');
  });

  return (
    <OrderContext.Provider value={{ fetchOrder, pending }}>
      {children}
    </OrderContext.Provider>
  );
};
