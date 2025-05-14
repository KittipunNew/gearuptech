import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { toast } from 'react-toastify';
import { auth } from '../firebase';
import { backendUrl } from '../App';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('❌ Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await axios.post(`${backendUrl}/api/register`, {
        uid: user.uid,
        email,
        firstName: firstName
          ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
          : '',
        lastName: lastName
          ? lastName.charAt(0).toUpperCase() + lastName.slice(1)
          : '',
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      });

      toast.success('✅ Successfully registered');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFirstName('');
      setLastName('');
      setPhoneNumber('');
      setDateOfBirth('');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error(
          '❌ This email is already registered. Please log in instead.'
        );
        return;
      } else {
        toast.error(
          `❌ ${error.response?.data?.message || 'An error occurred'}`
        );
      }
    }
  };

  return (
    <div className="flex justify-center items-center mb-10 mt-5 lg:my-0">
      <div className="py-10 px-5 shadow-lg bg-white rounded-md flex flex-col gap-10 w-full justify-center items-center lg:py-20 lg:w-1/2">
        <div className="flex flex-col justify-center items-center font-bold gap-5 lg:text-3xl">
          <h1>Sign up</h1>
        </div>

        <form className="max-w-md mx-auto w-full" onSubmit={handleRegister}>
          <InputField
            label="Email address"
            type="email"
            value={email}
            setValue={setEmail}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          <InputField
            label="Confirm password"
            type="password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
          <div className="flex gap-5">
            <InputField
              label="First name"
              value={firstName}
              setValue={setFirstName}
            />
            <InputField
              label="Last name"
              value={lastName}
              setValue={setLastName}
            />
          </div>
          <InputField
            label="Phone number"
            type="tel"
            value={phoneNumber}
            setValue={setPhoneNumber}
          />
          <InputField
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            setValue={setDateOfBirth}
          />
          <button
            type="submit"
            className="text-white btn btn-xl bg-lime-500 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, type = 'text', value, setValue }) => (
  <div className="relative z-0 w-full mb-5 group">
    <input
      type={type}
      name={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      id={`floating_${label.replace(/\s/g, '').toLowerCase()}`}
      className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-lime-500 peer lg:text-2xl"
      placeholder=" "
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

export default Register;
