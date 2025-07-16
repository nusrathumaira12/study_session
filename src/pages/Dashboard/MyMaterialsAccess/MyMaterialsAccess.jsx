import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyMaterialsAccess = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [] } = useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
      return res.data;
    }
  });

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">My Booked Sessions</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {bookings.map(session => (
          <div key={session._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-xl font-semibold mb-2">{session.sessionTitle}</h3>
            <p><strong>Tutor:</strong> {session.tutorEmail}</p>
            <Link to={`/materials/${session.sessionId}`} className="btn btn-sm mt-2 btn-info">
              View Materials
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMaterialsAccess;
