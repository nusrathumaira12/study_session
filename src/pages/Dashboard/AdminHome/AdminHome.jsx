import React, { useMemo } from 'react';
import { FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaBook } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const AdminDashboardHome = () => {
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch total users
  const { data: users = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Fetch total tutors
  const { data: tutors = [] } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors-from-sessions');
      return res.data;
    },
  });

  // Fetch all sessions
  const { data: sessions = [] } = useQuery({
    queryKey: ['allSessions'],
    queryFn: async () => {
      const res = await axiosSecure.get('/sessions');
      return res.data;
    },
  });

  // Fetch all study materials
  const { data: materials = [] } = useQuery({
    queryKey: ['allMaterials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/materials');
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
      <h2 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 w-full">
        <StatCard icon={<FaUsers />} label="Total Users" value={users.length} color="blue" />
        <StatCard icon={<FaChalkboardTeacher />} label="Total Tutors" value={uniqueTutors.size} color="yellow" />
        <StatCard icon={<FaCalendarAlt />} label="Total Sessions" value={sessions.length} color="green" />
        <StatCard icon={<FaBook />} label="Study Materials" value={materials.length} color="purple" />
      </div>

      {/* Profile Section */}
      <h2 className="text-2xl font-bold mb-10 mt-12">👤 Your Profile</h2>
      <div
        className="rounded-xl p-8 py-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1604079628048-df67f25869e0?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white max-w-xl border-2 gap-5 rounded-xl px-4 py-6 flex flex-col justify-center mx-auto md:flex-row items-center border-l-4 border-blue-500">
          <img
            src={user?.photoURL || 'https://i.ibb.co/ZYW3VTp/brown-brim.png'}
            alt="Admin"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">{user?.displayName || 'Admin'}</h3>
            <p className="text-blue-600 font-bold">{user?.email}</p>
            <p className="text-blue-600 mt-1 font-bold">Site Administrator</p>
            <p className="font-bold text-xl text-black mt-4">
              Manage and monitor your platform effortlessly ⚙️
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

// ✅ Reusable StatCard
const StatCard = ({ icon, label, value, color }) => (
  <div className={`bg-white rounded-xl shadow p-6 flex items-center gap-4 border-l-4 border-${color}-500`}>
    <div className={`text-3xl text-${color}-500`}>{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{label}</h4>
      <p className="text-2xl">{value}</p>
    </div>
  </div>
);

export default AdminDashboardHome;
