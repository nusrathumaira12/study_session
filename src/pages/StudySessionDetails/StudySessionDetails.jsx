import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useUserRole from '../../hooks/useUserRole';

const StudySessionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { role, isLoading } = useUserRole(user?.email);

  const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionRes = await axiosSecure.get(`/sessions/${id}`);
        setSession(sessionRes.data);

        const reviewRes = await axiosSecure.get(`/reviews?sessionId=${id}`);
        setReviews(reviewRes.data);
      } catch (error) {
        toast.error('Failed to load session details');
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  const isRegistrationOngoing = () => {
    const now = new Date();
    return now >= new Date(session.registrationStart) && now <= new Date(session.registrationEnd);
  };

  const sessionDuration = () => {
    const start = new Date(session.classStart);
    const end = new Date(session.classEnd);
    const hours = Math.abs(end - start) / 36e5;
    return `${hours.toFixed(1)} hour(s)`;
  };

  const handleFreeBooking = async () => {
    if (!user) {
      toast.error('Please log in to book the session.');
      return;
    }

    const bookingData = {
      sessionId: session._id,
      sessionTitle: session.title,
      studentEmail: user.email,
      tutorEmail: session.tutorEmail,
      bookingDate: new Date().toISOString(),
      feePaid: 0
    };

    try {
      const res = await axiosSecure.post('/bookedSessions', bookingData);
      if (res.data.insertedId) {
        toast.success('Session booked successfully!');
        navigate('/dashboard/my-bookings');
      } else {
        toast.error(res.data.message || 'Booking failed.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed.');
    }
  };

  if (!session) return <p className="text-center py-10">Loading session...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-2">{session.title}</h2>
      <p className="text-gray-600"><strong>Tutor:</strong> {session.tutorName}</p>
      <p className="text-gray-600 mb-4"><strong>Avg. Rating:</strong> ⭐ {session.averageRating || 'N/A'}</p>
      <p className="mb-6">{session.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 border p-4 rounded-lg mb-6">
        <p><strong>Registration Start:</strong> {new Date(session.registrationStart).toLocaleDateString()}</p>
        <p><strong>Registration End:</strong> {new Date(session.registrationEnd).toLocaleDateString()}</p>
        <p><strong>Class Start:</strong> {new Date(session.classStart).toLocaleString()}</p>
        <p><strong>Class End:</strong> {new Date(session.classEnd).toLocaleString()}</p>
        <p><strong>Duration:</strong> {sessionDuration()}</p>
        <p>
          <strong>Registration Fee:</strong>{' '}
          {session.registrationFee === 0 ? 'Free' : `${session.registrationFee} BDT`}
        </p>
      </div>

      {/* Booking Logic */}
      <div className="mb-6">
        {!isRegistrationOngoing() ? (
          <button className="btn btn-disabled bg-gray-300 text-gray-700" disabled>
            Registration Closed
          </button>
        ) : !user ? (
          <button className="btn bg-gray-300 text-gray-700" disabled>
            Login to Book
          </button>
        ) : isLoading ? (
          <button className="btn btn-ghost loading">Checking Role...</button>
        ) : role !== 'student' ? (
          <button className="btn bg-gray-300 text-gray-700" disabled>
            Only Students Can Book
          </button>
        ) : session.registrationFee === 0 ? (
          <button onClick={handleFreeBooking} className="btn btn-success">
            Book Now (Free)
          </button>
        ) : (
          <button onClick={() => navigate(`/payment/${session._id}`)} className="btn btn-primary">
            Book Now ({session.registrationFee} BDT)
          </button>
        )}
      </div>

      {/* Reviews Section */}
      <div className="bg-white border rounded-lg p-4 shadow">
        <h3 className="text-xl font-bold mb-3">Student Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b py-3">
              <p className="font-semibold">{review.studentName}</p>
              <p className="text-yellow-600 text-sm">⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default StudySessionDetails;
