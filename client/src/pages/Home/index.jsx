import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiBookOpen, FiUsers, FiAward, FiMonitor, FiDroplet, FiHeart,
  FiTruck, FiShield, FiCoffee, FiActivity, FiCpu, FiHome as FiHomeIcon,
} from 'react-icons/fi';
import HeroSlider from '../../components/HeroSlider';
import StatsCounter from '../../components/StatsCounter';
import TestimonialSlider from '../../components/TestimonialSlider';
import useResource from '../../hooks/useResource';
import {
  newsAPI, galleryAPI, achievementAPI, settingsAPI,
  facilityAPI, leadershipAPI, aboutAPI, subscriberAPI,
} from '../../services/api';
import { toast } from 'react-toastify';

const ICONS = {
  monitor: <FiMonitor />, flask: <FiDroplet />, cpu: <FiCpu />, book: <FiBookOpen />,
  activity: <FiActivity />, truck: <FiTruck />, coffee: <FiCoffee />,
  heart: <FiHeart />, shield: <FiShield />,
};

const Home = () => {
  const { data: news } = useResource(newsAPI.getFeatured);
  const { data: gallery } = useResource(galleryAPI.getImages);
  const { data: achievements } = useResource(achievementAPI.getAll);
  const { data: facilities } = useResource(facilityAPI.getAll);
  const { data: leadership } = useResource(leadershipAPI.getAll);
  const { data: about } = useResource(aboutAPI.getAll);
  const { data: settings } = useResource(settingsAPI.get, {});

  const [email, setEmail] = React.useState('');
  const [subscribing, setSubscribing] = React.useState(false);

  const principal = leadership.find((l) => l.type === 'principal') || leadership[0];
  const welcome = about.find((a) => a.section === 'welcome');

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      await subscriberAPI.subscribe({ email });
      toast.success('Subscribed! Thank you.');
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Subscription failed');
    }
    setSubscribing(false);
  };

  const whyChooseUs = [
    { icon: <FiBookOpen />, title: 'Academic Excellence', desc: 'Rigorous curriculum with focus on conceptual learning and critical thinking' },
    { icon: <FiUsers />, title: 'Expert Faculty', desc: 'Highly qualified and dedicated teachers committed to student success' },
    { icon: <FiMonitor />, title: 'Smart Classrooms', desc: 'Technology-enabled learning with interactive digital content' },
    { icon: <FiHeart />, title: 'Holistic Development', desc: 'Focus on character building, values and life skills' },
    { icon: <FiAward />, title: 'Proven Results', desc: 'Consistent board results and district-level achievements' },
    { icon: <FiShield />, title: 'Safe Environment', desc: 'CCTV surveillance, trained staff and a secure campus' },
  ];

  const programs = [
    { name: 'Pre-Primary', age: '3-6 years', desc: 'Play-based learning with focus on creativity and social skills', color: 'from-pink-500 to-rose-500' },
    { name: 'Primary', age: '6-11 years', desc: 'Strong foundation in core subjects with activity-based learning', color: 'from-blue-500 to-cyan-500' },
    { name: 'Middle School', age: '11-14 years', desc: 'Interdisciplinary approach with project-based learning', color: 'from-green-500 to-emerald-500' },
    { name: 'Secondary', age: '14-16 years', desc: 'Board preparation with career guidance and counselling', color: 'from-purple-500 to-violet-500' },
    { name: 'Senior Secondary', age: '16-18 years', desc: 'Specialised streams with competitive exam preparation', color: 'from-orange-500 to-amber-500' },
  ];

  return (
    <div>
      <HeroSlider />
      <StatsCounter />

      {/* Welcome */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={welcome?.image || 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800'}
                  alt="School campus"
                  loading="lazy"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#f9a825] rounded-2xl flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <span className="text-3xl font-bold text-[#1a237e]">25+</span>
                  <p className="text-xs text-[#1a237e] font-semibold">Years</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="section-title">{welcome?.title || 'Welcome to Pratibha Public School'}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                {welcome?.content ||
                  'Pratibha Public School Basna, established in 1998, is a premier educational institution in Mahasamund district, Chhattisgarh, committed to nurturing young minds and shaping future leaders.'}
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">Read More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Us</h2>
            <p className="section-subtitle">What makes Pratibha Public School the right choice for your child</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="card group">
                <div className="w-14 h-14 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-2xl mb-4 group-hover:bg-[#1a237e] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a237e] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Academic Programs</h2>
            <p className="section-subtitle">Comprehensive education from Pre-Primary to Senior Secondary</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className={`bg-gradient-to-r ${p.color} p-6 text-white`}>
                  <h3 className="text-xl font-bold mb-1">{p.name}</h3>
                  <p className="text-white/80 text-sm">Age: {p.age}</p>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-gray-600 text-sm mb-4">{p.desc}</p>
                  <Link to="/academics" className="text-[#1a237e] font-semibold text-sm hover:text-[#f9a825] transition-colors">
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's message — from admin */}
      {principal && (
        <section className="py-16 md:py-24 bg-gradient-to-r from-[#1a237e] to-[#0d1452]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="w-48 h-48 mx-auto md:mx-0 rounded-full border-4 border-[#f9a825] overflow-hidden shadow-2xl mb-6 bg-white/10">
                  {principal.photo ? (
                    <img src={principal.photo} alt={principal.name} loading="lazy" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-[#f9a825]">
                      {principal.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{principal.name}</h3>
                <p className="text-[#f9a825] font-semibold">{principal.designation}</p>
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold font-['Playfair_Display'] mb-6">Principal's Message</h2>
                <blockquote className="text-lg text-gray-300 italic leading-relaxed mb-6">
                  "{principal.message}"
                </blockquote>
                <p className="text-gray-400 text-sm">— {principal.name}, {principal.designation}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* News */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
            <div>
              <h2 className="section-title">Latest News & Events</h2>
              <p className="section-subtitle">Stay updated with happenings at PPS</p>
            </div>
            <Link to="/news-events" className="btn-primary">View All</Link>
          </div>
          {news.length === 0 ? (
            <p className="text-center text-gray-500 py-8">News will be published shortly.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item._id} className="card group">
                  {item.image && (
                    <div className="h-48 overflow-hidden rounded-xl mb-4">
                      <img src={item.image} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <span className="text-xs text-[#f9a825] font-semibold">
                    {new Date(item.date || item.createdAt).toLocaleDateString('en-IN')}
                  </span>
                  <h3 className="text-lg font-bold text-[#1a237e] mt-2 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-3">{item.content?.replace(/<[^>]*>/g, '')}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Student Achievements</h2>
              <p className="section-subtitle">Celebrating excellence in academics, sports and beyond</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.slice(0, 6).map((item) => (
                <div key={item._id} className="card flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#f9a825] flex items-center justify-center text-[#1a237e] flex-shrink-0">
                    <FiAward size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e] mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.studentName && `${item.studentName} • `}{item.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-wrap gap-4 justify-between items-center mb-12">
              <div>
                <h2 className="section-title">Photo Gallery</h2>
                <p className="section-subtitle">Glimpses of life at PPS Basna</p>
              </div>
              <Link to="/gallery" className="btn-primary">View Full Gallery</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.slice(0, 8).map((img) => (
                <div key={img._id} className="relative rounded-xl overflow-hidden group aspect-square">
                  <img src={img.imageUrl} alt={img.caption} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <p className="text-white p-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Facilities — from admin */}
      {facilities.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="section-title">Our Facilities</h2>
              <p className="section-subtitle">Infrastructure built for holistic development</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {facilities.slice(0, 8).map((f) => (
                <div key={f._id} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-2xl">
                    {ICONS[f.icon] || <FiHomeIcon />}
                  </div>
                  <h3 className="font-semibold text-[#1a237e] text-sm">{f.title}</h3>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/facilities" className="btn-primary">Explore All Facilities</Link>
            </div>
          </div>
        </section>
      )}

      <TestimonialSlider />

      {/* CTA */}
      {settings?.admissionBannerEnabled !== false && (
        <section className="py-16 bg-gradient-to-r from-[#f9a825] to-[#ffcc02]">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a237e] mb-4 font-['Playfair_Display']">
              {settings?.admissionBannerText || 'Admissions Open for Session 2025-26'}
            </h2>
            <p className="text-[#1a237e]/80 mb-8 max-w-2xl mx-auto">
              Give your child the gift of quality education. Limited seats available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admissions" className="bg-[#1a237e] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#0d1452] hover:shadow-xl hover:scale-105 transition-all duration-300">
                Apply Now
              </Link>
              <Link to="/contact" className="bg-white text-[#1a237e] px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="section-title">Stay Connected</h2>
            <p className="section-subtitle">Subscribe to our newsletter for updates</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={subscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field flex-1"
                required
              />
              <button type="submit" disabled={subscribing} className="btn-primary whitespace-nowrap disabled:opacity-60">
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
