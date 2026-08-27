import React, { useState, useEffect } from 'react';
import { FiDownload, FiFileText } from 'react-icons/fi';
import { downloadAPI } from '../../services/api';

const Downloads = () => {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      const { data } = await downloadAPI.getAll();
      setDownloads(data);
    } catch (error) {
      console.error('Failed to fetch downloads:', error);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-4">Downloads</h1>
          <p className="text-gray-300">Home / Downloads</p>
        </div>
      </div>

      <section className="py-7 md:py-7">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-5">
            <h2 className="section-title">Downloadable Forms & Documents</h2>
            <p className="section-subtitle">Access important forms and documents</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.length > 0 ? downloads.map((item) => (
              <div key={item._id} className="card">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                    <FiFileText size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e]">{item.title}</h3>
                    <span className="text-xs text-gray-500">{item.category}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <a href={item.file} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex items-center gap-2 text-sm">
                  <FiDownload /> Download
                </a>
              </div>
            )) : (
              <div className="col-span-3 text-center text-gray-500 py-6">No downloads available</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
