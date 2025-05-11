import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';
import CreateAddressForm from './../components/CreateAddressForm';
import { loadStripe } from '@stripe/stripe-js';
import { ShopDataContext } from '../context/ShopContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutReview = () => {
  const { user, userDetails, getToken, fetchUserData } =
    useContext(AuthContext);
  const { cartList, setCartList } = useContext(ShopDataContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe'); // เพิ่มสถานะ paymentMethod

  if (!user || !userDetails || !cartList) return null;

  const defaultAddress = userDetails.address.find((addr) => addr.isDefault);

  const total = cartList.items?.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const setDefaultAddress = async (addressId) => {
    try {
      const token = await getToken();
      await axios.put(
        `${backendUrl}/api/set-default-address/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success('✅ Default address updated successfully.');
      fetchUserData();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          'An error occurred while updating the default address.';
        toast.error(`❌ ${errorMessage}`);
      } else {
        toast.error('❌ Failed to connect to the server.');
      }
    }
  };

  const handlePayment = async () => {
    try {
      const token = await getToken();
      if (paymentMethod === 'stripe') {
        const stripe = await stripePromise;

        const response = await axios.post(
          `${backendUrl}/api/create-checkout-session`,
          {
            cartList,
            address: defaultAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sessionId = response.data.sessionId;
        await stripe.redirectToCheckout({ sessionId });
      } else if (paymentMethod === 'cod') {
        // สร้างคำสั่งซื้อในระบบสำหรับ COD
        const response = await axios.post(
          `${backendUrl}/api/create-cod-order`,
          {
            cartList,
            address: defaultAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success('✅ COD order placed successfully.');
        // คุณสามารถเพิ่มขั้นตอนอื่นๆ เช่น การนำผู้ใช้ไปที่หน้าอื่นหลังจากชำระเงิน
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ Payment failed. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-black p-5 rounded-t-lg text-white text-xl font-bold flex justify-between items-center mt-5 md:mt-10 lg:mt-0">
        <h1>Shipping address</h1>
        <div className="flex items-center gap-5">
          <h1 className="hidden md:block">Add/Change Address</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <i className="bx bx-edit text-2xl"></i>
          </button>
        </div>
      </div>

      <div className="bg-white p-5 shadow rounded-b-lg">
        {defaultAddress ? (
          <div className="text-gray-800">
            <h1 className="text-gray-500">Receiver name:</h1>
            <p className="font-semibold">
              {defaultAddress.firstName} {defaultAddress.lastName}
            </p>
            <h1 className="text-gray-500">Phone no.:</h1>
            <p>{defaultAddress.phoneNumber}</p>
            <h1 className="text-gray-500">Delivery address:</h1>
            <p>{defaultAddress.addressDetails}</p>
            <p>{defaultAddress.postCode}</p>
            <span className="text-sm text-lime-500 font-bold">
              Default Address
            </span>
          </div>
        ) : (
          <p className="text-gray-500">No default address set.</p>
        )}
      </div>

      <div className="bg-black p-5 rounded-t-lg text-white text-xl font-bold flex justify-between items-center mt-5 md:mt-10 lg:mt-0">
        <h1>Payment</h1>
      </div>
      <div className="bg-white p-5 shadow rounded-b-lg">
        <h1 className="text-lg font-semibold mb-2">Order Summary</h1>
        <ul className="mb-4">
          {cartList?.items?.map((item) => (
            <li
              key={item.productId._id}
              className="flex justify-between border-b py-1"
            >
              <span>
                {item.productId.name.substring(0, 20)} x {item.quantity}
              </span>
              <span>
                ฿{(item.productId.price * item.quantity).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>฿{total.toLocaleString() ?? 0}</span>
        </div>

        <div className="mt-5 flex flex-col gap-5">
          <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
          <div className="flex gap-3 items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={() => setPaymentMethod('stripe')}
            />
            <label className="mr-4"> Pay with Stripe</label>
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
            />
            <label>Cash on Delivery (COD)</label>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="mt-5 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition "
        >
          {paymentMethod === 'stripe'
            ? 'Pay with Stripe'
            : 'Place Order with COD'}
        </button>
      </div>

      {/* Address Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-circle"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">
              Select a shipping address
            </h2>

            <div className="mb-5">
              <CreateAddressForm />
            </div>

            {userDetails.address.map((addr, index) => (
              <div
                key={index}
                className="border p-4 rounded mb-3 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p>{addr.phoneNumber}</p>
                  <p>{addr.addressDetails}</p>
                  <p>{addr.postCode}</p>
                  {addr.isDefault && (
                    <span className="text-sm text-lime-500 font-bold">
                      Default
                    </span>
                  )}
                </div>
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefaultAddress(addr._id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Set as default
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutReview;
