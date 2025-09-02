# ZumTV Admin Panel Setup Guide

## Overview
This admin panel allows you to manage:
- **Download Links**: Add, edit, and remove download links for different platforms
- **Theme Colors**: Create and manage color schemes for your application
- **Content Management**: Update text, images, and content within components
- **Contact Messages**: View and manage incoming contact form submissions

## Prerequisites
1. MongoDB database running (local or cloud)
2. Node.js and npm installed
3. `.env.local` file with your MongoDB connection string

## Setup Instructions

### 1. Environment Configuration
Create a `.env.local` file in your project root with:
```env
MONGODB_URI=mongodb://localhost:27017/zumtv
# or your cloud MongoDB URI
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/zumtv
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Initialize Admin User
Run the following command to create your first admin user:
```bash
npm run init-admin
```

This will create an admin user with:
- **Email**: admin@zumtv.com
- **Password**: admin123
- **Role**: super_admin

⚠️ **Important**: Change the password after first login!

### 4. Seed Initial Data (Optional)
To populate your database with sample content, run:
```bash
npm run seed-data
```

This will create:
- Sample download links for different platforms
- Hero section content
- Features section content
- Default theme colors

### 5. Start the Development Server
```bash
npm run dev
```

### 6. Access the Admin Panel
Navigate to: `http://localhost:3000/admin`

## Frontend-Backend Integration

The admin panel is now fully integrated with your frontend components:

### How It Works
1. **Content Management**: Update text, titles, and descriptions in the admin panel
2. **Real-time Updates**: Changes appear immediately on your website
3. **Download Links**: Manage download URLs and platform information
4. **Theme Colors**: Control the visual appearance of your application

### Integrated Components
- **Hero Section**: Title, subtitle, and description are now dynamic
- **Features Section**: Feature list can be updated through admin panel
- **Download Section**: Download links are fetched from the database
- **Fallback System**: If API fails, components show default content

## Admin Panel Features

### Dashboard Overview
- View statistics for contacts, downloads, themes, and content
- Quick access to common actions
- Navigation sidebar for different management sections

### Downloads Management
- Add new download links for different platforms (Windows, Mac, Linux, Android, iOS, Web)
- Set version numbers and descriptions
- Activate/deactivate download links
- Edit existing downloads

### Themes Management
- Create custom color schemes
- Set primary, secondary, accent, background, and text colors
- Activate themes (only one theme can be active at a time)
- Preview colors with visual swatches

### Content Management
- Update content for different components and sections
- Manage titles, subtitles, descriptions, and main content
- Add image URLs and button configurations
- Control display order and active status

### Contacts Management
- View all incoming contact form submissions
- Filter by status (unread, read, replied)
- Update message status
- View detailed contact information
- Pagination for large numbers of contacts

## API Endpoints

### Public Endpoints (Frontend)
- `GET /api/content` - Fetch content for components (with filtering)
- `GET /api/downloads` - Fetch active download links
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login

### Downloads
- `GET /api/admin/downloads` - List all downloads
- `POST /api/admin/downloads` - Create new download
- `GET /api/admin/downloads/[id]` - Get specific download
- `PUT /api/admin/downloads/[id]` - Update download
- `DELETE /api/admin/downloads/[id]` - Delete download

### Themes
- `GET /api/admin/themes` - List all themes
- `POST /api/admin/themes` - Create new theme
- `GET /api/admin/themes/[id]` - Get specific theme
- `PUT /api/admin/themes/[id]` - Update theme
- `DELETE /api/admin/themes/[id]` - Delete theme

### Content
- `GET /api/admin/content` - List all content items
- `POST /api/admin/content` - Create new content
- `GET /api/admin/content/[id]` - Get specific content
- `PUT /api/admin/content/[id]` - Update content
- `DELETE /api/admin/content/[id]` - Delete content

### Contacts
- `GET /api/contact` - List contacts with pagination and filtering
- `POST /api/contact` - Submit contact form (public endpoint)
- `PUT /api/contact/[id]` - Update contact status

## Security Features
- Password hashing using bcrypt
- Admin authentication required for all management endpoints
- Session management via localStorage (consider implementing proper JWT tokens for production)

## Customization
- Modify the color schemes in the themes section
- Update content through the content management interface
- Add new download platforms by modifying the platform enum in the Download model
- Extend the admin panel with additional features as needed

## Troubleshooting

### Common Issues
1. **MongoDB Connection Error**: Check your `.env.local` file and ensure MongoDB is running
2. **Admin Login Fails**: Run `npm run init-admin` to create the admin user
3. **Page Not Found**: Ensure all API routes are properly created in the `app/api` directory

### Database Models
The admin panel uses the following MongoDB models:
- `Admin` - Admin user accounts
- `Download` - Download links and metadata
- `Theme` - Color schemes and themes
- `Content` - Dynamic content for components
- `Contact` - Contact form submissions

## Production Considerations
1. Implement proper JWT token authentication
2. Add rate limiting to API endpoints
3. Use environment variables for sensitive configuration
4. Implement proper error logging and monitoring
5. Add input validation and sanitization
6. Consider implementing audit logs for admin actions

## Support
For issues or questions about the admin panel, check the console logs and ensure all dependencies are properly installed.
