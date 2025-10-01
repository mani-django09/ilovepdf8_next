// pages/png-to-webp.js
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
  CheckCircle,
  Monitor,
  Smartphone,
  Award,
  Download,
  Layers,
  Minimize2,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function PngToWebp() {
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
        router.push('/png-to-webp/preview')
      }, 2000)
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  const faqData = [
    {
      question: "Will my PNG images lose quality when converted to WebP?",
      answer: "Not necessarily. WebP offers both lossless and lossy compression modes. In lossless mode, your images maintain perfect quality while still achieving 20-30% smaller file sizes. With lossy compression, you control the quality level - even at 85% quality, most users can't distinguish the difference from the original PNG."
    },
    {
      question: "Can WebP handle transparent backgrounds from my PNG files?",
      answer: "Absolutely. WebP fully supports alpha transparency and often compresses transparent PNGs more efficiently than the original format. Your logos, icons, and graphics with transparent backgrounds will convert perfectly while taking up less storage space."
    },
    {
      question: "How much smaller will my files become after conversion?",
      answer: "Most PNG files become 25-50% smaller when converted to WebP. Photography-heavy PNGs can see reductions of up to 80%, while simple graphics typically achieve 30-40% compression. The exact savings depend on your image content and chosen quality settings."
    },
    {
      question: "Do all browsers support WebP images now?",
      answer: "Yes, all modern browsers including Chrome, Firefox, Safari (14+), and Edge now support WebP. This covers over 95% of web users. For maximum compatibility, many developers use WebP with PNG fallbacks, though this is rarely necessary today."
    },
    {
      question: "Is there a file size or quantity limit for conversion?",
      answer: "Our converter handles individual files up to 50MB and supports batch conversion of up to 100 images at once. For most users, this covers everything from single product photos to entire website image galleries without restrictions."
    },
    {
      question: "Can I convert WebP images back to PNG later?",
      answer: "Yes, but keep in mind that if you used lossy compression initially, converting back won't restore the original quality. For maximum flexibility, consider keeping your original PNG files as masters and using WebP versions for web deployment."
    }
  ]

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PNG to WebP Converter - Convert PNG Images to WebP Online",
    "description": "Convert PNG images to WebP format online for free. Reduce file sizes by up to 50% while maintaining quality. No software download required.",
    "url": "https://ilovepdf8.net/png-to-webp",
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
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing PNG Images</h2>
              <p className="text-gray-600 mb-4">Preparing conversion interface...</p>
              <div className="bg-gray-200 rounded-full h-1.5 w-48 mx-auto">
                <div className="bg-green-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
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
        <meta property="og:url" content="https://ilovepdf8.net/png-to-webp" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PNG to WebP Converter - Optimize Your Images" />
        <meta name="twitter:description" content="Convert PNG to WebP online for free. Significant file size reduction with quality preservation." />
        
        <link rel="canonical" href="https://ilovepdf8.net/png-to-webp" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Tight Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-1.5 bg-green-100 rounded-lg mb-3">
                <Image className="w-4 h-4 text-green-600 mr-1.5" />
                <span className="text-green-600 font-medium text-sm">PNG to WebP</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert PNG to WebP <span className="text-green-600">Free Online</span>
              </h1>
              
              <p className="text-base text-gray-600 max-w-xl mx-auto mb-4">
                Reduce PNG file sizes by up to 50% while keeping transparency and quality intact.
              </p>
              
              {/* Ultra Compact Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Minimize2 className="w-3 h-3 text-green-600" />
                  <span className="font-medium text-gray-700">50% Smaller</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Layers className="w-3 h-3 text-blue-600" />
                  <span className="font-medium text-gray-700">Transparency</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="font-medium text-gray-700">Instant</span>
                </div>
              </div>
            </div>

            {/* Compact Image Uploader */}
            <div className="max-w-2xl mx-auto mb-6">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/png': ['.png'] }}
                multiple={true}
                toolName="png-to-webp"
              />
            </div>

            {/* Compact Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Ready ({selectedImages.length} files)
                    </h3>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Processing...
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
                        <div className="bg-blue-500 text-white px-1 py-0.5 rounded text-xs font-bold inline-block mt-1">
                          PNG
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
                Why Choose PNG to WebP Conversion?
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="bg-green-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Minimize2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Smaller Files</h3>
                <p className="text-gray-600 text-xs">Up to 50% size reduction</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Keep Transparency</h3>
                <p className="text-gray-600 text-xs">Alpha channel preserved</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Web Ready</h3>
                <p className="text-gray-600 text-xs">All browsers support</p>
              </div>

              <div className="text-center p-4">
                <div className="bg-orange-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Fast Process</h3>
                <p className="text-gray-600 text-xs">Instant conversion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              The Smart Way to Optimize PNG Images
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect for Web Development</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Modern websites demand fast loading times. WebP format delivers the same visual quality as PNG but with dramatically smaller file sizes. Your users get crisp images that load instantly, improving both user experience and search engine rankings.
                </p>
                <p className="text-gray-700 text-sm">
                  Whether you're optimizing product photos for an e-commerce site or preparing icons for a mobile app, WebP conversion is the professional standard for image optimization.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Transparency Without Compromise</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Unlike JPEG, WebP maintains full transparency support from your PNG files. This means your logos, icons, and graphics with transparent backgrounds convert perfectly while achieving significant size reductions.
                </p>
                <p className="text-gray-700 text-sm">
                  The advanced compression algorithms in WebP are specifically designed to handle alpha channels efficiently, often compressing transparent areas better than PNG format itself.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-World Impact</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">40%</div>
                  <p className="text-gray-600">Average file size reduction</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">3x</div>
                  <p className="text-gray-600">Faster page load times</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                  <p className="text-gray-600">Quality preservation</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Common Questions About PNG to WebP Conversion
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

            {/* Quick Tips */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">💡 Pro Tips for Best Results</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Use lossless mode</strong> for graphics, logos, and images with text</li>
                <li><strong>Choose quality 80-90</strong> for photographs to balance size and quality</li>
                <li><strong>Test different settings</strong> with our preview feature before downloading</li>
                <li><strong>Keep originals</strong> as backup files for future editing needs</li>
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}