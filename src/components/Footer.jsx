import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <div className="bg-black text-white relative w-full">
      <div
        className="bg-black w-20 h-5 absolute -top-4 right-0"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)' }}
      ></div>
      <div
        className="bg-black w-20 h-5 absolute -top-4 left-0"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 80% 0, 0 0)' }}
      ></div>
      <div className="flex flex-col justify-center items-center py-10 gap-10 md:flex-row md:px-10">
        <div className="flex justify-center items-center gap-5">
          <FontAwesomeIcon icon={faPhoneVolume} size="2x" />
          <div className="text-xl">
            <h1>Order And Service</h1>
            <h1 className="text-lime-500 font-bold">02-1111111</h1>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-2 md:flex-row">
          <div className="flex flex-col justify-center items-center md:items-start">
            <h1 className="text-lime-500 font-bold text-xl">
              Subscribe to News
            </h1>
            <h1 className="text-center md:text-start">
              Get news about promotions and new products before anyone else.
            </h1>
          </div>
          <label className="input input-lg input-bordered flex items-center gap-2 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 text-black"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow text-black"
              placeholder="Email"
              required
            />
            <button className="btn btn-sm h-full absolute top-0 right-0 border-none">
              Subscribe
              <span className="text-xl text-red-500">▸</span>
            </button>
          </label>
        </div>
      </div>
      <div className="bg-lime-500 h-1 w-full my-5"></div>
      <div className="py-5 px-10 grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-5">
        <div>
          <h1 className="text-xl font-bold">Customer</h1>
          <p>Help Center</p>
          <p>My Account</p>
          <p>Track My Order</p>
        </div>
        <div>
          <h1 className="text-xl font-bold">About Us</h1>
          <p>Company Info</p>
          <p>Press Releases</p>
          <p>Careers</p>
        </div>
        <div>
          <h1 className="text-xl font-bold">Quick Links</h1>
          <p>Search</p>
          <p>Become a Reseller</p>
          <p>About Us</p>
        </div>
        <div>
          <h1 className="text-xl font-bold">My Account</h1>
          <p>Store Location</p>
          <p>Order History</p>
          <p>Wish List</p>
        </div>
        <div>
          <h1 className="font-bold">
            Nakhon Pathom, Mueang Nakhon Pathom, <br />
            Sam Kwai Phuek 73000
          </h1>
          <p>Mon – Fri: 9.00am – 5.00pm</p>
          <div className="flex gap-2">
            <i className="bx bxl-facebook-square text-white text-2xl"></i>
            <i className="bx bxl-instagram-alt text-white text-2xl"></i>
            <i className="bx bxl-tiktok text-white text-2xl"></i>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-10">
        <h1>© 2025 GearUp Tech | All Rights Reserved.</h1>
        <div className="flex gap-3">
          <i className="bx bxl-visa bx-md text-white text-2xl"></i>
          <i className="bx bxl-mastercard bx-md text-white text-2xl"></i>
          <i className="bx bxl-paypal bx-md text-white text-2xl"></i>
        </div>
      </div>
    </div>
  );
};
export default Footer;
