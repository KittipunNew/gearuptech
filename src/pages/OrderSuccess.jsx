import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // คุณอาจจะเรียก API เพื่อยืนยันการชำระเงินกับ backend ของคุณที่นี่
      console.log('Payment successful with session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your purchase.</p>
    </div>
  );
};

export default OrderSuccess;
