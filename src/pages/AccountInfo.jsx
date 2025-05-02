import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const AccountInfo = () => {
  const { user, userDetails, getToken } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  // เซ็ตค่าข้อมูลผู้ใช้
  useEffect(() => {
    if (userDetails) {
      setFirstName(userDetails.firstName || '');
      setLastName(userDetails.lastName || '');
      setEmail(userDetails.email || '');
      setPhoneNumber(userDetails.phoneNumber || '');

      const rawDate = userDetails.dateOfBirth || '';
      const formattedDate = rawDate
        ? new Date(rawDate).toISOString().split('T')[0]
        : '';
      setDateOfBirth(formattedDate);
    }
  }, [userDetails]);

  if (!user || !userDetails) return null;

  // อัพเดทข้อมูลผู้ใช้
  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();
      await axios.put(
        `${backendUrl}/api/update-info/${user.uid}`,
        {
          firstName: firstName
            ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
            : '',
          lastName: lastName
            ? lastName.charAt(0).toUpperCase() + lastName.slice(1)
            : '',
          phoneNumber,
          dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success('✅ Data update successful');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white p-5 flex flex-col gap-5 w-full lg:p-10">
      <div className="flex items-center gap-2 font-bold text-xl lg:text-2xl">
        <i className="bx bx-user"></i>
        <p>My Profile</p>
      </div>
      <h1 className="font-bold lg:text-xl">Personal Details</h1>

      <form
        className="flex flex-col gap-2 lg:text-xl"
        onSubmit={handleUpdateUserInfo}
      >
        {/* First name */}
        <InputField
          label="First name"
          value={firstName}
          setValue={setFirstName}
        />
        {/* Last name */}
        <InputField label="Last name" value={lastName} setValue={setLastName} />
        {/* Email */}
        <InputField label="Email" value={email} disabled />
        {/* Phone Number */}
        <InputField
          label="Phone Number"
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        {/* Date of Birth */}
        <InputField
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          setValue={setDateOfBirth}
        />
        <button className="btn bg-lime-500 text-white btn-lg">Save</button>
      </form>
    </div>
  );
};

const InputField = ({ label, type = 'text', value, setValue, disabled }) => (
  <div className="relative z-0 w-full mb-5 group">
    <input
      type={type}
      name={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      id={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className={`block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl`}
      placeholder=" "
      required
      onChange={(e) => setValue(e.target.value)}
      value={value}
      disabled={disabled}
    />
    <label
      htmlFor={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
    >
      {label}
    </label>
  </div>
);

export default AccountInfo;
