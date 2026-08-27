import React from 'react';
import { Link } from 'react-router-dom';
import { FiActivity, FiMusic, FiCamera, FiCalendar } from 'react-icons/fi';

const StudentLife = () => {
  const activities = [
    { icon: <FiActivity />, name: 'Sports & Games', desc: 'Cricket, Football, Basketball, Athletics, Badminton, Table Tennis' },
    { icon: <FiMusic />, name: 'Cultural Activities', desc: 'Dance, Music, Drama, Debate, Quiz, Art & Craft' },
    { icon: <FiCamera />, name: 'Clubs & Societies', desc: 'Science Club, Eco Club, Literary Club, Social Service' },
    { icon: <FiCalendar />, name: 'Events & Celebrations', desc: 'Annual Day, Sports Day, Festivals, Excursions' },
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">Student Life</h1>
          <p className="text-gray-300">Home / Student Life</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-2">
            <h2 className="section-title">Life at PPS Basna</h2>
            <p className="section-subtitle">Beyond academics — discovering talents, building friendships, creating memories</p>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mb-2">
            {activities.map((activity, i) => (
              <div key={i} className="card flex items-start gap-2.5">
                <div className="w-14 h-14 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-xl sm:text-2xl flex-shrink-0">
                  {activity.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1a237e] mb-2">{activity.name}</h3>
                  <p className="text-gray-600 text-sm">{activity.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Link */}
          <div className="text-center">
            <Link to="/gallery" className="btn-primary inline-flex items-center gap-2">
              <FiCamera /> View Photo Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;
