/**
 * Cloudinary Configuration
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a free Cloudinary account at https://cloudinary.com
 * 2. Get your Cloud Name from the Dashboard
 * 3. Create an unsigned upload preset:
 *    - Go to Settings > Upload > Upload presets
 *    - Click "Add upload preset"
 *    - Set "Signing Mode" to "Unsigned"
 *    - Set "Folder" to "wedding-gallery" (or your preferred folder)
 *    - Save and copy the preset name
 * 4. Add to .env:
 *    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *    VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
 * 5. Redeploy
 */

export const CLOUDINARY_CONFIG: {
  cloudName: string
  uploadPreset: string
  baseUrl: string
  uploadFolder: string
} = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '',
  uploadFolder: 'wedding-gallery',
  baseUrl: '',
}

// Initialize base URL
if (CLOUDINARY_CONFIG.cloudName) {
  CLOUDINARY_CONFIG.baseUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`
}

/**
 * Gallery categories - must match weddingConfig.ts GalleryCategory
 */
export const GALLERY_CATEGORIES = [
  'Our Moments',
  'Engagement',
  'Pre-Wedding',
  'Family',
  'Cousin',
  'Friends',
  'Wedding',
  'Celebrations',
] as const

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];

// Initialize base URL
function getBaseUrl(): string {
  return CLOUDINARY_CONFIG.cloudName
    ? `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload`
    : ''
}

/**
 * Build a Cloudinary image URL with transformations
 */
export function getCloudinaryUrl(
  publicId: string,
  options?: {
    width?: number;
    height?: number;
    crop?:
      | 'fill'
      | 'scale'
      | 'fit'
      | 'thumb'
      | 'limit';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  }
): string {
  if (!CLOUDINARY_CONFIG.cloudName) return '';

  const defaults: {
    width?: number;
    height?: number;
    crop?: 'fill' | 'scale' | 'fit' | 'thumb' | 'limit';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {
    crop: 'fill',
    quality: 'auto',
    format: 'auto',
  }

  const opts = { ...defaults, ...options } as typeof defaults & typeof options

  const transformations: string[] = []

  if (opts.width) transformations.push(`w_${opts.width}`)
  if (opts.height) transformations.push(`h_${opts.height}`)
  if (opts.crop) transformations.push(`c_${opts.crop}`)
  transformations.push(`q_${opts.quality}`)
  transformations.push(`f_${opts.format}`)

  const transformStr = transformations.join(',')
  return `${CLOUDINARY_CONFIG.baseUrl}/${transformStr}/${publicId}`
}

/**
 * Get thumbnail URL (small, optimized for gallery grid)
 */
export function getThumbnailUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, { width: 400, height: 500, crop: 'fill' });
}

/**
 * Get lightbox URL (larger, high quality)
 */
export function getLightboxUrl(publicId: string): string {
  return getCloudinaryUrl(publicId, { width: 1200, height: 1600, crop: 'limit' });
}

/**
 * Extract public ID from a Cloudinary URL
 */
export function extractPublicId(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif|mp4|mov)$/i);
  return match ? match[1] : null;
}

/**
 * Check if Cloudinary is configured
 */
export function isCloudinaryConfigured(): boolean {
  return !!(CLOUDINARY_CONFIG.cloudName && CLOUDINARY_CONFIG.uploadPreset);
}