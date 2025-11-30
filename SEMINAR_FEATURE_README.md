# Seminar & Webinar Feature Documentation

## Overview
A comprehensive seminar and webinar management system integrated into the IEEE website. This feature allows administrators to manage seminars/webinars and provides users with easy access to presentation materials via Google Drive links.

## Features

### Public Features
- **Browse Seminars/Webinars**: View all seminars and webinars in a card-based layout
- **Filter by Type**: Filter between Seminars and Webinars
- **Filter by Category**: Technical, Workshop, Career, Research, Other
- **Filter by Date**: Date range filtering
- **Featured Seminar**: Highlight important seminars
- **Upcoming Events Banner**: Carousel showing upcoming seminars/webinars
- **Detailed View**: Individual pages for each seminar with complete information
- **Google Drive Access**: Direct links to presentation slides and materials
- **Speaker Information**: Detailed speaker profiles with photos
- **Registration Links**: Direct registration for upcoming events

### Admin Features
- **Create Seminars**: Add new seminars/webinars with all details
- **Update Seminars**: Edit existing seminar information
- **Delete Seminars**: Remove seminars from the system
- **Image Management**: Upload banner images and speaker photos
- **Featured Management**: Mark/unmark seminars as featured
- **Status Management**: Set status as upcoming, completed, or cancelled

## File Structure

### Frontend (ieee-client)
```
src/
├── Seminar/
│   ├── Seminar.jsx              # Main listing page
│   ├── SingleSeminar.jsx        # Detail page
│   ├── AddSeminar.jsx           # Admin: Add new seminar
│   └── UpdateSeminar.jsx        # Admin: Update existing seminar
│
├── hooks/
│   └── useSeminar.jsx           # Custom hook for API calls
│
└── data/
    └── categories.js            # Seminar categories

```

### Backend (IEEE-LU-SB-SERVER)
```
models/
└── seminar.model.js             # MongoDB schema

controllers/
└── seminar.controller.js        # Business logic

routes/
└── seminar.route.js             # API endpoints
```

## Database Schema

```javascript
{
  title: String (required),
  description: String (required),
  bannerImage: String (required),
  speaker: {
    name: String (required),
    designation: String (required),
    organization: String,
    photo: String
  },
  date: Date (required),
  time: String (required),
  location: String (required),
  type: String (enum: ['seminar', 'webinar']),
  category: String (enum: ['technical', 'workshop', 'career', 'research', 'other']),
  driveLink: String,
  status: String (enum: ['upcoming', 'completed', 'cancelled']),
  isFeatured: Boolean,
  registrationLink: String,
  timestamps: true
}
```

## API Endpoints

### Public Endpoints
- `GET /seminar` - Get all seminars
- `GET /seminar/featured` - Get featured seminar
- `GET /seminar/upcoming` - Get upcoming seminars
- `GET /seminar/type/:type` - Get seminars by type (seminar/webinar)
- `GET /seminar/category/:category` - Get seminars by category
- `GET /seminar/:id` - Get seminar by ID
- `POST /seminar/date-filter` - Filter seminars by date range

### Admin Endpoints (Protected)
- `POST /seminar/create` - Create new seminar
- `PUT /seminar/update/:id` - Update existing seminar
- `DELETE /seminar/delete/:id` - Delete seminar

## Routes

### Frontend Routes
- `/seminar` - Main listing page (Public)
- `/seminar/:id` - Detail page (Private - requires login)
- `/addSeminar` - Add new seminar (Admin only)
- `/updateSeminar?id=<seminarId>` - Update seminar (Admin only)

## Usage Guide

### For Users
1. Navigate to Home > Resources > "View Seminars" button
2. Browse seminars using filters (Type, Category, Date)
3. Click "View Details" to see full information
4. Access presentation materials via "Materials" button (Google Drive)
5. Register for upcoming events via "Register" button

### For Administrators

#### Adding a Seminar
1. Go to Dashboard
2. Click "Add Seminar" (or navigate to `/addSeminar`)
3. Fill in required fields:
   - Type (Seminar/Webinar)
   - Category
   - Title
   - Description
   - Banner Image
   - Speaker Information (Name, Designation, Organization, Photo)
   - Date & Time
   - Location
   - Google Drive Link (for materials)
   - Registration Link (optional)
4. Check "Mark as Featured" if needed
5. Click "Add Seminar"

#### Updating a Seminar
1. Go to Dashboard
2. Find the seminar in the list
3. Click "Update" (navigates to `/updateSeminar?id=<id>`)
4. Modify desired fields
5. Click "Update Seminar"

#### Managing Materials
1. Upload presentation slides to Google Drive
2. Set folder/file permissions to "Anyone with the link can view"
3. Copy the shareable link
4. Paste into "Google Drive Link" field when creating/updating seminar

## Integration Points

### Home Page Resources Section
The "Presentation Slides" card in the Resources section now links to `/seminar`:
```jsx
{
  title: 'Presentation Slides',
  description: 'Download presentation materials from our events and workshops.',
  linkText: 'View Seminars',
  linkHref: '/seminar',
}
```

## Design Theme
- Follows existing website color scheme (#045C99 primary color)
- Responsive design (mobile, tablet, desktop)
- Consistent with Event page styling
- Card-based layout for listings
- Detailed view with image hero section

## Key Features Implemented

✅ Seminar/Webinar listing with filters
✅ Featured seminar display
✅ Upcoming events carousel
✅ Detailed individual pages
✅ Speaker information with photos
✅ Google Drive integration for materials
✅ Admin CRUD operations
✅ Image upload (banner + speaker photo)
✅ Status management (upcoming/completed/cancelled)
✅ Registration link support
✅ Date and category filtering
✅ Responsive design
✅ Loading states
✅ Error handling

## Future Enhancements (Optional)
- Email notifications for new seminars
- Calendar integration (iCal export)
- Attendance tracking
- Recording links for completed webinars
- Search functionality
- Pagination for large lists
- Comments/feedback section

## Dependencies
- React
- Swiper (carousel)
- React Router
- React Toastify (notifications)
- React Icons

## Notes
- All images are uploaded to Cloudinary
- Google Drive links should be publicly accessible
- Admin access required for create/update/delete operations
- User login required to view seminar details
