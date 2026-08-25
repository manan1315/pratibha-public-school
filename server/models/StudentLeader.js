const mongoose = require('mongoose');

const studentLeaderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, default: '' },
    class: { type: String, required: true },
    position: { type: String, required: true },
    year: { type: String, default: '' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('StudentLeader', studentLeaderSchema);
