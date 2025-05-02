import { Routes, Route } from 'react-router-dom';
import Order from '../../pages/Order.jsx';
import AllOrders from './AllOrders.jsx';
import ToPay from './ToPay.jsx';
import ToReceive from './ToReceive.jsx';
import Completed from './Completed.jsx';
import Canceled from './Canceled.jsx';

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Order />}>
        <Route index element={<AllOrders />} />
        <Route path="to-pay" element={<ToPay />} />
        <Route path="to-receive" element={<ToReceive />} />
        <Route path="completed" element={<Completed />} />
        <Route path="canceled" element={<Canceled />} />
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
