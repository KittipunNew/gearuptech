import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Wishlist = () => {
  const { user, userDetails } = useContext(AuthContext);

  if (!user || !userDetails) return null;

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10">
      <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl">
        <i className="bx bxs-heart"></i>
        <p>Wishlist</p>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 lg:text-xl">
        {userDetails.wishlist && userDetails.wishlist.length > 0 ? (
          userDetails.wishlist.map((item) => <p key={item.id}>{item.name}</p>)
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-lg">Your Wishlist is empty</p>
            <p className="text-center">
              Start shopping and show some love by adding products to your
              wishlist.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Wishlist;
