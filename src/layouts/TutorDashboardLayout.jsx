import React from 'react';
import { Outlet, NavLink } from 'react-router'; // Use react-router-dom not react-router
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Logo from '../pages/shared/Logo/Logo';
import { FaChalkboardTeacher, FaPlus, FaListAlt, FaUpload, FaBookOpen } from 'react-icons/fa';

const TutorDashboardLayout = () => {
  const { user } = useAuth();
  const { role, isLoading } = useUserRole(user?.email);

  if (isLoading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (role !== 'tutor') return <p className="text-red-500 text-center mt-10">Access denied. Tutor only.</p>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <Logo size={2} />
          <nav className="mt-8 space-y-2">
            <NavLink
              to="/tutor-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FaChalkboardTeacher /> Dashboard
            </NavLink>

            <NavLink
              to="create-session"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FaPlus /> Create Session
            </NavLink>

            <NavLink
              to="my-sessions"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FaListAlt /> My Sessions
            </NavLink>

            <NavLink
              to="upload-materials"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FaUpload /> Upload Materials
            </NavLink>

            <NavLink
              to="all-materials"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <FaBookOpen /> View Materials
            </NavLink>
          </nav>
        </div>

        <div className="text-center text-xs text-gray-400 mt-8">
          Tutor Dashboard © {new Date().getFullYear()}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default TutorDashboardLayout;
