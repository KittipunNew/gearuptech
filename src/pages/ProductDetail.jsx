import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import ProductCard from './../components/ProductCard';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  const { products, productCount, setProductCount, handleInputProductCount } =
    useContext(ShopDataContext);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { getToken, userDetails } = useContext(AuthContext);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (!userDetails || !product) return;
    const fetchWishlist = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${backendUrl}/api/wishlist/${userDetails._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const alreadyExists = response.data.some(
          (item) => item.productId === id
        );

        setIsFavorited(alreadyExists);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [id, userDetails?._id, product]);

  // กรองสินค้าที่เกี่ยวข้อง
  const relatedProducts = products.filter(
    (item) => item.category === product.category && item._id !== product._id
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-10 lg:gap-20 pb-20">
        <div className="flex flex-col xl:flex-row xl:justify-center xl:items-center gap-3">
          {/* image product slide */}
          <div>
            <Swiper
              spaceBetween={20}
              pagination={{
                el: '.custom-pagination',
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper md:w-[500px]"
            >
              {Array.isArray(product.images) ? (
                product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center items-center">
                      <img src={image} alt="" />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="flex justify-center items-center">
                    <img src={product.image} alt="product-image" />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="custom-pagination my-10 flex justify-center"></div>
          </div>

          {/* detail product */}
          <div className="flex flex-col gap-5 lg:gap-10 lg:w-[600px] xl:mx-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl text-lime-500 font-bold lg:hidden">
                <span className="text-lg">฿</span>
                {product.price.toLocaleString()}
              </h1>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="mb-5">{product.description}</p>
              {product.specs.map((item, index) => (
                <ul key={index} className="font-bold">
                  <li>{item}</li>
                </ul>
              ))}
              <h1 className="hidden text-4xl text-lime-500 font-bold lg:block mt-5">
                <span className="text-3xl">฿</span>
                {product.price.toLocaleString()}
              </h1>
            </div>
            <div className="flex justify-center items-center gap-1 w-52 md:w-80">
              <button
                className="btn md:btn-xl"
                onClick={() => {
                  if (productCount > 0) setProductCount(productCount - 1);
                }}
              >
                -
              </button>
              <input
                type="text"
                placeholder="1"
                className="input input-bordered w-full max-w-xs md:input-xl"
                value={productCount}
                onChange={handleInputProductCount}
              />
              <button
                className="btn md:btn-xl"
                onClick={() => setProductCount(productCount + 1)}
              >
                +
              </button>
            </div>
            <div className="flex gap-1 w-52 md:w-80">
              <button
                className="btn w-full text-white bg-lime-500 md:btn-xl"
                onClick={() => {
                  addToCart(id, productCount);
                }}
              >
                Add to Cart
              </button>
              <button
                className="btn text-white bg-amber-500 md:btn-xl"
                onClick={async () => {
                  const success = await addToWishlist(id);
                  if (success) setIsFavorited(true);
                }}
              >
                <i className="bx bxs-heart"></i>
                {isFavorited ? 'Already in Wishlist' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Related Products</h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.slice(0, 4).map((item) => (
              <Link to={`/productdetail/${item._id}`} key={item._id}>
                <ProductCard
                  img={item.images[0]}
                  name={item.name}
                  price={item.price.toLocaleString()}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
