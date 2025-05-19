import { useContext } from 'react';
import { OrderContext } from './../../context/OrderContext';
import OrderCard from './OrderCard';

const Shipped = () => {
  const { shipped } = useContext(OrderContext);
  return <OrderCard orders={shipped} />;
};
export default Shipped;
