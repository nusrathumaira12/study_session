import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ApprovedSessions = () => {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://student-collaborative-server.vercel.app/sessions')
      .then(res => res.json())
      .then(data => {
        const approved = data
          .filter(session => session.status === 'approved')
          .slice(0, 6);
        setSessions(approved);
      });

    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  const checkStatus = (start, end) => {
    const now = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);
    return now >= startDate && now <= endDate ? 'Ongoing' : 'Closed';
  };

  return (
    <section className="py-10 px-5 md:px-10 lg:px-16 bg-base-200">
      <h2 className="text-3xl font-semibold mt-2">Ready to reimagine your career?</h2>
      <p className="text-xl text-gray-600 mb-6">Here is your available Study Sessions</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session, index) => (
          <motion.div
            key={session._id}
            whileHover={{ scale: 1.10 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'smooth', stiffness: 300 }}
            data-aos="fade-up"
            className="bg-white shadow-lg rounded-lg p-5 border border-gray-200"
          >
            <img
              src={session.image}
              alt={session.title}
              className="w-full h-45 object-cover rounded-md mb-2"
            />
            <h3 className="text-xl font-semibold text-blue-700">{session.title}</h3>
            <p className="text-gray-600 mb-1">{session.description?.slice(0, 100)}...</p>

            <div className="flex flex-row justify-between items-end mt-3">
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded disabled:opacity-50"
                disabled={checkStatus(session.registrationStart, session.registrationEnd) === 'Closed'}
              >
                {checkStatus(session.registrationStart, session.registrationEnd) === 'Closed'
                  ? 'Registration Closed'
                  : 'Read More'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ApprovedSessions;
