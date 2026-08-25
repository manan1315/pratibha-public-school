const IMG = require('./images');

module.exports.albums = [
  { albumName: 'Campus & Infrastructure', description: 'Our campus at Khatkhati, Basna', coverImage: IMG.campus, isActive: true },
  { albumName: 'Classroom Moments', description: 'Learning in action', coverImage: IMG.class, isActive: true },
  { albumName: 'Sports & Games', description: 'Annual sports meet and tournaments', coverImage: IMG.sports, isActive: true },
  { albumName: 'Cultural Events', description: 'Annual Day, festivals and celebrations', coverImage: IMG.kids, isActive: true },
];

// images grouped by album index above
module.exports.albumImages = [
  [
    { imageUrl: IMG.campus, caption: 'Main school building', order: 1 },
    { imageUrl: IMG.library, caption: 'Library reading room', order: 2 },
    { imageUrl: IMG.lab, caption: 'Science laboratory', order: 3 },
  ],
  [
    { imageUrl: IMG.class, caption: 'Smart classroom session', order: 1 },
    { imageUrl: IMG.kids, caption: 'Pre-primary activity time', order: 2 },
    { imageUrl: IMG.lab, caption: 'Practical in the physics lab', order: 3 },
  ],
  [
    { imageUrl: IMG.sports, caption: 'Annual Sports Meet', order: 1 },
    { imageUrl: IMG.sports, caption: 'Inter-school cricket final', order: 2 },
  ],
  [
    { imageUrl: IMG.kids, caption: 'Annual Day performance', order: 1 },
    { imageUrl: IMG.campus, caption: 'Independence Day march past', order: 2 },
    { imageUrl: IMG.class, caption: 'Science exhibition day', order: 3 },
  ],
];

module.exports.about = [
  {
    section: 'welcome',
    title: 'Welcome to Pratibha Public School Basna',
    content: 'Pratibha Public School Basna was established in 1998 by the Pratibha Shikshan Samiti with a clear purpose — to bring city-standard education to the children of Khatkhati, Basna and the surrounding villages of Mahasamund district. Today we are a CGBSE-affiliated co-educational school running from Nursery to Class 12, with over 1,500 students and 80 qualified teachers on a 10-acre campus.',
    image: IMG.campus,
  },
  {
    section: 'vision',
    title: 'Our Vision',
    content: 'To be a centre of educational excellence in Chhattisgarh that nurtures responsible, confident and compassionate citizens — students who carry the values of their roots while competing with the best anywhere in the country.',
    image: IMG.class,
  },
  {
    section: 'mission',
    title: 'Our Mission',
    content: 'To provide a stimulating and safe learning environment that develops intellectual curiosity, moral courage and social responsibility; to keep quality education affordable for rural and semi-urban families; and to ensure every child is known, guided and given a chance to lead.',
    image: IMG.kids,
  },
  {
    section: 'ethos',
    title: 'Our Ethos & Values',
    content: 'Discipline with dignity. Learning over memorising. Respect for every background. We believe a school is judged not by its toppers alone but by how it lifts its average student — and that belief shapes every decision we take.',
    image: IMG.library,
  },
  {
    section: 'society',
    title: 'School Managing Committee',
    content: 'The school is managed by the Pratibha Shikshan Samiti, a registered educational society. The Managing Committee comprises the Chairman, Director, Principal, three teacher representatives and two parent representatives, and meets quarterly to review academics, infrastructure and student welfare.',
    image: IMG.campus,
  },
  {
    section: 'pedagogy',
    title: 'Pedagogy & Assessment',
    content: 'We follow a child-centric approach that values conceptual understanding over rote learning. Classes combine smart-board content, activity-based tasks and group projects. Assessment is continuous — periodic formative tests, practicals and term examinations — so that gaps are caught early and addressed with remedial classes.',
    image: IMG.class,
  },
];
