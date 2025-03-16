import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

import msiLogo from '../assets/brands/msi-logo.png';
import corsairLogo from '../assets/brands/corsair-logo.png';
import nvidiaLogo from '../assets/brands/nvidia-logo.png';
import logitechLogo from '../assets/brands/logitech-logo.png';
import amdLogo from '../assets/brands/amd-logo.png';

const Marquee = () => {
  return (
    <div>
      <Swiper
        spaceBetween={20} // ระยะห่างระหว่างสไลด์
        slidesPerView={3} // จำนวนสไลด์ที่แสดง
        loop={true} // ทำให้วนซ้ำ
        autoplay={{
          delay: 0, // ไม่มีดีเลย์
          disableOnInteraction: false, // ไม่หยุดเมื่อผู้ใช้แตะ
          pauseOnMouseEnter: false, // ไม่หยุดเมื่อเมาส์โฮเวอร์
        }}
        speed={2000} // ปรับความเร็ว (ค่ายิ่งต่ำยิ่งเร็ว)
        modules={[Autoplay]}
        className="mySwipe w-full"
      >
        <SwiperSlide className="flex justify-center">
          <img src={nvidiaLogo} alt="" className="w-52" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={corsairLogo} alt="" className="w-52" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={msiLogo} alt="" className="w-52" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={logitechLogo} alt="" className="w-52" />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <img src={amdLogo} alt="" className="w-52" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Marquee;
