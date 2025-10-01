// pages/pdf-to-jpg.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { 
  FileImage, 
  Shield, 
  Zap, 
  CheckCircle,
  Image,
  Download,
  Award,
  ChevronDown,
  Lock,
  Users,
  Clock,
  Star,
  Settings,
  Layers,
  Monitor
} from 'lucide-react'

export default function PdfToJpg() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.convertPdfFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/pdf-to-jpg/preview')
      }, 2000)
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "What image formats can I convert my PDF to?",
      answer: "You can convert PDF pages to JPG (JPEG) for smaller files and general use, or PNG for images requiring transparency and crisp text. JPG is recommended for photographs and documents, while PNG works better for graphics with transparency or when maximum text clarity is needed."
    },
    {
      question: "How do I choose the right image quality settings?",
      answer: "Use 72-96 DPI for web and digital sharing, 150 DPI for standard office printing, and 300 DPI for professional printing or when image quality is critical. Higher DPI means better quality but larger file sizes. Most users find 150 DPI provides the perfect balance."
    },
    {
      question: "Can I convert specific pages instead of the entire PDF?",
      answer: "Absolutely. You can select individual pages, page ranges like '1-5, 10, 15-20', or convert all pages at once. This is particularly useful for large documents where you only need certain sections converted to images."
    },
    {
      question: "What happens to password-protected PDF files?",
      answer: "Password-protected PDFs need to be unlocked before conversion. You can remove password protection using most PDF viewers by saving the file without a password, then upload the unlocked version for conversion."
    },
    {
      question: "Will my converted images maintain the original quality?",
      answer: "Yes, the output quality matches or exceeds what's in your original PDF. Our conversion engine preserves image resolution and text clarity. The quality depends on your DPI selection and the original content quality in the PDF."
    },
    {
      question: "How large can my PDF file be for conversion?",
      answer: "You can convert PDF files up to 100MB in size, which covers most documents including lengthy reports with multiple images. For larger files, consider compressing the PDF first or splitting it into smaller sections."
    },
    {
      question: "Are my files secure during the conversion process?",
      answer: "Your files are processed using encrypted connections and stored temporarily on secure servers. All uploaded files and converted images are automatically deleted within one hour. We never access, store, or share your document content."
    },
    {
      question: "Can I convert scanned documents and image-based PDFs?",
      answer: "Yes, our converter handles all types of PDFs including scanned documents, image-based files, and text documents. The output quality will reflect the original scan quality, so high-resolution scans produce better image results."
    }
  ]

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to JPG Converter - Extract Images from PDF Online",
    "description": "Convert PDF pages to high-quality JPG images instantly. Free online tool with custom resolution settings and batch processing capabilities.",
    "url": "https://ilovepdf8.net/pdf-to-jpg",
    "applicationCategory": "UtilityApplication",
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
      "reviewCount": "15,234"
    }
  }

  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing PDF - PDF to JPG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-orange-200 border-t-orange-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-5 h-5 text-orange-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Processing Your PDF</h2>
              <p className="text-gray-600 mb-4">Preparing image conversion...</p>
              <div className="bg-gray-200 rounded-full h-2 w-48 mx-auto">
                <div className="bg-orange-600 h-2 rounded-full animate-pulse w-3/4"></div>
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
        <title>PDF to JPG Converter - Turn PDF Pages into Images Online Free</title>
        <meta name="description" content="Convert PDF pages to JPG images for free. Extract high-quality images from any PDF document with custom resolution settings. Simple, fast, and secure conversion tool." />
        <meta name="keywords" content="PDF to JPG converter, PDF to image converter, convert PDF pages to images, extract images from PDF, PDF to JPEG online free" />
        
        <meta property="og:title" content="PDF to JPG Converter - Extract Images from PDF Online" />
        <meta property="og:description" content="Free online tool to convert PDF pages to high-quality JPG images. Custom resolution settings and instant download." />
        <meta property="og:type" content="website" />
        
        <link rel="canonical" href="https://ilovepdf8.net/pdf-to-jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-orange-50 via-white to-red-50 pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4">
            {/* Compact Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-3 py-1.5 bg-orange-100 rounded-full mb-3">
                <FileImage className="w-4 h-4 text-orange-600 mr-1.5" />
                <span className="text-orange-600 font-medium text-sm">PDF to Images</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert PDF Pages to <span className="text-orange-600">High-Quality Images</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Extract each page as JPG or PNG files. Perfect for presentations, social media, websites, and image galleries.
              </p>
              
              {/* Ultra Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Image className="w-3 h-3 text-orange-600 mr-1" />
                  Multiple Formats
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Settings className="w-3 h-3 text-blue-600 mr-1" />
                  Custom Quality
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Shield className="w-3 h-3 text-green-600 mr-1" />
                  Secure
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Users className="w-3 h-3 text-purple-600 mr-1" />
                  15K+ Users
                </span>
              </div>
            </div>

            {/* Compact PDF Uploader */}
            <div className="max-w-2xl mx-auto">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="pdf-to-jpg"
              />
            </div>

            {/* Compact Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-orange-500 rounded p-1.5">
                      <FileImage className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Ready
                    </div>
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
                Professional PDF to Image Conversion
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Advanced conversion technology for perfect image extraction from any PDF document
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Complete Page Extraction</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Convert every page of your PDF into individual high-quality images with pixel-perfect accuracy.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Flexible Quality Options</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Choose from 72 DPI to 300 DPI resolution settings for web, print, or professional use.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Image className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Multiple Output Formats</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Export as JPG for smaller files or PNG for transparency support and crisp text.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Enterprise Security</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  SSL encryption and automatic file deletion within one hour for complete privacy.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Instant Processing</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Advanced algorithms convert large documents in seconds with optimized performance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Organized Downloads</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Get individual files or complete ZIP archives with professional naming conventions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Use Cases Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Common Use Cases for PDF to Image Conversion
              </h2>
              <p className="text-gray-600">
                Professional applications across industries and creative projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-5 border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Business Applications</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Extract charts and graphs for presentations and reports</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Convert brochures into social media and web content</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Create image archives for document management systems</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Transform technical manuals into visual training materials</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-5 border">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Creative Projects</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Extract artwork for editing in design software</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Create portfolio galleries from project documentation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Generate social media content from educational materials</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span>Convert recipe books and guides into shareable images</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3 text-center">
                Quality Settings Guide
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <Monitor className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Web Use (72-96 DPI)</h4>
                  <p className="text-gray-600 text-xs">Websites, emails, social media posts. Smaller files for faster loading.</p>
                </div>
                <div className="text-center">
                  <FileImage className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Standard Print (150 DPI)</h4>
                  <p className="text-gray-600 text-xs">Office documents, presentations, basic printing needs. Balanced quality.</p>
                </div>
                <div className="text-center">
                  <Award className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">Professional (300 DPI)</h4>
                  <p className="text-gray-600 text-xs">High-quality printing, marketing materials, detailed artwork.</p>
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
                Everything about converting PDFs to images and choosing the right settings
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
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
                <span className="text-sm font-medium text-gray-700">4.8/5 from 15,234 users</span>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Process Steps */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Convert PDF to Images in 3 Steps
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  1
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload PDF File</h3>
                <p className="text-gray-600 text-sm">
                  Select your PDF document. Files up to 100MB supported with unlimited pages.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  2
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Choose Settings</h3>
                <p className="text-gray-600 text-sm">
                  Select image format, quality level, and specific pages to convert.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold mx-auto mb-3">
                  3
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Download Images</h3>
                <p className="text-gray-600 text-sm">
                  Get your converted images instantly as individual files or ZIP archive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}