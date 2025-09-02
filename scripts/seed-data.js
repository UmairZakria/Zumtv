const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Define schemas inline since we can't import ES6 modules in CommonJS
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
  order: {
    type: Number,
    default: 0
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

const contentSchema = new mongoose.Schema({
  component: {
    type: String,
    required: true,
    trim: true
  },
  section: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  content: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  buttonText: {
    type: String,
    trim: true
  },
  buttonUrl: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
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

const themeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  primaryColor: {
    type: String,
    required: true,
    trim: true
  },
  secondaryColor: {
    type: String,
    required: true,
    trim: true
  },
  accentColor: {
    type: String,
    required: true,
    trim: true
  },
  backgroundColor: {
    type: String,
    required: true,
    trim: true
  },
  textColor: {
    type: String,
    required: true,
    trim: true
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

// Create models
const Download = mongoose.model('Download', downloadSchema);
const Content = mongoose.model('Content', contentSchema);
const Theme = mongoose.model('Theme', themeSchema);

async function seedData() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Download.deleteMany({});
    await Content.deleteMany({});
    await Theme.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Downloads
    const downloads = [
      {
        title: 'ZumTV for Windows',
        description: 'Download ZumTV for Windows PC',
        downloadUrl: 'https://www.filehorse.com/download-iptv-smarters-pro/download/',
        version: '1.0.0',
        platform: 'windows',
        order: 1,
        isActive: true
      },
      {
        title: 'ZumTV for Mac',
        description: 'Download ZumTV for Mac',
        downloadUrl: 'https://www.filehorse.com/download-iptv-smarters-pro/download/',
        version: '1.0.0',
        platform: 'mac',
        order: 2,
        isActive: true
      },
      {
        title: 'ZumTV for Android',
        description: 'Download ZumTV for Android devices',
        downloadUrl: 'https://apps.apple.com/pk/app/smarters-player-lite/id1628995509',
        version: '1.0.0',
        platform: 'android',
        order: 3,
        isActive: true
      },
      {
        title: 'ZumTV for iOS',
        description: 'Download ZumTV for iOS devices',
        downloadUrl: 'https://apps.apple.com/pk/app/smarters-player-lite/id1628995509',
        version: '1.0.0',
        platform: 'ios',
        order: 4,
        isActive: true
      }
    ];

    await Download.insertMany(downloads);
    console.log('✅ Downloads seeded');

    // Seed Content
    const content = [
      {
        component: 'Hero',
        section: 'main',
        title: 'ZumTV IPTV Player APP',
        subtitle: 'The Best TV Watching Experience',
        description: 'ZumTV is a IPTV player that allows users to stream content by loading M3U Playlist URLs or Xtream Codes API from various IPTV providers.',
        order: 1,
        isActive: true
      },
      {
        component: 'Features',
        section: 'main',
        title: 'Features of ZumTV',
        description: 'ZumTV offers a variety of useful features. The features listed below can be found by going to the application setting.',
        content: JSON.stringify([
          'Simple UI',
          'Supports Xtream Codes API',
          'Supports loading M3U File / URL',
          'Supports Stalker Portal Connectivity',
          'Parental Control',
          'Select subtitles in movies and series',
          'Select languages in movies and series',
          'Add channels & movies/series favorites',
          'User-Friendly Interface',
          'Multi-Device Compatible'
        ]),
        order: 1,
        isActive: true
      }
    ];

    await Content.insertMany(content);
    console.log('✅ Content seeded');

    // Seed Default Theme
    const defaultTheme = {
      name: 'Default Theme',
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      accentColor: '#F59E0B',
      backgroundColor: '#FFFFFF',
      textColor: '#1F2937',
      isActive: true
    };

    await Theme.create(defaultTheme);
    console.log('✅ Default theme seeded');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('📱 You can now use the admin panel to manage your content.');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}

// Run the seeding
seedData();
