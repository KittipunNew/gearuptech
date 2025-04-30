const Order = () => {
  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10">
      <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl">
        <i className="bx bxs-truck"></i>
        <p>My order</p>
      </div>

      <nav className="overflow-x-auto w-full pb-5">
        <ul className="flex gap-10 justify-center items-center lg:text-xl whitespace-nowrap min-w-[500px]">
          <li>
            <a href="/orders">All my order</a>
          </li>
          <li>
            <a href="/to-pay">To Pay</a>
          </li>
          <li>
            <a href="/to-receive">To Receive</a>
          </li>
          <li>
            <a href="/completed">Completed</a>
          </li>
          <li>
            <a href="/canceled">Canceled</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Order;
