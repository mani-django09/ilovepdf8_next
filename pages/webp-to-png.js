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
  Download,
  ChevronDown,
  ChevronUp,
  Monitor,
  Layers
} from 'lucide-react'

export default function WebpToPng() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  const faqData = [
    {
      question: "Why would I need to convert WebP back to PNG?",
      answer: "While WebP is fantastic for web performance, PNG remains the gold standard for universal compatibility. Older browsers, certain email clients, and legacy software may not support WebP files. Converting to PNG ensures your images work everywhere, from vintage operating systems to modern design tools."
    },
    {
      question: "Will I lose image quality during WebP to PNG conversion?",
      answer: "Not at all. Since PNG uses lossless compression, the conversion preserves every pixel of your original WebP image. However, the file size will increase because PNG doesn't compress as efficiently as WebP. Think of it as trading file size for universal compatibility."
    },
    {
      question: "Can PNG handle transparency from my WebP images?",
      answer: "Absolutely. PNG was actually one of the first formats to support alpha transparency, and it handles it beautifully. Your transparent backgrounds, subtle shadows, and semi-transparent effects will convert perfectly. PNG's transparency support is rock-solid and widely compatible."
    },
    {
      question: "How much larger will my files become after conversion?",
      answer: "PNG files are typically 2-3 times larger than equivalent WebP images due to different compression methods. A 100KB WebP might become 250KB as PNG. This size increase is the price of universal compatibility - your images will work everywhere but take more storage space."
    },
    {
      question: "Do I need special software to view PNG files?",
      answer: "PNG files open in literally everything - web browsers from 1998, basic image viewers, professional design software, mobile apps, and even text editors can display PNG metadata. It's the most universally supported image format ever created."
    },
    {
      question: "Can I batch convert multiple WebP files at once?",
      answer: "Yes, our converter handles bulk operations efficiently. Upload dozens of WebP files simultaneously and convert them all with one click. Perfect for migrating entire image libraries or preparing assets for platforms that don't support WebP."
    }
  ]

  // SEO structured data (truncated for brevity - same as original)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free WebP to PNG Converter - Convert WebP Images to PNG Online",
    "description": "Convert WebP images to PNG format online for free. Maintain transparency and lossless quality. Perfect for compatibility across all browsers and platforms.",
    "url": "https://ilovepdf8.net/webp-to-png"
  }

  // Loading overlay
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
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-purple-200 border-t-purple-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Converting WebP Images</h2>
              <p className="text-gray-600 mb-4">Preparing PNG files...</p>
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
        <title>Free WebP to PNG Converter Online - Universal Compatibility | Convert WebP Images</title>
        <meta name="description" content="Convert WebP images to PNG format online for free. Ensure universal browser compatibility while maintaining image quality and transparency support." />
        <meta name="keywords" content="WebP to PNG converter, convert WebP to PNG, WebP compatibility, image format converter, universal browser support, lossless conversion" />
        
        <meta property="og:title" content="Free WebP to PNG Converter - Universal Browser Compatibility" />
        <meta property="og:description" content="Convert WebP images to PNG format for universal compatibility across all browsers and platforms." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ilovepdf8.net/webp-to-png" />
        
        <link rel="canonical" href="https://ilovepdf8.net/webp-to-png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 via-white to-indigo-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Tight Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-1.5 bg-purple-100 rounded-lg mb-3">
                <Image className="w-4 h-4 text-purple-600 mr-1.5" />
                <span className="text-purple-600 font-medium text-sm">WebP to PNG</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert WebP to PNG <span className="text-purple-600">Online Free</span>
              </h1>
              
              <p className="text-base text-gray-600 max-w-xl mx-auto mb-4">
                Transform modern WebP images to universally compatible PNG format while preserving quality and transparency.
              </p>
              
              {/* Compact Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Globe className="w-3 h-3 text-purple-600" />
                  <span className="font-medium text-gray-700">Universal</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Layers className="w-3 h-3 text-blue-600" />
                  <span className="font-medium text-gray-700">Transparency</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Shield className="w-3 h-3 text-green-600" />
                  <span className="font-medium text-gray-700">Lossless</span>
                </div>
              </div>
            </div>

            {/* Compact Upload Area */}
            <div className="max-w-2xl mx-auto mb-6">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/webp': ['.webp'] }}
                multiple={true}
                toolName="webp-to-png"
              />
            </div>

            {/* Compact Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Converting {selectedImages.length} WebP images
                    </h3>
                    <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                      Ready
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-purple-500 text-white px-1 py-0.5 rounded text-xs font-bold inline-block mt-1">
                          WebP
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 4 && (
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs font-medium">+{selectedImages.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Features */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Why Convert WebP to PNG?
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Universal Support</h3>
                <p className="text-gray-600 text-xs">Works on all devices</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Keep Quality</h3>
                <p className="text-gray-600 text-xs">Lossless conversion</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Transparency</h3>
                <p className="text-gray-600 text-xs">Alpha channel preserved</p>
              </div>

              <div className="text-center p-4">
                <div className="bg-orange-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Batch Process</h3>
                <p className="text-gray-600 text-xs">Multiple files at once</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              When You Need PNG Over WebP
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legacy System Compatibility</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Some older systems, email clients, and software applications still don't recognize WebP format. Converting to PNG ensures your images display correctly across every platform, from vintage computers to modern smartphones.
                </p>
                <p className="text-gray-700 text-sm">
                  PNG has been the internet's reliable image format since 1996, making it the safest choice when compatibility matters more than file size.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Workflows</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Many professional design tools and printing workflows expect PNG format for high-quality graphics. Converting WebP to PNG ensures seamless integration with Adobe Creative Suite, print shops, and client deliverables.
                </p>
                <p className="text-gray-700 text-sm">
                  PNG's lossless compression and excellent transparency support make it ideal for logos, graphics, and any image requiring pixel-perfect quality.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              WebP to PNG Conversion Questions
            </h2>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 py-4 bg-white border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Guide */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Conversion Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>When to Convert:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Older browser support needed</li>
                    <li>Email attachments</li>
                    <li>Print workflows</li>
                    <li>Legacy software compatibility</li>
                  </ul>
                </div>
                <div>
                  <strong>What to Expect:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Larger file sizes (2-3x)</li>
                    <li>Perfect quality preservation</li>
                    <li>Full transparency support</li>
                    <li>Universal compatibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}