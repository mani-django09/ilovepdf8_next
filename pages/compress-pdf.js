// pages/compress-pdf.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { 
  Archive, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  FileText,
  TrendingDown,
  Award,
  Clock,
  HardDrive,
  Gauge,
  ChevronDown,
  Users,
  Star,
  Download
} from 'lucide-react'

export default function CompressPdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.compressPdfFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/compress-pdf/preview')
      }, 2000)
    }
  }

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PDF Compressor - Reduce PDF File Size Online",
    "description": "Compress PDF files online for free. Reduce PDF file size while maintaining quality. Fast, secure, and easy to use PDF compression tool.",
    "url": "https://ilovepdf8.net/compress-pdf",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Compress PDF files for free",
      "Reduce file size up to 90%",
      "Maintain document quality",
      "Multiple compression levels",
      "Batch PDF compression",
      "Secure file processing"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12543"
    }
  }

  const faqData = [
    {
      question: "How much can I reduce my PDF file size?",
      answer: "Most PDF files can be compressed by 60-90% of their original size without losing readability. The exact compression depends on your document's content - image-heavy PDFs typically compress more than text-only files. Our smart algorithms analyze your document and apply the most effective compression techniques."
    },
    {
      question: "Will PDF compression damage my document quality?",
      answer: "No, our advanced compression technology preserves document integrity. Text remains crystal clear, and images are optimized using lossless techniques where possible. We use intelligent algorithms that reduce file size while maintaining professional document quality that's suitable for business use."
    },
    {
      question: "What's the maximum PDF size I can compress?",
      answer: "You can compress PDF files up to 100MB through our web interface. For enterprise users dealing with larger documents, we recommend breaking oversized files into chapters or sections before compression. This also improves processing speed and download reliability."
    },
    {
      question: "How secure is my PDF during the compression process?",
      answer: "Your document security is our top priority. All files are processed using encrypted connections (SSL), stored temporarily in secure servers, and automatically deleted within 2 hours. We never access, read, or store your document content permanently."
    },
    {
      question: "Can I compress password-protected PDFs?",
      answer: "Yes, but you'll need to provide the password during upload so our system can process the file. The compressed output will maintain the same password protection as your original document. We recommend using this feature only on trusted networks."
    },
    {
      question: "Which compression level should I choose?",
      answer: "For email attachments, use Medium compression (good balance). For web uploads where speed matters, choose High compression. For archival documents where quality is critical, select Low compression. You can always try different levels to find your perfect balance."
    }
  ]

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Analyzing PDF - PDF Compressor</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Archive className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Analyzing Your PDF</h2>
              <p className="text-gray-600 mb-4">Preparing compression settings...</p>
              <div className="bg-gray-200 rounded-full h-2 w-48 mx-auto">
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
        <title>Free PDF Compressor Online - Reduce PDF File Size | Fast & Secure</title>
        <meta name="description" content="Compress PDF files online for free. Reduce file size up to 90% while maintaining quality. No software download required. Fast, secure PDF compression tool." />
        <meta name="keywords" content="PDF compressor, compress PDF online free, reduce PDF file size, PDF size reducer, optimize PDF, shrink PDF file" />
        
        <meta property="og:title" content="Free PDF Compressor - Reduce PDF File Size Online" />
        <meta property="og:description" content="Compress PDF files for free. Reduce file size while maintaining quality. Fast and secure online PDF compression." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ilovepdf8.net/compress-pdf" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF Compressor - Reduce File Size Online" />
        <meta name="twitter:description" content="Compress PDF files online for free. Reduce size while maintaining quality." />
        
        <link rel="canonical" href="https://ilovepdf8.net/compress-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4">
            {/* Compact Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-100 rounded-full mb-3">
                <Archive className="w-4 h-4 text-blue-600 mr-1.5" />
                <span className="text-blue-600 font-medium text-sm">PDF Compressor</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Compress PDF Files Online <span className="text-blue-600">Free</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Reduce PDF file size by up to 90% while preserving quality. Perfect for emails, uploads, and storage.
              </p>
              
              {/* Ultra Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <TrendingDown className="w-3 h-3 text-blue-600 mr-1" />
                  90% Smaller
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Shield className="w-3 h-3 text-green-600 mr-1" />
                  Secure
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Zap className="w-3 h-3 text-yellow-600 mr-1" />
                  Instant
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Users className="w-3 h-3 text-purple-600 mr-1" />
                  2M+ Users
                </span>
              </div>
            </div>

            {/* Compact PDF Uploader */}
            <div className="max-w-2xl mx-auto">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="compress-pdf"
              />
            </div>

            {/* Compact Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 rounded p-1.5">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
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
                Why Choose Our PDF Compressor?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional-grade compression technology trusted by businesses worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <TrendingDown className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Massive Size Reduction</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Our algorithms compress files by 60-90% while maintaining document integrity and readability.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="bg-green-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Quality Guaranteed</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Text stays crisp, images remain clear. Professional results every time.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Gauge className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Smart Compression</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Choose from multiple compression levels based on your specific needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Bank-Level Security</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  SSL encryption, auto-deletion, and zero data retention policy.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Lightning Speed</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Process large PDFs in seconds with our optimized servers.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-2 w-8 h-8 mb-3">
                  <Download className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">Instant Download</h3>
                <p className="text-gray-600 text-xs leading-relaxed">
                  Get your compressed PDF immediately. No registration required.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact SEO Content Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  How PDF Compression Works
                </h2>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  PDF compression reduces file size by optimizing the document's internal structure. Our technology analyzes your PDF and applies the most effective compression techniques without sacrificing readability or professional appearance.
                </p>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Compression Process:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600">
                    <li>Upload your PDF file securely</li>
                    <li>Choose compression level</li>
                    <li>Advanced algorithms optimize content</li>
                    <li>Download compressed file instantly</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  When to Compress PDFs
                </h3>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                  Large PDF files create obstacles in today's digital workflow. Email services impose attachment limits, web forms have upload restrictions, and storage costs add up quickly.
                </p>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Perfect for:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Email attachments (overcome size limits)</li>
                    <li>• Web uploads and online forms</li>
                    <li>• Cloud storage optimization</li>
                    <li>• Mobile device storage</li>
                    <li>• Faster file transfers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Professional PDF Compression Tips
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">For Email</h4>
                  <p className="text-gray-600 text-xs">Use medium compression to stay under 25MB limits while maintaining readability.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">For Archiving</h4>
                  <p className="text-gray-600 text-xs">Choose low compression to preserve maximum quality for long-term storage.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">For Web</h4>
                  <p className="text-gray-600 text-xs">High compression works best for faster loading and better user experience.</p>
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
                Everything you need to know about PDF compression
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
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
                <span className="text-sm font-medium text-gray-700">4.8/5 from 12,543 users</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}