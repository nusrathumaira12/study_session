import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserRole = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data: user = {}, isLoading } = useQuery({
    queryKey: ['user-role', email],
    enabled: !!email, // only fetch when email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${email}`);
      console.log('🔁 useUserRole fetched:', res.data); // ✅ Add this line
      return res.data;
    },
  });

  return { role: user?.role, isLoading };
};

export default useUserRole;
