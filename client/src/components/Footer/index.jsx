import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiPhone, FiMail, FiMapPin, FiLock, FiSettings } from 'react-icons/fi';
import { SCHOOL_INFO } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';

const Footer = () => {
  const { user } = useAuth();
  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Student Life', path: '/student-life' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#1a237e] to-[#0d1452] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: School Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Logo size={64} variant="bare" />
              <div>
                <h3 className="text-sm sm:text-base font-bold font-['Playfair_Display']">PRATIBHA PUBLIC SCHOOL</h3>
                <p className="text-[#f9a825] text-xs font-semibold tracking-wider">BASNA</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Nurturing Minds, Shaping Futures. Pratibha Public School Basna is committed to providing quality education and holistic development of every child.
            </p>
            <p className="text-[#f9a825] text-xs font-semibold mb-4">
              Affiliation Number: 3330406 (CBSE)
            </p>
            <div className="flex gap-2.5">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f9a825] hover:text-[#1a237e] transition-all duration-300">
                <FiFacebook />
              </a>
              <a href="https://www.instagram.com/pratibha_public_school_basna?igsi=MWFyZjZpODE3a3VteQ==" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f9a825] hover:text-[#1a237e] transition-all duration-300" target="_blank" rel="noreferrer">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f9a825] hover:text-[#1a237e] transition-all duration-300">
                <FiYoutube />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f9a825] hover:text-[#1a237e] transition-all duration-300">
                <FiTwitter />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 font-['Playfair_Display']">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#f9a825] transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-[#f9a825] rounded-full"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 font-['Playfair_Display']">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="text-[#f9a825] mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{SCHOOL_INFO.address}</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="text-[#f9a825] flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <a href={`tel:${SCHOOL_INFO.phone1}`} className="block hover:text-[#f9a825] transition-colors">{SCHOOL_INFO.phone1}</a>
                  <a href={`tel:${SCHOOL_INFO.phone2}`} className="block hover:text-[#f9a825] transition-colors">{SCHOOL_INFO.phone2}</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="text-[#f9a825] flex-shrink-0" />
                <a href={`mailto:${SCHOOL_INFO.email}`} className="text-gray-300 text-sm hover:text-[#f9a825] transition-colors">
                  {SCHOOL_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Map */}
          <div>
            <h3 className="text-sm sm:text-base font-bold mb-4 font-['Playfair_Display']">Our Location</h3>
            <div className="rounded-xl overflow-hidden shadow-lg h-36">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.6!2d82.82!3d21.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE3JzI0LjAiTiA4MsKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Pratibha Public School Basna. All Rights Reserved.</p>
            <div className="flex items-center gap-2.5 mt-2 md:mt-0">
              <p>Designed with ❤️ for Quality Education</p>
              <span className="text-gray-600">|</span>
              {user ? (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 text-gray-400 hover:text-[#f9a825] transition-colors"
                  title="Open the admin dashboard"
                >
                  <FiSettings size={13} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#f9a825] transition-colors"
                  title="School staff login"
                >
                  <FiLock size={12} />
                  <span>Admin Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
