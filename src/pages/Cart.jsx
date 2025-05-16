import { useContext, useEffect, useState } from 'react';
import { ShopDataContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl, stripePromise } from '../App';
import { toast } from 'react-toastify';
import CartItem from './../components/CartItem';
import CartSummary from './../components/CartSummary';
import AddressSelection from './../components/AddressSelection';
import PaymentMethod from '../components/PaymentMethod';
import AddressModal from './../components/AddressModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit card');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const { userDetails, getToken } = useContext(AuthContext);
  const { cartList, total, cartCount, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  if (!userDetails || !cartList) return;

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
      // ชำระเงินผ่าน credit card
      if (paymentMethod === 'credit_card') {
        const response = await axios.post(
          `${backendUrl}/api/create-checkout-session/${userDetails._id}`,
          {
            cartList: cartList.items,
            address: selectedAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { sessionId } = response.data;

        // Redirect ไปที่หน้า Stripe Checkout
        const stripe = await stripePromise;
        clearCart();
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
          console.error(error);
          toast.error('❌ Payment failed. Please try again.');
        }

        // ชำระเงินปลายทาง
      } else if (paymentMethod === 'cod') {
        await axios.post(
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
