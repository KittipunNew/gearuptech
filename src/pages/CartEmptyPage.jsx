import cartEmpty from '../assets/cart-empty.0bb2b95.svg';
import { Link } from 'react-router-dom';

const CartEmptyPage = () => {
  return (
    <div className="w-full h-[500px] flex flex-col justify-center items-center gap-10">
      <img src={cartEmpty} alt="Empty cart" className="mx-auto" />
      <p className="text-3xl font-bold">Your cart is empty</p>
      <p className="text-xl">You have no items in your shopping cart.</p>
      <Link to="/productlist" className="text-xl text-lime-500 font-bold">
        Start Shopping
      </Link>
    </div>
  );
};
export default CartEmptyPage;
