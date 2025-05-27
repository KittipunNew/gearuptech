import { useContext, useEffect, useRef, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion, useAnimation } from 'framer-motion';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { backendUrl } from '../App';
import { AuthContext } from '../context/AuthContext';

const PaymentSuccess = () => {
  const [orderInfo, setOrderInfo] = useState(null);
  const controls = useAnimation();
  const confettiRef = useRef(null);
  const [searchParams] = useSearchParams();
  const { getToken } = useContext(AuthContext);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    console.log('🔍 sessionId:', sessionId); // <== เพิ่มตรงนี้
    if (!sessionId) return;

    const fetchOrder = async () => {
      try {
        const token = await getToken();
        const response = await axios.get(
          `${backendUrl}/api/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('🎯 Order info response:', response.data);
        setOrderInfo(response.data);
      } catch (err) {
        console.error('Failed to fetch order info:', err);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    // Main animation sequence
    const animate = async () => {
      await controls.start({
        scale: [0, 1.1, 1],
        opacity: [0, 1],
        transition: { duration: 0.6 },
      });

      // Create confetti effect
      if (confettiRef.current) {
        for (let i = 0; i < 100; i++) {
          const confetti = document.createElement('div');
          confetti.className = `absolute w-2 h-2 rounded-full ${
            [
              'bg-blue-400',
              'bg-green-400',
              'bg-yellow-400',
              'bg-pink-400',
              'bg-purple-400',
            ][Math.floor(Math.random() * 5)]
          }`;
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.top = `${-10}px`;
          confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

          const animation = confetti.animate(
            [
              { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
              {
                transform: `translate(${Math.random() * 200 - 100}px, ${
                  window.innerHeight
                }px) rotate(${Math.random() * 360}deg)`,
                opacity: 0,
              },
            ],
            {
              duration: 2000 + Math.random() * 3000,
              easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            }
          );

          confettiRef.current.appendChild(confetti);
          animation.onfinish = () => confetti.remove();
        }
      }
    };

    animate();
  }, [controls]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti container */}
      <div
        ref={confettiRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={controls}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              transition: { repeat: Infinity, repeatDelay: 2 },
            }}
          >
            <CheckCircleIcon className="h-20 w-20 text-green-500" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-600 mb-6"
        >
          Your payment has been processed successfully.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-100 p-4 rounded-lg mb-6"
        >
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order ID:</span>
            <span className="font-medium">#{orderInfo?.shortOrderId}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">
              ${(orderInfo?.totalAmount / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date:</span>
            <span className="font-medium">
              {new Date(orderInfo?.createdAt).toLocaleString()}
            </span>
          </div>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
