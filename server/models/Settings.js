const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    schoolName: { type: String, default: 'PRATIBHA PUBLIC SCHOOL BASNA' },
    tagline: { type: String, default: 'Nurturing Minds, Shaping Futures' },
    logo: { type: String, default: '' },
    favicon: { type: String, default: '' },
    address: { type: String, default: 'School Campus, Village: Khatkhati, Tehsil: Basna, Dist: Mahasamund, 493554 (Chhattisgarh), India' },
    phone1: { type: String, default: '+91-91111-07333' },
    phone2: { type: String, default: '+91-91111-07334' },
    email: { type: String, default: 'ppskhatkhati@gmail.com' },
    website: { type: String, default: 'www.ppsbasna.com' },
    socialLinks: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      twitter: { type: String, default: '' },
      whatsapp: { type: String, default: '+919111107333' },
    },
    colors: {
      primary: { type: String, default: '#1a237e' },
      secondary: { type: String, default: '#f9a825' },
    },
    parentPortalLink: { type: String, default: '' },
    feePaymentLink: { type: String, default: '' },
    admissionBannerText: { type: String, default: 'Admissions Open for Session 2025-26' },
    admissionBannerEnabled: { type: Boolean, default: true },
    workingHours: { type: String, default: 'Mon - Sat: 8:00 AM - 3:00 PM' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Settings', settingsSchema);
