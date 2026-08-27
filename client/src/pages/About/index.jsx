import React from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiTarget, FiUsers } from 'react-icons/fi';
import { aboutAPI, leadershipAPI, facultyAPI, studentLeaderAPI } from '../../services/api';
import useResource from '../../hooks/useResource';

const Section = ({ icon, title, content, tint }) => (
  <div className="card text-center">
    <div className={`w-16 h-16 mx-auto mb-2.5 rounded-full flex items-center justify-center text-xl sm:text-2xl ${tint}`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-[#1a237e] mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{content}</p>
  </div>
);

const About = () => {
  const { data: about } = useResource(aboutAPI.getAll);
  const { data: leadership } = useResource(leadershipAPI.getAll);
  const { data: faculty } = useResource(facultyAPI.getAll);
  const { data: studentLeaders } = useResource(studentLeaderAPI.getAll);

  const pick = (section) => about.find((a) => a.section === section);

  const welcome = pick('welcome');
  const vision = pick('vision');
  const mission = pick('mission');
  const ethos = pick('ethos');
  const society = pick('society');

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">About Us</h1>
          <p className="text-gray-300">Home / About Us</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          {/* About our school */}
          <div className="grid md:grid-cols-2 gap-3 items-center mb-8">
            <div>
              <h2 className="section-title">{welcome?.title || 'About Our School'}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {welcome?.content ||
                  'Pratibha Public School Basna was established in 1998 with a vision to provide quality education to the children of Khatkhati, Basna and the surrounding areas of Mahasamund district, Chhattisgarh.'}
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={welcome?.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'}
                alt="School campus"
                loading="lazy"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Vision / Mission / Ethos */}
          <div id="vision" className="grid md:grid-cols-3 gap-3 mb-8">
            <Section
              icon={<FiTarget />}
              tint="bg-[#1a237e]/10 text-[#1a237e]"
              title={vision?.title || 'Our Vision'}
              content={vision?.content || 'To be a centre of educational excellence that nurtures responsible citizens and future leaders.'}
            />
            <Section
              icon={<FiHeart />}
              tint="bg-[#f9a825]/10 text-[#f9a825]"
              title={mission?.title || 'Our Mission'}
              content={mission?.content || 'To provide a stimulating learning environment that develops intellectual curiosity, moral courage and social responsibility.'}
            />
            <Section
              icon={<FiAward />}
              tint="bg-green-100 text-green-600"
              title={ethos?.title || 'Our Ethos & Values'}
              content={ethos?.content || 'Inclusive education that respects diversity, promotes critical thinking and instils integrity, compassion and excellence.'}
            />
          </div>

          {/* Managing committee */}
          {society && (
            <div id="society" className="bg-gray-50 rounded-2xl p-4 mb-8">
              <h2 className="section-title">{society.title}</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{society.content}</p>
            </div>
          )}

          {/* Leadership */}
          {leadership.length > 0 && (
            <>
              <div id="leadership" className="text-center mb-2">
                <h2 className="section-title">Our Leadership</h2>
                <p className="section-subtitle">Meet the visionaries guiding PPS Basna</p>
              </div>
              <div className="grid md:grid-cols-3 gap-3 mb-8">
                {leadership.map((p) => (
                  <div key={p._id} className="card text-center">
                    <div className="w-32 h-32 mx-auto mb-2.5 rounded-full overflow-hidden border-4 border-[#f9a825] bg-gray-100">
                      {p.photo ? (
                        <img src={p.photo} alt={p.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl sm:text-xl sm:text-2xl font-bold text-[#1a237e]">
                          {p.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-[#1a237e] mb-1">{p.name}</h3>
                    <p className="text-[#f9a825] font-semibold mb-2.5">{p.designation}</p>
                    <p className="text-gray-600 text-sm italic">"{p.message}"</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Faculty */}
          {faculty.length > 0 && (
            <>
              <div id="faculty" className="text-center mb-2">
                <h2 className="section-title">Our Faculty</h2>
                <p className="section-subtitle">Qualified and dedicated teachers</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
                {faculty.map((t) => (
                  <div key={t._id} className="card text-center">
                    <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-[#1a237e]/20 bg-gray-100">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-[#1a237e]">
                          {t.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#1a237e] text-sm">{t.name}</h3>
                    <p className="text-[#f9a825] text-xs font-semibold">{t.designation}</p>
                    <p className="text-gray-500 text-xs mt-1">{t.qualification}</p>
                    {t.experience && <p className="text-gray-400 text-xs mt-0.5">{t.experience}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Student leadership */}
          {studentLeaders.length > 0 && (
            <>
              <div className="text-center mb-2">
                <h2 className="section-title">Student Leadership</h2>
                <p className="section-subtitle">Our student council for the current session</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {studentLeaders.map((s) => (
                  <div key={s._id} className="card text-center">
                    <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-[#f9a825] bg-gray-100">
                      {s.photo ? (
                        <img src={s.photo} alt={s.name} loading="lazy" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl sm:text-2xl font-bold text-[#1a237e]">
                          {s.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-[#1a237e] text-sm">{s.name}</h3>
                    <p className="text-[#f9a825] text-xs font-semibold">{s.position}</p>
                    <p className="text-gray-500 text-xs">{s.class}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="text-center mt-14">
            <Link to="/admissions" className="btn-primary">Apply for Admission</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
