import { useContext } from 'react';
import { OrderContext } from './../../context/OrderContext';
import OrderCard from './OrderCard';

const Processing = () => {
  const { processing } = useContext(OrderContext);
  return <OrderCard orders={processing} />;
};
export default Processing;
