import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const ShippingAddress = () => {
  const { user, userDetails, getToken } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressType, setAddressType] = useState('');
  const [addressDetails, setAdressDetails] = useState('');
  const [postCode, setPostCode] = useState('');

  if (!user || !userDetails) return null;

  console.log(userDetails.address.map((item) => item.firstName));
  const handleCreateAddress = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      await axios.post(
        `${backendUrl}/api/create-address`,
        {
          address: {
            firstName,
            lastName,
            phoneNumber,
            addressType,
            addressDetails,
            postCode,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('✅ Added address already');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10">
      <div className="flex items-center justify-between gap-2 font-bold text-xl lg:text-2xl">
        <div className="flex items-center gap-2">
          <i className="bx bxs-edit-location"></i>
          <p>My Shipping Address</p>
        </div>
      </div>

      <button
        className="btn lg:btn-lg"
        onClick={() =>
          document.getElementById('modal_create_address').showModal()
        }
      >
        <i className="bx bx-plus"></i>
        <p>Add new address</p>
      </button>
      <dialog id="modal_create_address" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add new address</h3>

          <form
            className="flex flex-col gap-2 lg:text-xl mt-5"
            onSubmit={handleCreateAddress}
          >
            <h1 className="mb-3">Contact information</h1>
            <InputField
              label="Receiver first name"
              value={firstName}
              setValue={setFirstName}
            />
            <InputField
              label="Receiver last name"
              value={lastName}
              setValue={setLastName}
            />
            <InputField
              label="Phone no."
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
            <h1 className="mb-3">Address information</h1>
            <SelectField
              label="Address Type"
              value={addressType}
              setValue={setAddressType}
              options={[
                { label: 'Home', value: 'home' },
                { label: 'Work', value: 'work' },
                { label: 'Condo', value: 'condo' },
              ]}
            />
            <InputField
              label="Address no., Village/Bldg., Soi, Road"
              value={addressDetails}
              setValue={setAdressDetails}
            />
            <InputField
              label="Postcode"
              value={postCode}
              setValue={setPostCode}
            />
            <button
              method="dialog"
              className="flex justify-center w-full btn btn-success"
            >
              <div className=" text-white">Save</div>
            </button>
          </form>
        </div>
      </dialog>

      {userDetails.address.map((item, index) => (
        <div
          className="flex flex-col gap-2 lg:text-xl rounded-md border-2 p-5"
          key={index}
        >
          <div className="flex justify-between">
            <h1 className="font-bold">{item.addressType.toUpperCase()}</h1>
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>

          <div>
            <h1>{`${item.firstName} ${item.lastName}`}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

const InputField = ({ label, type = 'text', value, setValue, placeholder }) => (
  <div className="relative z-0 w-full mb-5 group">
    <input
      type={type}
      name={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      id={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className={`block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl`}
      placeholder={placeholder}
      required
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
    <label
      htmlFor={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
    >
      {label}
    </label>
  </div>
);

const SelectField = ({ label, value, setValue, options }) => (
  <div className="relative z-0 w-full mb-5 group">
    <select
      name={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      id={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    >
      <option value="" disabled>
        Select {label.toLowerCase()}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    <label
      htmlFor={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
    >
      {label}
    </label>
  </div>
);
export default ShippingAddress;
