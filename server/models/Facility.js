const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    images: [{ type: String }],
    icon: { type: String, default: '🏫' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Facility', facilitySchema);
