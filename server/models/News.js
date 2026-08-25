const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    category: { type: String, default: 'General' },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

newsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('News', newsSchema);
