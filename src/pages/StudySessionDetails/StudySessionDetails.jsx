import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useUserRole from '../../hooks/useUserRole';

const StudySessionDetails = () => {
  const { id } = useParams(); 
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {role, isLoading} = useUserRole(user?.email)
const [session, setSession] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
  
    axiosSecure.get(`/sessions/${id}`)
      .then(res => setSession(res.data));

    // Fetch reviews by sessionId
    axiosSecure.get(`/reviews?sessionId=${id}`)
      .then(res => setReviews(res.data));
  }, [id, axiosSecure]);

  if (!session) return <p className="text-center py-10">Loading...</p>;

  const isRegistrationOngoing = () => {
    const now = new Date();
    const start = new Date(session.registrationStart);
    const end = new Date(session.registrationEnd);
    return now >= start && now <= end;
  };

  const sessionDuration = () => {
    const start = new Date(session.classStart);
    const end = new Date(session.classEnd);
    const diffInMs = Math.abs(end - start);
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `${hours} hour(s)`;
  };

  const handleFreeBooking = async () => {
    if (!user) {
      toast.error('Please login to book the session.');
      return;
    }
  
    const bookingData = {
      sessionId: session._id,
      sessionTitle: session.title,
      studentEmail: user.email, // ✅ studentEmail = user.email
      tutorEmail: session.tutorEmail,
      bookingDate: new Date().toISOString(),
      feePaid: 0
      
    };
    
  
    try {
      const res = await axiosSecure.post('/bookedSessions', bookingData);

      console.log('Booking response:', res.data);
  
      if (res.data.insertedId) {
        toast.success('Session booked successfully!');
        navigate('/dashboard/my-bookings');
      } else if (res.data.message) {
        toast.error(res.data.message); // For duplicate or other server validation
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed.');
    }
  };
  

  console.log("User:", user);
  console.log("Role from hook:", role);


console.log("Session Data:", session);

console.log("Session Fee:", session.registrationFee);



  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-3">{session.title}</h2>
      <p className="text-gray-600 mb-1"><strong>Tutor:</strong> {session.tutorName}</p>
      <p className="text-gray-600 mb-1"><strong>Average Rating:</strong> ⭐ {session.averageRating || 'No ratings yet'}</p>
      <p className="text-gray-800 my-4">{session.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-base-100 border p-4 rounded-lg mb-5">
        <p><strong>Registration Start:</strong> {new Date(session.registrationStart).toLocaleDateString()}</p>
        <p><strong>Registration End:</strong> {new Date(session.registrationEnd).toLocaleDateString()}</p>
        <p><strong>Class Start:</strong> {new Date(session.classStart).toLocaleString()}</p>
        <p><strong>Class End:</strong> {new Date(session.classEnd).toLocaleString()}</p>
        <p><strong>Duration:</strong> {sessionDuration()}</p>
        <p><strong>Registration Fee:</strong> 
  {
    typeof session.registrationFee === 'number'
      ? (session.registrationFee === 0 ? 'Free' : `${session.registrationFee}BDT`)
      : 'Not specified'
  }
</p>


      </div>

      <div className="mb-6">
        {
          !isRegistrationOngoing() ? (
            <button disabled className="btn btn-disabled bg-gray-300 text-gray-700">
              Registration Closed
            </button>
          ) : !user ? (
            <button disabled className="btn bg-gray-300 text-gray-700">
              Login to Book
            </button>
        ) : !isLoading && role !== 'student' ? (

            <button disabled className="btn bg-gray-300 text-gray-700">
              Only Students Can Book
            </button>
          ) : parseFloat(session.registrationFee) === 0

          ? (
            <button onClick={handleFreeBooking} className="btn btn-success">
              Book Now (Free)
            </button>
          ) : (
            <button onClick={() => navigate(`/payment/${session._id}`)} className="btn btn-primary">
        Book Now ({session.registrationFee}BDT)
      </button>
          )
        }
      </div>

      <div className="bg-white border rounded-lg p-4 shadow">
        <h3 className="text-xl font-bold mb-3">Student Reviews</h3>
        {
          reviews.length ? reviews.map((review, idx) => (
            <div key={idx} className="border-b py-2">
              <p className="font-semibold">{review.studentName}</p>
              <p className="text-sm text-yellow-600">⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          )) : <p className="text-gray-500">No reviews yet.</p>
        }
      </div>
    </div>
  );
};

export default StudySessionDetails;
