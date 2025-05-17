import { useContext, useState } from 'react';
import { OrderContext } from './../../context/OrderContext';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Pending = () => {
  const { pending } = useContext(OrderContext);
  const [openOrderIds, setOpenOrderIds] = useState({});

  if (!pending) return null;

  const toggleDropdown = (orderId) => {
    setOpenOrderIds((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const formatCurrency = (amount) =>
    `฿${amount.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

  return (
    <div className="p-4 space-y-6">
      {pending.map((order) => {
        const isOpen = openOrderIds[order._id];
        const firstItem = order.products[0];
        const hasMultipleItems = order.products.length > 1;

        return (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-4 bg-white"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex gap-4 items-start">
                <img
                  src={firstItem.productId.images[0]}
                  alt=""
                  className="w-10 h-10 object-cover rounded"
                />
                <div>
                  <h1 className="font-semibold md:text-xl">
                    {firstItem.productId.name}
                  </h1>
                  <p className="text-gray-600 text-sm mt-1 md:text-lg">
                    Quantity: {firstItem.quantity}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 md:text-md">
                    Order ID: {order.shortOrderId}
                  </p>
                  <p className="text-xs text-gray-500 md:text-md">
                    Payment: {order.paymentStatus}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 md:text-lg">
                    {order.products.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                    item(s) • Total:{' '}
                    <span className="font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </span>{' '}
                  </p>
                </div>
              </div>
            </div>
            {hasMultipleItems && (
              <button
                onClick={() => toggleDropdown(order._id)}
                className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded flex justify-center items-center hover:bg-gray-200 transition text-sm"
              >
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            )}

            {/* Other Items */}
            {isOpen && hasMultipleItems && (
              <div className="mt-4 space-y-3 border-t pt-4">
                {order.products.slice(1).map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.productId.images[0]}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h1 className="font-medium">{item.productId.name}</h1>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Pending;
