import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiMonitor, FiDroplet, FiBookOpen, FiActivity, FiTruck,
  FiCoffee, FiHeart, FiShield, FiCpu, FiHome,
} from 'react-icons/fi';
import { facilityAPI } from '../../services/api';
import useResource from '../../hooks/useResource';

// icon key (set in the admin panel) -> component
const ICONS = {
  monitor: <FiMonitor />,
  flask: <FiDroplet />,
  cpu: <FiCpu />,
  book: <FiBookOpen />,
  activity: <FiActivity />,
  truck: <FiTruck />,
  coffee: <FiCoffee />,
  heart: <FiHeart />,
  shield: <FiShield />,
};

const Facilities = () => {
  const { data: facilities, loading } = useResource(facilityAPI.getAll);

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">Facilities</h1>
          <p className="text-gray-300">Home / Facilities</p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">World-Class Infrastructure</h2>
            <p className="section-subtitle">
              Facilities designed to support holistic development and create an optimal learning environment
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="w-14 h-14 rounded-xl bg-gray-200 mb-4" />
                  <div className="h-5 bg-gray-200 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-4/5" />
                </div>
              ))}
            </div>
          ) : facilities.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              Facility information will be published shortly.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((f) => (
                <div key={f._id} className="card">
                  {f.images?.[0] && (
                    <img
                      src={f.images[0]}
                      alt={f.title}
                      loading="lazy"
                      className="w-full h-44 object-cover rounded-xl mb-4"
                    />
                  )}
                  <div className="w-14 h-14 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-2xl mb-4">
                    {ICONS[f.icon] || <FiHome />}
                  </div>
                  <h3 className="text-xl font-bold text-[#1a237e] mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.description}</p>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/admissions" className="btn-primary">Enquire About Admission</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Facilities;
