import { useContext } from 'react';
import { OrderContext } from './../../context/OrderContext';
import OrderCard from './OrderCard';

const Pending = () => {
  const { pending } = useContext(OrderContext);
  return <OrderCard orders={pending} />;
};

export default Pending;
