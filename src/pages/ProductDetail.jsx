import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';

import img1 from '../assets/products/accessories/Adapter.png';
import img2 from '../assets/products/accessories/Adapter1.png';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import ProductCard from './../components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();

  const { products } = useContext(ShopDataContext);

  const product = products.find((item) => item.id === parseInt(id));

  const [productCount, setProductCount] = useState(0);

  function handleInputProductCount(e) {
    const value = e.target.value;
    if (value === '') {
      setProductCount(0); // ตั้งค่าเป็น 0 เมื่อ input ว่างเปล่า
    } else {
      const number = parseInt(value, 10);
      if (!isNaN(number) && number >= 0) {
        setProductCount(number); // อัปเดต count เฉพาะค่าที่ถูกต้อง
      }
    }
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div>
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-3">
          {/* image product slide */}
          <div className="lg:w-96">
            <Swiper
              spaceBetween={20}
              pagination={{
                el: '.custom-pagination',
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {Array.isArray(product.img) ? (
                product.img.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center items-center">
                      <img src={image} alt="" />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="flex justify-center items-center">
                    <img src={product.img} alt="product-image" />
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <div className="custom-pagination my-10 flex justify-center"></div>
          </div>
          {/* detail product */}
          <div className="flex flex-col gap-5 lg:gap-20 lg:w-[600px] lg:mx-20">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl text-lime-500 font-bold lg:hidden">
                <span className="text-lg">฿</span>
                {product.price}
              </h1>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p>{product.detail}</p>
              <h1 className="hidden text-4xl text-lime-500 font-bold lg:block">
                <span className="text-3xl">฿</span>
                {product.price}
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
              <button className="btn w-full text-white bg-lime-500 md:btn-xl">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Related Products</h1>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            <ProductCard img={img1} name="test" price="500" />
            <ProductCard img={img1} name="test" price="500" />
            <ProductCard img={img1} name="test" price="500" />
            <ProductCard img={img1} name="test" price="500" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
