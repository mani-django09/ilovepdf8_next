// pages/merge-pdf.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { 
  FileText, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  Clock, 
  Star,
  CheckCircle,
  Upload,
  Merge,
  Download,
  Lock,
  Smartphone,
  Monitor,
  Award,
  Infinity,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react'

export default function MergePdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.mergeFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/merge-pdf/preview')
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
    "name": "Free PDF Merger Tool - Combine Multiple PDFs Online",
    "description": "Merge PDF files online for free. Combine multiple PDF documents into one file quickly and securely. No software download required.",
    "url": "https://ilovepdf8.net/merge-pdf",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Merge unlimited PDF files for free",
      "Maintain original document quality",
      "No file size restrictions",
      "Bank-level security encryption",
      "Works on all devices and browsers",
      "No registration required",
      "Instant processing"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "15847"
    }
  }

  const faqData = [
    {
      question: "Is my data secure when merging PDFs online?",
      answer: "Absolutely. We implement military-grade 256-bit SSL encryption for all file transfers. Your PDFs are processed on secure servers and automatically purged within one hour. We never access, store, or share your documents with third parties."
    },
    {
      question: "How many PDFs can I combine in one go?",
      answer: "Our system handles unlimited PDF files without restrictions. Whether you're merging 2 documents or 200, the process remains fast and efficient. Each individual file can be up to 100MB, with no total size limit for your merged output."
    },
    {
      question: "Will merging affect my document quality?",
      answer: "Never. Our advanced processing engine maintains 100% original quality. All fonts, images, vector graphics, and formatting remain pixel-perfect. We preserve metadata, bookmarks, and document properties from your source files."
    },
    {
      question: "Do I need to create an account or pay fees?",
      answer: "No account required, no hidden costs. This tool is genuinely free forever. We don't limit usage, add watermarks, or require subscriptions. Professional results without the professional price tag."
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer: "Currently, encrypted PDFs need password removal before merging. This security measure ensures we can't accidentally bypass document protection. Use your PDF reader to remove passwords, then merge freely."
    },
    {
      question: "Which devices and browsers work with this tool?",
      answer: "Every modern device works perfectly - Windows PCs, Macs, iPads, Android tablets, and smartphones. Chrome, Safari, Firefox, Edge, and other browsers all supported. No downloads or plugins required."
    }
  ]

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Preparing PDF Merge Preview - Processing Your Files</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Merge className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Processing Your PDFs</h2>
              <p className="text-gray-600 text-sm">Setting up merge preview...</p>
            </div>
          </div>
        </Layout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Free PDF Merger Online - Combine Multiple PDF Files Into One | No Download Required</title>
        <meta name="description" content="Merge PDF files online for free. Combine multiple PDF documents into one professional file instantly. No software download, no registration. Secure 256-bit SSL encryption. Works on all devices." />
        <meta name="keywords" content="merge PDF online free, combine PDF files, PDF merger tool, join PDF documents, concatenate PDFs, merge multiple PDFs, PDF combiner online, free PDF tools, combine PDF pages, merge PDF documents online" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Free PDF Merger - Combine Multiple PDF Files Online" />
        <meta property="og:description" content="Professional PDF merger tool. Combine unlimited PDF files for free with bank-level security. No software needed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ilovepdf8.net/merge-pdf" />
        <meta property="og:image" content="https://ilovepdf8.net/images/pdf-merger-tool.jpg" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF Merger - Combine Multiple PDF Files" />
        <meta name="twitter:description" content="Merge PDF files online for free. Secure, fast, and works on any device." />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta name="author" content="PDF Tools Online" />
        <meta name="publisher" content="PDF Tools Online" />
        <meta name="copyright" content="PDF Tools Online" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        <link rel="canonical" href="https://ilovepdf8.net/merge-pdf" />
        <link rel="alternate" hreflang="en" href="https://ilovepdf8.net/merge-pdf" />
        
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
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                Merge PDF Files <span className="text-blue-600">Instantly</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4">
                Combine multiple PDFs into one document. Secure, fast, and completely free.
              </p>
              
              {/* Ultra Compact Trust Badges */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                  <span className="font-medium text-gray-700">Free</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Shield className="w-3 h-3 text-blue-600" />
                  <span className="font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Zap className="w-3 h-3 text-yellow-600" />
                  <span className="font-medium text-gray-700">Fast</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-3 py-1 shadow-sm text-xs">
                  <Globe className="w-3 h-3 text-purple-600" />
                  <span className="font-medium text-gray-700">Any Device</span>
                </div>
              </div>
            </div>

            {/* Compact File Uploader */}
            <div className="max-w-2xl mx-auto mb-6">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={true}
                toolName="merge-pdf"
              />
            </div>

            {/* Minimal Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {selectedFiles.length} files ready to merge
                    </h3>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="space-y-1 max-h-24 overflow-y-auto">
                    {selectedFiles.slice(0, 3).map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded text-xs">
                        <div className="bg-red-500 rounded p-1">
                          <FileText className="w-2 h-2 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{file.name}</p>
                        </div>
                        <div className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                    {selectedFiles.length > 3 && (
                      <div className="text-center text-gray-500 text-xs py-1">
                        +{selectedFiles.length - 3} more files
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Features Grid */}
        <div className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Professional PDF Merging Made Simple
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Enterprise-grade security meets user-friendly design for the perfect PDF combining experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center mb-3">
                  <div className="bg-green-500 rounded-lg p-2 mr-3">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Military-Grade Security</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  256-bit SSL encryption protects your files during processing. Automatic deletion within 60 minutes ensures complete privacy.
                </p>
                <div className="flex items-center text-xs text-green-600">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>Zero Data Retention</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-500 rounded-lg p-2 mr-3">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Lightning Processing</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Advanced algorithms merge hundreds of PDFs in seconds while preserving every detail of your original documents.
                </p>
                <div className="flex items-center text-xs text-blue-600">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Under 10 Seconds Average</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="bg-purple-500 rounded-lg p-2 mr-3">
                    <Globe className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Universal Access</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Works seamlessly across all platforms and devices. No downloads, installations, or compatibility headaches.
                </p>
                <div className="flex items-center space-x-1 text-xs text-purple-600">
                  <Monitor className="w-3 h-3" />
                  <Smartphone className="w-3 h-3" />
                  <span>Any Device</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center mb-3">
                  <div className="bg-orange-500 rounded-lg p-2 mr-3">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Perfect Quality</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Maintain original formatting, fonts, and image quality. Professional results suitable for any business application.
                </p>
                <div className="flex items-center text-xs text-orange-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Lossless Merging</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4 border border-teal-100">
                <div className="flex items-center mb-3">
                  <div className="bg-teal-500 rounded-lg p-2 mr-3">
                    <Infinity className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">No Restrictions</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Merge unlimited files with no size caps or daily limits. Complete freedom without hidden costs or premium upgrades.
                </p>
                <div className="flex items-center text-xs text-teal-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>Always Free</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 border border-pink-100">
                <div className="flex items-center mb-3">
                  <div className="bg-pink-500 rounded-lg p-2 mr-3">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900">Proven Reliability</h3>
                </div>
                <p className="text-gray-600 text-sm mb-2">
                  Trusted by over 3 million professionals worldwide. Join enterprises and individuals who rely on our service daily.
                </p>
                <div className="flex items-center text-xs text-pink-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>4.9★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact How-To Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Three Simple Steps to Perfect PDF Merging
              </h2>
              <p className="text-gray-600">
                Professional document combining has never been this straightforward
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Upload PDFs</h3>
                <p className="text-gray-600 text-sm">
                  Drag and drop multiple PDF files or click to browse. Support for unlimited files up to 100MB each.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Merge className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Arrange & Merge</h3>
                <p className="text-gray-600 text-sm">
                  Reorder files by dragging in preview mode. Click merge to combine documents while preserving quality.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Download Result</h3>
                <p className="text-gray-600 text-sm">
                  Instantly download your professionally merged PDF. Original files automatically deleted for security.
                </p>
              </div>
            </div>

            {/* Compact Use Cases */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-5 border">
                <h4 className="font-semibold text-gray-900 mb-3">Business Applications</h4>
                <p className="text-gray-700 text-sm">
                  Combine quarterly reports with financial statements, merge presentation slides with supporting documentation, consolidate contracts with amendments, or create comprehensive proposal packages. Perfect for client deliverables, investor presentations, and internal documentation workflows.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border">
                <h4 className="font-semibold text-gray-900 mb-3">Academic & Personal</h4>
                <p className="text-gray-700 text-sm">
                  Merge thesis chapters with appendices, combine research papers with reference materials, consolidate tax documents with supporting receipts, or organize family documents into single files. Ideal for students, researchers, and anyone managing multiple related documents.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Everything You Need to Know
              </h2>
              <p className="text-gray-600">
                Get answers to common questions about our PDF merging service
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-6 pb-4 bg-gray-50">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Additional Help */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm text-blue-800">
                  Still have questions? Our support team responds within 24 hours.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Merge Your PDFs?
            </h2>
            <p className="text-gray-600 mb-6">
              Join millions of satisfied users who trust our secure, fast, and reliable PDF merging service
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">No Registration Required</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <Shield className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-gray-700">Files Deleted After 1 Hour</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
                <Star className="w-4 h-4 text-yellow-600 mr-2 fill-current" />
                <span className="text-sm font-medium text-gray-700">100% Free Forever</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}