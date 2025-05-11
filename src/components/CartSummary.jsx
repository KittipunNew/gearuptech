import { useContext } from 'react';
import { ShopDataContext } from '../context/ShopContext';

const CartSummary = () => {
  const { total } = useContext(ShopDataContext);
  return (
    <div className="w-full p-5 border-b">
      <div className="flex justify-between text-xl">
        <p>Subtotal</p>
        <p>
          <span>
            {total?.toLocaleString()} <span className="text-lg">฿</span>
          </span>
        </p>
      </div>
      <div className="flex justify-between mt-10 text-xl">
        <p>Discount</p>
        <p>
          <span>
            - 0 <span className="text-lg">฿</span>
          </span>
        </p>
      </div>
      <div className="flex justify-between mt-10 text-xl font-bold">
        <p>Total</p>
        <p>
          <span className="text-xl">
            {total?.toLocaleString()} <span className="text-lg">฿</span>
          </span>
        </p>
      </div>
    </div>
  );
};
export default CartSummary;
