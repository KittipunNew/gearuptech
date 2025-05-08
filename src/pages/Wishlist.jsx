import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ShopDataContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { user, userDetails } = useContext(AuthContext);
  const { wishlist, products, fetchWishlist, handleDeleteWishlist, addToCart } =
    useContext(ShopDataContext);

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (!user || !userDetails || !wishlist || !products) return null;

  const wishlistProducts = products.filter((product) =>
    wishlist.some((w) => w.productId === product._id)
  );

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10">
      <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl">
        <i className="bx bxs-heart"></i>
        <p>Wishlist</p>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 lg:text-xl">
        {wishlistProducts.length > 0 ? (
          wishlistProducts.map((item) => (
            <div
              className="border w-full rounded-md p-4 flex flex-col items-end gap-5  md:justify-between md:flex-row"
              key={item._id}
            >
              <Link
                to={`/productdetail/${item._id}`}
                className="flex w-full md:w-[60%]"
              >
                <div className="flex items-center gap-10">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 h-20 object-cover lg:h-32 lg:w-32"
                  />
                  <div className="flex flex-col gap-5">
                    <p className="font-bold">{item.name}</p>
                    <p>Price: {item.price.toLocaleString()} Bath</p>
                  </div>
                </div>
              </Link>
              <div className="flex items-start gap-5">
                <button
                  className="font-semibold btn btn-sm md:btn-md bg-lime-500 text-white"
                  onClick={() => {
                    addToCart(item._id);
                    setTimeout(() => {
                      handleDeleteWishlist(item._id);
                    }, 500);
                  }}
                >
                  Add to cart
                </button>
                <button
                  className="font-semibold btn btn-sm md:btn-md btn-error text-white"
                  onClick={() => {
                    handleDeleteWishlist(item._id);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-lg">Your Wishlist is empty</p>
            <p className="text-center">
              Start shopping and show some love by adding products to your
              wishlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
