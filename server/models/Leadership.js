const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, required: true },
    photo: { type: String, default: '' },
    message: { type: String, required: true },
    order: { type: Number, default: 0 },
    type: { type: String, enum: ['chairman', 'principal', 'director'], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Leadership', leadershipSchema);
