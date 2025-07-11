import React from 'react';
import { NavLink } from 'react-router';
import Logo from '../Logo/Logo';
import useAuth from '../../../hooks/useAuth';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import defaultPic from '../../../assets/default.jpg'

const Navbar = () => {
  const {user, logOut} = useAuth(AuthContext)



  const handleLogout = () => {
    logOut()
    .then(() => console.log("Logged out"))
    .catch((err) => console.error(err));
  }
    const navItems = (
    <>
       <li><NavLink to="/"
         className={({ isActive }) =>
          isActive ? 'text-blue-500 font-semibold' : 'text-black font-semibold dark:text-white'
        }
        
        >Home</NavLink></li>
       <li><NavLink to="/tutors"
         className={({ isActive }) =>
          isActive ? 'text-blue-500 font-semibold' : 'text-black font-semibold dark:text-white'
        }
       
       >Tutors</NavLink></li>
       <li><NavLink to="/study-sessions"
         className={({ isActive }) =>
          isActive ? 'text-blue-500 ffont-semibold' : 'text-black font-semibold dark:text-white'
        }
       
       >Study Sessions</NavLink></li>
       {user && (
        <li><NavLink to="/dashboard"
        className={({ isActive }) =>
          isActive ? 'text-blue-500 font-semibold' : 'text-black font-semibold dark:text-white'
        }
        
        >Dashboard</NavLink></li>
      )}
      </>
    )
  
    
    
  
    return (
        <div className="navbar sticky top-0 z-50 bg-base-200  shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {
        navItems
       }


      </ul>
    </div>
    <div className="btn btn-ghost text-xl">
  <Logo />
</div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {navItems}
    </ul>
  </div>

 
  <div className="navbar-end">
{user ? (

  <>
     <div className="avatar cursor-pointer ">
                  <div className="w-10 h-10 rounded-full border-2 border-blue-500 ">
                    <img src={user.photoURL || defaultPic } alt="Profile" />
                  </div>
                </div>

  

  <button onClick={handleLogout} className="btn bg-blue-500 text-white  font-semibold ml-1">Logout</button>

 
  </>
) : (
<>


<NavLink to="/login"  className="btn bg-white mr-1 px-5 font-semibold">LogIn</NavLink>
<NavLink to="/signUp" className="btn bg-blue-500  text-white font-semibold">Sign Up</NavLink>


</>

)}
 
</div>
  
  
</div>
    );
};

export default Navbar;