const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, default: '' },
    qualification: { type: String, required: true },
    designation: { type: String, required: true },
    department: { type: String, default: '' },
    experience: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faculty', facultySchema);
