const AddressSelection = ({ setIsModalOpen, selectedAddress }) => {
  return (
    <>
      <div className="text-xl font-bold flex justify-between items-center my-5">
        <h1>Shipping address</h1>
        <div className="flex items-center gap-5">
          <h1 className="hidden md:block">Add/Change Address</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-gray-300"
          >
            <i className="bx bx-edit text-2xl text-black"></i>
          </button>
        </div>
      </div>

      <div className="mt-5">
        {selectedAddress ? (
          <div className="text-gray-800">
            <h1 className="text-gray-500">Receiver name:</h1>
            <p className="font-semibold">
              {selectedAddress.firstName} {selectedAddress.lastName}
            </p>
            <h1 className="text-gray-500">Phone no.:</h1>
            <p>{selectedAddress.phoneNumber}</p>
            <h1 className="text-gray-500">Delivery address:</h1>
            <p>{selectedAddress.addressDetails}</p>
            <p>{selectedAddress.postCode}</p>
            {selectedAddress.isDefault && (
              <p className="text-sm text-gray-500">(Default address)</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">No address selected.</p>
        )}
      </div>
    </>
  );
};
export default AddressSelection;
