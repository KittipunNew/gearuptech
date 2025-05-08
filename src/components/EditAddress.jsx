import InputField from './InputField';
import SelectField from './SelectField';

const EditAddress = ({
  item,
  editAddress,
  handleEditChange,
  setEditAddress,
  onSubmitEdit,
}) => {
  return (
    <>
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
            <form
              className="flex flex-col gap-2 lg:text-xl mt-5"
              onSubmit={(e) => onSubmitEdit(e, item._id)}
            >
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
                type="number"
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

              <div className="flex items-center gap-2 my-5">
                <input
                  type="checkbox"
                  id={`default_address_${item._id}`}
                  checked={editAddress.isDefault || false}
                  onChange={(e) =>
                    handleEditChange('isDefault', e.target.checked)
                  }
                  className="p-3 rounded-full"
                />

                <label
                  htmlFor={`default_address_${item._id}`}
                  className="label cursor-pointer"
                >
                  <span className="label-text">Set as default address</span>
                </label>
              </div>

              <button
                type="submit"
                className="flex justify-center w-full btn btn-success text-white"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
