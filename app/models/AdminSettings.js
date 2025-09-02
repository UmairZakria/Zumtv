import mongoose from 'mongoose';

const adminSettingsSchema = new mongoose.Schema({
  siteEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  sitePhone: {
    type: String,
    required: true,
    trim: true
  },
  socials: {
    facebook: { type: String, trim: true },
    twitter: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youtube: { type: String, trim: true },
    linkedin: { type: String, trim: true }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.AdminSettings || mongoose.model('AdminSettings', adminSettingsSchema);
