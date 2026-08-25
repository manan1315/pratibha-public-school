import React, { useState, useEffect } from 'react';
import { announcementAPI } from '../../services/api';

const AnnouncementTicker = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const { data } = await announcementAPI.getAll();
      setAnnouncements(data.slice(0, 5));
    } catch (error) {
      console.error('Failed to fetch announcements:', error);
    }
  };

  if (announcements.length === 0) return null;

  return (
    <div className="bg-[#f9a825] text-[#1a237e] py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex items-center">
        <span className="bg-[#1a237e] text-white text-xs font-bold px-3 py-1 rounded-full mr-4 whitespace-nowrap">
          Latest
        </span>
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee whitespace-nowrap">
            {announcements.map((a, i) => (
              <span key={i} className="mx-8 font-medium text-sm">
                {a.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
