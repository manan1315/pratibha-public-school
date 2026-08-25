import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiImage, FiMail, FiSettings, FiAward, FiEye } from 'react-icons/fi';
import AdminLayout from '../AdminLayout';
import { enquiryAPI, newsAPI, galleryAPI, subscriberAPI, contactAPI, visitorAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0, news: 0, gallery: 0, subscribers: 0, contacts: 0, visitors: 0,
  });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const safe = (p) => p.then((r) => r.data).catch(() => []);
      const [enq, news, gal, subs, cont, vis] = await Promise.all([
        safe(enquiryAPI.getAll()),
        safe(newsAPI.getAll()),
        safe(galleryAPI.getImages()),
        safe(subscriberAPI.getAll()),
        safe(contactAPI.getAll()),
        visitorAPI.getCount().then((r) => r.data).catch(() => ({ count: 0 })),
      ]);

      setStats({
        enquiries: enq.length,
        news: news.length,
        gallery: gal.length,
        subscribers: subs.length,
        contacts: cont.length,
        visitors: vis.count || 0,
      });
      setRecent(enq.slice(0, 5));
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: 'Admission Enquiries', value: stats.enquiries, icon: <FiMail />, color: 'bg-blue-500', link: '/admin/enquiries' },
    { label: 'News Articles', value: stats.news, icon: <FiFileText />, color: 'bg-green-500', link: '/admin/news' },
    { label: 'Gallery Images', value: stats.gallery, icon: <FiImage />, color: 'bg-purple-500', link: '/admin/gallery' },
    { label: 'Newsletter Subscribers', value: stats.subscribers, icon: <FiUsers />, color: 'bg-orange-500', link: '/admin/subscribers' },
    { label: 'Contact Messages', value: stats.contacts, icon: <FiMail />, color: 'bg-pink-500', link: '/admin/enquiries' },
    { label: 'Website Visitors', value: stats.visitors, icon: <FiEye />, color: 'bg-teal-500', link: '/admin' },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">Pratibha Public School Basna — content overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {cards.map((c, i) => (
            <Link key={i} to={c.link} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide">{c.label}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-1">
                    {loading ? '—' : c.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-full ${c.color} text-white flex items-center justify-center text-xl`}>
                  {c.icon}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent enquiries */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-800">Recent Enquiries</h2>
              <Link to="/admin/enquiries" className="text-sm text-[#1a237e] hover:underline">View all</Link>
            </div>
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : recent.length === 0 ? (
              <p className="text-gray-400 text-sm">No enquiries yet. Submissions from the website appear here.</p>
            ) : (
              <ul className="divide-y">
                {recent.map((e) => (
                  <li key={e._id} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{e.studentName}</p>
                      <p className="text-xs text-gray-500">{e.class} • {e.phone}</p>
                    </div>
                    {!e.isRead && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-[10px] font-semibold whitespace-nowrap">
                        NEW
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { to: '/admin/news', icon: <FiFileText />, label: 'Manage News' },
                { to: '/admin/gallery', icon: <FiImage />, label: 'Manage Gallery' },
                { to: '/admin/sliders', icon: <FiImage />, label: 'Hero Sliders' },
                { to: '/admin/achievements', icon: <FiAward />, label: 'Achievements' },
                { to: '/admin/enquiries', icon: <FiMail />, label: 'Enquiries' },
                { to: '/admin/settings', icon: <FiSettings />, label: 'Site Settings' },
              ].map((a) => (
                <Link key={a.to} to={a.to} className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors">
                  <div className="text-[#1a237e] text-xl mb-1 flex justify-center">{a.icon}</div>
                  <span className="text-xs font-medium text-gray-700">{a.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
