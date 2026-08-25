const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    link: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
