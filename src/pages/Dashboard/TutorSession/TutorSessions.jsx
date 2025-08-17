import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const TutorSessions = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: sessions = [], refetch } = useQuery({
    queryKey: ['tutorSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/study-sessions/tutor/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email
  });

  const handleResendRequest = async (id) => {
    try {
      const res = await axiosSecure.patch(`/study-sessions/request-again/${id}`);
      if (res.data.message) {
        Swal.fire('✅ Sent', 'Approval request sent again!', 'success');
        refetch();
      }
    } catch (err) {
      Swal.fire('❌ Error', 'Failed to resend request', 'error');
    }
  };

  return (
    <div className="p-4 dark:bg-black">
      <h2 className="text-2xl font-semibold mb-4 ">My Study Sessions-</h2>
      {sessions.length === 0 && <p>No Sessions created by you.</p>}
      <div className="grid gap-4">
        {sessions.map(session => (
          <div key={session._id} className="border p-4 rounded-lg shadow">
            <h3 className="text-xl font-bold">{session.title}</h3>
            <p>Status: <span className="font-semibold">{session.status}</span></p>
            <p>Start Date: {session.classStart}</p>
            <p>End Date: {session.classEnd}</p>

            {session.status === 'rejected' && (
  <div className="mt-2">
    {session.feedback && (
      <p className="text-red-500 font-medium">
        📝 Feedback: {session.feedback}
      </p>
    )}
    <button
      onClick={() => handleResendRequest(session._id)}
      className="btn btn-sm btn-warning mt-2"
    >
      Resend for Approval
    </button>
  </div>
)}

          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorSessions;
