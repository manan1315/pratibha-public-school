import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FiStar } from 'react-icons/fi';
import { testimonialAPI } from '../../services/api';

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data } = await testimonialAPI.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="py-7 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-2">
          <h2 className="section-title">What Parents Say</h2>
          <p className="section-subtitle">Hear from our school community</p>
        </div>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
                <div className="flex gap-1 mb-2.5">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className={i < t.rating ? 'text-[#f9a825] fill-[#f9a825]' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-600 mb-2.5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-2.5">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#1a237e] text-white flex items-center justify-center font-bold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-[#1a237e]">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.relation}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialSlider;
