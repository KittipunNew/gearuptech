import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import logoImg from '../assets/logo.png';

import 'boxicons';
import { ShopDataContext } from '../context/ShopContext';
import { TokenContext } from '../context/TokenContext';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');

  const { products } = useContext(ShopDataContext);
  const { user } = useContext(TokenContext);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

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
          <img src={logoImg} alt="logo" className="w-28 lg:w-40" />
        </Link>
      </div>

      {/* เมนูใหญ่ */}
      <div className="hidden lg:block">
        <ul className="flex gap-5 font-bold">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/productlist/pc">Computer</NavLink>
          <NavLink to="/productlist/notebook">Notebook</NavLink>
          <NavLink to="/productlist/monitor">Monitors</NavLink>
          <NavLink to="/productlist/accessorie">Accessories</NavLink>
          <NavLink to="/productlist/network">Network</NavLink>
        </ul>
      </div>

      <div className="relative flex gap-10">
        {/* ค้นหา */}
        <div className="hidden lg:block">
          <label className="input input-bordered flex items-center gap-2 text-black">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button>
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
            </button>
          </label>

          {searchInput && (
            <ul className="absolute top-full left-0 mt-1 w-full max-h-60 overflow-y-auto bg-white text-black border rounded shadow z-50">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <li key={item._id}>
                    <Link
                      to={`/productdetail/${item._id}`}
                      className="block px-4 py-2 hover:bg-gray-200"
                      onClick={() => setSearchInput('')}
                    >
                      <div className="flex items-center gap-5">
                        <img src={item.images[0]} alt="" className="w-10" />
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-400">No products found</li>
              )}
            </ul>
          )}
        </div>

        {/* User / Cart */}
        <div className="flex gap-3">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-square">
              <box-icon name="user"></box-icon>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-1 text-black text-xl gap-2"
            >
              {user ? (
                <>
                  <Link>
                    <li>Profile</li>
                  </Link>
                </>
              ) : (
                <>
                  {/* ปุ่มเปิด modal สำหรับ login*/}
                  <label htmlFor="modal_login" className="btn btn-ghost">
                    Sign in
                  </label>
                  <Link to="/register" className="hover:bg-base-300 p-2">
                    <li>Sign up</li>
                  </Link>
                </>
              )}
            </ul>
          </div>

          <div>
            <button className="btn btn-square bg-white">
              <box-icon name="cart-alt"></box-icon>
            </button>
          </div>

          {/* จำนวนในตะกร้า */}
          <span
            className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ${
              cartCount === 0 ? 'hidden' : 'flex'
            }`}
          >
            {cartCount}
          </span>
        </div>
      </div>

      {/* Modal login */}
      <input type="checkbox" id="modal_login" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box text-white bg-black pb-20 shadow-[0_0_80px_rgba(240,240,240,1.0)]">
          <div className="modal-action">
            <label htmlFor="modal_login" className="btn btn-ghost text-xl">
              X
            </label>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            <div>
              <img src={logoImg} alt="" className="w-40" />
            </div>
            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="font-bold text-center">
                Welcome to GearUp Online Store
              </h1>
              <h2>Sign In</h2>
              {/* username */}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-black"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input type="text" className="grow" placeholder="Username" />
              </label>
              {/* password */}
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-4 w-4 opacity-70 text-black"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow text-black"
                  value="password"
                />
              </label>
              <div className="form-control w-full">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="checkbox checkbox-success"
                  />
                  <span className="label-text">Remember me</span>
                </label>
              </div>
              <button className="btn btn-wide bg-lime-500 border-none text-white">
                Sign In
              </button>

              <h1>
                Don’t have an account?{' '}
                <Link className="text-lime-500">Sign up</Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
