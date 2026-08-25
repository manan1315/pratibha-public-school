const IMG = require('./images');

module.exports.leadership = [
  {
    name: 'Shri Mohan Lal Agrawal',
    designation: 'Chairman, Pratibha Shikshan Samiti',
    photo: IMG.man1,
    message: 'When we started Pratibha Public School in 1998, our dream was simple — every child of Basna and Khatkhati should get the same quality of education available in big cities. Twenty-seven years later, that dream walks through our gates every morning.',
    type: 'chairman',
    order: 1,
    isActive: true,
  },
  {
    name: 'Dr. Mehrun Nisa Khatun',
    designation: 'Principal',
    photo: '/assets/principal.png',
    message: 'Education is not just about acquiring knowledge; it is about developing character, building values, and preparing young minds to face the challenges of tomorrow. At PPS Basna, every child is known by name, and every child matters.',
    type: 'principal',
    order: 2,
    isActive: true,
  },
  {
    name: 'Smt. Sunita Devi Agrawal',
    designation: 'Director, Academics',
    photo: IMG.woman1,
    message: 'We believe in holistic education that develops the mind, body and spirit. Our teachers are trained to spot the spark in every student — whether it is in mathematics, on the sports field, or on the stage.',
    type: 'director',
    order: 3,
    isActive: true,
  },
];

module.exports.faculty = [
  { name: 'Mrs. Anita Verma', photo: IMG.woman2, qualification: 'M.A. (English), B.Ed.', designation: 'Senior Teacher', department: 'English', experience: '14 years', order: 1, isActive: true },
  { name: 'Mr. Suresh Patel', photo: IMG.man3, qualification: 'M.Sc. (Mathematics), B.Ed.', designation: 'HOD', department: 'Mathematics', experience: '18 years', order: 2, isActive: true },
  { name: 'Mrs. Kavita Sahu', photo: IMG.woman1, qualification: 'M.Sc. (Physics), B.Ed.', designation: 'Senior Teacher', department: 'Science', experience: '11 years', order: 3, isActive: true },
  { name: 'Mr. Deepak Nayak', photo: IMG.man1, qualification: 'M.A. (Hindi), B.Ed.', designation: 'Senior Teacher', department: 'Hindi', experience: '16 years', order: 4, isActive: true },
  { name: 'Mrs. Reena Chandrakar', photo: IMG.woman2, qualification: 'M.Com., B.Ed.', designation: 'Teacher', department: 'Commerce', experience: '9 years', order: 5, isActive: true },
  { name: 'Mr. Amit Sinha', photo: IMG.man2, qualification: 'MCA', designation: 'Computer Instructor', department: 'Computer Science', experience: '7 years', order: 6, isActive: true },
  { name: 'Mrs. Pooja Tandon', photo: IMG.woman1, qualification: 'M.Sc. (Biology), B.Ed.', designation: 'Teacher', department: 'Science', experience: '8 years', order: 7, isActive: true },
  { name: 'Mr. Ramesh Yadav', photo: IMG.man3, qualification: 'B.P.Ed.', designation: 'Sports Coach', department: 'Physical Education', experience: '12 years', order: 8, isActive: true },
];

module.exports.studentLeaders = [
  { name: 'Aakash Sahu', photo: IMG.man3, class: 'Class 12 - Science', position: 'Head Boy', year: '2025-26', order: 1, isActive: true },
  { name: 'Priya Chandrakar', photo: IMG.woman2, class: 'Class 12 - Commerce', position: 'Head Girl', year: '2025-26', order: 2, isActive: true },
  { name: 'Rohit Nayak', photo: IMG.man1, class: 'Class 11 - Science', position: 'Sports Captain', year: '2025-26', order: 3, isActive: true },
  { name: 'Sneha Verma', photo: IMG.woman1, class: 'Class 11 - Arts', position: 'Cultural Secretary', year: '2025-26', order: 4, isActive: true },
];
