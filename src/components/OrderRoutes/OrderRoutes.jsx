import { Routes, Route } from 'react-router-dom';
import Order from '../../pages/Order.jsx';
import Pending from './Pending.jsx';
import Processing from './Processing.jsx';
import Shipped from './Shipped.jsx';
import Delivered from './Delivered.jsx';

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Order />}>
        <Route path="pending" element={<Pending />} />
        <Route path="processing" element={<Processing />} />
        <Route path="shipped" element={<Shipped />} />
        <Route path="delivered" element={<Delivered />} />
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
