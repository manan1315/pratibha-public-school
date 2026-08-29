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
  { name: 'Ramesh Kumar Sahu', relation: 'Parent, Class 8', quote: 'Mere beti ko 3 saal pehle PPS mein admission diya tha. Umeed nahi thi ki itni chhote school mein itni acchi padhai hogi. Par ab confidence badh gaya hai, English bhi acchi bolti hai. Teachers ko bhi bahut shkriya hai.', photo: IMG.man1, rating: 5, isActive: true },
  { name: 'Sunita Chandrakar', relation: 'Parent, Class 5', quote: 'Saf campus, disciplined staff aur safe transport. Working mother ke liye ye bahut important hai. Fees bhi city schools ke muqable bahut reasonable hai. Mujhe PPS par bharosa hai.', photo: IMG.woman1, rating: 5, isActive: true },
  { name: 'Suresh Patel', relation: 'Parent, Class 11', quote: 'Science labs aur computer lab bahut acche hain. Mere bete ko practical exposure mil raha hai jo maine sirf books mein padha tha. Teachers bahut supportive hain.', photo: IMG.man2, rating: 4, isActive: true },
  { name: 'Anjali Nayak', relation: 'Parent, Nursery', quote: 'Pre-primary section bahut colourful aur caring hai. Mera bachcha chutti ko rota hai — ye hi keh deta hai kitne acche teachers hain. Bahut accha school hai Basna mein.', photo: IMG.woman2, rating: 5, isActive: true },
  { name: 'Rajesh Verma', relation: 'Parent, Class 10', quote: 'Mera beta PPS mein padhta hai. Result bahut accha raha hai CBSE mein. Teachers ne bahut mehnat ki hai. Transport bhi time par aata hai. Bahut satisfied hoon.', photo: IMG.man3, rating: 5, isActive: true },
  { name: 'Priya Dwivedi', relation: 'Parent, Class 7', quote: 'School ka environment bahut accha hai. Discipline aur dono cheez dhyan mein rakhte hain. Mera beti bahut khush hai padhne mein. Fees bhi bahut reasonable hai.', photo: IMG.woman3, rating: 5, isActive: true },
  { name: 'Amit Tiwari', relation: 'Parent, Class 9', quote: 'Mera beta PPS mein padhta hai. Result bahut accha raha hai CBSE mein. Teachers ne bahut mehnat ki hai. Transport bhi time par aata hai. Bahut satisfied hoon.', photo: IMG.man4, rating: 5, isActive: true },
  { name: 'Kavita Sharma', relation: 'Parent, Class 6', quote: 'School ka environment bahut accha hai. Discipline aur dono cheez dhyan mein rakhte hain. Mera beti bahut khush hai padhne mein. Fees bhi bahut reasonable hai.', photo: IMG.woman4, rating: 5, isActive: true },
];

module.exports.faqs = [
  { question: 'What is the admission process at PPS Basna?', answer: 'Submit the online enquiry form or visit the school office. Our counsellor will call you for an interaction, followed by an age-appropriate assessment. On selection, complete the documentation and fee payment to confirm admission.', category: 'Admissions', order: 1, isActive: true },
  { question: 'What are the school timings?', answer: 'Monday to Saturday: Primary 7:40 AM - 11:40 AM | Middle & Higher Secondary 7:40 AM - 1:40 PM. Pre-primary classes end at 11:40 AM. The school office remains open till 4:00 PM.', category: 'General', order: 2, isActive: true },
  { question: 'Is transport facility available?', answer: 'Yes. We operate buses on 6 routes covering Basna, Khatkhati, Pithora, Saraipali road and nearby villages within a 30 km radius. All buses have a trained driver and an attendant.', category: 'Transport', order: 3, isActive: true },
  { question: 'Which board is the school affiliated to?', answer: 'Pratibha Public School Basna is affiliated to CBSE (Central Board of Secondary Education) and offers classes from Nursery to Class 12.', category: 'Academics', order: 4, isActive: true },
  { question: 'What documents are required at the time of admission?', answer: 'Birth certificate, Aadhaar of student and parents, 4 passport photographs, Transfer Certificate (Class 2 onwards), previous report card, and an address proof.', category: 'Admissions', order: 5, isActive: true },
  { question: 'Do you offer scholarships or fee concessions?', answer: 'Yes. Merit scholarships are awarded to top performers in each class, and need-based concessions are considered for deserving families. Please contact the school office.', category: 'Fees', order: 6, isActive: true },
  { question: 'What streams are offered in Class 11 and 12?', answer: 'We offer Science (PCM and PCB), Commerce and Humanities. Stream allotment is based on Class 10 performance and student preference.', category: 'Academics', order: 7, isActive: true },
];
