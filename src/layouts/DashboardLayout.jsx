import React from 'react';
import { NavLink, Outlet } from 'react-router';
import Logo from '../pages/shared/Logo/Logo';


const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">

  <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      
    
    
    
  </div>
  <Outlet>
    
  </Outlet>
    {/* Page content here */}
    
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    
    <ul className="menu bg-blue-400 text-base-content min-h-full w-80 p-4">
    <Logo></Logo>
      {/* Sidebar content here */}
      
      <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? 'text-black font-bold my-5  w-full p-2 rounded-xl text-center bg-white' : 'font-bold mb-5 w-full p-2 rounded-xl text-center text-black bg-white'}>Home</NavLink></li>
      <li><NavLink to="/dashboard/my-bookings" className={({ isActive }) => isActive ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white' : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'}>My Bookings</NavLink></li>
      <li><NavLink to="/dashboard/create-note" className={({ isActive }) => isActive ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white' : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'}>Create Note</NavLink></li>
      <li><NavLink to="/dashboard/manage-notes" className={({ isActive }) => isActive ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white' : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'}>Manage Personal Notes</NavLink></li>
      <li><NavLink to="/dashboard/study-materials" className={({ isActive }) => isActive ? 'text-blue-600 font-bold my-5 w-full p-2 rounded-xl text-center bg-white' : 'font-bold my-5 w-full p-2 rounded-xl text-center bg-white'} > View All Study Materials</NavLink></li>
     

    </ul>
  </div>
</div>
    );
};

export default DashboardLayout;