import CreateAddressForm from './CreateAddressForm';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AddressModal = ({
  isModalOpen,
  setIsModalOpen,
  addresses,
  selectedAddress,
  handleSelectAddress,
}) => {
  const { fetchUserData } = useContext(AuthContext);
  return (
    isModalOpen && (
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

          <h2 className="text-xl font-bold mb-4">Select a shipping address</h2>

          <div className="mb-5">
            <CreateAddressForm onSuccess={fetchUserData} />
          </div>

          {addresses.map((addr) => (
            <div
              key={addr._id}
              className={`border p-4 rounded mb-3 flex justify-between items-start ${
                selectedAddress?._id === addr._id
                  ? 'border-lime-500 border-2'
                  : ''
              }`}
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
              <button
                onClick={() => handleSelectAddress(addr)}
                className="text-blue-600 hover:underline text-sm"
              >
                {selectedAddress?._id === addr._id ? 'Selected' : 'Select'}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default AddressModal;
