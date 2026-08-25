import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { sliderAPI } from '../../services/api';

const HeroSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const { data } = await sliderAPI.getAll();
      setSliders(data);
    } catch (error) {
      console.error('Failed to fetch sliders:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="h-[60vh] md:h-[80vh] bg-gradient-to-r from-[#1a237e] to-[#0d1452] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (sliders.length === 0) {
    return (
      <div className="h-[60vh] md:h-[80vh] bg-gradient-to-r from-[#1a237e] to-[#0d1452] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-['Playfair_Display'] mb-4">
            PRATIBHA PUBLIC SCHOOL
          </h1>
          <p className="text-xl md:text-2xl text-[#f9a825]">Nurturing Minds, Shaping Futures</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        className="h-full"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 flex items-center pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <div className="max-w-2xl text-white">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-['Playfair_Display'] mb-4 animate-[fadeInUp_0.8s_ease]">
                      {slide.heading}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 mb-6 animate-[fadeInUp_1s_ease]">
                      {slide.subheading}
                    </p>
                    {slide.buttonText && (
                      <Link
                        to={slide.buttonLink || '/admissions'}
                        className="pointer-events-auto inline-flex items-center gap-2 bg-[#f9a825] text-[#1a237e] px-8 py-3 rounded-full font-semibold hover:bg-[#ffcc02] hover:shadow-xl hover:scale-105 transition-all duration-300 animate-[fadeInUp_1.2s_ease]"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
