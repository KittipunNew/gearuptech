import FilterProduct from './../components/FilterProduct';
import ProductCard from '../components/ProductCard';
import { ShopDataContext } from '../context/ShopContext';
import { useContext } from 'react';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
const ProductsList = () => {
  const { allProduct } = useContext(ShopDataContext);
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-2 lg:mt-5">
        <div className="px-5 md:px-10 lg:px-0">
          <FilterProduct />
        </div>
        {/* Mobile & Tablet Screen */}
        <div className="lg:hidden">
          <Layout>
            <div className="flex gap-2">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {allProduct.map((item, index) => (
                  <Link to={`/productdetail/${item.id}`} key={index}>
                    <ProductCard
                      img={item.img[0]}
                      name={item.name}
                      price={item.price}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Layout>
        </div>
        {/* Desktop Screen */}
        <div className="hidden lg:grid grid-cols-3 xl:grid-cols-5 gap-3">
          {allProduct.map((item) => (
            <Link to={`/productdetail/${item.id}`} key={item.id}>
              <ProductCard
                img={
                  Array.isArray(item.img) && item.img.length > 0
                    ? item.img[0]
                    : item.img
                }
                name={item.name}
                price={item.price}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductsList;
