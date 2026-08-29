const IMG = require('./images');

module.exports.facilities = [
  { title: 'Smart Classrooms', description: 'Every classroom from Class 1 to 12 is fitted with an interactive smart board and projector. Digital lesson content makes abstract concepts visual and easy to grasp.', images: [IMG.class], icon: 'monitor', order: 1, isActive: true },
  { title: 'Science Laboratories', description: 'Separate, well-stocked Physics, Chemistry and Biology labs where students perform the full CBSE practical syllabus under trained lab assistants.', images: [IMG.lab], icon: 'flask', order: 2, isActive: true },
  { title: 'Computer Lab', description: 'A newly inaugurated air-conditioned lab with 40 workstations and high-speed internet. Coding and IT periods are part of the weekly timetable.', images: [IMG.lab], icon: 'cpu', order: 3, isActive: true },
  { title: 'Library', description: 'Over 6,000 books, reference encyclopaedias, competitive exam material and childrens literature, with a quiet reading room for 60 students.', images: [IMG.library], icon: 'book', order: 4, isActive: true },
  { title: 'Sports Ground', description: 'A large playground supporting cricket, football, kabaddi, kho-kho and athletics, plus courts for basketball and badminton.', images: [IMG.sports], icon: 'activity', order: 5, isActive: true },
  { title: 'Transportation', description: 'Six bus routes covering Basna, Khatkhati, Pithora and surrounding villages. Every bus has a trained driver, an attendant and a first-aid kit.', images: [IMG.campus], icon: 'truck', order: 6, isActive: true },
  { title: 'Cafeteria', description: 'Hygienic canteen serving freshly prepared, balanced meals and snacks. Menus are reviewed to keep them nutritious and affordable.', images: [IMG.campus], icon: 'coffee', order: 7, isActive: true },
  { title: 'Medical Room', description: 'On-campus medical room with a trained nurse, first-aid facilities and periodic health check-up camps for all students.', images: [IMG.campus], icon: 'heart', order: 8, isActive: true },
  { title: 'Security & CCTV', description: 'The full campus is under CCTV surveillance with security staff at the gate and a visitor-log system. Student safety is non-negotiable.', images: [IMG.campus], icon: 'shield', order: 9, isActive: true },
];

module.exports.busRoutes = [
  { routeNumber: 'R-1', routeName: 'Basna Town Route', stops: ['Bus Stand Basna', 'Gandhi Chowk', 'Ward 5 Basna', 'Khatkhati Turn'], timing: 'Pickup 6:50 AM / Drop 3:30 PM', isActive: true },
  { routeNumber: 'R-2', routeName: 'Khatkhati - School Route', stops: ['Khatkhati Village', 'Primary School Khatkhati', 'Temple Road', 'School Gate'], timing: 'Pickup 7:10 AM / Drop 3:20 PM', isActive: true },
  { routeNumber: 'R-3', routeName: 'Pithora Road Route', stops: ['Pithora Chowk', 'Bharuamuda', 'Amlidiha', 'Basna Bypass'], timing: 'Pickup 6:35 AM / Drop 3:45 PM', isActive: true },
  { routeNumber: 'R-4', routeName: 'Saraipali Road Route', stops: ['Saraipali Turn', 'Kurrubhata', 'Devri', 'Basna Chowk'], timing: 'Pickup 6:40 AM / Drop 3:40 PM', isActive: true },
  { routeNumber: 'R-5', routeName: 'Sankra Route', stops: ['Sankra Bus Stop', 'Belsonda Road', 'Achhoti', 'School Gate'], timing: 'Pickup 6:55 AM / Drop 3:35 PM', isActive: true },
  { routeNumber: 'R-6', routeName: 'Mahasamund Road Route', stops: ['Mahasamund Road Junction', 'Lafinkala', 'Tilakpali', 'Basna'], timing: 'Pickup 6:30 AM / Drop 3:50 PM', isActive: true },
];

module.exports.downloads = [
  { title: 'Admission Form 2025-26', description: 'Printable admission form for Nursery to Class 12. Submit at the school office with documents.', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'Admissions' },
  { title: 'Transfer Certificate Application', description: 'Application format for requesting a Transfer Certificate (TC).', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'Certificates' },
  { title: 'Annual Academic Calendar 2025-26', description: 'Term dates, examination schedule, holidays and major school events.', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'Academics' },
  { title: 'Fee Structure 2025-26', description: 'Class-wise tuition, transport and annual charges.', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'Fees' },
  { title: 'School Uniform Guidelines', description: 'Prescribed uniform, shoes and grooming standards for boys and girls.', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'General' },
  { title: 'Bus Route Chart 2025-26', description: 'All six routes with stops and timings.', file: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', category: 'Transport' },
];

module.exports.popup = {
  title: 'Admissions Open — Session 2025-26',
  image: IMG.kids,
  content: 'Limited seats available from Nursery to Class 12. Submit your enquiry online and our admission counsellor will call you within 24 hours.',
  link: '/admissions',
  isActive: true,
  startDate: new Date('2025-01-01'),
};
