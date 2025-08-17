import React from 'react';
import { useNavigate } from 'react-router';

const AiSupport = () => {
    const navigate =useNavigate()
    const handleButton = () => {
        navigate("/study-sessions")
     }
    return (
        <div className="hero py-16 bg-gray-50">
  <div className="mx-auto 
    display: flex
    align-items: center
    md:gap-20 max-w-8xl
    flex-col lg:flex-row-reverse ">
    <img
      src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      className="md:max-w-xl  max-w-sm rounded-lg shadow-2xl"
    />
    <div>
      <h1 className="text-3xl font-bold md:mr-65 pt-10  items-center">AI for Business Leaders</h1>
      <p className="py-6">
      Build an AI-habit for you <br /> and your team that builds hands-on skills <br /> to help you lead effectively.
      </p>
      <button onClick={handleButton } className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
          Get Started
        </button>
    </div>
  </div>
</div>
    );
};

export default AiSupport;