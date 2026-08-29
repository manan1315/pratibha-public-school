const IMG = require('./images');

module.exports.achievements = [
  { title: 'District Topper — CBSE Class 12', description: 'Secured 96.4% and ranked 2nd in Mahasamund district in the Science stream.', image: IMG.class, studentName: 'Nikita Sahu', category: 'Academic', year: '2025', isActive: true },
  { title: 'Inter-School Cricket Champions', description: 'Won the district-level inter-school cricket championship defeating four schools.', image: IMG.sports, studentName: 'PPS Senior Team', category: 'Sports', year: '2025', isActive: true },
  { title: 'State-Level Science Exhibition — Silver', description: 'Solar-powered irrigation model selected for the Chhattisgarh state science fair.', image: IMG.lab, studentName: 'Rohit Nayak & Team', category: 'Academic', year: '2025', isActive: true },
  { title: 'Kabaddi — District Gold Medal', description: 'Girls kabaddi team won gold at the district school games.', image: IMG.sports, studentName: 'PPS Girls Team', category: 'Sports', year: '2024', isActive: true },
  { title: 'Best School Award — Basna Block', description: 'Recognised for academic excellence and infrastructure by the Block Education Office.', image: IMG.campus, studentName: '', category: 'School Award', year: '2024', isActive: true },
  { title: 'National Level Painting Competition', description: 'Selected among the top 50 entries nationwide in a CBSE-affiliated art contest.', image: IMG.kids, studentName: 'Sneha Verma', category: 'Cultural', year: '2024', isActive: true },
];

module.exports.testimonials = [
  { name: 'Ramesh Kumar Sahu', relation: 'Parent, Class 8', quote: 'My daughter joined PPS three years ago. The change in her confidence and spoken English is something I never expected in a school here in Basna. The teachers actually call us to discuss progress.', photo: IMG.man1, rating: 5, isActive: true },
  { name: 'Sunita Chandrakar', relation: 'Parent, Class 5', quote: 'Clean campus, disciplined staff and safe transport. As a working mother, the peace of mind I get is priceless. Fees are also very reasonable compared to city schools.', photo: IMG.woman1, rating: 5, isActive: true },
  { name: 'Nikita Sahu', relation: 'Alumna, Batch 2025', quote: 'The teachers here pushed me to aim beyond the district. I scored 96.4% in CBSE and got into an engineering college in Raipur. PPS built my foundation.', photo: IMG.woman2, rating: 5, isActive: true },
  { name: 'Deepak Patel', relation: 'Parent, Class 11', quote: 'Science labs and the new computer lab are genuinely well-equipped. My son gets practical exposure that I only read about in books at his age.', photo: IMG.man2, rating: 4, isActive: true },
  { name: 'Anjali Nayak', relation: 'Parent, Nursery', quote: 'The pre-primary section is so colourful and caring. My child cries when there is a holiday — that says everything about the teachers here.', photo: IMG.woman1, rating: 5, isActive: true },
];

module.exports.faqs = [
  { question: 'What is the admission process at PPS Basna?', answer: 'Submit the online enquiry form or visit the school office. Our counsellor will call you for an interaction, followed by an age-appropriate assessment. On selection, complete the documentation and fee payment to confirm admission.', category: 'Admissions', order: 1, isActive: true },
  { question: 'What are the school timings?', answer: 'Monday to Saturday, 8:00 AM to 3:00 PM. Pre-primary classes end at 12:30 PM. The school office remains open till 4:00 PM.', category: 'General', order: 2, isActive: true },
  { question: 'Is transport facility available?', answer: 'Yes. We operate buses on 6 routes covering Basna, Khatkhati, Pithora, Saraipali road and nearby villages within a 30 km radius. All buses have a trained driver and an attendant.', category: 'Transport', order: 3, isActive: true },
  { question: 'Which board is the school affiliated to?', answer: 'Pratibha Public School Basna is affiliated to CBSE (Central Board of Secondary Education) and offers classes from Nursery to Class 12.', category: 'Academics', order: 4, isActive: true },
  { question: 'What documents are required at the time of admission?', answer: 'Birth certificate, Aadhaar of student and parents, 4 passport photographs, Transfer Certificate (Class 2 onwards), previous report card, and an address proof.', category: 'Admissions', order: 5, isActive: true },
  { question: 'Do you offer scholarships or fee concessions?', answer: 'Yes. Merit scholarships are awarded to top performers in each class, and need-based concessions are considered for deserving families. Please contact the school office.', category: 'Fees', order: 6, isActive: true },
  { question: 'What streams are offered in Class 11 and 12?', answer: 'We offer Science (PCM and PCB), Commerce and Humanities. Stream allotment is based on Class 10 performance and student preference.', category: 'Academics', order: 7, isActive: true },
];
