// pages/pdf-to-png.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { 
  Image, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Monitor,
  Layers,
  Award,
  Download,
  FileImage,
  Archive,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const faqs = [
  {
    question: "Will my PNG images keep transparency from the original PDF?",
    answer: "Absolutely! PNG format preserves all transparency and alpha channels from your PDF. Any transparent backgrounds, watermarks, or overlays will remain intact in your extracted images."
  },
  {
    question: "What image quality should I choose for my PNG files?",
    answer: "For web use, choose 72-150 DPI. For print materials or detailed graphics, go with 300 DPI. Higher DPI means better quality but larger file sizes - pick what works best for your intended use."
  },
  {
    question: "Can I convert just specific pages instead of the entire PDF?",
    answer: "Yes! You can select individual pages, page ranges (like 1-5), or specific pages (like 1,3,7). This saves time and gives you exactly what you need without unnecessary files."
  },
  {
    question: "How big can my PDF file be for conversion?",
    answer: "You can upload PDF files up to 100MB. Most standard documents fit comfortably within this limit, whether they're reports, presentations, or multi-page documents."
  },
  {
    question: "Why choose PNG over JPG for PDF extraction?",
    answer: "PNG is perfect for PDFs because it preserves sharp text, graphics, and transparency without quality loss. JPG compresses images which can make text blurry - PNG keeps everything crisp."
  },
  {
    question: "Is my PDF file secure during conversion?",
    answer: "Your privacy matters to us. All files are processed securely and automatically deleted from our servers within one hour of conversion. We never store or share your documents."
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{faq.question}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function PdfToPng() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.convertPdfFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/pdf-to-png/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PDF to PNG Converter - Extract PDF Pages as High Quality PNG Images",
    "description": "Convert PDF documents to PNG images online free. Extract PDF pages as high-quality PNG files with transparency support. Best PDF to PNG converter tool.",
    "url": "https://yoursite.com/pdf-to-png",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PDF to PNG images free online",
      "Extract all PDF pages as separate PNG files",
      "High-quality PNG output with transparency preservation",
      "Multiple DPI resolution settings",
      "Custom page selection and ranges",
      "Batch PDF to PNG processing"
    ]
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing PDF - PDF to PNG Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-5 h-5 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Analyzing Your PDF</h2>
              <p className="text-gray-600 mb-4">Setting up conversion interface...</p>
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
        <title>Free PDF to PNG Converter Online - Convert PDF Pages to PNG Images | Best Quality</title>
        <meta name="description" content="Convert PDF to PNG images online free. Extract PDF pages as high-quality PNG files with transparency support. Best PDF to PNG converter tool with custom DPI settings." />
        <meta name="keywords" content="PDF to PNG converter free, convert PDF pages to PNG online, PDF to PNG with transparency, extract images from PDF, PDF page to PNG converter, high quality PDF to PNG" />
        
        <meta property="og:title" content="Free PDF to PNG Converter - Extract PDF Pages as PNG Images" />
        <meta property="og:description" content="Convert PDF documents to high-quality PNG images for free. Perfect transparency preservation and custom quality settings." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/pdf-to-png" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF to PNG Converter - Extract PDF Pages as PNG Images" />
        <meta name="twitter:description" content="Convert PDF to PNG online for free. High-quality extraction with transparency support." />
        
        <link rel="canonical" href="https://yoursite.com/pdf-to-png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-lg mb-3">
                <FileImage className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold text-sm">PDF to PNG Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Turn Your PDF Pages Into <span className="text-green-600">PNG Images</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Extract every page from your PDF as crystal-clear PNG images. Perfect for presentations, web graphics, and editing projects with full transparency support.
              </p>
              
              {/* Compact Features */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm font-medium text-gray-700">
                  ✓ Keeps Transparency
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm font-medium text-gray-700">
                  ✓ High Quality Output
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm font-medium text-gray-700">
                  ✓ All Pages or Custom
                </div>
                <div className="bg-white rounded-full px-4 py-2 shadow-sm text-sm font-medium text-gray-700">
                  ✓ Instant Download
                </div>
              </div>
            </div>

            {/* PDF Uploader */}
            <div className="max-w-3xl mx-auto mb-6">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="pdf-to-png"
              />
            </div>

            {/* Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Ready to Extract PNG Images
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-red-500 rounded p-2">
                      <FileImage className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      PDF
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Features Grid */}
        <div className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Choose Our PDF to PNG Converter?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get the best quality PNG images from your PDFs with professional features
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Perfect Transparency</h3>
                <p className="text-gray-600 text-sm">
                  PNG format keeps all transparent backgrounds and effects from your original PDF intact.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">No Quality Loss</h3>
                <p className="text-gray-600 text-sm">
                  Lossless conversion means your images look exactly like the original PDF pages.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Archive className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Extract All Pages</h3>
                <p className="text-gray-600 text-sm">
                  Get every page as a separate PNG file, or choose specific pages you need.
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Custom Quality</h3>
                <p className="text-gray-600 text-sm">
                  Choose from 72 to 600 DPI resolution to match your specific needs.
                </p>
              </div>

              <div className="bg-teal-50 rounded-lg p-4 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">
                  Quick processing gets your PNG images ready in seconds, not minutes.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-2 w-10 h-10 mb-3">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Easy Download</h3>
                <p className="text-gray-600 text-sm">
                  Get all your PNG files in one convenient ZIP download, organized and ready.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact How It Works */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                How to Convert PDF to PNG Images
              </h2>
              <p className="text-lg text-gray-600">
                Simple process that takes less than a minute
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FileImage className="w-8 h-8 text-green-600" />
                </div>
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your PDF</h3>
                <p className="text-gray-600 text-sm">
                  Drag and drop your PDF file or click to browse from your computer.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Settings</h3>
                <p className="text-gray-600 text-sm">
                  Pick image quality and select which pages to convert to PNG.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Download className="w-8 h-8 text-purple-600" />
                </div>
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download PNG Files</h3>
                <p className="text-gray-600 text-sm">
                  Get your high-quality PNG images instantly as a ZIP file.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact SEO Content */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Convert PDF to PNG: Everything You Need to Know
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">When to Use PNG Format</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  PNG is perfect when you need crisp text, sharp graphics, or transparent backgrounds from your PDF. Unlike JPG, PNG doesn't compress your images, so everything stays pixel-perfect.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Web graphics and logos from PDFs</li>
                  <li>Presentations with transparent elements</li>
                  <li>Screenshots of PDF pages for documentation</li>
                  <li>High-quality images for print materials</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Settings Guide</h3>
                <p className="text-gray-700 mb-4 text-sm">
                  Choose the right DPI setting based on how you'll use your PNG images. Higher DPI means better quality but larger file sizes.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li><strong>72-96 DPI:</strong> Perfect for websites and digital use</li>
                  <li><strong>150 DPI:</strong> Good balance for most purposes</li>
                  <li><strong>300 DPI:</strong> Professional print quality</li>
                  <li><strong>600 DPI:</strong> Ultra-high resolution for detailed work</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Why PNG Beats JPG for PDF Conversion
            </h3>
            <p className="text-gray-700 mb-6 text-sm">
              While JPG works great for photos, PNG is the clear winner for PDF extraction. PNG preserves every detail without compression artifacts, keeps transparent backgrounds intact, and handles text and graphics much better than JPG format.
            </p>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Use Cases</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Business Documents</strong>
                  <p>Extract charts, graphs, and diagrams from reports for presentations or web use.</p>
                </div>
                <div>
                  <strong>Creative Projects</strong>
                  <p>Get artwork, illustrations, and graphics from PDFs for editing or design work.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Common Questions About PDF to PNG Conversion
              </h2>
              <p className="text-lg text-gray-600">
                Get quick answers to help you convert PDFs like a pro
              </p>
            </div>
            
            <FAQ />
          </div>
        </div>
      </Layout>
    </>
  )
}