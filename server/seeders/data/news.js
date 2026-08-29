const IMG = require('./images');

module.exports.news = [
  {
    title: 'Annual Day 2025 Celebrated with Grandeur',
    content: 'Pratibha Public School Basna celebrated its 27th Annual Day at the school campus. Students from Nursery to Class 12 presented dance, drama and musical performances. The Chief Guest, District Education Officer of Mahasamund, praised the discipline and confidence of our students.',
    image: IMG.kids,
    date: new Date('2025-02-14'),
    category: 'Events',
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'PPS Students Shine in CBSE Board Results',
    content: 'Our Class 10 and Class 12 students recorded a 98% pass percentage with 15 distinctions. Three students featured in the district merit list. Congratulations to all students, parents and teachers for this remarkable achievement.',
    image: IMG.class,
    date: new Date('2025-05-10'),
    category: 'Academics',
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'New Computer Lab Inaugurated',
    content: 'A fully air-conditioned computer laboratory with 40 new workstations and high-speed internet was inaugurated on the campus. Students of Classes 6 to 12 will now have dedicated coding and IT periods every week.',
    image: IMG.lab,
    date: new Date('2025-07-02'),
    category: 'Infrastructure',
    isFeatured: true,
    isActive: true,
  },
  {
    title: 'Inter-School Cricket Tournament — PPS Lifts the Trophy',
    content: 'The PPS Basna senior cricket team defeated four schools of Mahasamund district to win the Inter-School Cricket Championship. Captain Aakash Sahu was declared Player of the Tournament.',
    image: IMG.sports,
    date: new Date('2025-08-21'),
    category: 'Sports',
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Science Exhibition: Young Innovators at Work',
    content: 'Over 60 working models were displayed at the annual Science Exhibition. Projects on solar irrigation, water purification and waste management drew special appreciation from visiting judges.',
    image: IMG.lab,
    date: new Date('2025-09-12'),
    category: 'Academics',
    isFeatured: false,
    isActive: true,
  },
  {
    title: 'Independence Day Celebrated with Patriotic Fervour',
    content: 'The 79th Independence Day was celebrated with flag hoisting, march past and cultural programmes. Students presented a moving tribute to freedom fighters of Chhattisgarh.',
    image: IMG.campus,
    date: new Date('2025-08-15'),
    category: 'Events',
    isFeatured: false,
    isActive: true,
  },
];

module.exports.events = [
  { title: 'Parent-Teacher Meeting', description: 'Term-1 progress discussion for Classes 1 to 12.', date: new Date('2025-12-06'), time: '9:00 AM - 1:00 PM', venue: 'School Auditorium', isActive: true },
  { title: 'Annual Sports Meet', description: 'Track and field events, march past and prize distribution.', date: new Date('2025-12-18'), time: '8:00 AM onwards', venue: 'PPS Sports Ground', isActive: true },
  { title: 'Winter Break Begins', description: 'School remains closed for winter vacation.', date: new Date('2025-12-25'), time: 'All day', venue: '—', isActive: true },
  { title: 'Republic Day Celebration', description: 'Flag hoisting followed by cultural programme.', date: new Date('2026-01-26'), time: '8:00 AM', venue: 'School Campus', isActive: true },
  { title: 'Science & Art Exhibition', description: 'Student projects and artwork on display for parents.', date: new Date('2026-02-07'), time: '10:00 AM - 3:00 PM', venue: 'Science Block', isActive: true },
];
