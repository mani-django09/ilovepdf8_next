// pages/png-to-webp.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import ImageUploader from '../components/ImageUploader'  // Add this import
import { 
  Image, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Monitor,
  Smartphone,
  Award,
  Download,
  Layers,
  Minimize2
} from 'lucide-react'


export default function PngToWebp() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImageFiles = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/png-to-webp/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PNG to WebP Converter - Convert PNG Images to WebP Online",
    "description": "Convert PNG images to WebP format online for free. Reduce file sizes by up to 50% while maintaining quality. No software download required.",
    "url": "https://yoursite.com/png-to-webp",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PNG to WebP format for free",
      "Batch PNG processing",
      "Quality optimization settings",
      "Transparency preservation",
      "File size reduction up to 50%",
      "Instant conversion and download"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "7654"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - PNG to WebP Converter</title>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing PNG Images</h2>
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
        <title>Free PNG to WebP Converter Online - Reduce Image File Sizes | High Quality</title>
        <meta name="description" content="Convert PNG images to WebP format online for free. Reduce file sizes by up to 50% while maintaining transparency and quality. No software download required." />
        <meta name="keywords" content="PNG to WebP converter, PNG to WebP online, convert PNG to WebP, image optimization, reduce image size, WebP converter free" />
        
        <meta property="og:title" content="Free PNG to WebP Converter - Optimize Images Online" />
        <meta property="og:description" content="Convert PNG to WebP format for free. Reduce file sizes significantly while preserving quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/png-to-webp" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PNG to WebP Converter - Optimize Your Images" />
        <meta name="twitter:description" content="Convert PNG to WebP online for free. Significant file size reduction with quality preservation." />
        
        <link rel="canonical" href="https://yoursite.com/png-to-webp" />
        
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
                <span className="text-green-600 font-semibold text-sm">PNG to WebP Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Convert PNG to WebP Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Optimize your PNG images with WebP format. Reduce file sizes by up to 50% while maintaining transparency and quality.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Minimize2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">50% Smaller</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Transparency</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Fast Convert</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Web Ready</span>
                </div>
              </div>
            </div>

            {/* Image Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/png': ['.png'] }}
                multiple={true}
                toolName="png-to-webp"
              />
            </div>

            {/* Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready to Optimize ({selectedImages.length} images)
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-1">
                          <p className="text-xs font-medium text-gray-900 truncate" title={image.name}>
                            {image.name}
                          </p>
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold inline-block mt-1">
                            PNG
                          </div>
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 4 && (
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
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
                Advanced PNG to WebP Conversion
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Convert PNG images to modern WebP format with superior compression and quality retention
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Minimize2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Superior Compression</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Reduce PNG file sizes by 25-50% on average. WebP format provides better compression than PNG while maintaining quality.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Transparency Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Preserve transparency channels from PNG images. WebP supports alpha transparency with better compression.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Web Optimized</h3>
                <p className="text-gray-600 text-sm mb-3">
                  WebP is designed for the web with faster loading times. Supported by all modern browsers for better performance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Control</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose between lossless and lossy compression modes. Customize quality settings for your specific needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Batch Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert multiple PNG files simultaneously. Process entire folders of images with consistent settings.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Preview & Compare</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Preview converted images before download. Compare file sizes and quality side-by-side.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Convert PNG to WebP: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Conversion Steps</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload PNG files:</strong> Select your PNG images by clicking "Choose PNG Files" or drag and drop them.</li>
                  <li><strong>Choose settings:</strong> Select compression mode (lossless/lossy) and quality level.</li>
                  <li><strong>Convert images:</strong> Click "Convert to WebP" and wait for processing to complete.</li>
                  <li><strong>Download results:</strong> Download individual WebP files or all images as a ZIP archive.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compression Options</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>Lossless:</strong> Perfect quality preservation, moderate size reduction</li>
                  <li><strong>Quality 90-100:</strong> Near-perfect quality, good compression</li>
                  <li><strong>Quality 70-89:</strong> Excellent quality, significant size reduction</li>
                  <li><strong>Quality 50-69:</strong> Good quality, maximum compression</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Convert PNG to WebP Format?
            </h3>
            <p className="text-gray-700 mb-6">
              WebP is a modern image format developed by Google that provides superior compression compared to PNG while maintaining excellent quality. Converting PNG to WebP can significantly reduce website loading times and bandwidth usage without sacrificing visual fidelity.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Performance Benefits</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• 25-50% smaller file sizes on average</li>
                  <li>• Faster website loading times</li>
                  <li>• Reduced bandwidth consumption</li>
                  <li>• Better mobile performance</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Technical Advantages</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Support for both lossy and lossless compression</li>
                  <li>• Alpha transparency preservation</li>
                  <li>• Animation support (like GIF)</li>
                  <li>• Wide browser compatibility</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Browser Support and Implementation
            </h3>
            <p className="text-gray-700 mb-6">
              WebP format is now supported by all major browsers including Chrome, Firefox, Safari, and Edge. This makes it safe to use WebP images on modern websites, with fallback options available for older browsers if needed.
            </p>

            <div className="bg-white rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Use Cases for WebP</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Web Development</strong>
                  <p>Optimize website images for faster loading</p>
                </div>
                <div>
                  <strong>E-commerce</strong>
                  <p>Product images with transparent backgrounds</p>
                </div>
                <div>
                  <strong>Mobile Apps</strong>
                  <p>Reduce app size and improve performance</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              PNG to WebP Conversion FAQ
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will converting PNG to WebP reduce image quality?
                </h3>
                <p className="text-gray-700">
                  WebP supports both lossless and lossy compression. With lossless compression, there's no quality loss. With lossy compression, you can control the quality level to balance file size and visual quality.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Does WebP support transparency like PNG?
                </h3>
                <p className="text-gray-700">
                  Yes, WebP fully supports alpha transparency just like PNG. The transparency information is preserved during conversion, often with better compression than PNG.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How much can I reduce file size by converting to WebP?
                </h3>
                <p className="text-gray-700">
                  Typically, you can expect 25-50% file size reduction when converting PNG to WebP, depending on the image content and compression settings. Complex images with many colors may see greater reductions.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I convert WebP back to PNG if needed?
                </h3>
                <p className="text-gray-700">
                  Yes, WebP images can be converted back to PNG format. However, if you used lossy compression during the PNG to WebP conversion, some quality loss will be permanent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}