import ProductCard from '../components/ProductCard';
import { useContext } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { useParams, Link } from 'react-router-dom';
import Layout from '../layout/Layout';

const CategoryPage = () => {
  const { category } = useParams();
  const { products } = useContext(ShopDataContext);

  const productCategory = products.filter((item) => item.category === category);

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Mobile & Tablet */}
      <div className="lg:hidden md:mt-10">
        <h1 className="text-xl font-bold mb-5">
          {category.toUpperCase()}
          <span className="text-gray-400">({productCategory.length})</span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {productCategory.length > 0 ? (
            productCategory.map((item) => (
              <Link to={`/productdetail/${item._id}`} key={item._id}>
                <ProductCard
                  img={
                    Array.isArray(item.images) && item.images.length > 0
                      ? item.images[0]
                      : item.images
                  }
                  name={item.name}
                  price={item.price}
                />
              </Link>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:flex flex-col gap-10">
        <h1 className="text-2xl font-bold">
          {category.toUpperCase()}
          <span className="text-gray-400">({productCategory.length})</span>
        </h1>
        <div className=" lg:grid grid-cols-3 xl:grid-cols-5 gap-3">
          {productCategory.length > 0 ? (
            productCategory.map((item) => (
              <Link to={`/productdetail/${item._id}`} key={item._id}>
                <ProductCard
                  img={
                    Array.isArray(item.images) && item.images.length > 0
                      ? item.images[0]
                      : item.images
                  }
                  name={item.name}
                  price={item.price}
                />
              </Link>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
