import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const StudyMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // 1. Fetch all booked sessions by this student
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // 2. Fetch materials for selected session
  const { data: materials = [], isLoading: materialsLoading } = useQuery({
    queryKey: ['materials', selectedSessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/materials/${selectedSessionId}`);
      return res.data;
    },
    enabled: !!selectedSessionId,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-12">
      <h2 className="text-2xl font-bold mb-4">📚 Study Materials</h2>

      {/* Booked Sessions Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Select a booked session:</label>
        <select
          onChange={(e) => setSelectedSessionId(e.target.value)}
          className="select select-bordered w-full max-w-sm"
          defaultValue=""
        >
          <option value="" disabled>Select a session</option>
          {bookings.map((session) => (
            <option key={session._id} value={session.sessionId}>
              {session.sessionTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Study Materials Display */}
      {selectedSessionId && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Materials for selected session</h3>

          {materialsLoading ? (
            <p>Loading materials...</p>
          ) : materials.length === 0 ? (
            <p className="text-gray-500">No materials uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-4">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  <div className="mt-3 flex justify-between">
                    <a
                      href={item.imageUrl}
                      download
                      className="btn btn-sm btn-success"
                    >
                      Download
                    </a>
                    <a
                      href={item.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-sm btn-info"
                    >
                      Drive Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
