import React, { useState, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggle);
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-6 z-50 w-12 h-12 bg-[#1a237e] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#f9a825] hover:text-[#1a237e] transition-all duration-300 hover:scale-110"
      aria-label="Back to top"
    >
      <FiArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
