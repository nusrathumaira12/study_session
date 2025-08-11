import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const TutorDashboardHome = () => {
  const [date, setDate] = useState(new Date());
  const { user, logOut } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: users = [] } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  const data = [
    { name: 'Total Sessions', value: 15 },
    { name: 'Completed Sessions', value: 9 },
    { name: 'Pending Sessions', value: 4 },
    { name: 'Cancelled Sessions', value: 2 },
  ];

  const COLORS = ['#4f46e5', '#16a34a', '#facc15', '#ef4444'];

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
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📘 Tutor Dashboard Overview</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Calendar */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">📅 Calendar</h3>
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold mb-4 text-blue-600">📊 Session Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        
        </div>
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
            <p className="text-blue-600 mt-1 font-bold">Role: Tutor</p>
            <p className="font-bold text-xl text-black mt-4">
            "Helping You Help Students Thrive."
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

export default TutorDashboardHome;
