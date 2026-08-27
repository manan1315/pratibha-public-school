import React, { useState } from 'react';
import { FiCheck, FiFileText, FiUser, FiUsers, FiChevronDown } from 'react-icons/fi';
import { enquiryAPI, faqAPI, downloadAPI } from '../../services/api';
import useResource from '../../hooks/useResource';
import { toast } from 'react-toastify';

const Admissions = () => {
  const [formData, setFormData] = useState({
    studentName: '', parentName: '', email: '', phone: '', class: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const { data: faqs } = useResource(faqAPI.getAll);
  const { data: downloads } = useResource(downloadAPI.getAll);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enquiryAPI.submit(formData);
      toast.success('Enquiry submitted! Our admission counsellor will contact you soon.');
      setFormData({ studentName: '', parentName: '', email: '', phone: '', class: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.');
    }
    setLoading(false);
  };

  const steps = [
    { icon: <FiFileText />, title: 'Submit Enquiry', desc: 'Fill the admission enquiry form online or visit the school office' },
    { icon: <FiUser />, title: 'Interaction', desc: 'Meet the school administration and tour the campus' },
    { icon: <FiCheck />, title: 'Assessment', desc: 'Age-appropriate assessment for class placement' },
    { icon: <FiUsers />, title: 'Confirmation', desc: 'Complete documentation and fee payment' },
  ];

  const ageCriteria = [
    { class: 'Nursery', age: '3+ years', date: 'Born on or before 31st March 2022' },
    { class: 'LKG', age: '4+ years', date: 'Born on or before 31st March 2021' },
    { class: 'UKG', age: '5+ years', date: 'Born on or before 31st March 2020' },
    { class: 'Class 1', age: '6+ years', date: 'Born on or before 31st March 2019' },
  ];

  const documents = [
    'Birth Certificate (original + 2 photocopies)',
    'Aadhaar Card of student and parents',
    'Passport size photographs (4 copies)',
    'Transfer Certificate (for Class 2 and above)',
    'Previous year marksheet / report card',
    'Caste Certificate (if applicable)',
    'Medical Fitness Certificate',
    'Address proof (electricity bill / ration card)',
  ];

  const classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5',
    'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1a237e] to-[#0d1452] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-xl sm:text-xl sm:text-2xl font-bold font-['Playfair_Display'] mb-2.5">Admissions</h1>
          <p className="text-gray-300">Home / Admissions</p>
        </div>
      </div>

      <section className="py-4 md:py-5">
        <div className="max-w-7xl mx-auto px-4">
          {/* Process */}
          <div id="process" className="mb-8">
            <h2 className="section-title">Admission Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3">
              {steps.map((s, i) => (
                <div key={i} className="card relative">
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#f9a825] text-[#1a237e] rounded-full flex items-center justify-center font-bold shadow">
                    {i + 1}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#1a237e]/10 flex items-center justify-center text-[#1a237e] text-xl mb-2 mt-2">
                    {s.icon}
                  </div>
                  <h3 className="font-bold text-[#1a237e] mb-2">{s.title}</h3>
                  <p className="text-gray-600 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form + age table */}
          <div id="enquiry" className="grid md:grid-cols-2 gap-3 mb-8">
            <div>
              <h2 className="section-title">Admission Enquiry</h2>
              <p className="text-gray-600 mb-2.5">Fill the form and our admission counsellor will contact you.</p>
              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name *" className="input-field" required />
                  <input name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Parent Name *" className="input-field" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email *" className="input-field" required />
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone *" className="input-field" required />
                </div>
                <select name="class" value={formData.class} onChange={handleChange} className="input-field" required>
                  <option value="">Select Class *</option>
                  {classes.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message (optional)" className="input-field" rows="3" />
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            </div>

            <div id="age">
              <h2 className="section-title">Age Criteria</h2>
              <div className="overflow-x-auto mt-3">
                <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                  <thead className="bg-[#1a237e] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm">Class</th>
                      <th className="px-4 py-3 text-left text-sm">Age</th>
                      <th className="px-4 py-3 text-left text-sm">Date of Birth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ageCriteria.map((r, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-3 font-medium text-sm">{r.class}</td>
                        <td className="px-4 py-3 text-sm">{r.age}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{r.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#1a237e] mt-3 mb-2">Documents Required</h3>
              <div className="space-y-2">
                {documents.map((d, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fee Structure Table */}
          <div id="fees" className="mb-8">
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2">
              <div>
                <h2 className="section-title">Fee Structure 2026-27</h2>
                <p className="section-subtitle">Session-wise installment breakdown for all classes</p>
              </div>
              <a
                href="/assets/fee-structure-2026-27.pdf"
                download="PPS Basna Fee Structure 2026-27.pdf"
                className="inline-flex items-center gap-2 bg-[#1a237e] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#0d1452] hover:shadow-lg transition-all duration-300 text-sm"
              >
                <FiFileText size={16} /> Download PDF
              </a>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-xl">
              <table className="w-full bg-white overflow-hidden">
                <thead>
                  <tr className="bg-[#1a237e] text-white">
                    <th className="px-4 py-3.5 text-left text-sm font-semibold">Class</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Installment 1</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Installment 2</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Installment 3</th>
                    <th className="px-4 py-3.5 text-right text-sm font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cls: 'Nursery', i1: 5200, i2: 3500, i3: 3500 },
                    { cls: 'Smart - I', i1: 5800, i2: 4000, i3: 4000 },
                    { cls: 'Smart - II', i1: 7300, i2: 4000, i3: 4000 },
                    { cls: 'Class 1', i1: 10700, i2: 5500, i3: 5500 },
                    { cls: 'Class 2', i1: 11100, i2: 6000, i3: 6000 },
                    { cls: 'Class 3', i1: 11800, i2: 6500, i3: 6500 },
                    { cls: 'Class 4', i1: 12400, i2: 7000, i3: 7000 },
                    { cls: 'Class 5', i1: 13000, i2: 7500, i3: 7500 },
                    { cls: 'Class 6', i1: 13600, i2: 8000, i3: 8000 },
                    { cls: 'Class 7', i1: 14200, i2: 8500, i3: 8500 },
                    { cls: 'Class 8', i1: 14800, i2: 9000, i3: 9000 },
                    { cls: 'Class 9', i1: 16300, i2: 9000, i3: 9000 },
                    { cls: 'Class 10', i1: 16300, i2: 9000, i3: 9000 },
                    { cls: 'Class 11 & 12 (Commerce)', i1: 19000, i2: 10000, i3: 10000 },
                    { cls: 'Class 11 & 12 (Science)', i1: 19000, i2: 15000, i3: 15000 },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="px-4 py-3 font-medium text-sm text-[#1a237e]">{row.cls}</td>
                      <td className="px-4 py-3 text-sm text-right">₹ {row.i1.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-sm text-right">₹ {row.i2.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-sm text-right">₹ {row.i3.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-[#1a237e]">₹ {(row.i1 + row.i2 + row.i3).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Notes */}
            <div className="mt-4 bg-[#f9a825]/10 border border-[#f9a825]/30 rounded-xl p-4">
              <h4 className="font-bold text-[#1a237e] mb-2">Important Notes:</h4>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-[#f9a825] font-bold">1.</span>
                  <span className="text-gray-700">Caution Money (Refundable) — <strong>₹ 1,000/-</strong></span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-[#f9a825] font-bold">2.</span>
                  <span className="text-gray-700">Admission Fee — <strong>₹ 2,000/-</strong> (for New Admission only)</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-[#f9a825] font-bold">3.</span>
                  <span className="text-gray-700">Form Fees — <strong>₹ 100/-</strong> (for New Admission only)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Downloads from admin */}
          {downloads.length > 0 && (
            <div className="mb-8">
              <h2 className="section-title">Other Downloads</h2>
              <div className="grid md:grid-cols-3 gap-2.5 mt-3">
                {downloads.map((d) => (
                  <a key={d._id} href={d.file} target="_blank" rel="noreferrer"
                     className="card flex items-center gap-2.5 hover:border-[#f9a825]">
                    <FiFileText className="text-[#1a237e] text-xl sm:text-2xl flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-[#1a237e] text-sm">{d.title}</h3>
                      <span className="text-xs text-gray-500">{d.category}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* FAQs — from admin */}
          <div id="faqs">
            <h2 className="section-title">Frequently Asked Questions</h2>
            {faqs.length === 0 ? (
              <p className="text-gray-500 mt-4">FAQs will be published shortly.</p>
            ) : (
              <div className="space-y-2.5 mt-3">
                {faqs.map((f, i) => (
                  <div key={f._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between gap-2.5 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-[#1a237e]">{f.question}</span>
                      <FiChevronDown className={`flex-shrink-0 text-[#f9a825] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-gray-600 text-sm border-t pt-3">{f.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
