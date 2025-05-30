import ProductCategotiesCard from '../components/ProductCategotiesCard.jsx';
import pcImg from '../assets/products/PC/PC.png';
import notebookImg from '../assets/products/notebook/notebook.png';
import monitorImg from '../assets/products/monitor/monitor.png';
import accessoriesImg from '../assets/products/accessories/Adapter.png';
import chairImg from '../assets/products/chair/chair.png';
import networkImg from '../assets/products/network/network.png';
import { Link } from 'react-router-dom';

const Categories = () => {
  return (
    <div>
      <h1 className=" text-lime-500 font-bold text-xl md:text-3xl lg:text-4xl uppercase">
        TOP <span className="text-black">Categories</span> <br />{' '}
        <span className="hidden text-xs text-gray-400 md:block">
          Choose products based on the categories you're interested in
        </span>
      </h1>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Link to="/productlist/pc">
          <ProductCategotiesCard name="computer" img={pcImg} />
        </Link>
        <Link to="/productlist/notebook">
          <ProductCategotiesCard name="notebook" img={notebookImg} />
        </Link>
        <Link to="/productlist/monitor">
          <ProductCategotiesCard
            name="monitor"
            img={monitorImg}
            className="hidden md:block"
          />
        </Link>
        <Link to="/productlist/accessorie">
          <ProductCategotiesCard
            name="accessories"
            img={accessoriesImg}
            className="hidden md:block"
          />
        </Link>
        <Link to="/productlist/chair">
          <ProductCategotiesCard
            name="gameming chair"
            img={chairImg}
            className="hidden md:block"
          />
        </Link>
        <Link to="/productlist/network">
          <ProductCategotiesCard
            name="network"
            img={networkImg}
            className="hidden md:block"
          />
        </Link>
      </div>
    </div>
  );
};
export default Categories;
