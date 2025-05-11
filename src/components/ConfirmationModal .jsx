const ConfirmationModal = ({
  showConfirmationModal,
  setShowConfirmationModal,
  confirmOrder,
}) => {
  return (
    showConfirmationModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
          <h2 className="text-xl font-bold mb-4">Confirm Your Order</h2>
          <p className="mb-4">Are you sure you want to place this order?</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="btn"
            >
              Cancel
            </button>
            <button
              onClick={confirmOrder}
              className="btn bg-lime-500 text-white hover:bg-lime-600"
            >
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default ConfirmationModal;
