import React from 'react';
import { Link } from 'react-router';
import NotFoundImg from '../../assets/images/notFound.jpg'
const NotFoundPage = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        
        {/* Image Section */}
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img 
            src={NotFoundImg}
            alt="404 Not Found" 
            className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" 
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col text-blue-900 justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
          <h1 className="text-5xl font-bold leading-none sm:text-6xl">
            404
            <span className="dark:text-violet-600"> | Page Not Found</span>
          </h1>
          <p className="mt-6 mb-8 text-lg sm:mb-12">
            Oops! The page you are looking for doesn't exist.
            <br className="hidden md:inline lg:hidden" />
            It might have been moved or deleted.
          </p>

          {/* Buttons */}
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
            <Link 
              to="/" 
              className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
            >
              Go Home
            </Link>
            <Link 
              to="/study-sessions" 
              className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-800"
            >
              Browse Sessions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
