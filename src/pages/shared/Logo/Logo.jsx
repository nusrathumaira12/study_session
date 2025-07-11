import React from 'react';
import logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
       <Link to="/">
        <div className='flex items-center'>
            <img src={logo} className='w-8 h-8' alt="" />
            <p className='text-2xl text-black font-bold'>Brain<span className=''>B</span>uddy</p>
        </div>
       </Link>
    );
};

export default Logo;