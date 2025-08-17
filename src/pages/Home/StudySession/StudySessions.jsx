import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [sortedSessions, setSortedSessions] = useState([]);
  const [sortType, setSortType] = useState('dateAsc');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://student-collaborative-server.vercel.app/sessions')
      .then(res => res.json())
      .then(data => {
        setSessions(data);
        setSortedSessions(data);
      })
      .catch(error => console.error('Error fetching sessions:', error));
  }, []);

  const checkStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? 'Ongoing' : 'Closed';
  };

  // Sorting function
  const sortSessions = (type) => {
    let sorted = [...sessions];
    if (type === 'dateAsc') {
      sorted.sort((a, b) => new Date(a.registrationStart) - new Date(b.registrationStart));
    } else if (type === 'dateDesc') {
      sorted.sort((a, b) => new Date(b.registrationStart) - new Date(a.registrationStart));
    } else if (type === 'status') {
      sorted.sort((a, b) => checkStatus(b.registrationStart, b.registrationEnd).localeCompare(checkStatus(a.registrationStart, a.registrationEnd)));
    }
    setSortedSessions(sorted);
    setSortType(type);
  };

  return (
    <div>
      <div className="flex justify-between items-center md:ml-30 ml-5 mt-8">
        <div>
          <h2 className="text-3xl font-semibold">All the skills you need in one place</h2>
          <p className="text-xl mt-2">From critical skills to technical topics, BrainBuddy supports your professional development.</p>
        </div>

        {/* Sorting Dropdown */}
        <div className='mr-20'>
          <select
            value={sortType}
            onChange={(e) => sortSessions(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="dateAsc">Sort: Earliest First</option>
            <option value="dateDesc">Sort: Latest First</option>
            <option value="status">Sort: Ongoing First</option>
          </select>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl justify-center mx-auto">
        {sortedSessions.map(session => (
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
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudySessions;
