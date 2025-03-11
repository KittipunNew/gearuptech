import Navbar from './components/Navbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Hero from './components/Hero';
import BestSellers from './components/BestSellers';

const App = () => {
  return (
    <div className="font-notoSansThai">
      <Navbar />
      <Hero />
      {/* <BestSellers /> */}
    </div>
  );
};
export default App;
