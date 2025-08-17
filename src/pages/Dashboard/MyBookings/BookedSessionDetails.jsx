import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const BookedSessionDetails = () => {
  const { id } = useParams(); // bookedSession _id
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [booking, setBooking] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Fetch the booked session by booking ID
  useEffect(() => {
    axiosSecure.get(`/bookedSessions/${id}`)
      .then(res => setBooking(res.data));
  }, [id, axiosSecure]);

  // Fetch reviews by sessionId (from the booking data)
  useEffect(() => {
    if (booking?.sessionId) {
      fetchReviews();
    }
  }, [booking]);

  const fetchReviews = async () => {
    const res = await axiosSecure.get(`/reviews?sessionId=${booking.sessionId}`);
    setReviews(res.data);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !comment) {
      toast.error('Rating and comment are required!');
      return;
    }

    const reviewDoc = {
      sessionId: booking.sessionId,
      studentEmail: user.email,
      studentName: user.displayName,
      rating,
      comment,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewDoc);
      if (res.data.insertedId) {
        Swal.fire({
          icon: 'success',
          title: 'Review submitted!',
          text: 'Thank you for your feedback.',
        });
        setRating(0);
        setComment('');
        fetchReviews();
      }
    } catch (err) {
      toast.error('Failed to submit review');
    }
  };

  if (!booking) return <p className="text-center py-10">Loading session details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 ">
      <h2 className="text-3xl font-bold mb-4">Booked Session Details</h2>
      <div className="bg-base-100 p-5 border rounded-md mb-6">
        <p><strong>Title:</strong> {booking.sessionTitle}</p>
        <p><strong>Booked By:</strong> {booking.studentEmail}</p>
        <p><strong>Tutor:</strong> {booking.tutorEmail}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
        <p><strong>Payment:</strong> {booking.feePaid === 0 ? 'Free' : `${booking.feePaid} BDT`}</p>
        <p><strong>Payment Status:</strong> {booking.payment_status || 'Not Paid'}</p>
      </div>

      <div className="bg-white border p-5 rounded-md mb-6">
        <h3 className="text-xl font-semibold mb-3">Student Reviews</h3>
        {reviews.length > 0 ? reviews.map((review, i) => (
          <div key={i} className="border-b pb-2 mb-3">
            <p className="font-semibold">{review.studentName}</p>
            <p className="text-yellow-600">⭐ {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        )) : <p className="text-gray-600">No reviews yet.</p>}
      </div>

      <div className="bg-white border p-5 rounded-md">
        <h3 className="text-xl font-semibold mb-3">Post a Review</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Rating (1 to 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={e => setRating(parseInt(e.target.value))}
              className="input input-bordered w-full max-w-xs"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Comment</label>
            <textarea
              className="textarea textarea-bordered w-full"
              value={comment}
              onChange={e => setComment(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default BookedSessionDetails;
