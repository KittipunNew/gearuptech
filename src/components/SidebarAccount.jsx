import { Link } from 'react-router-dom';
import 'boxicons';
import { useRef } from 'react';

const SidebarAccount = () => {
  const detailsRef = useRef(null);

  const sidebarLinks = [
    {
      label: 'Account Overview',
      path: '/account/overview',
      icon: <i className="bx bx-list-ul"></i>,
    },
    {
      label: 'My Profile',
      path: '/account/account-information',
      icon: <i className="bx bx-user"></i>,
    },
    {
      label: 'Wishlist',
      path: '/account/wishlist',
      icon: <i className="bx bxs-heart"></i>,
    },
    {
      label: 'MY ORDER',
      path: '/account/order',
      icon: <i className="bx bxs-truck"></i>,
    },
    {
      label: 'My Shipping Address',
      path: '/account/shipping-address',
      icon: <i className="bx bxs-edit-location"></i>,
    },
  ];

  // ปิด dropdown ทันทีเมื่อคลิกลิงก์
  const handleLinkClick = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute('open');
    }
  };

  return (
    <div className="bg-white rounded-lg lg:h-screen lg:w-80 lg:p-10 mt-10">
      <h1 className="text-2xl font-bold mb-5 hidden lg:block">
        Manage My Account
      </h1>

      {/* Mobile & Tablet */}
      <details
        ref={detailsRef}
        className="w-full bg-base-200 lg:hidden rounded-t-lg"
      >
        <summary className="m-5 text-center flex justify-center items-center cursor-pointer text-xl">
          <h1 className="mr-2">Account Information</h1>
          <box-icon name="chevron-down" size="md"></box-icon>
        </summary>
        <ul className="p-2 w-full text-xl">
          {sidebarLinks.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-5 text-xl py-5"
                onClick={handleLinkClick}
              >
                {item.icon}
                <p>{item.label}</p>
              </Link>
            </li>
          ))}
        </ul>
      </details>

      {/* Desktop */}
      <ul className="hidden lg:flex flex-col gap-10">
        {sidebarLinks.map((item, index) => (
          <li key={index}>
            <Link to={item.path} className="flex items-center gap-2 text-xl">
              {item.icon}
              <p>{item.label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarAccount;
