import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  data: {
    type: String, // base64 string
    required: true
  },
  type: {
    type: String, // e.g., 'image/png', 'image/jpeg'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
