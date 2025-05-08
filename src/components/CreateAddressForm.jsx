import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import InputField from './InputField';
import SelectField from './SelectField';

const CreateAddressForm = () => {
  const { user, userDetails, getToken, fetchUserData } =
    useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [addressType, setAddressType] = useState('');
  const [addressDetails, setAdressDetails] = useState('');
  const [postCode, setPostCode] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const modalRef = useRef(null);

  if (!user || !userDetails) return null;

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
            isDefault,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('✅ Added address already');
      modalRef.current.close();
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button
        className={`btn lg:btn-lg`}
        onClick={() => modalRef.current.showModal()}
      >
        <i className="bx bx-plus"></i>
        <p>Add new address</p>
      </button>
      <dialog id="modal_create_address" className="modal" ref={modalRef}>
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
              createOrEdit="create"
              value={firstName}
              setValue={setFirstName}
              id="create_receiver_first_name"
            />
            <InputField
              label="Receiver last name"
              createOrEdit="create"
              value={lastName}
              setValue={setLastName}
              id="create_receiver_last_name"
            />
            <InputField
              label="Phone no."
              createOrEdit="create"
              value={phoneNumber}
              setValue={setPhoneNumber}
              id="create_phone_number"
            />
            <h1 className="mb-3">Address information</h1>
            <SelectField
              label="Address Type"
              createOrEdit="create"
              value={addressType}
              setValue={setAddressType}
              options={[
                { label: 'Home', value: 'home' },
                { label: 'Work', value: 'work' },
                { label: 'Condo', value: 'condo' },
              ]}
              id="create_address_type"
            />
            <InputField
              label="Address no., Village/Bldg., Soi, Road"
              createOrEdit="create"
              value={addressDetails}
              setValue={setAdressDetails}
              id="create_address_details"
            />
            <InputField
              label="Postcode"
              createOrEdit="create"
              value={postCode}
              setValue={setPostCode}
              id="create_postcode"
            />

            <div className="flex items-center gap-2 my-5">
              <input
                type="checkbox"
                id="create_default"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="p-3 rounded-full"
              />
              <label htmlFor="create_default" className="label cursor-pointer">
                <span className="label-text">Set as default address</span>
              </label>
            </div>

            <button
              type="submit"
              className="flex justify-center w-full btn btn-success"
            >
              <div className=" text-white">Save</div>
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CreateAddressForm;
