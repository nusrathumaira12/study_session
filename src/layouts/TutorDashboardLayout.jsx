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
        <h2 className="text-xl font-bold mb-6">Tutor Dashboard</h2>
        <nav className="space-y-3">
          <NavLink to="create-session" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>Create Study Session</NavLink>
          <NavLink to="my-sessions" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>My Sessions</NavLink>
          <NavLink to="upload-materials" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>Upload Materials</NavLink>
          <NavLink to="view-materials" className={({ isActive }) => isActive ? 'text-blue-600 font-bold' : ''}>View Materials</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-white min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorDashboardLayout;