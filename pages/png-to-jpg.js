// pages/png-to-jpg.js
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
  Download,
  Lock,
  Smartphone,
  Monitor,
  Award,
  Infinity
} from 'lucide-react'

export default function PngToJpg() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImageFiles = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/png-to-jpg/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PNG to JPG Converter - Convert PNG Images to JPEG Online",
    "description": "Convert PNG images to JPG format online for free. Reduce file size while maintaining quality. Batch conversion supported.",
    "url": "https://yoursite.com/png-to-jpg",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PNG to JPG images for free",
      "Batch image conversion",
      "Custom quality settings",
      "Maintain image quality",
      "No file size limits",
      "Instant download"
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
          <title>Processing Images - PNG to JPG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Images</h2>
              <p className="text-gray-600 mb-4">Preparing conversion interface...</p>
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
        <title>Free PNG to JPG Converter Online - Convert PNG Images to JPEG | High Quality</title>
        <meta name="description" content="Convert PNG images to JPG format online for free. Reduce file sizes while maintaining quality. Batch conversion supported with custom quality settings." />
        <meta name="keywords" content="PNG to JPG converter, PNG to JPEG converter, convert PNG to JPG, image format converter, reduce image size, batch image conversion" />
        
        <meta property="og:title" content="Free PNG to JPG Converter - Convert PNG Images to JPEG" />
        <meta property="og:description" content="Convert PNG images to JPG format for free. Reduce file sizes with quality control." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/png-to-jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PNG to JPG Converter - Reduce Image File Sizes" />
        <meta name="twitter:description" content="Convert PNG to JPG online for free. Perfect for web optimization and storage." />
        
        <link rel="canonical" href="https://yoursite.com/png-to-jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            {/* Main Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-xl mb-4">
                <Image className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold text-sm">Image Format Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Convert PNG to JPG Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Transform PNG images to JPG format with custom quality settings. Perfect for web optimization, email, and reducing file sizes while maintaining visual quality.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Batch Convert</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Privacy Safe</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Instant Convert</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Quality Control</span>
                </div>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/png': ['.png'] }}
                multiple={true}
                toolName="png-to-jpg"
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
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          PNG
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 4 && (
                      <div className="flex items-center justify-center bg-gray-100 rounded-lg h-20">
                        <span className="text-gray-500 font-medium">+{selectedImages.length - 4} more</span>
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
                Professional PNG to JPG Conversion
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Convert your PNG images to JPG format with advanced options for optimal file size and quality balance
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Batch Conversion</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert multiple PNG images to JPG at once. Upload dozens of files and convert them all simultaneously.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Control</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose from multiple quality levels to balance file size and image quality. From web-optimized to high-quality output.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">File Size Reduction</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Significantly reduce file sizes by converting from PNG to JPG format. Perfect for web optimization and faster loading.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Privacy Protected</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your images are processed securely and deleted immediately after conversion. Complete privacy guaranteed.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Preview Before Download</h3>
                <p className="text-gray-600 text-sm mb-3">
                  See thumbnails of your converted images before downloading. Verify quality and make adjustments if needed.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Flexible Download</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download converted images individually or as a ZIP archive. Choose what works best for your workflow.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Convert PNG to JPG: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Conversion Steps</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload PNG images:</strong> Select your PNG files by clicking "Choose Images" or drag and drop them into the upload area.</li>
                  <li><strong>Adjust settings:</strong> Choose quality level, output format settings, and any additional options.</li>
                  <li><strong>Convert images:</strong> Click "Convert to JPG" and wait for processing to complete.</li>
                  <li><strong>Download results:</strong> Download individual JPG files or all images as a ZIP archive.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Settings Guide</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>High Quality (90-95%):</strong> Best for photographs and detailed images</li>
                  <li><strong>Standard Quality (75-85%):</strong> Good balance for most use cases</li>
                  <li><strong>Web Optimized (60-75%):</strong> Smaller files for websites</li>
                  <li><strong>Maximum Compression:</strong> Smallest files with acceptable quality</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Convert PNG to JPG?
            </h3>
            <p className="text-gray-700 mb-6">
              Converting PNG images to JPG format serves multiple practical purposes, especially when file size optimization is important. JPG format uses lossy compression that can dramatically reduce file sizes while maintaining acceptable visual quality for photographs and complex images.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">File Size Benefits</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Reduce file sizes by 50-90%</li>
                  <li>• Faster website loading times</li>
                  <li>• Save storage space on devices</li>
                  <li>• Easier email attachments</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Use Cases</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Web image optimization</li>
                  <li>• Social media uploads</li>
                  <li>• Email newsletters</li>
                  <li>• Digital photography workflow</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              PNG vs JPG: When to Use Each Format
            </h3>
            <p className="text-gray-700 mb-6">
              Understanding when to use PNG versus JPG formats helps optimize your images for specific purposes. PNG excels with graphics, logos, and images requiring transparency, while JPG is ideal for photographs and images where file size matters more than pixel-perfect quality.
            </p>

            <div className="bg-white rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Format Comparison</h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <strong className="text-green-600">PNG Best For:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Graphics and logos</li>
                    <li>Images with transparency</li>
                    <li>Simple images with few colors</li>
                    <li>Screenshots and diagrams</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-blue-600">JPG Best For:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Photographs and complex images</li>
                    <li>Web optimization</li>
                    <li>Email attachments</li>
                    <li>Social media uploads</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              PNG to JPG Conversion FAQ
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will converting PNG to JPG reduce image quality?
                </h3>
                <p className="text-gray-700">
                  JPG uses lossy compression, so there will be some quality reduction. However, with proper quality settings (80-90%), the difference is often imperceptible for photographs and complex images.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happens to transparent backgrounds in PNG images?
                </h3>
                <p className="text-gray-700">
                  JPG format doesn't support transparency. Transparent areas in PNG images will be converted to a solid color (usually white) in the JPG output.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How much can I reduce file size by converting to JPG?
                </h3>
                <p className="text-gray-700">
                  File size reduction varies depending on the image content and quality settings. Typically, you can expect 50-90% file size reduction when converting from PNG to JPG.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I convert multiple PNG files at once?
                </h3>
                <p className="text-gray-700">
                  Yes! Our batch conversion feature allows you to upload and convert multiple PNG images simultaneously. All converted files can be downloaded as individual files or in a ZIP archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}