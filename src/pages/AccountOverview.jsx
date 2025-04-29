import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AccountOverview = () => {
  const { user, userDetails } = useContext(AuthContext);

  if (!user || !userDetails) return null;

  return (
    <div className="bg-white p-5 flex flex-col gap-5">
      <div className="flex items-center gap-2 font-bold text-xl">
        <i className="bx bx-list-ul"></i>
        <p>Account Overview</p>
      </div>
      <h1 className="font-bold">My Profile</h1>
      <div className="flex flex-col gap-2">
        <h1>Name : {userDetails.firstName + ' ' + userDetails.lastName}</h1>
        <h1>Email : {userDetails.email || ''}</h1>
        <h1>Phone no : {userDetails.phoneNumber}</h1>
        <h1>Date of Birth : {userDetails.dateOfBirth || ''}</h1>
      </div>
    </div>
  );
};
export default AccountOverview;
