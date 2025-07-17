import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const {
    data: user = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['user-role', email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      console.log('🔁 useUserRole fetched:', res.data);
      return res.data;
    },
    staleTime: 5 * 60 * 1000, // Cache role for 5 mins
  });

  return { role: user?.role || 'student', isLoading, isError, error };

};

export default useUserRole;
