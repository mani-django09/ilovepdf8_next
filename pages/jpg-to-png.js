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
  Download,
  ChevronDown,
  ChevronUp,
  Layers,
  Palette
} from 'lucide-react'

export default function JpgToPng() {
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
        router.push('/jpg-to-png/preview')
      }, 1500)
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index)
  }

  const faqData = [
    {
      question: "Why convert JPG to PNG instead of keeping the smaller file size?",
      answer: "While JPG files are smaller, PNG offers critical advantages for certain use cases. If you need transparency support, pixel-perfect quality, or plan to edit the image further, PNG is essential. Think of it as choosing between a compressed photo and a master file - PNG gives you flexibility for future modifications."
    },
    {
      question: "Will converting JPG to PNG improve image quality?",
      answer: "Converting won't restore quality already lost in JPG compression, but it prevents further quality loss. PNG uses lossless compression, so once converted, your image maintains its current quality permanently. It's like making a perfect copy of what you currently have."
    },
    {
      question: "How much larger will my files become after conversion?",
      answer: "PNG files are typically 3-5 times larger than equivalent JPG images due to lossless compression. A 200KB JPG might become 800KB-1MB as PNG. The exact increase depends on image complexity - simple graphics see smaller increases, while detailed photos grow significantly."
    },
    {
      question: "Can I add transparency to the converted PNG images?",
      answer: "The conversion itself doesn't create transparency, but PNG format supports it perfectly. After converting, you can use any image editing software to add transparent backgrounds, create cutouts, or apply alpha effects. JPG format can never support transparency."
    },
    {
      question: "When should I choose PNG over JPG for my images?",
      answer: "Choose PNG for logos, graphics with text, images you'll edit later, or anything needing transparency. Stick with JPG for photographs, social media uploads, or when file size matters more than perfect quality. PNG is the professional choice for graphics work."
    },
    {
      question: "Is there a limit to how many JPG files I can convert?",
      answer: "Our converter handles batch processing efficiently. Upload multiple JPG files simultaneously - dozens at a time work perfectly. This makes it ideal for converting entire photo albums, product catalogs, or design asset libraries in one go."
    }
  ]

  // SEO structured data (truncated for brevity)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free JPG to PNG Converter - Convert JPEG Images to PNG Online",
    "description": "Convert JPG/JPEG images to PNG format online for free. Add transparency support and lossless quality. Batch conversion available."
  }

  // Loading overlay
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - JPG to PNG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Converting JPG Images</h2>
              <p className="text-gray-600 mb-4">Creating PNG files...</p>
              <div className="bg-gray-200 rounded-full h-1.5 w-48 mx-auto">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
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
        <title>Free JPG to PNG Converter Online - Add Transparency Support | Lossless Quality</title>
        <meta name="description" content="Convert JPG/JPEG images to PNG format online for free. Perfect for graphics, transparency needs, and lossless image quality. Batch conversion supported." />
        <meta name="keywords" content="JPG to PNG converter, JPEG to PNG converter, convert JPG to PNG, lossless image conversion, transparency support, batch image conversion" />
        
        <meta property="og:title" content="Free JPG to PNG Converter - Convert JPEG Images to PNG" />
        <meta property="og:description" content="Convert JPG images to PNG format for free. Add transparency support and lossless quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ilovepdf8.net/jpg-to-png" />
        
        <link rel="canonical" href="https://ilovepdf8.net/jpg-to-png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Tight Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center p-1.5 bg-blue-100 rounded-lg mb-3">
                <Image className="w-4 h-4 text-blue-600 mr-1.5" />
                <span className="text-blue-600 font-medium text-sm">JPG to PNG</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert JPG to PNG <span className="text-blue-600">Online Free</span>
              </h1>
              
              <p className="text-base text-gray-600 max-w-xl mx-auto mb-4">
                Transform JPEG images to PNG format with lossless quality and transparency support for professional graphics.
              </p>
              
              {/* Compact Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Award className="w-3 h-3 text-blue-600" />
                  <span className="font-medium text-gray-700">Lossless</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Layers className="w-3 h-3 text-green-600" />
                  <span className="font-medium text-gray-700">Transparency</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="font-medium text-gray-700">Batch</span>
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

            {/* Compact Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Converting {selectedImages.length} JPG images
                    </h3>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
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
                        <div className="bg-orange-500 text-white px-1 py-0.5 rounded text-xs font-bold inline-block mt-1">
                          JPG
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
                Why Convert JPG to PNG?
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4">
                <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Perfect Quality</h3>
                <p className="text-gray-600 text-xs">Lossless compression</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Add Transparency</h3>
                <p className="text-gray-600 text-xs">Alpha channel support</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Design Ready</h3>
                <p className="text-gray-600 text-xs">Professional graphics</p>
              </div>

              <div className="text-center p-4">
                <div className="bg-orange-500 rounded-lg p-2 w-10 h-10 mx-auto mb-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Batch Convert</h3>
                <p className="text-gray-600 text-xs">Multiple files at once</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Content Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Transform JPG for Professional Graphics
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Perfect for Design Work</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Converting JPG to PNG unlocks creative possibilities that compressed formats can't offer. Need to remove backgrounds? Add transparent elements? Layer graphics? PNG format handles all of this while preserving every pixel of detail.
                </p>
                <p className="text-gray-700 text-sm">
                  Professional designers choose PNG for logos, icons, and graphics because it maintains crisp edges and supports the alpha transparency essential for modern web design and print work.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Future-Proof Your Images</h3>
                <p className="text-gray-700 text-sm mb-4">
                  JPG compression permanently discards image data to save space. Converting to PNG stops this degradation process, creating a stable master file that won't lose quality through future edits or saves.
                </p>
                <p className="text-gray-700 text-sm">
                  Think of PNG conversion as creating a digital negative - a pristine copy that preserves your current image quality for all future modifications and exports.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Format Choice Guide</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-medium text-orange-600 mb-2">Stick with JPG for:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Photos for social media sharing</li>
                    <li>Email attachments with size limits</li>
                    <li>Website headers and photography</li>
                    <li>Quick phone snapshots</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">Convert to PNG when:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Creating graphics or logos</li>
                    <li>Need transparent backgrounds</li>
                    <li>Planning further image editing</li>
                    <li>Preparing print-quality artwork</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              JPG to PNG Conversion Questions
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

            {/* Pro Tips */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Best Practices for JPG to PNG Conversion</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Before Converting:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Use highest quality JPG as source</li>
                    <li>Consider if you really need transparency</li>
                    <li>Check available storage space</li>
                    <li>Plan your intended use case</li>
                  </ul>
                </div>
                <div>
                  <strong>After Converting:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Keep original JPG as backup</li>
                    <li>Use PNG for further editing</li>
                    <li>Optimize PNG for web if needed</li>
                    <li>Consider WebP for modern browsers</li>
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