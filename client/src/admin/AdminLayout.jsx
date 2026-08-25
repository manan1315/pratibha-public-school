import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiLogOut, FiSettings, FiImage, FiFileText, FiUsers, FiMail, FiHome, FiAward, FiActivity, FiBookOpen, FiCalendar, FiTruck, FiDownload, FiBell, FiUser, FiExternalLink } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome /> },
    { name: 'Sliders', path: '/admin/sliders', icon: <FiImage /> },
    { name: 'About', path: '/admin/about', icon: <FiFileText /> },
    { name: 'Faculty', path: '/admin/faculty', icon: <FiUsers /> },
    { name: 'News', path: '/admin/news', icon: <FiFileText /> },
    { name: 'Gallery', path: '/admin/gallery', icon: <FiImage /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <FiMail /> },
    { name: 'Testimonials', path: '/admin/testimonials', icon: <FiAward /> },
    { name: 'Achievements', path: '/admin/achievements', icon: <FiAward /> },
    { name: 'Facilities', path: '/admin/facilities', icon: <FiActivity /> },
    { name: 'FAQs', path: '/admin/faqs', icon: <FiBookOpen /> },
    { name: 'Announcements', path: '/admin/announcements', icon: <FiBell /> },
    { name: 'Subscribers', path: '/admin/subscribers', icon: <FiUsers /> },
    { name: 'Bus Routes', path: '/admin/bus-routes', icon: <FiTruck /> },
    { name: 'Downloads', path: '/admin/downloads', icon: <FiDownload /> },
    { name: 'Popups', path: '/admin/popups', icon: <FiBell /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
    { name: 'My Account', path: '/admin/users', icon: <FiUser /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1a237e] text-white transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3">
            <Logo size={44} variant="bare" />
            <div>
              <h2 className="font-bold">Admin Panel</h2>
              <p className="text-xs text-gray-300">PPS Basna</p>
            </div>
          </Link>
        </div>
        <nav className="p-4 space-y-1 max-h-[calc(100vh-180px)] overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <FiExternalLink />
            <span className="text-sm">View Website</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <FiLogOut />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            {sidebarOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'Admin'}</span>
            <div className="w-8 h-8 rounded-full bg-[#1a237e] text-white flex items-center justify-center">
              <FiUser />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminLayout;
