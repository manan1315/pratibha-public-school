import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import AnnouncementTicker from './components/AnnouncementTicker';
import PopupModal from './components/PopupModal';
import ScrollProgress from './components/ScrollProgress';
import ChatBot from './components/ChatBot';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics'));
const Admissions = lazy(() => import('./pages/Admissions'));
const Achievements = lazy(() => import('./pages/Achievements'));
const StudentLife = lazy(() => import('./pages/StudentLife'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const NewsEvents = lazy(() => import('./pages/NewsEvents'));
const Downloads = lazy(() => import('./pages/Downloads'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin pages
const AdminLogin = lazy(() => import('./admin/AdminLogin'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const SliderManagement = lazy(() => import('./admin/SliderManagement'));
const AboutManagement = lazy(() => import('./admin/AboutManagement'));
const FacultyManagement = lazy(() => import('./admin/FacultyManagement'));
const NewsManagement = lazy(() => import('./admin/NewsManagement'));
const GalleryManagement = lazy(() => import('./admin/GalleryManagement'));
const EnquiryManagement = lazy(() => import('./admin/EnquiryManagement'));
const TestimonialManagement = lazy(() => import('./admin/TestimonialManagement'));
const AchievementManagement = lazy(() => import('./admin/AchievementManagement'));
const FacilityManagement = lazy(() => import('./admin/FacilityManagement'));
const FAQManagement = lazy(() => import('./admin/FAQManagement'));
const AnnouncementManagement = lazy(() => import('./admin/AnnouncementManagement'));
const SettingsManagement = lazy(() => import('./admin/SettingsManagement'));
const SubscriberManagement = lazy(() => import('./admin/SubscriberManagement'));
const BusRouteManagement = lazy(() => import('./admin/BusRouteManagement'));
const DownloadManagement = lazy(() => import('./admin/DownloadManagement'));
const PopupManagement = lazy(() => import('./admin/PopupManagement'));
const UserManagement = lazy(() => import('./admin/UserManagement'));

const adminRoutes = [
  ['', Dashboard],
  ['sliders', SliderManagement],
  ['about', AboutManagement],
  ['faculty', FacultyManagement],
  ['news', NewsManagement],
  ['gallery', GalleryManagement],
  ['enquiries', EnquiryManagement],
  ['testimonials', TestimonialManagement],
  ['achievements', AchievementManagement],
  ['facilities', FacilityManagement],
  ['faqs', FAQManagement],
  ['announcements', AnnouncementManagement],
  ['settings', SettingsManagement],
  ['subscribers', SubscriberManagement],
  ['bus-routes', BusRouteManagement],
  ['downloads', DownloadManagement],
  ['popups', PopupManagement],
  ['users', UserManagement],
];

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Admin area: no public chrome (navbar/footer/widgets)
  if (isAdmin) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          {adminRoutes.map(([path, Component]) => (
            <Route
              key={path || 'dashboard'}
              path={path ? `/admin/${path}` : '/admin'}
              element={
                <ProtectedRoute>
                  <Component />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="/admin/*" element={<NotFound />} />
        </Routes>
      </Suspense>
    );
  }

  // Public site
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <AnnouncementTicker />
      <Navbar />
      <PopupModal />

      <main className="flex-1">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/student-life" element={<StudentLife />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news-events" element={<NewsEvents />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <ChatBot />
      <CookieConsent />
    </div>
  );
};

export default App;
