import React, { useMemo } from 'react';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const StudentDashboardHome = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch bookings
  const { data: bookings = [] } = useQuery({
    queryKey: ['bookedSessions', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookedSessions?email=${user.email}`);
      return res.data;
    },
  });

  const sessionIds = useMemo(() => bookings.map((b) => b.sessionId), [bookings]);

  const { data: allMaterials = [] } = useQuery({
    queryKey: ['materials', sessionIds],
    enabled: sessionIds.length > 0,
    queryFn: async () => {
      const all = await Promise.all(
        sessionIds.map(id => axiosSecure.get(`/materials/${id}`))
      );
      return all.flatMap(res => res.data);
    },
  });

  const { data: upcomingSessions = [] } = useQuery({
    queryKey: ['upcomingSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/sessions');
      return res.data.filter((s) => s.status === 'approved').slice(0, 6);
    },
  });

  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors-from-sessions');
      return res.data;
    },
  });

  const uniqueTutors = useMemo(() => {
    const names = tutors.map((t) => t.tutorName);
    return new Set(names);
  }, [tutors]);

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
      navigate('/');
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📊 Student Dashboard</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full dark:text-black">
  <StatCard icon={<FaClipboardList />} label="Total Bookings" value={bookings.length} color="blue" />
  <StatCard icon={<FaCalendarAlt />} label="Upcoming Sessions" value={upcomingSessions.length} color="green" />
  <StatCard icon={<FaBook />} label="Study Materials" value={allMaterials.length} color="purple" />
  <StatCard icon={<FaChalkboardTeacher />} label="Total Tutors" value={uniqueTutors.size} color="yellow" />
</div>


      {/* Profile Card */}
      <h2 className="text-2xl font-bold mb-10 mt-12 ">👤 Your Profile</h2>
      <div
  className="rounded-xl p-8 py-20"
  style={{
    backgroundImage: "url('https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
      <div className="bg-white max-w-xl border-2 gap-5 rounded-xl px-2 py-4 flex flex-col justify-center mx-auto md:flex-row items-center  border-l-4 border-blue-500">
        <img
          src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
          alt="User"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800">{user?.displayName || 'Anonymous Student'}</h3>
          <p className="text-blue-600 by-2font-bold">{user?.email}</p>
          <p className="text-blue-600 mt-1 font-bold">Future Developer</p>
          <p className="font-bold text-xl  text-black mt-4">
            Stay inspired and keep learning every day 🌟
          </p>
          <button
            onClick={handleLogout}
            className="btn mt-4 bg-white text-blue-500 hover:bg-blue-600 hover:text-white px-4 py-1 btn-outline border-blue-500 rounded text-sm"
          >
            Logout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

// 📌 Reusable StatCard Component
const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 border-l-4 border-${color}-500`}>
    <div className={`text-3xl text-${color}-500`}>{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{label}</h4>
      <p className="text-2xl">{value}</p>
    </div>
  </div>
);

export default StudentDashboardHome;
