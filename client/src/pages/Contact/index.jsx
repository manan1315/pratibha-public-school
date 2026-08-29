import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { contactAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { SCHOOL_INFO } from '../../utils/constants';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.submit(formData);
      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">Contact Us</h1>
          <p className="text-gray-300">Home / Contact</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-3">
            {/* Contact Form */}
            <div>
              <h2 className="section-title">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2.5">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="input-field" required />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className="input-field" required />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="input-field" />
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="input-field" required />
                </div>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" className="input-field" rows="5" required></textarea>
                <button type="submit" disabled={loading} className="btn-primary w-full">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="section-title">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                    <FiMapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e] mb-1">Address</h3>
                    <p className="text-gray-600 text-sm">{SCHOOL_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                    <FiPhone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e] mb-1">Phone</h3>
                    <a href={`tel:${SCHOOL_INFO.phone1}`} className="text-gray-600 text-sm block hover:text-[#1a237e]">{SCHOOL_INFO.phone1}</a>
                    <a href={`tel:${SCHOOL_INFO.phone2}`} className="text-gray-600 text-sm block hover:text-[#1a237e]">{SCHOOL_INFO.phone2}</a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                    <FiMail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e] mb-1">Email</h3>
                    <a href={`mailto:${SCHOOL_INFO.email}`} className="text-gray-600 text-sm hover:text-[#1a237e]">{SCHOOL_INFO.email}</a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e]">
                    <FiClock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a237e] mb-1">Working Hours</h3>
                    <p className="text-gray-600 text-sm">Monday - Saturday: Primary 7:40 AM - 11:40 AM | Middle & Higher Secondary 7:40 AM - 1:40 PM</p>
                    <p className="text-gray-600 text-sm">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3715.6!2d82.82!3d21.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE3JzI0LjAiTiA4MsKwNDknMTIuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="School Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
