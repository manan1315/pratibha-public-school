import React, { useState, useEffect } from 'react';
import { FiAward, FiStar } from 'react-icons/fi';
import { achievementAPI } from '../../services/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await achievementAPI.getAll();
      setAchievements(data);
    } catch (error) {
      console.error('Failed to fetch achievements:', error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] mb-4">Achievements</h1>
          <p className="text-gray-300">Home / Achievements</p>
        </div>
      </div>

      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Student Achievements</h2>
            <p className="section-subtitle">Celebrating excellence in academics, sports, and co-curricular activities</p>
          </div>

          {/* Board Results */}
          <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] rounded-2xl p-8 text-white mb-12">
            <h3 className="text-2xl font-bold mb-4">CGBSE Board Results 2025</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f9a825]">98%</div>
                <p className="text-sm text-gray-300">Pass Percentage</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f9a825]">15</div>
                <p className="text-sm text-gray-300">Distinctions</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f9a825]">3</div>
                <p className="text-sm text-gray-300">Toppers in District</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f9a825]">100%</div>
                <p className="text-sm text-gray-300">First Division</p>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.length > 0 ? achievements.map((item) => (
              <div key={item._id} className="card">
                {item.image && (
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                )}
                <div className="flex items-center gap-2 mb-2">
                  <FiAward className="text-[#f9a825]" />
                  <span className="text-xs text-[#f9a825] font-semibold">{item.category}</span>
                </div>
                <h3 className="font-bold text-[#1a237e] mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-xs text-gray-500">{item.studentName} • {item.year}</p>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-8">No achievements to display</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
