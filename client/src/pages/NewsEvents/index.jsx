import React, { useState, useEffect } from 'react';
import { newsAPI, eventAPI } from '../../services/api';
import { FiCalendar } from 'react-icons/fi';

const NewsEvents = () => {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, eventsRes] = await Promise.all([
        newsAPI.getAll(),
        eventAPI.getAll(),
      ]);
      setNews(newsRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">News & Events</h1>
          <p className="text-gray-300">Home / News & Events</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-3">
            {/* News */}
            <div className="md:col-span-2">
              <h2 className="section-title">Latest News</h2>
              <div className="space-y-6">
                {news.length > 0 ? news.map((item) => (
                  <div key={item._id} className="card flex gap-2.5">
                    {item.image && (
                      <img src={item.image} alt={item.title} className="w-32 h-32 object-cover rounded-xl flex-shrink-0" />
                    )}
                    <div>
                      <span className="text-xs text-[#f9a825] font-semibold">{new Date(item.date).toLocaleDateString()}</span>
                      <h3 className="font-bold text-[#1a237e] mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2">{item.content.replace(/<[^>]*>/g, '')}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-6">No news available</div>
                )}
              </div>
            </div>

            {/* Events Sidebar */}
            <div>
              <h2 className="section-title">Upcoming Events</h2>
              <div className="space-y-2.5">
                {events.length > 0 ? events.map((event) => (
                  <div key={event._id} className="card">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-12 h-12 rounded-lg bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                        <FiCalendar />
                      </div>
                      <div>
                        <span className="text-xs text-[#f9a825] font-semibold">{new Date(event.date).toLocaleDateString()}</span>
                        <h3 className="font-bold text-[#1a237e] text-sm">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 text-xs">{event.description}</p>
                    {event.venue && <p className="text-xs text-gray-500 mt-1">📍 {event.venue}</p>}
                  </div>
                )) : (
                  <div className="text-center text-gray-500 py-6">No upcoming events</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsEvents;
