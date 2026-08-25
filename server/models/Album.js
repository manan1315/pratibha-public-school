const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: true },
    description: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Album', albumSchema);
