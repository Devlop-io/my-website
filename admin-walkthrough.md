# Admin Interface Walkthrough

## How to Access the Admin Interface

1. **Navigate to the Admin Panel**
   - Go to `/admin` in your browser (e.g., `https://your-repl-url.replit.app/admin`)
   - You'll be automatically redirected to Replit's secure login if you're not authenticated

2. **Authentication Process**
   - Click "Login" when prompted
   - Use your Replit account credentials
   - After successful login, you'll be redirected back to the admin panel

## Admin Panel Features

### Overview Tab (Default View)
The main dashboard showing:
- **Content Management**: Quick access to edit site content
- **Projects**: Manage your portfolio projects
- **Media Upload**: Upload images and files with drag-and-drop interface

### Content Tab
Manage your site's text content:
- **Hero Section**: Edit main headline and call-to-action
- **About Section**: Update your bio and professional summary
- Content is stored in markdown files for easy editing

### Projects Tab
Manage your portfolio projects:
- Upload project images using the secure upload system
- Images are automatically optimized and stored in cloud storage
- Each project can have custom images, descriptions, and metadata

### Timeline Tab
Manage your career timeline:
- Add job experiences, education, and milestones
- Timeline items are ordered chronologically
- Stored in markdown format for easy version control

### Testimonials Tab
Manage client testimonials and recommendations:
- Add quotes from clients, colleagues, or collaborators
- Include author details and company information
- Profile images can be uploaded for each testimonial

### Media Tab
Advanced media management:
- Upload multiple files at once (up to 10 files, 50MB each)
- Supports images, documents, and other media types
- Files are automatically organized and secured

## Using the Image Upload Feature

### Single Image Upload
1. Click any "Upload Image" button
2. A modal window opens with drag-and-drop interface
3. Either drag files or click to browse and select
4. Files upload automatically with progress tracking
5. Success notification shows when complete

### Multiple File Upload
1. Go to Media Tab
2. Click "Upload Multiple Files"
3. Select up to 10 files (50MB each max)
4. Monitor upload progress for each file
5. Files are automatically secured with proper permissions

## File Management and Security

### Automatic Security
- All uploaded files are secured with user-specific permissions
- Public files (like project images) are accessible to website visitors
- Private files are only accessible to authenticated admins

### File Organization
- Project images are automatically categorized
- Media files are organized by upload date
- All files have unique identifiers to prevent conflicts

## Content Editing Workflow

### Current Approach
1. **Upload Images**: Use admin panel to upload and get secure URLs
2. **Edit Markdown**: Update content files with new image URLs
3. **Preview Changes**: View updates on the live site

### Recommended Workflow
1. Plan your content updates
2. Upload all needed images first through admin panel
3. Copy the uploaded file URLs
4. Edit markdown files with new content and image references
5. Test changes on the live site

## Logout and Security

### Secure Sessions
- Sessions automatically expire after 1 week
- Tokens are securely refreshed as needed
- All sensitive operations require authentication

### Logging Out
- Click the "Logout" button in the top-right corner
- You'll be redirected to Replit's secure logout process
- All local session data is cleared

## Technical Notes

### File Storage
- Files are stored in Google Cloud Storage
- Automatic backup and redundancy
- Global CDN for fast loading worldwide

### Permissions
- Only authenticated admins can upload files
- Public files are readable by everyone
- Private files require authentication to access

### Performance
- Images are automatically optimized
- CDN delivery for fast loading
- Efficient caching for better performance