// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import msiLogo from '../assets/brands/msi-logo.png';
import corsairLogo from '../assets/brands/corsair-logo.png';
import nvidiaLogo from '../assets/brands/nvidia-logo.png';
import logitechLogo from '../assets/brands/logitech-logo.png';
import amdLogo from '../assets/brands/amd-logo.png';

const PoppularBrands = () => {
  return (
    <div className="relative">
      <div
        className="bg-lime-500 w-10 h-2 absolute top-0.5"
        style={{ clipPath: 'polygon(0 100%, 80% 100%, 100% 0, 0 0)' }}
      ></div>
      <div className="border-b-2 border-t-2 py-10 uppercase flex flex-col gap-14 lg:flex-row">
        <h1 className="font-bold flex gap-1 md:flex-col md:text-2xl xl:text-3xl">
          shop by
          <br /> <p className="text-lime-500">popular brands</p>
        </h1>
        {/* slide brands logo for mobile & tablet screen */}
        <div className="mb-10 lg:hidden w-full">
          <Swiper spaceBetween={80} className="mySwipe w-full">
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img src={nvidiaLogo} alt="" className="w-40 md:w-80" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img src={corsairLogo} alt="" className="w-40 md:w-80" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img src={msiLogo} alt="" className="w-40 md:w-80" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img src={logitechLogo} alt="" className="w-40 md:w-80" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="flex justify-center items-center">
                <img src={amdLogo} alt="" className="w-40 md:w-80" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="hidden lg:flex justify-center items-center flex-wrap w-full lg:gap-20 xl:gap-10 ">
          <img src={nvidiaLogo} alt="" className="md:w-40 xl:w-52" />
          <img src={corsairLogo} alt="" className="md:w-40 xl:w-52" />
          <img src={msiLogo} alt="" className="md:w-40 xl:w-52" />
          <img src={logitechLogo} alt="" className="md:w-40 xl:w-52" />
          <img src={amdLogo} alt="" className="md:w-40 xl:w-52" />
        </div>
      </div>
      <div
        className="bg-lime-500 w-10 h-2 absolute bottom-0.5 right-0"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)' }}
      ></div>
    </div>
  );
};
export default PoppularBrands;
