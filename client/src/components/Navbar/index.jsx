import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import { SCHOOL_INFO } from '../../utils/constants';
import Logo from '../Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const closeTimer = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(null);
  }, [location]);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'About Us', path: '/about',
      dropdown: [
        { name: 'About Our School', path: '/about' },
        { name: 'Our Ethos & Values', path: '/about#ethos' },
        { name: 'Vision & Mission', path: '/about#vision' },
        { name: 'Leadership', path: '/about#leadership' },
        { name: 'Our Faculty', path: '/about#faculty' },
      ],
    },
    {
      name: 'Academics', path: '/academics',
      dropdown: [
        { name: 'Pedagogy & Assessment', path: '/academics' },
        { name: 'Curriculum Overview', path: '/academics#curriculum' },
        { name: 'Exam Schedule', path: '/academics#exams' },
        { name: 'Results', path: '/academics#results' },
      ],
    },
    {
      name: 'Admissions', path: '/admissions',
      dropdown: [
        { name: 'Admission Enquiry', path: '/admissions#enquiry' },
        { name: 'Admission Process', path: '/admissions#process' },
        { name: 'Age Criteria', path: '/admissions#age' },
        { name: 'Fee Structure', path: '/admissions#fees' },
        { name: 'FAQs', path: '/admissions#faqs' },
      ],
    },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Book List', path: '/book-list' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <div className="bg-[#1a237e] text-white py-2 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-[#f9a825]" />
              <span className="truncate max-w-[200px]">Khatkhati, Basna, Mahasamund</span>
            </span>
            <span className="flex items-center gap-1">
              <FiMail className="text-[#f9a825]" />
              <a href={`mailto:${SCHOOL_INFO.email}`} className="hover:text-[#f9a825] transition-colors">
                {SCHOOL_INFO.email}
              </a>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <a href={`tel:${SCHOOL_INFO.phone1}`} className="flex items-center gap-1 hover:text-[#f9a825] transition-colors">
              <FiPhone className="text-[#f9a825]" />
              {SCHOOL_INFO.phone1}
            </a>
            <div className="flex items-center gap-2.5 ml-4">
              <a href="#" className="hover:text-[#f9a825] transition-colors"><FiFacebook /></a>
              <a href="https://www.instagram.com/pratibha_public_school_basna?igsi=MWFyZjZpODE3a3VteQ==" className="hover:text-[#f9a825] transition-colors" target="_blank" rel="noreferrer"><FiInstagram /></a>
              <a href="#" className="hover:text-[#f9a825] transition-colors"><FiYoutube /></a>
              <a href="#" className="hover:text-[#f9a825] transition-colors"><FiTwitter /></a>
            </div>
          </div>
        </div>
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : isHome ? 'bg-transparent shadow-none' : 'bg-white shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-2.5">
              <Logo size={56} />
              <div>
                <h1 className={`text-sm sm:text-base font-bold leading-tight font-['Playfair_Display'] ${scrolled || !isHome ? 'text-[#1a237e]' : 'text-white drop-shadow-md'}`}>
                  PRATIBHA PUBLIC SCHOOL
                </h1>
                <p className="text-xs font-semibold tracking-wider text-[#f9a825] drop-shadow-md">BASNA</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
                    if (item.dropdown) setDropdownOpen(item.name);
                  }}
                  onMouseLeave={() => {
                    if (closeTimer.current) clearTimeout(closeTimer.current);
                    closeTimer.current = setTimeout(() => setDropdownOpen(null), 150);
                  }}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                      location.pathname === item.path
                        ? (scrolled || !isHome ? 'text-[#1a237e]' : 'text-white')
                        : (scrolled || !isHome ? 'text-gray-700 hover:text-[#1a237e]' : 'text-white/90 hover:text-white drop-shadow-md')
                    }`}
                  >
                    {item.name}
                    {item.dropdown && (
                      <svg className={`w-4 h-4 transition-transform ${dropdownOpen === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && dropdownOpen === item.name && (
                    <div
                      className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100"
                      onMouseEnter={() => { if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; } }}
                      onMouseLeave={() => { if (closeTimer.current) clearTimeout(closeTimer.current); closeTimer.current = setTimeout(() => setDropdownOpen(null), 150); }}
                    >
                      {item.dropdown.map((subItem) => (
                        <Link key={subItem.name} to={subItem.path} className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#1a237e]/5 hover:text-[#1a237e] transition-colors">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2.5">
              <Link to="/admissions" className="hidden md:inline-flex items-center gap-2 bg-[#f9a825] text-[#1a237e] px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#ffcc02] hover:shadow-lg hover:scale-105 transition-all duration-300">
                Apply Now
              </Link>
              <button onClick={() => setIsOpen(!isOpen)} className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled || !isHome ? 'hover:bg-gray-100' : 'hover:bg-white/10'}`}>
                {isOpen ? <FiX size={24} className={scrolled || !isHome ? '' : 'text-white'} /> : <FiMenu size={24} className={scrolled || !isHome ? '' : 'text-white'} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t shadow-xl">
            <div className="max-h-[55vh] overflow-y-auto py-4 px-4">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link to={item.path} className="block py-3 px-4 text-gray-700 font-medium hover:bg-[#1a237e]/5 hover:text-[#1a237e] rounded-lg transition-colors">
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 border-l-2 border-[#f9a825] pl-4">
                      {item.dropdown.map((subItem) => (
                        <Link key={subItem.name} to={subItem.path} className="block py-2 px-4 text-sm text-gray-600 hover:text-[#1a237e] transition-colors">
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t">
                <Link to="/admissions" className="block w-full text-center bg-[#f9a825] text-[#1a237e] py-3 rounded-lg font-semibold">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
