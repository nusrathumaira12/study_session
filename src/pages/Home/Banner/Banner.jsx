import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import bannerBg1 from '../../../assets/banner1.jpg';

const Banner = () => {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/study-sessions");
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4 md:px-6">
        
        {/* Left Content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 dark:text-gray-900">
            Empowering Collaborative Learning with BrainBuddy
          </h1>
          <p className="text-lg md:text-xl mb-6 dark:text-gray-900">
            Connect students, tutors, and administrators in one platform to schedule sessions, share resources, and manage learning effortlessly—built for modern education.
          </p>
          <motion.button
            onClick={handleButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={bannerBg1}
            alt="BrainBuddy Banner"
            className="w-full rounded-lg shadow-2xl object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
