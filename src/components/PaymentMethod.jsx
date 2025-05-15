const PaymentMethod = ({
  paymentMethod,
  setPaymentMethod,
  selectedAddress,
  handlePayment,
}) => {
  return (
    <>
      <div className="mt-5 flex flex-col gap-5">
        <h2 className="text-lg font-semibold mb-2">Select Payment Method</h2>
        <div className="flex gap-3 items-center">
          <input
            type="radio"
            name="paymentMethod"
            value="credit_card"
            checked={paymentMethod === 'credit_card'}
            onChange={() => setPaymentMethod('credit_card')}
          />
          <label className="mr-4"> Pay with Credit Card</label>
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
        disabled={!selectedAddress}
      >
        {paymentMethod === 'credit_card'
          ? 'Pay with Credit Card'
          : 'Place Order with COD'}
      </button>
    </>
  );
};
export default PaymentMethod;
