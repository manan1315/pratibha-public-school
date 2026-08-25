import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiAward, FiBookOpen, FiHome } from 'react-icons/fi';

const StatsCounter = () => {
  const [startCounting, setStartCounting] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) setStartCounting(true);
  }, [inView]);

  const stats = [
    { icon: <FiAward />, number: 25, suffix: '+', label: 'Years of Excellence' },
    { icon: <FiUsers />, number: 5100, suffix: '+', label: 'Happy Students' },
    { icon: <FiBookOpen />, number: 80, suffix: '+', label: 'Qualified Teachers' },
    { icon: <FiHome />, number: 3.5, suffix: ' Acres', label: 'Campus Area' },
  ];

  return (
    <div ref={ref} className="py-16 bg-gradient-to-r from-[#1a237e] to-[#0d1452] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f9a825] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9a825] rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-[#f9a825] text-2xl">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {startCounting && <CountUp end={stat.number} duration={2.5} suffix={stat.suffix} />}
              </div>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
