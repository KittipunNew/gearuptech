import { useContext } from 'react';
import ProductCard from './ProductCard';
import { ShopDataContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';

const BestSellers = () => {
  const { BestSellerProducts } = useContext(ShopDataContext);
  return (
    <div className="uppercase">
      <div className="flex justify-between md:items-center my-5">
        <h1 className=" text-lime-500 font-bold text-xl md:text-3xl lg:text-4xl">
          Best <span className=" text-black">Sellers</span> <br />{' '}
          <span className="hidden text-xs text-gray-400 md:block">
            Good quality products, special prices, only here.
          </span>
        </h1>
        <Link
          to="/productlist"
          className="font-bold md:hover:scale-125 duration-200"
        >
          View more<span className="text-xl text-red-500">▸</span>
        </Link>
      </div>
      {/* slide product card for mobile screen */}
      <div className="md:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {BestSellerProducts.map((item, index) => (
            <SwiperSlide key={index}>
              <div>
                <ProductCard
                  img={item.img}
                  name={item.name}
                  price={item.price}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-2 flex justify-center"></div>
      </div>
      {/* product card for tablet & desktop screen */}
      <div className="hidden md:gap-5 md:grid grid-cols-3 xl:grid-cols-4">
        {BestSellerProducts.map((item, index) => (
          <Link to={`/productdetail/${item.id}`} key={index}>
            <ProductCard img={item.img} name={item.name} price={item.price} />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default BestSellers;
