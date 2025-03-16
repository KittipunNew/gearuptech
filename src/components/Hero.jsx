import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// images
import BgHeroImg1 from '../assets/banner1/bg.png';
import ItemHeroImg1 from '../assets/banner1/14_1.webp';
import BgHeroImg2 from '../assets/banner2/bg.png';
import ItemHeroImg2 from '../assets/banner2/product.png';

// slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// animation scroll
import ScrollReveal from 'scrollreveal';

const Hero = () => {
  // animation scroll config
  useEffect(() => {
    ScrollReveal().reveal('.aos', {
      delay: 100,
      duration: 1000,
      distance: '50px',
      origin: 'bottom',
    });
  }, []);

  return (
    <>
      <Swiper
        // banner slide config
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade]}
        className="mySwiper w-full font-rajdhani"
      >
        <SwiperSlide>
          <div
            className="relative w-full h-[400px] bg-cover bg-center md:h-[500px] lg:h-[700px]"
            style={{ backgroundImage: `url(${BgHeroImg1})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Mobile */}
            <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-white md:hidden">
              <div className="flex flex-col justify-center items-center uppercase md:items-start">
                <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Xlite x6 GAMING keyboard
                </h1>
                <h1 className="text-3xl text-center font-bold md:text-start md:text-4xl lg:text-5xl xl:text-6xl">
                  tune up <br />
                  your game
                </h1>
                <Link to="/productlist" className="btn md:btn-lg mt-5">
                  SHOP NOW
                  <span className="text-xl text-red-500">▸</span>
                </Link>
              </div>
            </div>

            {/* Tablet & Desktop */}
            <div className="hidden md:block">
              <img
                src={ItemHeroImg1}
                alt=""
                className="w-[400px] lg:w-[500px] xl:w-[600px] absolute top-[300px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 lg:top-[400px] xl:top-[410px]"
              />
              <div className="aos absolute inset-0 bottom-[150px] flex flex-col justify-center items-center text-white uppercase xl:bottom-[250px]">
                <h1 className="text-xl md:text-4xl lg:text-5xl xl:text-6xl">
                  Xlite x6 GAMING keyboard
                </h1>
                <h1 className="text-3xl text-center font-bold md:text-6xl lg:text-7xl xl:text-8xl">
                  tune up <br />
                  your game
                </h1>
              </div>
              <Link
                to="/productlist"
                className="aos absolute bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 btn md:btn-lg mt-32 lg:bottom-20"
              >
                SHOP NOW
                <span className="text-xl text-red-500">▸</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="relative w-full h-[400px] bg-cover bg-center md:h-[500px] lg:h-[700px]"
            style={{ backgroundImage: `url(${BgHeroImg2})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="absolute inset-0 p-5 flex flex-col items-center justify-center text-white md:flex-row md:gap-10">
              <img
                src={ItemHeroImg2}
                alt=""
                className="hidden md:block w-[300px] lg:w-[400px] xl:w-[500px]"
              />
              <div className="flex flex-col justify-center items-center uppercase md:items-start">
                <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                  Wireless headphones
                </h1>
                <h1 className="text-3xl text-center font-bold md:text-start md:text-4xl lg:text-5xl xl:text-6xl">
                  Focuses on clear sound <br />
                  wireless convenience
                </h1>
                <Link to="/productlist" className="btn md:btn-lg mt-5">
                  SHOP NOW
                  <span className="text-xl text-red-500">▸</span>
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Hero;
