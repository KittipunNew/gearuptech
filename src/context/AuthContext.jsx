import { createContext, useEffect, useState, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { getIdToken } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // เก็บสถานะผู้ใช้ที่ล็อกอิน
  const [userDetails, setUserDetails] = useState(null); // เก็บรายละเอียดข้อมูลผู้ใช้
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await getIdToken(user);
      return token;
    } else {
      throw new Error('No user is signed in');
    }
  };

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
          const token = await getToken();
          const response = await axios.get(
            `${backendUrl}/api/users/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
    <AuthContext.Provider value={{ user, userDetails, getToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
