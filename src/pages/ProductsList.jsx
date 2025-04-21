import FilterProduct from './../components/FilterProduct';
import ProductCard from '../components/ProductCard';
import { ShopDataContext } from '../context/ShopContext';
import { useContext, useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const { products } = useContext(ShopDataContext);

  // เงื่อนไข filter ทั้งหมด
  const [filterCondition, setFilterCondition] = useState({
    searchInput: '',
    sort: 'Relevance',
    priceRange: {
      start: '',
      end: '',
    },
    categories: [],
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  // ทำการ filter ทุกครั้งที่เงื่อนไขเปลี่ยน
  useEffect(() => {
    let filtered = [...products];

    // Search
    if (filterCondition.searchInput) {
      const keyword = filterCondition.searchInput.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(keyword)
      );
    }

    // Price Range
    const start = Number(filterCondition.priceRange.start);
    const end = Number(filterCondition.priceRange.end);

    if (!isNaN(start) && filterCondition.priceRange.start !== '') {
      filtered = filtered.filter((product) => product.price >= start);
    }

    if (!isNaN(end) && filterCondition.priceRange.end !== '') {
      filtered = filtered.filter((product) => product.price <= end);
    }

    // Categories
    if (filterCondition.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filterCondition.categories.includes(product.category)
      );
    }

    // Sort
    if (filterCondition.sort === 'Price (Low - High)') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filterCondition.sort === 'Price (High - Low)') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [filterCondition, products]);

  return (
    <div className="flex flex-col lg:flex-row gap-2 pb-20 pt-5 lg:px-5 bg-base-200">
      <div className="px-5 md:px-10 lg:px-0">
        <FilterProduct setFilterProduct={setFilterCondition} />
      </div>

      {/* Mobile & Tablet Screen */}
      <div className="lg:hidden">
        <Layout>
          <div className="flex gap-2">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredProducts.map((item, index) => (
                <Link to={`/productdetail/${item._id}`} key={index}>
                  <ProductCard
                    img={item.images[0]}
                    name={item.name}
                    price={item.price.toLocaleString()}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Layout>
      </div>

      {/* Desktop Screen */}
      <div className="hidden lg:grid grid-cols-3 xl:grid-cols-5 gap-3">
        {filteredProducts.map((item, index) => (
          <Link to={`/productdetail/${item._id}`} key={index}>
            <ProductCard
              img={item.images[0]}
              name={item.name}
              price={item.price.toLocaleString()}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
