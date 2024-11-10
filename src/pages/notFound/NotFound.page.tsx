import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <p className="text-2xl md:text-3xl font-light text-gray-700 mt-4">
        Oops! The page you're looking for isn't here.
      </p>
      <p className="mt-6 text-gray-500">
        You might have the wrong address, or the page may have moved.
      </p>
      <Link to="/" className="mt-8 inline-block px-6 py-3 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
        Go back to Home
      </Link>
    </div>
  </div>
  );
};

export default NotFound;
