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
  }, [orderList]);

  const processing = useMemo(() => {
    return orderList?.filter((item) => item.orderStatus === 'processing');
  }, [orderList]);

  const shipped = useMemo(() => {
    return orderList?.filter((item) => item.orderStatus === 'shipped');
  }, [orderList]);

  const delivered = useMemo(() => {
    return orderList?.filter((item) => item.orderStatus === 'delivered');
  }, [orderList]);

  const pendingCount = useMemo(() => {
    if (!pending) return;
    return pending.length.toString();
  }, [pending]);

  const processingCount = useMemo(() => {
    if (!processing) return;
    return processing.length.toString();
  }, [processing]);

  const shippedCount = useMemo(() => {
    if (!shipped) return;
    return shipped.length.toString();
  }, [shipped]);

  const deliveredCount = useMemo(() => {
    if (!delivered) return;
    return delivered.length.toString();
  }, [delivered]);

  return (
    <OrderContext.Provider
      value={{
        fetchOrder,
        pending,
        processing,
        shipped,
        delivered,
        pendingCount,
        processingCount,
        shippedCount,
        deliveredCount,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
