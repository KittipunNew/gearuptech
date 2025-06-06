import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = () => {
  const { cartList, updateItemQuantity, removeFromCart } =
    useContext(CartContext);
  return (
    <div className="flex flex-col gap-2">
      {cartList?.items?.map((item) => {
        const product = item.productId;
        return (
          <div
            key={product._id}
            className="border-b p-5 flex items-center gap-5 xl:gap-10"
          >
            <div className="w-[20%] lg:w-[15%] xl:w-[10%]">
              <img src={product.images[0]} alt={product.name} />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h3 className="font-bold xl:text-2xl">{product.name}</h3>
              <p className="font-bold text-lime-500 xl:text-xl">
                {product.price.toLocaleString()}
                <span className="text-xs xl:text-lg">฿</span>
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <p className="xl:text-lg">Qty: </p>
                  <button
                    className="btn btn-xs md:btn-md"
                    onClick={() => {
                      updateItemQuantity(item.productId._id, item.quantity - 1);
                    }}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="input w-10 input-xs md:input-md md:w-20"
                    value={item.quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-xs md:btn-md"
                    onClick={() => {
                      updateItemQuantity(item.productId._id, item.quantity + 1);
                    }}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(product._id)}>
                  <i className="bx bxs-trash text-error md:btn-xl"></i>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartItem;
