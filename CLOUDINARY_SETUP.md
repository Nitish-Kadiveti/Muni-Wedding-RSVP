# Cloudinary Setup for Wedding Gallery

## Overview
Your wedding website now has cloud-based image storage via Cloudinary with an admin upload interface.

## Features
- **Cloudinary Storage**: 25GB free tier, generous for wedding photos
- **Admin Upload Page**: `/admin/gallery` with tab-based upload per category
- **Drag & Drop Upload**: Easy image/video upload to Cloudinary
- **Auto-optimization**: Images served in optimal format (WebP) and size
- **Category Organization**: Images organized by gallery tabs
- **Copy URLs**: Get direct Cloudinary URLs to paste into config

## Setup Instructions

### 1. Create Cloudinary Account
1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (25GB storage, 25GB bandwidth/month)
3. After login, note your **Cloud Name** from the dashboard

### 2. Create Unsigned Upload Preset
1. In Cloudinary Dashboard → Settings → Upload → Upload presets
2. Click "Add upload preset"
3. Configure:
   - **Signing Mode**: Unsigned
   - **Folder**: `wedding-gallery` (or leave blank)
   - **Allow unsigned uploading**: ✓ checked
   - **Tags**: `wedding-gallery` (optional)
4. Save and copy the **Upload Preset name**

### 3. Configure Environment Variables
Create a `.env` file in your project root:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_here
```

Replace with your actual Cloudinary Cloud Name and Upload Preset.

### 4. Upload Your Images
1. Run the dev server: `npm run dev`
2. Navigate to `http://localhost:5173/admin/gallery`
3. Select a category tab (Our Moments, Engagement, etc.)
4. Drag and drop images or click to browse
5. Images upload to Cloudinary automatically
6. After upload, click the checkmark (✓) to copy the URL

### 5. Update Wedding Configuration
For each uploaded image:
1. Copy the URL from the admin interface
2. Edit `src/config/weddingConfig.ts`
3. Replace the `src` value in the gallery array:
   ```ts
   { id: 'g11', src: 'PASTED_CLOUDINARY_URL_HERE', category: 'Our Moments', alt: 'Description', type: 'image' }
   ```
4. For videos, keep `type: 'video'`

### 6. Deploy to Production
When ready to deploy:
1. Commit your `.env` file (it's safe - only used client-side)
2. Push to your Git repository
3. Vercel will automatically build and deploy
4. Your admin page will be at `https://your-site.vercel.app/admin/gallery`

## How It Works

### Admin Upload (`/admin/gallery`)
- Tab-based interface for each gallery category
- Drag-and-drop upload widget powered by Cloudinary
- Automatic optimization and formatting
- Progress indicators and success/error states
- Copy URL button for easy config updates

### Gallery Display
- Images load directly from Cloudinary CDN
- Automatic resizing and format selection (WebP when supported)
- Thumbnails generated on-the-fly for fast loading
- Videos served with appropriate settings

## Benefits
- **No more local image imports** - all images served from Cloudinary
- **Infinite storage** - upgrade plans as needed
- **Automatic optimization** - WebP, resizing, compression
- **Global CDN** - fast loading worldwide
- **Easy management** - upload/new images without code changes
- **Backup & versioning** - Cloudinary keeps originals

## Troubleshooting

### Upload fails?
- Check your `.env` variables are correct
- Ensure unsigned upload preset is enabled in Cloudinary
- Verify file types are supported (JPG, PNG, MP4, MOV, etc.)

### Images not showing?
- Verify URLs are correct Cloudinary URLs
- Check browser console for CORS errors (rare with Cloudinary)
- Try hard refresh (Ctrl+Shift+R)

### Need help?
Cloudinary has excellent docs: [https://cloudinary.com/documentation](https://cloudinary.com/documentation)