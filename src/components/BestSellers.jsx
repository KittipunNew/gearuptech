import { useContext, useState, useEffect } from 'react';
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
  const { bestSeller } = useContext(ShopDataContext);

  // เก็บค่าจำนวนรายการที่ต้องการแสดง
  const [itemCount, setItemCount] = useState(0);

  // ฟังก์ชั่นเงื่อนไขการแสดงรายการสินค้าว่าขนาดหน้าจอแต่ละขนาดควรแสดงกี่รายการ
  useEffect(() => {
    const updateItemCount = () => {
      const width = window.innerWidth;
      if (width >= 1281) {
        setItemCount(8);
      } else if (width >= 768) {
        setItemCount(6);
      } else {
        setItemCount(0);
      }
    };

    updateItemCount(); // call once on mount
    window.addEventListener('resize', updateItemCount); // update on resize

    return () => {
      window.removeEventListener('resize', updateItemCount); // cleanup
    };
  }, []);

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
          {bestSeller.map((item, index) => (
            <SwiperSlide key={index}>
              <div>
                <Link to={`/productdetail/${item._id}`} key={index}>
                  <ProductCard
                    img={item.images[0]}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination mt-2 flex justify-center"></div>
      </div>

      {/* product card for tablet & desktop screen */}
      <div className="hidden md:gap-5 md:grid grid-cols-3 xl:grid-cols-4">
        {bestSeller.slice(0, itemCount).map((item, index) => (
          <Link to={`/productdetail/${item._id}`} key={index}>
            <ProductCard
              img={item.images[0]}
              name={item.name}
              price={item.price}
              description={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default BestSellers;
