import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const About = () => {
 const navigate = useNavigate()

 const handleButton = () => {
    navigate("/study-sessions")
 }
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-gray-800 mb-6"
      >
        About <span className="text-blue-600">BrainBuddy</span>
      </motion.h1>

      {/* Top Section with Image + Text */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1557734864-c78b6dfef1b1?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Study Group"
          className="rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Your Partner in Learning
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            BrainBuddy is a study platform designed to connect students with
            engaging study sessions, skilled tutors, and a supportive community.
            Our goal is to make learning more interactive, accessible, and fun.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Whether you’re preparing for exams, seeking new knowledge, or
            looking for peer support, BrainBuddy has the tools and resources to
            help you succeed.
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-6xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Mission */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To empower learners worldwide by providing interactive study
            sessions, quality learning materials, and a community-driven
            platform that inspires growth and knowledge sharing.
          </p>
        </motion.div>

        {/* Vision */}
        <motion.div
          className="bg-white rounded-2xl shadow-md p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-blue-600 mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the go-to global platform where students and tutors
            collaborate seamlessly, making education more inclusive, affordable,
            and effective for everyone.
          </p>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Join Our Journey 🚀
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Be part of a community that thrives on knowledge, collaboration, and
          innovation. Let’s learn, grow, and achieve together with BrainBuddy.
        </p>
        <button onClick={handleButton } className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition">
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default About;
