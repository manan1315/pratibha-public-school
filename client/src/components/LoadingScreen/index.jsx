import React from 'react';
import Logo from '../Logo';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      {/* dark navy backdrop, so the logo needs no plate */}
      <Logo size={130} variant="bare" className="mb-4 animate-pulse" />
      <h2 className="text-white text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2 text-center px-4">
        PRATIBHA PUBLIC SCHOOL
      </h2>
      <p className="text-[#f9a825] text-sm tracking-wider">BASNA</p>
      <div className="mt-5 flex gap-2">
        <div className="w-3 h-3 bg-[#f9a825] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-[#f9a825] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-[#f9a825] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
