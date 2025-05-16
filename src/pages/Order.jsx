import { useLocation, Link, Outlet } from 'react-router-dom';

const Order = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === `/account/orders${path}`;

  const linkClass = (path) =>
    `hover:border-b-2 border-lime-500 ${
      isActive(path)
        ? 'text-lime-500 border-b-2 border-lime-500'
        : 'text-gray-700'
    }`;

  return (
    <div className="bg-white p-5 w-full lg:p-10">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl">
          <i className="bx bxs-truck"></i>
          <p>My order</p>
        </div>

        <nav className="overflow-x-auto w-full pb-5 scrollbar-thumb-lime-500 scrollbar-track-white scrollbar-thin">
          <ul className="flex gap-10 justify-center items-center lg:text-xl whitespace-nowrap min-w-[500px] md:justify-around">
            <li>
              <Link
                to="/account/orders/pending"
                className={linkClass('/pending')}
              >
                Pending
              </Link>
            </li>
            <li>
              <Link
                to="/account/orders/processing"
                className={linkClass('/processing')}
              >
                Processing
              </Link>
            </li>
            <li>
              <Link
                to="/account/orders/shipped"
                className={linkClass('/shipped')}
              >
                Shipped
              </Link>
            </li>
            <li>
              <Link
                to="/account/orders/delivered"
                className={linkClass('/delivered')}
              >
                Delivered
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Order;
