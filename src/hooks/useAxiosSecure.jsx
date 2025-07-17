import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { getIdToken } from 'firebase/auth';

const axiosSecure = axios.create({
  baseURL: 'https://student-collaborative-server.vercel.app',
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async config => {
        if (user) {
          const token = await getIdToken(user);
          console.log('📡 Sending token:', token);  
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
