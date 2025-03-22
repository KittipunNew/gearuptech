import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logoImg from '../assets/logo.png';

import 'boxicons';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(2);
  const [searchInput, setSearchInput] = useState('');

  return (
    <nav className="bg-black text-white flex items-center justify-between py-2 px-5 shadow-md md:py-5">
      <div className="flex items-center gap-2">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-square m-2 p-2 bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black font-bold text-xl space-y-5"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/productlist">All Products</NavLink>
            </li>
            <li>
              <a>Computer</a>
            </li>
            <li>
              <a>Notebook</a>
            </li>
            <li>
              <a>Monitors</a>
            </li>
            <li>
              <a>Accessories</a>
            </li>
            <li>
              <a>Network</a>
            </li>
          </ul>
        </div>
        {/* LOGO */}
        <Link to="/">
          <img src={logoImg} alt="" className="w-28 lg:w-40" />
        </Link>
      </div>
      <div className="hidden lg:block">
        <ul className="flex gap-5 font-bold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/productlist/computer">Computer</NavLink>
          <NavLink to="/productlist/notebook">Notebook</NavLink>
          <NavLink to="/productlist/monitor">Monitors</NavLink>
          <NavLink to="/productlist/accessories">Accessories</NavLink>
          <NavLink to="/productlist/network">Network</NavLink>
        </ul>
      </div>
      <div className="relative flex gap-10">
        <div className="hidden lg:block">
          <label className="input input-bordered flex items-center gap-2 text-black">
            <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-square bg-white">
            <box-icon name="user"></box-icon>
          </button>
          <button className="btn btn-square bg-white">
            <box-icon name="cart-alt"></box-icon>
          </button>
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {cartCount}
          </span>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
