// TutorDashboardLayout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';

const TutorDashboardLayout = () => {
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);

  if (isLoading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (role !== 'tutor') return <p className="text-red-500 text-center mt-10">Access denied. Tutor only.</p>;

  return (
    <div className="flex">
      <aside className="w-64 min-h-screen bg-gray-100 p-4">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Tutor Dashboard</h2>
        <nav className="space-y-3 flex flex-col">
          <NavLink to="create-session" className={({ isActive }) => isActive ? 'text-blue-600 font-bold w-full p-2 rounded-xl text-center bg-white' : 'font-bold w-full p-2 rounded-xl text-center bg-white'}>Create Study Session</NavLink>
          <NavLink to="my-sessions" className={({ isActive }) => isActive ? 'text-blue-600 font-bold w-full p-2 rounded-xl text-center bg-white' : 'font-bold w-full p-2 rounded-xl text-center bg-white'}>My Sessions</NavLink>
          <NavLink to="upload-materials" className={({ isActive }) => isActive ? 'text-blue-600 font-bold w-full p-2 rounded-xl text-center bg-white' : 'font-bold w-full p-2 rounded-xl text-center bg-white'}>Upload Materials</NavLink>
          <NavLink to="view-materials" className={({ isActive }) => isActive ? 'text-blue-600 font-bold w-full p-2 rounded-xl text-center bg-white' : 'font-bold w-full p-2 rounded-xl text-center bg-white'}>View Materials</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorDashboardLayout;