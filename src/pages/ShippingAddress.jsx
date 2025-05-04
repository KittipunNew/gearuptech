import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import CreateAddressForm from './../components/CreateAddressForm';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

const ShippingAddress = () => {
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

  // รับค่ามาอัพเดทใน state editAddress
  const handleEditChange = (field, value) => {
    setEditAddress((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10 rounded-b-lg">
      <div className="flex items-center justify-between gap-2 font-bold text-xl lg:text-2xl">
        <div className="flex items-center gap-2">
          <i className="bx bxs-edit-location"></i>
          <p>My Shipping Address</p>
        </div>
      </div>

      <CreateAddressForm />

      {userDetails.address.map((item) => (
        <div
          className="flex flex-col gap-2 lg:text-xl rounded-md border-2 p-5"
          key={item._id}
        >
          <div className="flex justify-between items-center">
            <h1 className="font-bold">{item.addressType.toUpperCase()}</h1>
            {/* Dropdown edit&delete*/}
            <div className="dropdown dropdown-hover dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:btn-lg  m-1"
              >
                <i className="bx bx-dots-vertical-rounded"></i>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow flex flex-col gap-2"
              >
                <li>
                  <label
                    htmlFor={`modal_edit_address_${item._id}`}
                    className="btn btn-ghost"
                    onClick={() =>
                      setEditAddress({
                        firstName: item.firstName,
                        lastName: item.lastName,
                        phoneNumber: item.phoneNumber,
                        addressType: item.addressType,
                        addressDetails: item.addressDetails,
                        postCode: item.postCode,
                      })
                    }
                  >
                    Edit Address
                  </label>
                </li>
                <li>
                  <button className="lg:text-lg text-white font-bold btn btn-error">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h1>{`${item.firstName} ${item.lastName}`}</h1>
            <p>{item.phoneNumber}</p>
            <p>{item.addressDetails}</p>
            <p>{item.postCode}</p>
          </div>

          {/* Modal edit */}
          <input
            type="checkbox"
            id={`modal_edit_address_${item._id}`}
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box absolute z-50">
              <div className="modal-action">
                <label
                  htmlFor={`modal_edit_address_${item._id}`}
                  className="btn btn-ghost text-xl"
                >
                  X
                </label>
              </div>
              <div>
                <h3 className="font-bold text-lg">Edit address</h3>
                <form className="flex flex-col gap-2 lg:text-xl mt-5">
                  <h1 className="mb-3">Contact information</h1>
                  <InputField
                    id={`receiver_first_name_${item._id}`}
                    createOrEdit="edit"
                    label="Receiver first name"
                    value={editAddress.firstName}
                    setValue={(val) => handleEditChange('firstName', val)}
                  />
                  <InputField
                    id={`receiver_last_name_${item._id}`}
                    createOrEdit="edit"
                    label="Receiver last name"
                    value={editAddress.lastName}
                    setValue={(val) => handleEditChange('lastName', val)}
                  />
                  <InputField
                    id={`phone_number_${item._id}`}
                    createOrEdit="edit"
                    label="Phone no."
                    value={editAddress.phoneNumber}
                    setValue={(val) => handleEditChange('phoneNumber', val)}
                  />

                  <SelectField
                    id={`address_type_${item._id}`}
                    createOrEdit="edit"
                    label="Address Type"
                    value={editAddress.addressType}
                    setValue={(val) => handleEditChange('addressType', val)}
                    options={[
                      { label: 'Home', value: 'home' },
                      { label: 'Work', value: 'work' },
                      { label: 'Condo', value: 'condo' },
                    ]}
                  />

                  <InputField
                    id={`address_details_${item._id}`}
                    createOrEdit="edit"
                    label="Address no., Village/Bldg., Soi, Road"
                    value={editAddress.addressDetails}
                    setValue={(val) => handleEditChange('addressDetails', val)}
                  />
                  <InputField
                    id={`postcode_${item._id}`}
                    createOrEdit="edit"
                    label="Postcode"
                    value={editAddress.postCode}
                    setValue={(val) => handleEditChange('postCode', val)}
                  />

                  <button
                    type="submit"
                    className="flex justify-center w-full btn btn-success text-white"
                    // onClick={
                    //   (document.getElementById(
                    //     `modal_edit_address_${item._id}`
                    //   ).checked = false)
                    // }
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingAddress;
