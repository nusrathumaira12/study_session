import React from 'react';
import { Link } from 'react-router';


import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">Failed to load bookings.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Booked Sessions</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You haven’t booked any sessions yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((booking, idx) => (
            <div key={idx} className="border p-5 rounded-lg shadow bg-white">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{booking.title || 'Session Title'}</h3>
              <p><strong>Tutor:</strong> {booking.tutorName || booking.tutorEmail}</p>
              <p><strong>Booked On:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
              <p><strong>Fee Paid:</strong> {booking.feePaid === 0 ? 'Free' : `৳${booking.feePaid}`}</p>

              <Link to={`/study-sessions/${booking.sessionId}`}>
                <button className="mt-4 btn btn-primary w-full">View Details & Review</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
