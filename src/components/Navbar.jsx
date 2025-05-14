import { useContext, useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logoImg from '../assets/logo.png';
import { auth, signInWithEmailAndPassword } from '../firebase';
import { signOut } from 'firebase/auth';
import 'boxicons';
import { ShopDataContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const detailsRef = useRef(null);

  const { user, userDetails, setUser, setUserDetails } =
    useContext(AuthContext);
  const { products, cartCount, setCartList } = useContext(ShopDataContext);

  const handleLinkClick = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      if (user) {
        document.getElementById('modal_login').checked = false;
        navigate('/');
      }

      if (userDetails) {
        toast.success(`👋 Welcome, ${userDetails.firstName}!`);
      }
    } catch (error) {
      console.log(error);
      toast.error('The information is incorrect. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserDetails(null);
      setCartList({ items: [] });
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('❌ Logout failed');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <nav className="bg-black text-white flex items-center justify-between py-2 px-5 shadow-md md:py-5 fixed w-full z-50">
      {/* Mobile & Tablet menu */}
      <div className="flex items-center gap-2">
        <details className="dropdown xl:hidden" ref={detailsRef}>
          <summary className="btn btn-square m-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black text-lg font-semibold space-y-3">
            <li>
              <NavLink to="/" onClick={handleLinkClick}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist" onClick={handleLinkClick}>
                All Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist/pc" onClick={handleLinkClick}>
                Computer
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist/notebook" onClick={handleLinkClick}>
                Notebook
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist/monitor" onClick={handleLinkClick}>
                Monitors
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist/accessorie" onClick={handleLinkClick}>
                Accessories
              </NavLink>
            </li>
            <li>
              <NavLink to="/productlist/network" onClick={handleLinkClick}>
                Network
              </NavLink>
            </li>
          </ul>
        </details>

        {/* LOGO */}
        <Link to="/">
          <img src={logoImg} alt="logo" className="w-28 lg:w-40" />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden xl:block">
        <ul className="flex gap-5 font-bold">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/productlist/pc">Computer</NavLink>
          </li>
          <li>
            <NavLink to="/productlist/notebook">Notebook</NavLink>
          </li>
          <li>
            <NavLink to="/productlist/monitor">Monitors</NavLink>
          </li>
          <li>
            <NavLink to="/productlist/accessorie">Accessories</NavLink>
          </li>
          <li>
            <NavLink to="/productlist/network">Network</NavLink>
          </li>
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
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-square ${user ? 'w-auto px-5' : ''}`}
            >
              <box-icon name="user"></box-icon>
              <h1 className={`hidden ${user ? 'md:block' : 'hidden'}`}>
                {userDetails ? userDetails.firstName : ''}
              </h1>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-1 text-black text-xl gap-2"
            >
              {user ? (
                <>
                  <li>
                    <Link to="/account/overview" className="btn btn-ghost">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/wishlist" className="btn btn-ghost">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/account/orders" className="btn btn-ghost">
                      order
                    </Link>
                  </li>
                  <li>
                    <button
                      className="btn btn-error text-white"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <label htmlFor="modal_login" className="btn btn-ghost">
                      Sign in
                    </label>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-ghost">
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <Link to="/cart" className="btn btn-square bg-white">
              <box-icon name="cart-alt"></box-icon>
            </Link>
          </div>

          {/* จำนวนในตะกร้า */}
          <span
            className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ${
              cartCount === 0 ? 'hidden' : 'flex'
            }`}
          >
            {cartCount >= 100 ? '99+' : cartCount}
          </span>
        </div>
      </div>

      {/* Modal login */}
      <input
        type="checkbox"
        id="modal_login"
        className={`modal-toggle ${user ? 'hidden' : ''}`}
      />
      <div className="modal">
        <div className="modal-box text-white bg-black pb-20 shadow-[0_0_80px_rgba(240,240,240,1.0)]">
          <div className="modal-action">
            <label htmlFor="modal_login" className="btn btn-ghost text-xl">
              X
            </label>
          </div>
          <div className="flex flex-col items-center justify-center gap-10">
            {/* Logo */}
            <div>
              <img src={logoImg} alt="" className="w-40" />
            </div>

            <div className="flex flex-col items-center justify-center gap-5">
              <h1 className="font-bold text-center text-xl">
                Welcome to GearUp Online Store
              </h1>
              <h2 className="font-bold text-xl">Sign In</h2>

              <form
                className="flex flex-col items-center justify-center gap-5"
                onSubmit={handleLogin}
              >
                {/* username */}
                <label className="input input-bordered input-xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>

                  <input
                    type="email"
                    className="grow text-black"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                {/* password */}
                <label className="input input-bordered input-xl flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                    />
                  </svg>

                  <input
                    type="password"
                    placeholder="Password"
                    className="grow text-black"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <button className="btn btn-wide btn-xl bg-lime-500 border-none text-white">
                  Sign In
                </button>
              </form>

              <h1>
                Don’t have an account?{' '}
                <Link
                  onClick={() =>
                    (document.getElementById('modal_login').checked = false)
                  }
                  to="/register"
                  className="text-lime-500"
                >
                  Sign up
                </Link>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
