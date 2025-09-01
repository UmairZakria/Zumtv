import mongoose from 'mongoose';

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  primaryColor: {
    type: String,
    required: true,
    default: '#3B82F6'
  },
  secondaryColor: {
    type: String,
    required: true,
    default: '#1E40AF'
  },
  accentColor: {
    type: String,
    required: true,
    default: '#F59E0B'
  },
  backgroundColor: {
    type: String,
    required: true,
    default: '#FFFFFF'
  },
  textColor: {
    type: String,
    required: true,
    default: '#1F2937'
  },
  isActive: {
    type: Boolean,
    default: false
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

export default mongoose.models.Theme || mongoose.model('Theme', themeSchema);
