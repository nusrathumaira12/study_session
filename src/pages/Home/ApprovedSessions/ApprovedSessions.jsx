import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ApprovedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5001/sessions') // <-- replace with your real API
      .then(res => res.json())
      .then(data => {
        const approved = data
          .filter(session => session.status === 'approved')
          .slice(0, 6); // ✅ only first 6 approved sessions
        setSessions(approved);
      });
  }, []);

  const checkStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? 'Ongoing' : 'Closed';
  };

  return (
    <section className="py-10 px-5 md:px-10 lg:px-16 bg-base-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Available Study Sessions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session._id} className="bg-white shadow-lg rounded-md p-5 border">
             <img src={session.image} alt={session.title} className="w-full h-60 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{session.title}</h3>
            <p className="text-gray-600 mb-3">
              {session.description?.slice(0, 100)}...
            </p>

            <div className="mb-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  checkStatus(session.registrationStart, session.registrationEnd) === 'Ongoing'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {checkStatus(session.registrationStart, session.registrationEnd)}
              </span>
            </div>

            <button
              onClick={() => navigate(`/study-sessions/${session._id}`)}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={checkStatus(session.registrationStart, session.registrationEnd) === 'Closed'}
            >
              {checkStatus(session.registrationStart, session.registrationEnd) === 'Closed'
                ? 'Registration Closed'
                : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovedSessions;
