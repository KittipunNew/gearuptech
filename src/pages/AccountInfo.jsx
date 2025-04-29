import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
const AccountInfo = () => {
  const { user, userDetails } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (userDetails?.firstName && userDetails?.lastName) {
      setFirstName(userDetails.firstName);
      setLastName(userDetails.lastName);
    }
  }, [userDetails]);

  if (!user || !userDetails) return null;

  return (
    <div className="bg-white p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2 font-bold text-xl">
        <i className="bx bx-user"></i>
        <p>My Profile</p>
      </div>
      <h1 className="font-bold">Personal Details</h1>
      {/* First name */}
      <div className="flex flex-col gap-2">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_firstname"
            id="floating_firstname"
            className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl"
            placeholder=" "
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <label
            htmlFor="floating_firstname"
            className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
          >
            First name
          </label>
        </div>

        {/* Last name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="floating_lastname"
            id="floating_lastname"
            className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl"
            placeholder=" "
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <label
            htmlFor="floating_lastname"
            className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 lg:text-xl"
          >
            First name
          </label>
        </div>
      </div>
    </div>
  );
};
export default AccountInfo;
