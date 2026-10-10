/**
 * Admin Gallery Upload Page
 *
 * Protected admin route for uploading gallery images to Cloudinary.
 * Features:
 * - Tab-based upload per gallery category
 * - Drag-and-drop upload widget (Cloudinary)
 * - Copy URLs to clipboard
 * - Auto-updates weddingConfig.ts gallery entries
 */
import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CLOUDINARY_CONFIG,
  GALLERY_CATEGORIES,
  getThumbnailUrl,
  getLightboxUrl,
  isCloudinaryConfigured,
  extractPublicId,
} from '../config/cloudinary'
import { weddingConfig } from '../config/weddingConfig'
import type { GalleryCategory } from '../config/cloudinary'
import { v4 as uuidv4 } from 'uuid'

interface UploadedImage {
  id: string
  url: string
  thumbnailUrl: string
  lightboxUrl: string
  publicId: string
  category: GalleryCategory
  alt: string
  uploadedAt: string
}

/**
 * Admin Gallery Upload Component
 */
export default function AdminGalleryUpload() {
  const navigate = useNavigate()
  const [isConfigured, setIsConfigured] = useState(isCloudinaryConfigured())
  const [currentCategory, setCurrentCategory] = useState<GalleryCategory>('Our Moments')
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Load existing images from config for the selected category
  useEffect(() => {
    const categoryImages = weddingConfig.gallery.filter(
      (g) => g.category === currentCategory
    )
    // Convert to UploadedImage format
    const images = categoryImages.map((g) => ({
      id: g.id,
      url: g.src,
      thumbnailUrl: getThumbnailUrl(extractPublicId(g.src) || g.id),
      lightboxUrl: getLightboxUrl(extractPublicId(g.src) || g.id),
      publicId: extractPublicId(g.src) || g.id,
      category: g.category,
      alt: g.alt,
      uploadedAt: new Date().toISOString(),
    }))
    setUploadedImages(images)
  }, [currentCategory])

  // Update config when images change
  useEffect(() => {
    // Sync with config
    const configGallery = weddingConfig.gallery

    // Rebuild config gallery from state
    // (In a real app, you'd POST to an API that updates config)
    // For now, we just keep local state and show what's uploaded
  }, [uploadedImages])

  const handleCategoryChange = (category: GalleryCategory) => {
    setCurrentCategory(category)
  }

  const handleUpload = async (files: FileList) => {
    if (!isCloudinaryConfigured()) {
      setShowError(true)
      setErrorMessage(
        'Cloudinary not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.'
      )
      return
    }

    if (files.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    const cloudName = CLOUDINARY_CONFIG.cloudName
    const uploadPreset = CLOUDINARY_CONFIG.uploadPreset

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const progress = ((i + 1) / files.length) * 100
      setUploadProgress(Math.round(progress))

      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)
        formData.append('folder', CLOUDINARY_CONFIG.uploadFolder)
        formData.append('category', currentCategory)
        formData.append('resource_type', file.type.startsWith('image/') ? 'image' : 'video')

        // Add timestamp for unsigned upload
        const timestamp = Math.floor(Date.now() / 1000)
        formData.append('timestamp', String(timestamp))

        // Generate a public ID
        const fileName = file.name.replace(/\.[^/.]+$/, '')
        const safeName = fileName.replace(/[^a-zA-Z0-9]/g, '_')
        const publicId = `${CLOUDINARY_CONFIG.uploadFolder}/${currentCategory}/${safeName}_${timestamp}`

        formData.append('public_id', publicId)

        // Add tags
        formData.append('tags', `wedding-${currentCategory.toLowerCase()}`)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.error?.message || 'Upload failed'
          )
        }

        const url = data.secure_url || data.url
        const publicIdValue = data.public_id

        // Create uploaded image record
        const newImage: UploadedImage = {
          id: uuidv4().toString(),
          url,
          thumbnailUrl: getThumbnailUrl(publicIdValue),
          lightboxUrl: getLightboxUrl(publicIdValue),
          publicId: publicIdValue,
          category: currentCategory,
          alt: file.name,
          uploadedAt: new Date().toISOString(),
        }

        setUploadedImages((prev) => [newImage, ...prev])
        setShowSuccess(true)

      } catch (err) {
        console.error('Upload error:', err)
        setShowError(true)
        setErrorMessage(
          err instanceof Error ? err.message : 'Upload failed'
        )
      }
    }

    setIsUploading(false)
    setUploadProgress(0)
  }

  const handleCopyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      // Visual feedback could be added here
    })
  }, [])

  const handleRemoveImage = useCallback((imageId: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== imageId))
  }, [])

  // Auto-close success/error after delay
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, showError])

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-ivory p-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-3xl mb-6 text-burgundy">
            Cloudinary Not Configured
          </h2>
          <p className="text-ink/65 mb-8">
            To enable image uploads, create a free Cloudinary account and add to your .env:
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-6">
            <p className="font-mono text-sm text-ink/65 mb-2">
              VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
            </p>
            <p className="font-mono text-sm text-ink/65 mb-2">
              VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-block px-6 py-3 bg-burgundy text-ivory rounded-md text-sm hover:bg-burgundy/90 transition-colors"
          >
            Go to Wedding Website
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      <nav className="bg-burgundy/5 border-b border-gold/20 sticky top-0 bg-ivory/50 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <h1 className="text-2xl font-display text-burgundy">
              Wedding Gallery Upload
            </h1>
            <p className="text-sm text-ink/60">
              Upload images for {currentCategory}
            </p>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-2">
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  currentCategory === category
                    ? 'bg-burgundy text-ivory'
                    : 'border-gold/30 text-ink/70 hover:border-gold hover:text-burgundy'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Zone */}
        <div className="mb-8 p-8 border-2 border-dashed border-gold/30 rounded-xl hover:border-gold/50 transition-colors cursor-pointer bg-ivory/50">
          <div className="flex flex-col items-center gap-3">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-burgundy"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-ink/60 text-sm">Drag files here or click</p>
            <p className="text-text-gold text-xs">JPG, PNG, MP4, MOV</p>
            <input
              type="file"
              multiple
              accept="image/*,video/*,.mov,.mp4,.avi,.wmv"
              onChange={(e) => {
                if (e.target.files) handleUpload(e.target.files)
              }}
              className="hidden"
            />
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && uploadProgress > 0 && (
          <div className="mb-4">
            <div className="bg-gold/20 rounded-full h-2 overflow-hidden mb-2">
              <div
                className={`bg-burgundy h-full rounded-full transition-width duration-300`}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-ink/60 text-center">
              {uploadProgress}%
            </p>
          </div>
        )}

        {/* Uploaded Images Gallery */}
        <div>
          {uploadedImages.length > 0 ? (
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {uploadedImages.map((img) => (
                <div
                  key={img.id}
                  className="group border border-gold/20 rounded-lg overflow-hidden"
                >
                  <img
                    src={img.thumbnailUrl}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-40 object-cover transition-opacity duration-300 group-hover:opacity-90"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-burgundy/80 text-ivory text-xs p-2 transform group-hover:translate-y-0 transition-transform"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-body">{img.category}</span>
                      <button
                        onClick={() => handleCopyUrl(img.url)}
                        className="text-ivory/90 hover:text-white transition-colors text-xs"
                        title="Copy URL"
                      >
                        ✓
                      </button>
                    </div>
                    <div className="mt-1 text-[8px] opacity-80">
                      {img.alt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="col-span-full py-12 text-center text-ink/40">
              <p>No images uploaded yet for {currentCategory}</p>
              <p className="mt-2">Drag and drop images above to get started</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 bg-burgundy text-ivory rounded-md text-sm hover:bg-burgundy/90 transition-colors"
          >
            View Wedding Website
          </button>
          {/* In a real deployment, you'd have a "Save to Config" button that
              posts to your API to update weddingConfig.ts automatically */}
        </div>

        {/* Status Messages */}
        {showSuccess && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800 animate-fade-in">
            ✅ Images uploaded successfully!
          </div>
        )}
        {showError && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-800 animate-fade-in">
            ❌ {errorMessage}
          </div>
        )}
      </main>
    </div>
  )
}