// pages/webp-to-png.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import ImageUploader from '../components/ImageUploader'
import { 
  Image, 
  ArrowRight, 
  Shield, 
  Zap, 
  CheckCircle,
  Award,
  Globe,
  Download
} from 'lucide-react'

export default function WebpToPng() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImageFiles = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/webp-to-png/preview')
      }, 1200)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free WebP to PNG Converter - Convert WebP Images to PNG Online",
    "description": "Convert WebP images to PNG format online for free. Maintain transparency and lossless quality. Perfect for compatibility across all browsers and platforms.",
    "url": "https://yoursite.com/webp-to-png",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert WebP to PNG images for free",
      "Maintain transparency support",
      "Lossless image conversion",
      "Batch processing available",
      "Universal browser compatibility",
      "No software installation required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "7642"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - WebP to PNG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-14 w-14 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Analyzing Images</h2>
              <p className="text-gray-600 mb-3">Preparing conversion...</p>
              <div className="bg-gray-200 rounded-full h-1.5 w-48 mx-auto">
                <div className="bg-purple-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Free WebP to PNG Converter Online - Convert WebP Images to PNG | Universal Compatibility</title>
        <meta name="description" content="Convert WebP images to PNG format online for free. Ensure universal browser compatibility while maintaining image quality and transparency support." />
        <meta name="keywords" content="WebP to PNG converter, convert WebP to PNG, WebP compatibility, image format converter, universal browser support, lossless conversion" />
        
        <meta property="og:title" content="Free WebP to PNG Converter - Universal Browser Compatibility" />
        <meta property="og:description" content="Convert WebP images to PNG format for universal compatibility across all browsers and platforms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/webp-to-png" />
        
        <link rel="canonical" href="https://yoursite.com/webp-to-png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-6">
          <div className="max-w-3xl mx-auto px-4">
            {/* Minimal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-1.5 bg-purple-100 rounded-lg mb-2">
                <Image className="w-4 h-4 text-purple-600 mr-1.5" />
                <span className="text-purple-600 font-semibold text-xs">WebP Converter</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                WebP to PNG Converter <span className="text-purple-600">Free</span>
              </h1>
              
              <p className="text-base text-gray-600 max-w-md mx-auto mb-4">
                Convert WebP images to PNG for universal browser compatibility and transparency support.
              </p>
              
              {/* Minimal Trust Badges */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm text-xs">
                  <CheckCircle className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-gray-700">Compatible</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm text-xs">
                  <Shield className="w-3 h-3 text-green-600 mr-1" />
                  <span className="text-gray-700">Safe</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-2 py-1 shadow-sm text-xs">
                  <Zap className="w-3 h-3 text-yellow-600 mr-1" />
                  <span className="text-gray-700">Quick</span>
                </div>
              </div>
            </div>

            {/* Ultra Compact Upload Area */}
            <div className="mb-4">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/webp': ['.webp'] }}
                multiple={true}
                toolName="webp-to-png"
              />
            </div>

            {/* Minimal Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border p-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Converting {selectedImages.length} WebP images
                  </h3>
                  <div className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    Ready
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto">
                  {selectedImages.slice(0, 6).map((image, index) => (
                    <div key={index} className="relative flex-shrink-0">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-12 h-12 object-cover rounded border"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white px-1 py-0.5 rounded text-xs font-bold leading-none">
                        WebP
                      </div>
                    </div>
                  ))}
                  {selectedImages.length > 6 && (
                    <div className="flex items-center justify-center bg-gray-100 rounded w-12 h-12 flex-shrink-0">
                      <span className="text-gray-500 text-xs font-medium">+{selectedImages.length - 6}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Streamlined Features Section */}
        <div className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Why Convert WebP to PNG?
              </h2>
              <p className="text-gray-600 text-sm max-w-lg mx-auto">
                PNG format ensures compatibility across all browsers and platforms while preserving quality and transparency.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Universal Compatibility</h3>
                <p className="text-gray-600 text-xs">
                  PNG works on all browsers, devices, and platforms without compatibility issues.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Preserve Transparency</h3>
                <p className="text-gray-600 text-xs">
                  Maintain alpha channels and transparent backgrounds during conversion.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Batch Convert</h3>
                <p className="text-gray-600 text-xs">
                  Process multiple WebP files simultaneously for efficient workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Info Section */}
        <div className="py-10 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Conversion Process</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 text-xs">
                  <li>Upload your WebP images</li>
                  <li>Click convert to PNG</li>
                  <li>Download converted files</li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Format Benefits</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-xs">
                  <li>Works on all browsers</li>
                  <li>Supports transparency</li>
                  <li>Lossless compression</li>
                  <li>Wide software support</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">WebP vs PNG</h4>
              <div className="grid md:grid-cols-2 gap-4 text-xs text-gray-700">
                <div>
                  <strong className="text-purple-600">WebP:</strong> Modern format, smaller files, limited browser support
                </div>
                <div>
                  <strong className="text-blue-600">PNG:</strong> Universal format, larger files, works everywhere
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact FAQ */}
        <div className="py-8 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-lg font-bold text-gray-900 text-center mb-6">
              Quick Questions
            </h2>

            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  Why convert WebP to PNG?
                </h3>
                <p className="text-gray-700 text-xs">
                  PNG ensures compatibility across all browsers and platforms, while WebP may not be supported by older systems.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  Will quality be preserved?
                </h3>
                <p className="text-gray-700 text-xs">
                  Yes, conversion maintains original quality and transparency. PNG uses lossless compression.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">
                  Can I convert multiple files?
                </h3>
                <p className="text-gray-700 text-xs">
                  Absolutely! Upload multiple WebP images and convert them all at once.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}