import { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CreateAddressForm from './../components/CreateAddressForm';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import CartItem from './../components/CartItem';
import CartSummary from './../components/CartSummary';
import AddressSelection from './../components/AddressSelection';
import PaymentMethod from '../components/PaymentMethod ';
import AddressModal from './../components/AddressModal';
import ConfirmationModal from '../components/ConfirmationModal ';

const Cart = () => {
  const { userDetails, getToken, fetchUserData } = useContext(AuthContext);
  const { cartList, total, cartCount, clearCart } = useContext(ShopDataContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const navigate = useNavigate();

  if (!userDetails && !cartList) return;

  useEffect(() => {
    if (userDetails) {
      setAddresses(userDetails.address);
      const defaultAddr = userDetails.address.find((addr) => addr.isDefault);
      setDefaultAddress(defaultAddr);
      setSelectedAddress(defaultAddr); // ตั้งค่าที่อยู่ที่เลือกเป็นที่อยู่ default เริ่มต้น
    }
  }, [userDetails]);

  // เลือกที่อยู่
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setIsModalOpen(false);
  };

  // เปิด modal ยืนยันการสั่งซื้อ
  const handlePayment = async () => {
    if (!selectedAddress) {
      toast.error('❌ Please select a shipping address');
      return;
    }

    setShowConfirmationModal(true);
  };

  // ยืนยันการสั่งซื้อ
  const confirmOrder = async () => {
    setShowConfirmationModal(true);

    try {
      const token = await getToken();
      if (paymentMethod === 'stripe') {
        const stripe = await stripePromise;

        const response = await axios.post(
          `${backendUrl}/api/create-checkout-session`,
          {
            cartList,
            address: selectedAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        const sessionId = response.data.sessionId;
        await stripe.redirectToCheckout({ sessionId });
      } else if (paymentMethod === 'cod') {
        const response = await axios.post(
          `${backendUrl}/api/create-cod-order/${userDetails._id}`,
          {
            cartList,
            address: selectedAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success('✅ COD order placed successfully.');
        clearCart();
        navigate('/place-order-success');
      }
    } catch (error) {
      console.error(error);
      toast.error('❌ Payment failed. Please try again.');
    }
  };

  return (
    <>
      <div className="bg-white p-5 flex flex-col">
        <div className="w-full">
          <div className="text-center text-xl font-medium mb-5 bg-base-200 p-5 lg:hidden">
            <h1>
              Total{' '}
              <span className="text-xl">
                {total?.toLocaleString()} <span className="text-lg">฿</span>
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-bold">
              Cart ({cartCount})
            </h1>
            <CartItem />
          </div>
        </div>

        <CartSummary />

        <div>
          <AddressSelection
            selectedAddress={selectedAddress}
            setIsModalOpen={setIsModalOpen}
          />

          <PaymentMethod
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            selectedAddress={selectedAddress}
            handlePayment={handlePayment}
          />
        </div>
      </div>

      {/* Address Selection Modal */}
      <AddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        addresses={addresses}
        selectedAddress={selectedAddress}
        handleSelectAddress={setSelectedAddress}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        showConfirmationModal={showConfirmationModal}
        setShowConfirmationModal={setShowConfirmationModal}
        confirmOrder={confirmOrder}
      />
    </>
  );
};
export default Cart;
