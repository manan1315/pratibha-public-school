import React from 'react';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCalendar, FiFileText, FiUsers } from 'react-icons/fi';

const Academics = () => {
  const programs = [
    { name: 'Pre-Primary', age: '3-6 years', desc: 'Play-based learning focusing on creativity, social skills, and foundational literacy', subjects: ['English', 'Hindi', 'Maths', 'Art', 'Music', 'Physical Education'] },
    { name: 'Primary', age: '6-11 years', desc: 'Strong foundation in core subjects with activity-based learning approach', subjects: ['English', 'Hindi', 'Maths', 'EVS', 'Computer', 'Art', 'Sports'] },
    { name: 'Middle School', age: '11-14 years', desc: 'Interdisciplinary approach with project-based learning and skill development', subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Computer', 'Sanskrit'] },
    { name: 'Secondary', age: '14-16 years', desc: 'Board preparation with career guidance and comprehensive assessment', subjects: ['English', 'Hindi', 'Maths', 'Science', 'Social Science', 'Computer'] },
    { name: 'Senior Secondary', age: '16-18 years', desc: 'Specialized streams with competitive exam preparation and research projects', subjects: ['Science (PCM/PCB)', 'Commerce', 'Humanities'] },
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">Academics</h1>
          <p className="text-gray-300">Home / Academics</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          {/* Pedagogy */}
          <div className="mb-8">
            <h2 className="section-title">Pedagogy & Assessment</h2>
            <p className="text-gray-600 leading-relaxed mb-2.5">
              At Pratibha Public School, we follow a child-centric approach to education that emphasizes 
              conceptual understanding over rote learning. Our teaching methodology integrates modern 
              pedagogical practices with traditional values.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { icon: <FiBookOpen />, title: 'Conceptual Learning', desc: 'Focus on understanding concepts through real-world applications' },
                { icon: <FiUsers />, title: 'Collaborative Learning', desc: 'Group activities, projects, and peer learning opportunities' },
                { icon: <FiFileText />, title: 'Continuous Assessment', desc: 'Regular formative assessments to track progress' },
                { icon: <FiCalendar />, title: 'Experiential Learning', desc: 'Field trips, experiments, and hands-on activities' },
              ].map((item, i) => (
                <div key={i} className="card">
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-xl mb-2">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#1a237e] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="mb-8">
            <h2 className="section-title">Curriculum Overview</h2>
            <div className="space-y-6">
              {programs.map((program, index) => (
                <div key={index} className="card">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a237e] mb-1">{program.name}</h3>
                      <p className="text-sm text-[#f9a825] font-semibold mb-2">Age Group: {program.age}</p>
                      <p className="text-gray-600 text-sm">{program.desc}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.subjects.map((subject, i) => (
                        <span key={i} className="px-3 py-1 bg-[#1a237e]/5 text-[#1a237e] text-xs rounded-full font-medium">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Downloads */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <h2 className="section-title">Academic Resources</h2>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <FiCalendar className="text-[#1a237e] text-xl sm:text-xl sm:text-2xl mb-2" />
                <h3 className="font-bold text-[#1a237e] mb-2">Academic Calendar</h3>
                <p className="text-gray-600 text-sm mb-2.5">View the annual academic schedule</p>
                <button className="text-[#f9a825] font-semibold text-sm">Download PDF</button>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <FiFileText className="text-[#1a237e] text-xl sm:text-xl sm:text-2xl mb-2" />
                <h3 className="font-bold text-[#1a237e] mb-2">Exam Schedule</h3>
                <p className="text-gray-600 text-sm mb-2.5">Check upcoming examination dates</p>
                <button className="text-[#f9a825] font-semibold text-sm">Download PDF</button>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <FiBookOpen className="text-[#1a237e] text-xl sm:text-xl sm:text-2xl mb-2" />
                <h3 className="font-bold text-[#1a237e] mb-2">Results</h3>
                <p className="text-gray-600 text-sm mb-2.5">View academic results</p>
                <button className="text-[#f9a825] font-semibold text-sm">View Results</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Academics;
