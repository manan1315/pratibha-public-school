const IMG = require('./images');

module.exports.sliders = [
  {
    image: IMG.campus,
    heading: 'Welcome to Pratibha Public School',
    subheading: 'Nurturing Minds, Shaping Futures since 1998 — Khatkhati, Basna',
    buttonText: 'Explore Admissions',
    buttonLink: '/admissions',
    order: 1,
    isActive: true,
  },
  {
    image: IMG.class,
    heading: 'Admissions Open 2025-26',
    subheading: 'Limited seats from Nursery to Class 12. Apply online today.',
    buttonText: 'Apply Now',
    buttonLink: '/admissions',
    order: 2,
    isActive: true,
  },
  {
    image: IMG.lab,
    heading: 'Learning Beyond Textbooks',
    subheading: 'Smart classrooms, modern science labs and hands-on experiments',
    buttonText: 'Our Facilities',
    buttonLink: '/facilities',
    order: 3,
    isActive: true,
  },
  {
    image: IMG.sports,
    heading: 'Champions in the Making',
    subheading: 'Sports, arts and culture — because talent needs a playground',
    buttonText: 'Student Life',
    buttonLink: '/student-life',
    order: 4,
    isActive: true,
  },
];

module.exports.announcements = [
  { text: 'Admissions open for Session 2025-26 — Apply online or visit the school office.', link: '/admissions', isActive: true },
  { text: 'CGBSE Class 10 & 12 results: 98% students passed with First Division.', link: '/achievements', isActive: true },
  { text: 'Annual Sports Meet on 18th December — parents are cordially invited.', link: '/news-events', isActive: true },
  { text: 'Bus routes for the new session have been updated. Check Transportation.', link: '/facilities', isActive: true },
];
