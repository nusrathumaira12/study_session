import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import useUserRole from '../../hooks/useUserRole';

const TutorsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, isLoading: roleLoading } = useUserRole(user?.email);

  const { data: tutors = [], isLoading } = useQuery({
    enabled: !roleLoading,
    queryKey: ['tutorsFromSessions', user?.email],
    queryFn: async () => {
      let query = '/tutors-from-sessions';
      if (role === 'tutor') {
        const encodedEmail = encodeURIComponent(user.email);
        const encodedName = encodeURIComponent(user.displayName);
        query += `?currentTutorEmail=${encodedEmail}&currentTutorName=${encodedName}`;
      }

      const res = await axiosSecure.get(query);
      return res.data;
    }
  });

  if (isLoading || roleLoading) return <p className="text-center py-10">Loading Tutors...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📘 Our Tutors</h2>
      {tutors.length === 0 ? (
        <p className="text-center text-gray-500">No tutors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tutors.map((tutor, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                {tutor.tutorName?.charAt(0)}
              </div>
              <h3 className="text-lg font-semibold">{tutor.tutorName}</h3>
              <p className="text-sm text-gray-600">{tutor.tutorEmail}</p>
              <p className="text-sm text-gray-600">{tutor.tutorEmail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorsPage;
