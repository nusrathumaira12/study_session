import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router'

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  // ✅ API call to backend
  useEffect(() => {
    fetch('http://localhost:5001/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  // ✅ Check registration status
  const checkStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? 'Ongoing' : 'Closed';
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map(session => (
        <div key={session._id} className="bg-white shadow-md rounded-lg p-5 border border-gray-200">
          <img src={session.image} alt={session.title} className="w-full h-40 object-cover rounded-md mb-4" />
          <h2 className="text-xl font-bold mb-2">{session.title}</h2>
          <p className="text-gray-600 mb-2">{session.description}</p>

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

          <p className="text-sm italic text-gray-500 mb-2">Approval Status: {session.status}</p>

          <button  
            onClick={() => navigate(`/study-sessions/${session._id}`)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Read More
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudySessions;
