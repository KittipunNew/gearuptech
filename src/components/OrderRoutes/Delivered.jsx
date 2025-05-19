import { useContext } from 'react';
import { OrderContext } from './../../context/OrderContext';
import OrderCard from './OrderCard';

const Delivered = () => {
  const { delivered } = useContext(OrderContext);
  return <OrderCard orders={delivered} />;
};
export default Delivered;
