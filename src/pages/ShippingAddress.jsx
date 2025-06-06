import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import CreateAddressForm from './../components/CreateAddressForm';
import EditAddress from '../components/EditAddress';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../App';

const ShippingAddress = () => {
  const { user, userDetails, getToken, fetchUserData } =
    useContext(AuthContext);
  const [editAddress, setEditAddress] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    addressType: '',
    addressDetails: '',
    postCode: '',
    isDefault: false,
  });

  if (!user || !userDetails) return null;

  // รับค่ามาอัพเดทใน state editAddress
  const handleEditChange = (field, value) => {
    setEditAddress((prev) => ({ ...prev, [field]: value }));
  };

  // แก้ไขข้อมูลที่อยู่
  const onSubmitEdit = async (e, id) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.put(`${backendUrl}/api/update-address/${id}`, editAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('✅ The address was successfully updated.');
      setEditAddress({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        addressType: '',
        addressDetails: '',
        postCode: '',
      });
      // ปิด modal
      const modalCheckbox = document.getElementById(`modal_edit_address_${id}`);
      if (modalCheckbox) modalCheckbox.checked = false;

      fetchUserData();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message ||
          'An error occurred while updating the address.';
        toast.error(`❌ ${errorMessage}`);
      } else {
        toast.error('❌ Failed to connect to the server.');
      }
    }
  };

  // ลบข้อมูลที่อยู่
  const handleDeleteAddress = async (id) => {
    try {
      const token = await getToken();
      await axios.delete(`${backendUrl}/api/delete-address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const modalCheckbox = document.getElementById(`modal_edit_address_${id}`);
      if (modalCheckbox) modalCheckbox.checked = false;
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
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
            <div className="flex gap-5">
              <h1 className="font-bold bg-lime-500 px-5 rounded-full text-white">
                {item.addressType.toUpperCase()}
              </h1>
              {item.isDefault ? (
                <h1 className="font-bold bg-amber-300 px-5 rounded-full text-white">
                  Default
                </h1>
              ) : (
                ''
              )}
            </div>

            {/* Dropdown แก้ไขและลบที่อยู่*/}
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
                  <button
                    className="lg:text-lg text-white font-bold btn btn-error"
                    onClick={() => handleDeleteAddress(item._id)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* รายการที่อยู่ */}
          <div>
            <h1>{`${item.firstName} ${item.lastName}`}</h1>
            <p>{item.phoneNumber}</p>
            <p>{item.addressDetails}</p>
            <p>{item.postCode}</p>
          </div>

          {/* แก้ไขที่อยู่ */}
          <EditAddress
            item={item}
            editAddress={editAddress}
            handleEditChange={handleEditChange}
            onSubmitEdit={onSubmitEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default ShippingAddress;
