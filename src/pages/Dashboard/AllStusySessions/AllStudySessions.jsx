
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';
import Swal from 'sweetalert2';

const AllStudySessions = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedSession, setSelectedSession] = useState(null);
  const [fee, setFee] = useState(0);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
const [rejectReason, setRejectReason] = useState('');
const [rejectFeedback, setRejectFeedback] = useState('');


  // ✅ Get all study sessions
  const { data: sessions = [], isLoading } = useQuery({
    queryKey: ['allStudySessions'],
    queryFn: async () => {
        const res = await axiosSecure.get('/sessions');

      return res.data;
    }
  });

  // ✅ Approve Session
  const approveMutation = useMutation({
    mutationFn: async ({ id, registrationFee }) => {
      return await axiosSecure.patch(`/study-sessions/approve/${id}`, { registrationFee });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allStudySessions']);
      Swal.fire('Success!', 'Session approved!', 'success');
      setSelectedSession(null);
    }
  });

  // ✅ Reject Session
  const rejectMutation = useMutation({
    mutationFn: async ({ id, reason, feedback }) => {
      return await axiosSecure.patch(`/study-sessions/reject/${id}`, {
        reason,
        feedback,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allStudySessions']);
      Swal.fire('Rejected', 'Session has been rejected.', 'info');
      setRejectModalOpen(false);
      setSelectedSession(null);
    }
  });

  const handleRejectClick = (session) => {
    setSelectedSession(session);
    setRejectModalOpen(true);
  };
  
  const submitRejection = () => {
    if (!rejectReason.trim()) {
      return Swal.fire('Required', 'Rejection reason is required.', 'warning');
    }
    rejectMutation.mutate({
      id: selectedSession._id,
      reason: rejectReason,
      feedback: rejectFeedback,
    });
  };
  
  

  // ✅ Delete Session
  const deleteSession = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete Session?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/study-sessions/${id}`);
      queryClient.invalidateQueries(['allStudySessions']);
      Swal.fire('Deleted!', 'Session has been deleted.', 'success');
    }
  };

  // ✅ Modal approve handler
  const handleApprove = (session) => {
    setSelectedSession(session);
    setFee(session.registrationFee || 0);
  };

  const submitApproval = () => {
    approveMutation.mutate({ id: selectedSession._id, registrationFee: fee });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Study Sessions</h2>
      <div className="grid gap-4">
        {sessions.map(session => (
          <div key={session._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{session.title}</h3>
            <p><strong>Status:</strong> {session.status}</p>
            <p><strong>Tutor:</strong> {session.tutorName}</p>
            <p><strong>Fee:</strong> {session.registrationFee || 0}</p>

            {session.status === 'pending' && (
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleApprove(session)} className="btn btn-sm btn-success">Approve</button>
                <button onClick={() => handleRejectClick(session)} className="btn btn-sm btn-error">Reject</button>

              </div>
            )}

            {session.status === 'approved' && (
              <div className="flex gap-2 mt-2">
                <button className="btn btn-sm btn-warning">Update</button>
                <button onClick={() => deleteSession(session._id)} className="btn btn-sm btn-error">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Approval Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
            <h3 className="text-lg font-semibold">Approve Session</h3>
            <label className="block">Is it Paid?</label>
            <select value={fee > 0 ? 'paid' : 'free'} onChange={(e) => setFee(e.target.value === 'paid' ? 100 : 0)} className="select w-full">
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>
            {fee > 0 && (
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(parseInt(e.target.value))}
                className="input w-full"
                placeholder="Enter Fee Amount"
              />
            )}
            <div className="flex justify-end gap-2">
              <button className="btn btn-sm" onClick={() => setSelectedSession(null)}>Cancel</button>
              <button className="btn btn-sm btn-success" onClick={submitApproval}>Approve</button>
            </div>
          </div>
        </div>
      )}
      {rejectModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg w-96 space-y-4">
      <h3 className="text-lg font-semibold">Reject Session</h3>
      
      <label className="block text-sm">Rejection Reason <span className="text-red-500">*</span></label>
      <input
        type="text"
        value={rejectReason}
        onChange={(e) => setRejectReason(e.target.value)}
        className="input w-full"
        placeholder="e.g. Incomplete details"
      />

      <label className="block text-sm">Feedback (optional)</label>
      <textarea
        value={rejectFeedback}
        onChange={(e) => setRejectFeedback(e.target.value)}
        className="textarea w-full"
        placeholder="Give suggestions for improvement"
      />

      <div className="flex justify-end gap-2">
        <button className="btn btn-sm" onClick={() => setRejectModalOpen(false)}>Cancel</button>
        <button className="btn btn-sm btn-error" onClick={submitRejection}>Reject</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllStudySessions;
