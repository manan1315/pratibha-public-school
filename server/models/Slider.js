const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    heading: { type: String, required: true },
    subheading: { type: String, default: '' },
    buttonText: { type: String, default: 'Learn More' },
    buttonLink: { type: String, default: '#' },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sliderSchema.index({ order: 1 });

module.exports = mongoose.model('Slider', sliderSchema);
