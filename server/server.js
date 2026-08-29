const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter, authLimiter, formLimiter, speedLimiter, ipBlocker, headerValidation, recordFailedAttempt, recordSuccess } = require('./middleware/rateLimiter');
const { generateCaptcha, verifyCaptcha } = require('./middleware/captcha');

// Route imports
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const sliderRoutes = require('./routes/sliderRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const leadershipRoutes = require('./routes/leadershipRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const newsRoutes = require('./routes/newsRoutes');
const eventRoutes = require('./routes/eventRoutes');
const albumRoutes = require('./routes/albumRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const facilityRoutes = require('./routes/facilityRoutes');
const faqRoutes = require('./routes/faqRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const busRouteRoutes = require('./routes/busRouteRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const popupRoutes = require('./routes/popupRoutes');
const contactRoutes = require('./routes/contactRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const studentLeaderRoutes = require('./routes/studentLeaderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// Connect to MongoDB (skipped when devServer.js already connected)
const mongoose = require('mongoose');
if (mongoose.connection.readyState === 0) connectDB();

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : true)
    : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175',
       'http://localhost:5176', 'http://localhost:5177', 'http://localhost:5178'],
  credentials: true,
}));
app.use(compression());
app.use(mongoSanitize());
app.use(headerValidation);  // Don't trust X-Forwarded-For

// Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting
app.use('/api/', apiLimiter);
app.use('/api/', speedLimiter);  // Progressive delay on abuse

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CAPTCHA endpoint
app.get('/api/captcha', ipBlocker, (req, res) => {
  const captcha = generateCaptcha();
  res.json(captcha);
});

// API Routes
app.use('/api/auth', ipBlocker, authRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/sliders', sliderRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/bus-routes', busRouteRoutes);
app.use('/api/downloads', downloadRoutes);
app.use('/api/popups', popupRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/student-leaders', studentLeaderRoutes);
app.use('/api/upload', uploadRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Pratibha Public School API is running' });
});

// ---------------------------------------------------------------
// Production: serve the built React app from this same server so the
// whole site (website + /admin + /api) lives on ONE domain.
// ---------------------------------------------------------------
const clientDist = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(path.join(clientDist, 'index.html'))) {
  app.use(express.static(clientDist, { maxAge: '7d', index: false }));

  // Any non-API route falls through to React Router
  app.get(/^\/(?!api|uploads).*/, (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
  console.log('Serving frontend build from client/dist');
} else {
  app.get('/', (req, res) => {
    res.json({
      message: 'Pratibha Public School API',
      note: 'Frontend build not found. Run "npm run build" inside /client.',
    });
  });
}

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Pratibha Public School Basna API`);
});

module.exports = app;
