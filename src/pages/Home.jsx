import Hero from '../components/Hero';
import BestSellers from '../components/BestSellers';
import PoppularBrands from '../components/PoppularBrands';
import Categories from '../components/Categories';
import Service from '../components/Service';
import Marquee from '../components/Marquee';

const Home = () => {
  return (
    <>
      <Hero />
      <div className="m-5 md:m-10 lg:m-20 lg:px-20 xl:px-32 flex flex-col gap-20">
        <BestSellers />
        <PoppularBrands />
        <Categories />
        <Service />
        <Marquee />
      </div>
    </>
  );
};
export default Home;
