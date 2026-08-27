import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[#1a237e] mb-2.5">404</h1>
        <h2 className="text-xl sm:text-2xl md:text-xl sm:text-xl sm:text-2xl font-bold text-[#1a237e] mb-2.5">Page Not Found</h2>
        <p className="text-gray-600 mb-2">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
