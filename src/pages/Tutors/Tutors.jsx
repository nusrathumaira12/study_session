import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const TutorsPage = () => {
  const axiosSecure = useAxiosSecure();

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users?role=tutor');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center py-10">Loading Tutors...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Meet Our Tutors</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white border rounded-lg shadow p-4 text-center"
          >
            <img
              src={tutor.photo || 'https://i.ibb.co/4Y5F2zL/default-avatar.png'}
              alt={tutor.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
            />
            <h3 className="text-xl font-semibold">{tutor.name}</h3>
            <p className="text-sm text-gray-600">{tutor.email}</p>
            <p className="mt-2 text-green-600 font-medium">Tutor</p>
            {/* Optional buttons */}
            {/* <Link to={`/tutor-profile/${tutor._id}`} className="btn btn-sm mt-3 btn-outline">View Profile</Link> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsPage;
