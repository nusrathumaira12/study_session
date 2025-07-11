import React, { useEffect, useState } from 'react';

const ApprovedSessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('/sessions.json') // or your API endpoint
      .then(res => res.json())
      .then(data => {
        const approved = data.filter(session => session.status === 'approved');
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
        {sessions.map((session, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-md p-5 border">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">{session.title}</h3>
            <p className="text-gray-600 mb-3">{session.description.slice(0, 100)}...</p>

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

            <button className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Read More
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ApprovedSessions;
