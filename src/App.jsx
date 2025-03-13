import Navbar from './components/Navbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Hero from './components/Hero';
import BestSellers from './components/BestSellers';
import PoppularBrands from './components/PoppularBrands';

const App = () => {
  return (
    <div className="font-notoSansThai">
      <Navbar />
      <Hero />
      <div className="m-5 md:m-10 lg:m-20 lg:px-20 xl:px-32 flex flex-col gap-20">
        <BestSellers />
        <PoppularBrands />
      </div>
    </div>
  );
};
export default App;
