import { createContext, useState } from 'react';

import img1 from '../assets/products/PC/Desktop Acer Aspire TC-1785-1418G0T0MiT00C/1.png';
import img2 from '../assets/products/notebook/Notebook_Asus_Vivobook_16X/1.png';
import img3 from '../assets/products/monitor/BENQ EW3290U/1.png';
import img4 from '../assets/products/chair/Anda Seat Gaming Chair/1.png';
import img5 from '../assets/products/accessories/Adapter.png';
import img6 from '../assets/products/network/Asus Network RT-AX1800HP/1.png';

import product1_2 from '../assets/products/PC/Desktop Acer Aspire TC-1785-1418G0T0MiT00C/2.png';
import product1_3 from '../assets/products/PC/Desktop Acer Aspire TC-1785-1418G0T0MiT00C/3.png';

import product2_2 from '../assets/products/notebook/Notebook_Asus_Vivobook_16X/2.png';
import product2_3 from '../assets/products/notebook/Notebook_Asus_Vivobook_16X/3.png';

import product3_2 from '../assets/products/monitor/BENQ EW3290U/2.png';
import product3_3 from '../assets/products/monitor/BENQ EW3290U/3.png';

import product4_2 from '../assets/products/chair/Anda Seat Gaming Chair/2.png';
import product4_3 from '../assets/products/chair/Anda Seat Gaming Chair/3.png';

import product5_2 from '../assets/products/accessories/Adapter.png';
import product5_3 from '../assets/products/accessories/Adapter1.png';

import product6_2 from '../assets/products/network/Asus Network RT-AX1800HP/2.png';
import product6_3 from '../assets/products/network/Asus Network RT-AX1800HP/3.png';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const allProduct = [
    {
      id: 1,
      img: [img1, product1_2, product1_3],
      name: 'HP DESKTOP TW PAVILION TP01-5016d SNOW WHITE',
      category: 'computer',
      detail:
        'HP Pavilion combines high performance with a reliable, tested design, driving everything you need to do with a high-performance processor.',
      price: 20000,
    },
    {
      id: 2,
      img: [img2, product2_2, product2_3],
      name: 'Notebook Asus Vivobook 16X K3605ZF-RP593W (Indie Black)',
      category: 'notebook',
      detail:
        'ASUS Vivobook 16X unleashes your imagination with up to the 12th generation Intel Core H-series processor and up to NVIDIA GeForce RTX graphics, providing the power you need for the multitasking you require.',
      price: 20000,
    },
    {
      id: 3,
      img: [img3, product3_2, product3_3],
      name: 'BENQ EW3290U (IPS 60Hz USB-C SPK)',
      category: 'monitor',
      detail:
        'BENQ EW3290U monitor offers a premium display, elevating your experience at every moment. Bring the screen to life with AI Contrast, enhancing image details without affecting other parts of the picture. This adjustment improves visibility and provides an outstanding viewing experience, combined with HDR content for stunning and captivating visuals.',
      price: 20000,
    },
    {
      id: 4,
      img: [img4, product4_2, product4_3],
      name: 'Anda Seat Gaming Chair Kaiser 3 Size XL Black',
      category: 'chair',
      detail:
        'ANDA SEAT KAISER 3 SERIES PREMIUM GAMING CHAIR is designed for gamers, available in various colors and made from high-quality materials. It uses only premium materials, including the DuraXtra leather, which is soft, comfortable, and resistant to scratches and stains. The special foam used is highly dense, durable, and flexible, ensuring long-lasting use. The seat is extra-wide and ergonomically designed for comfortable seating, reducing fatigue. The Kaiser 3 is also designed for easy assembly.',
      price: 20000,
    },
    {
      id: 5,
      img: [img5, product5_2, product5_3],
      name: 'Ugreen Wall Charger 1 USB-A / 2 USB-C 65W Robot Gray (TISI)',
      category: 'accessories',
      detail:
        'Ugreen Wall Charger Robot GaN is a uniquely designed robot-shaped adapter with up to 3 charging ports, allowing you to charge 3 devices simultaneously. It delivers a maximum power output of 65W and features GaN (Gallium Nitride) technology, which helps reduce heat generation and enhances charging efficiency.',
      price: 20000,
    },
    {
      id: 6,
      img: [img6, product6_2, product6_3],
      name: 'Asus Network RT-AX1800HP AX1800 Dual Band WiFi 6 Extendable Router V2',
      category: 'network',
      detail:
        '"Asus Network RT-AX1800HP is an AX1800 Dual Band WiFi 6 Extendable Router V2 that uses Wireless AX signals and supports AiMesh technology to extend WiFi coverage. It also supports MU-MIMO technology, allowing for smooth performance when multiple devices are used simultaneously. Enjoy exceptional WiFi speeds.',
      price: 20000,
    },
  ];

  const BestSellerProducts = [
    {
      id: 1,
      img: img1,
      name: 'HP DESKTOP TW PAVILION TP01-5016d SNOW WHITE',
      category: 'computer',
      brand: 'hp',
      price: 20000,
    },
    {
      id: 2,
      img: img2,
      name: 'Notebook Asus Vivobook 16X K3605ZF-RP593W (Indie Black)',
      category: 'notebook',
      brand: 'asus',
      price: 20000,
    },
    {
      id: 3,
      img: img3,
      name: 'BENQ EW3290U (IPS 60Hz USB-C SPK)',
      category: 'monitor',
      brand: 'benq',
      price: 20000,
    },
    {
      id: 4,
      img: img4,
      name: 'Anda Seat Gaming Chair Kaiser 3 Size XL Black',
      category: 'chair',
      brand: 'andaseat',
      price: 20000,
    },
    {
      id: 5,
      img: img5,
      name: 'Ugreen Wall Charger 1 USB-A / 2 USB-C 65W Robot Gray (TISI)',
      category: 'accessories',
      brand: 'ugreen',
      price: 20000,
    },
    {
      id: 6,
      img: img6,
      name: 'Asus Network RT-AX1800HP AX1800 Dual Band WiFi 6 Extendable Router V2',
      category: 'network',
      brand: 'asus',
      price: 20000,
    },
  ];

  return (
    <ShopDataContext.Provider value={{ BestSellerProducts, allProduct }}>
      {children}
    </ShopDataContext.Provider>
  );
};
