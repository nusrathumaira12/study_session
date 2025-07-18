import React from 'react';
import { Outlet } from 'react-router';
import Logo from '../pages/shared/Logo/Logo';
import auth from '../assets/auth.png'

const AuthLayout = () => {
    return (
        <div className="p-12 bg-base-200 min-h-screen">
            <Logo></Logo>
        <div className=" hero-content flex-col lg:flex-row-reverse">
        <div className='flex-1'>
         <img
            src={auth}
            className="max-w-sm md:ml-70"
          />
          </div>
          <div className='flex-1'>

          
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
};

export default AuthLayout;