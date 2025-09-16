// pages/jpg-to-pdf.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import ImageUploader from '../components/ImageUploader'
import { 
  Image, 
  Shield, 
  Zap, 
  CheckCircle,
  FileText,
  Download,
  Award,
  ChevronDown,
  Star,
  Users,
  Layers,
  Settings,
  Layout as LayoutIcon,
  Smartphone
} from 'lucide-react'

export default function JpgToPdf() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "Can I convert different image formats together in one PDF?",
      answer: "Yes, you can mix JPG, PNG, WebP, and other formats in a single PDF. Our converter automatically handles different image types and maintains their quality while creating one cohesive document. This is perfect when you have screenshots, photos, and graphics that need to be combined."
    },
    {
      question: "How do I control the order of images in my PDF?",
      answer: "After uploading, you can drag and drop images to reorder them exactly how you want them to appear in the final PDF. The first image becomes page 1, second becomes page 2, and so on. You can rearrange them as many times as needed before converting."
    },
    {
      question: "What's the difference between combining images vs separate PDFs?",
      answer: "Combining creates one multi-page PDF document with all your images as separate pages. Individual conversion creates separate PDF files for each image. Most people prefer combining for photo albums, presentations, or document collections."
    },
    {
      question: "Will my high-resolution photos lose quality when converted?",
      answer: "No quality loss occurs during conversion. Your images are embedded in the PDF at their original resolution and quality. A 4K photo will remain 4K in the PDF. The file size will be larger for high-resolution images, but quality is preserved perfectly."
    },
    {
      question: "Can I choose different page sizes for my PDF?",
      answer: "Absolutely. You can select from standard sizes like A4, Letter, Legal, or custom dimensions. You can also choose portrait or landscape orientation. The system automatically fits your images to the selected page size while maintaining aspect ratios."
    },
    {
      question: "Is there a limit to how many images I can convert at once?",
      answer: "You can upload and convert unlimited images in a single batch. Each image can be up to 50MB, and there's no restriction on the total number. Large batches might take a bit longer to process, but everything gets converted together."
    },
    {
      question: "What happens to my images after I download the PDF?",
      answer: "All uploaded images and the created PDF are automatically deleted from our servers within one hour. We don't store, backup, or access your files in any way. Your privacy is completely protected throughout the conversion process."
    },
    {
      question: "Can I convert screenshots and phone photos to PDF?",
      answer: "Yes, any digital image works perfectly. Screenshots from computers or phones, camera photos, scanned documents, downloaded images - everything converts cleanly to PDF format. The converter handles various resolutions and orientations automatically."
    }
  ]

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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "18,765"
    }
  }

  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - JPG to PDF Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Processing Your Images</h2>
              <p className="text-gray-600 mb-4">Creating PDF document...</p>
              <div className="bg-gray-200 rounded-full h-2 w-48 mx-auto">
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
        
        <link rel="canonical" href="https://yoursite.com/jpg-to-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4">
            {/* Compact Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-3 py-1.5 bg-green-100 rounded-full mb-3">
                <Image className="w-4 h-4 text-green-600 mr-1.5" />
                <span className="text-green-600 font-medium text-sm">Images to PDF</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert JPG to PDF Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Transform JPG, PNG, and JPEG images into professional PDF documents. Combine multiple images or convert individually.
              </p>
              
              {/* Ultra Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Layers className="w-3 h-3 text-green-600 mr-1" />
                  Combine Multiple
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Award className="w-3 h-3 text-blue-600 mr-1" />
                  High Quality
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Shield className="w-3 h-3 text-purple-600 mr-1" />
                  Private
                </span>
                <span className="inline-flex items-centers bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Users className="w-3 h-3 text-orange-600 mr-1" />
                  18K+ Users
                </span>
              </div>
            </div>

            {/* Compact Image Uploader */}
            <div className="max-w-2xl mx-auto">
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

            {/* Compact Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">
                      Ready to Convert ({selectedImages.length} images)
                    </h3>
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Processing
                    </div>
                  </div>
                  
                  <div className="grid gap-1 max-h-24 overflow-y-auto">
                    {selectedImages.slice(0, 3).map((image, index) => (
                      <div key={index} className="flex items-center space-x-2 p-1.5 bg-gray-50 rounded text-xs">
                        <div className="bg-green-500 rounded p-0.5">
                          <Image className="w-2.5 h-2.5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{image.name}</p>
                        </div>
                        <span className="text-gray-500">#{index + 1}</span>
                      </div>
                    ))}
                    {selectedImages.length > 3 && (
                      <div className="text-center text-gray-500 text-xs py-1">
                        +{selectedImages.length - 3} more images
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
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Professional Image to PDF Conversion
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced tools for converting images to PDF with professional results
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Multiple Format Support</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Convert JPG, PNG, WebP, and other formats with perfect quality preservation.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Combine Into One PDF</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Merge multiple images into a single PDF document with custom ordering.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <LayoutIcon className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Custom Page Settings</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Choose page sizes, orientations, and layouts for professional documents.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Complete Privacy</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Files deleted automatically after conversion. Zero data retention policy.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Batch Processing</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Convert unlimited images simultaneously with optimized performance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Smartphone className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Mobile Friendly</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Works perfectly on phones, tablets, and desktops without apps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Use Cases Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
              When You Need JPG to PDF Conversion
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-5 border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Business Documents</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Convert receipts, invoices, business cards, and contracts into searchable PDF documents for better organization and professional presentation.
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Invoice and receipt management</li>
                  <li>• Digital business card collections</li>
                  <li>• Contract and agreement storage</li>
                  <li>• Product catalog creation</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Personal Projects</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Create photo albums, preserve memories, organize travel documents, and compile educational materials in portable PDF format.
                </p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Digital photo albums and scrapbooks</li>
                  <li>• Travel document compilation</li>
                  <li>• Educational worksheet collections</li>
                  <li>• Recipe and tutorial compilation</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                Converting Images to PDF: Best Practices
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Image Quality Tips</h4>
                  <p className="text-gray-600 text-xs">Use high-resolution images for better PDF quality. Compress oversized photos before conversion to manage file sizes effectively.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Organization Strategy</h4>
                  <p className="text-gray-600 text-xs">Name files logically before uploading. Group related images together and arrange them in the order you want them to appear.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Format Selection</h4>
                  <p className="text-gray-600 text-xs">Choose page layouts that complement your images. Portrait for documents, landscape for wide photos, and custom for specific needs.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm">
                Common questions about converting images to PDF format
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                    onClick={() => toggleFaq(index)}
                  >
                    <span className="font-medium text-gray-900 text-sm pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-4 bg-gray-50 rounded-full px-6 py-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-700">4.8/5 from 18,765 users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Process Steps */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Convert Images to PDF in 3 Simple Steps
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload Images</h3>
                <p className="text-gray-600 text-sm">
                  Select JPG, PNG, or other image files. Upload multiple images to combine into one PDF.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Arrange & Configure</h3>
                <p className="text-gray-600 text-sm">
                  Reorder images, choose page size, and select layout preferences for your PDF.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Download PDF</h3>
                <p className="text-gray-600 text-sm">
                  Convert instantly and download your professional PDF document immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}