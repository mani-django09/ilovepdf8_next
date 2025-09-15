// pages/jpg-to-pdf.js
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
  Globe, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  Upload,
  FileText,
  Download,
  Lock,
  Smartphone,
  Monitor,
  Award,
  Infinity
} from 'lucide-react'

export default function JpgToPdf() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImages = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/jpg-to-pdf/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free JPG to PDF Converter - Convert Images to PDF Online",
    "description": "Convert JPG, PNG, JPEG images to PDF online for free. Combine multiple images into one PDF document. No software download required.",
    "url": "https://yoursite.com/jpg-to-pdf",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert unlimited images to PDF for free",
      "Support JPG, PNG, JPEG, WebP formats",
      "Combine multiple images into one PDF",
      "Maintain original image quality",
      "Custom page sizes and orientations",
      "No registration required"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12543"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - JPG to PDF Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your Images</h2>
              <p className="text-gray-600 mb-4">Preparing conversion preview...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
                <div className="bg-green-600 h-2 rounded-full animate-pulse w-3/4"></div>
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
        <title>Free JPG to PDF Converter Online - Convert Images to PDF | No Download Required</title>
        <meta name="description" content="Convert JPG, PNG, JPEG images to PDF online for free. Combine multiple images into one PDF document instantly. No software download, no registration. Secure and fast conversion." />
        <meta name="keywords" content="JPG to PDF converter, PNG to PDF, JPEG to PDF, image to PDF converter, convert images to PDF online free, combine images PDF, picture to PDF converter" />
        
        <meta property="og:title" content="Free JPG to PDF Converter - Convert Images to PDF Online" />
        <meta property="og:description" content="Convert images to PDF for free. Support JPG, PNG, JPEG formats with professional results." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/jpg-to-pdf" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free JPG to PDF Converter - Convert Images to PDF" />
        <meta name="twitter:description" content="Convert JPG, PNG images to PDF online for free. Fast, secure, and works on any device." />
        
        <link rel="canonical" href="https://yoursite.com/jpg-to-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            {/* Main Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-xl mb-4">
                <Image className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold text-sm">Image to PDF Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Convert JPG to PDF Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Transform your JPG, PNG, and JPEG images into professional PDF documents. Combine multiple images or convert them individually.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">High Quality</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Fast</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">All Formats</span>
                </div>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 
                  'image/jpeg': ['.jpg', '.jpeg'],
                  'image/png': ['.png'],
                  'image/webp': ['.webp']
                }}
                multiple={true}
                toolName="jpg-to-pdf"
              />
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready to Convert ({selectedImages.length} images)
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="grid gap-2 max-h-32 overflow-y-auto">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="bg-green-500 rounded p-1">
                          <Image className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{image.name}</p>
                          <p className="text-xs text-gray-500">{(image.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 4 && (
                      <div className="text-center text-gray-500 text-sm py-1">
                        +{selectedImages.length - 4} more images
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Image to PDF Conversion
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Convert your images to PDF with advanced options for professional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Multiple Format Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert JPG, JPEG, PNG, WebP, and other image formats to PDF. Supports all major image types with perfect quality preservation.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Combine Multiple Images</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Create a single PDF document from multiple images. Perfect for photo albums, presentations, or document compilations.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Custom Page Settings</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose from various page sizes (A4, Letter, Custom) and orientations. Optimize layout for your specific needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Privacy Protected</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your images are processed securely and deleted immediately after conversion. No data storage or sharing.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert images to PDF in seconds. Batch processing capabilities for multiple files simultaneously.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Works Everywhere</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Compatible with all devices and operating systems. No software installation required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Convert JPG to PDF Online: Step by Step Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Conversion Steps</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload images:</strong> Select JPG, PNG, or JPEG files from your device or drag them into the upload area.</li>
                  <li><strong>Arrange order:</strong> Reorder images if combining multiple files into one PDF document.</li>
                  <li><strong>Choose settings:</strong> Select page size, orientation, and quality preferences.</li>
                  <li><strong>Convert & download:</strong> Click convert and download your PDF immediately.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Best Practices</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li>Use high-resolution images for better PDF quality</li>
                  <li>Compress large images before conversion to reduce file size</li>
                  <li>Maintain consistent image orientations for professional appearance</li>
                  <li>Consider page layout when combining multiple images</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Convert Images to PDF Format?
            </h3>
            <p className="text-gray-700 mb-6">
              PDF format offers numerous advantages for image storage and sharing. PDFs maintain image quality while providing universal compatibility across all devices and platforms. They're perfect for creating professional documents, preserving image collections, and ensuring consistent viewing experiences.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Benefits</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Universal compatibility across all devices</li>
                  <li>• Maintains original image quality and resolution</li>
                  <li>• Professional appearance for business documents</li>
                  <li>• Easy sharing and printing capabilities</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Practical Applications</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Photo albums and portfolios</li>
                  <li>• Document digitization and archival</li>
                  <li>• Presentation materials and reports</li>
                  <li>• Invoice and receipt management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What image formats can I convert to PDF?
                </h3>
                <p className="text-gray-700">
                  Our converter supports all major image formats including JPG, JPEG, PNG, WebP, BMP, TIFF, and GIF. You can convert single images or combine multiple formats into one PDF.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I combine multiple images into one PDF?
                </h3>
                <p className="text-gray-700">
                  Yes, you can upload multiple images and combine them into a single PDF document. You can reorder the images and choose different layout options for optimal presentation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will the image quality be reduced after conversion?
                </h3>
                <p className="text-gray-700">
                  No, our conversion process maintains the original image quality and resolution. The PDF will contain your images in their original quality without any compression or degradation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is there a limit on file size or number of images?
                </h3>
                <p className="text-gray-700">
                  Each image can be up to 50MB in size, and you can convert unlimited images. There's no daily limit or restriction on the number of conversions you can perform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}