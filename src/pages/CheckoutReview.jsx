import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const CheckoutReview = () => {
  const { user, userDetails } = useContext(AuthContext);
  const [editAddress, setEditAddress] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressType: '',
    addressDetails: '',
    postCode: '',
  });

  if (!user || !userDetails) return null;

  return (
    <>
      <div className="bg-black p-5 rounded-t-lg text-white text-xl font-bold flex justify-between">
        <h1>Shipping address</h1>
        <button>
          <i className="bx bx-edit"></i>
        </button>
      </div>
      <div className="bg-white p-5">
        {userDetails.address.map((addr, index) => (
          <div key={index}>
            <input
              type="radio"
              name="selectedAddress"
              value={index}
              onChange={() => setSelectedAddress(index)}
            />
            <label>
              {addr.firstName} {addr.lastName} | {addr.addressDetails} |{' '}
              {addr.postCode}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
export default CheckoutReview;
