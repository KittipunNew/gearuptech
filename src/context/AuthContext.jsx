import { createContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้ที่ล็อกอิน
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // ดึงข้อมูลผู้ใช้ที่ล็อกอินอยู่
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${backendUrl}/api/users/${user.uid}`
          );
          if (response.data) {
            setUserDetails(response.data);
          } else {
            console.log('No user data found');
            toast.error('No user data found');
          }
        } catch (error) {
          console.error('Error fetching user data', error);
          toast.error('Error fetching user data');
        }
      };
      fetchUserData();
    }
  }, [user]);
  return (
    <AuthContext.Provider value={{ user }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
