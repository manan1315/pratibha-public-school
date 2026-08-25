const mongoose = require('mongoose');

const popupSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    content: { type: String, default: '' },
    link: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Popup', popupSchema);
