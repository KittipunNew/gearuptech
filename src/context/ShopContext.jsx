import { createContext, useState } from 'react';

import img1 from '../assets/bestseller/products36070_800.jpg';

export const ShopDataContext = createContext();

export const ShopDataProvider = ({ children }) => {
  const BestSellerProducts = [
    {
      id: 1,
      img: img1,
      name: 'NOTEBOOK ASUS VIVOBOOK GO 15 X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
    {
      id: 2,
      img: img1,
      name: 'X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
    {
      id: 3,
      img: img1,
      name: 'X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
    {
      id: 4,
      img: img1,
      name: 'X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
    {
      id: 5,
      img: img1,
      name: 'X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
    {
      id: 6,
      img: img1,
      name: 'X1504GA-NJ322W (MIXED BLACK)',
      price: '13,490',
    },
  ];

  return (
    <ShopDataContext.Provider value={{ BestSellerProducts }}>
      {children}
    </ShopDataContext.Provider>
  );
};
