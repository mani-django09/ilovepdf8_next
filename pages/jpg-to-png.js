// pages/jpg-to-png.js
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
  Monitor,
  Download
} from 'lucide-react'

export default function JpgToPng() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImageFiles = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/jpg-to-png/preview')
      }, 1500)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free JPG to PNG Converter - Convert JPEG Images to PNG Online",
    "description": "Convert JPG/JPEG images to PNG format online for free. Add transparency support and lossless quality. Batch conversion available.",
    "url": "https://yoursite.com/jpg-to-png",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert JPG to PNG images for free",
      "Lossless image conversion",
      "Batch image processing",
      "Maintain image quality",
      "Add transparency support",
      "No registration required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "8934"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - JPG to PNG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Images</h2>
              <p className="text-gray-600 mb-4">Preparing conversion interface...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
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
        <title>Free JPG to PNG Converter Online - Convert JPEG to PNG | Lossless Quality</title>
        <meta name="description" content="Convert JPG/JPEG images to PNG format online for free. Perfect for graphics, transparency needs, and lossless image quality. Batch conversion supported." />
        <meta name="keywords" content="JPG to PNG converter, JPEG to PNG converter, convert JPG to PNG, lossless image conversion, transparency support, batch image conversion" />
        
        <meta property="og:title" content="Free JPG to PNG Converter - Convert JPEG Images to PNG" />
        <meta property="og:description" content="Convert JPG images to PNG format for free. Add transparency support and lossless quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/jpg-to-png" />
        
        <link rel="canonical" href="https://yoursite.com/jpg-to-png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-xl mb-3">
                <Image className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold text-sm">Lossless Image Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Convert JPG to PNG Online <span className="text-blue-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl mx-auto mb-6">
                Transform JPG/JPEG images to PNG format with lossless quality. Perfect for graphics that need transparency support.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                  <CheckCircle className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-700 font-medium">Lossless</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="text-gray-700 font-medium">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-sm">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="text-gray-700 font-medium">Fast</span>
                </div>
              </div>
            </div>

            {/* Compact Upload Area */}
            <div className="max-w-2xl mx-auto mb-6">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/jpeg': ['.jpg', '.jpeg'] }}
                multiple={true}
                toolName="jpg-to-png"
              />
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready to Convert ({selectedImages.length} images)
                    </h3>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {selectedImages.slice(0, 5).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-16 object-cover rounded"
                        />
                        <div className="absolute bottom-0 right-0 bg-orange-500 text-white px-1 py-0.5 rounded-tl text-xs font-bold">
                          JPG
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 5 && (
                      <div className="flex items-center justify-center bg-gray-100 rounded h-16">
                        <span className="text-gray-500 text-sm font-medium">+{selectedImages.length - 5}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Why Convert JPG to PNG?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                PNG format offers lossless compression and transparency support, perfect for graphics and web design.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lossless Quality</h3>
                <p className="text-gray-600 text-sm">
                  PNG uses lossless compression, preserving every pixel of your original image without quality degradation.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Transparency Support</h3>
                <p className="text-gray-600 text-sm">
                  PNG supports transparent backgrounds, making it perfect for logos, graphics, and web design elements.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-5 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Batch Processing</h3>
                <p className="text-gray-600 text-sm">
                  Convert multiple JPG images to PNG format simultaneously. Process dozens of files with one click.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact SEO Content */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Simple Conversion Process</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Upload JPG files:</strong> Select your JPEG images or drag them into the upload area.</li>
                  <li><strong>Convert to PNG:</strong> Click convert and wait for processing to complete.</li>
                  <li><strong>Download results:</strong> Get your PNG files individually or as a ZIP archive.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">When to Use PNG Format</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                  <li><strong>Graphics & Logos:</strong> Sharp edges and solid colors</li>
                  <li><strong>Transparency:</strong> When you need transparent backgrounds</li>
                  <li><strong>Text Images:</strong> Screenshots with text content</li>
                  <li><strong>Web Graphics:</strong> Icons and interface elements</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">JPG vs PNG Comparison</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <strong className="text-orange-600">JPG Best For:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Photographs with many colors</li>
                    <li>Smaller file sizes needed</li>
                    <li>Email and web optimization</li>
                    <li>Social media uploads</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-blue-600">PNG Best For:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Graphics with transparency</li>
                    <li>Text and logos</li>
                    <li>Images with sharp edges</li>
                    <li>When quality is priority</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact FAQ */}
        <div className="py-12 bg-white">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Will converting JPG to PNG increase file size?
                </h3>
                <p className="text-gray-700 text-sm">
                  Yes, PNG files are typically larger than JPG because PNG uses lossless compression while JPG uses lossy compression. However, you get perfect quality preservation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Can I add transparency to converted PNG images?
                </h3>
                <p className="text-gray-700 text-sm">
                  The conversion itself doesn't add transparency, but PNG format supports it. You'll need image editing software to add transparent areas after conversion.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How many images can I convert at once?
                </h3>
                <p className="text-gray-700 text-sm">
                  You can upload and convert multiple JPG images simultaneously. Our batch converter handles dozens of files efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}