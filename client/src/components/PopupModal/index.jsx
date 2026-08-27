import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { popupAPI } from '../../services/api';

const PopupModal = () => {
  const [popup, setPopup] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchPopup();
  }, []);

  const fetchPopup = async () => {
    try {
      const { data } = await popupAPI.getActive();
      if (data) {
        const dismissed = localStorage.getItem('popupDismissed');
        if (dismissed !== data._id) {
          setPopup(data);
          setTimeout(() => setShow(true), 3000);
        }
      }
    } catch (error) {
      console.error('Failed to fetch popup:', error);
    }
  };

  const dismiss = () => {
    setShow(false);
    if (popup) localStorage.setItem('popupDismissed', popup._id);
  };

  if (!show || !popup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-[fadeIn_0.3s_ease]">
        {popup.image && (
          <img src={popup.image} alt={popup.title} className="w-full h-36 object-cover" />
        )}
        <div className="p-4">
          <button onClick={dismiss} className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
            <FiX />
          </button>
          <h3 className="text-xl font-bold text-[#1a237e] mb-2">{popup.title}</h3>
          <p className="text-gray-600 mb-4">{popup.content}</p>
          {popup.link && (
            <a href={popup.link} onClick={dismiss} className="btn-primary inline-block">
              Learn More
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
