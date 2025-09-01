import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  downloadUrl: {
    type: String,
    required: true,
    trim: true
  },
  version: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    enum: ['windows', 'mac', 'linux', 'android', 'ios', 'web'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Download || mongoose.model('Download', downloadSchema);
