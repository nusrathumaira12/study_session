import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../pages/shared/Logo/Logo';

const AdminDashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Top navbar for mobile */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
        </div>

        {/* Render nested routes */}
        <Outlet />
      </div>

      {/* Sidebar menu */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-blue-400 text-base-content min-h-full w-80 p-4">
          <Logo />
          <li>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'text-white bg-black  mt-15 font-bold my-5 w-full p-2 rounded-xl text-center'
                  : 'font-bold mb-5 w-full p-2 rounded-xl text-center text-black bg-black'
              }
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/users"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
                  : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
              }
            >
              View All Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/sessions"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
                  : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
              }
            >
              View All Sessions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin-dashboard/materials"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
                  : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'
              }
            >
              View All Materials
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
