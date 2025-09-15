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
  Infinity
} from 'lucide-react'

export default function MergePdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
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

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PDF Merger Tool - Combine Multiple PDFs Online",
    "description": "Merge PDF files online for free. Combine multiple PDF documents into one file quickly and securely. No software download required.",
    "url": "https://yoursite.com/merge-pdf",
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
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Merge className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Your PDFs</h2>
              <p className="text-gray-600 mb-4">Preparing merge preview interface...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
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
        <title>Free PDF Merger Online - Combine Multiple PDF Files Into One | No Download Required</title>
        <meta name="description" content="Merge PDF files online for free. Combine multiple PDF documents into one professional file instantly. No software download, no registration. Secure 256-bit SSL encryption. Works on all devices." />
        <meta name="keywords" content="merge PDF online free, combine PDF files, PDF merger tool, join PDF documents, concatenate PDFs, merge multiple PDFs, PDF combiner online, free PDF tools, combine PDF pages, merge PDF documents online" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Free PDF Merger - Combine Multiple PDF Files Online" />
        <meta property="og:description" content="Professional PDF merger tool. Combine unlimited PDF files for free with bank-level security. No software needed." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/merge-pdf" />
        <meta property="og:image" content="https://yoursite.com/images/pdf-merger-tool.jpg" />
        
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
        
        <link rel="canonical" href="https://yoursite.com/merge-pdf" />
        <link rel="alternate" hreflang="en" href="https://yoursite.com/merge-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            {/* Main Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-xl mb-4">
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Merge PDF Files Online <span className="text-blue-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Combine multiple PDF documents into one professional file. Fast, secure, and completely free with no registration required.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">100% Free</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Instant</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Globe className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Any Device</span>
                </div>
              </div>
            </div>

            {/* Enhanced File Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={true}
                toolName="merge-pdf"
              />
            </div>

            {/* Compact Selected Files Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready to Merge ({selectedFiles.length} files)
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="grid gap-2 max-h-32 overflow-y-auto">
                    {selectedFiles.slice(0, 3).map((file, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <div className="bg-red-500 rounded p-1">
                          <FileText className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                    {selectedFiles.length > 3 && (
                      <div className="text-center text-gray-500 text-sm py-1">
                        +{selectedFiles.length - 3} more files
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our PDF Merger Tool?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional-grade PDF combining with enterprise security standards, completely free for unlimited use
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Bank-Level Security</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your PDF files are protected with 256-bit SSL encryption during upload and processing. All files are automatically deleted within 24 hours.
                </p>
                <div className="flex items-center text-xs text-green-600">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>SSL Encrypted Processing</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Lightning Fast Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Advanced algorithms merge large PDF files in seconds. Process up to 100 files simultaneously while maintaining original quality.
                </p>
                <div className="flex items-center text-xs text-blue-600">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>Average 5-10 seconds</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Universal Device Support</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Works flawlessly on Windows, Mac, iOS, Android, and Linux. No software installation or browser plugins required.
                </p>
                <div className="flex items-center space-x-2 text-xs text-purple-600">
                  <Monitor className="w-3 h-3" />
                  <Smartphone className="w-3 h-3" />
                  <span>All Platforms</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Premium Quality Output</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Preserve original fonts, images, formatting, and metadata. Professional results suitable for business and legal documents.
                </p>
                <div className="flex items-center text-xs text-orange-600">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Lossless Quality</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Infinity className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">No Limits or Restrictions</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Merge unlimited PDF files with no size restrictions. No daily limits, no premium accounts, no hidden fees ever.
                </p>
                <div className="flex items-center text-xs text-teal-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>100% Free Forever</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Trusted by Millions</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Over 2 million users worldwide trust our PDF tools. Join businesses, students, and professionals who rely on our service daily.
                </p>
                <div className="flex items-center text-xs text-pink-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  <span>4.9/5 User Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How to Merge PDF Files Online: Complete Guide
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Step-by-Step Instructions</h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-700">
                    <li><strong>Upload your PDF files:</strong> Click "Choose Files" or drag and drop multiple PDF documents into the upload area.</li>
                    <li><strong>Arrange the order:</strong> Reorder files by dragging them up or down in the preview screen to set your preferred sequence.</li>
                    <li><strong>Merge and download:</strong> Click the "Merge PDFs" button and download your combined document instantly.</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Pro Tips for Best Results</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-700">
                    <li>Ensure all PDF files are not password-protected before uploading</li>
                    <li>Check file names to maintain logical document order</li>
                    <li>Use consistent page orientations for professional appearance</li>
                    <li>Preview merged document before sharing with colleagues</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Common Use Cases for PDF Merging
              </h3>
              <p className="text-gray-700 mb-6">
                Our free PDF merger tool serves various professional and personal needs. Whether you're consolidating business reports, combining academic papers, merging contract documents, or organizing personal files, this tool handles all scenarios efficiently.
              </p>

              <div className="bg-white rounded-xl p-6 mb-8 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Applications</h4>
                <p className="text-gray-700 mb-3">
                  Combine quarterly reports, merge presentation slides with supporting documents, consolidate invoices and receipts, or create comprehensive proposal packages. Perfect for creating professional document packages for clients, investors, or internal teams.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 mb-8 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Academic and Research</h4>
                <p className="text-gray-700 mb-3">
                  Merge research papers with appendices, combine chapter drafts into complete manuscripts, consolidate reference materials, or create comprehensive study guides. Ideal for students, researchers, and educators managing large document collections.
                </p>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Why Choose Online PDF Merging Over Desktop Software?
              </h3>
              <p className="text-gray-700 mb-6">
                Online PDF merging offers significant advantages over traditional desktop software. No installation requirements mean you can access the tool from any device, anywhere. Automatic updates ensure you always have the latest features without manual software maintenance.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
                  <p className="text-sm text-gray-700">Work from any device with internet access. No software licenses or compatibility issues.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost Effective</h4>
                  <p className="text-sm text-gray-700">Completely free with no subscription fees, licensing costs, or hidden charges.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-semibold text-gray-900 mb-2">Always Updated</h4>
                  <p className="text-sm text-gray-700">Latest features and security updates automatically available without manual installation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions About PDF Merging
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is it safe to merge PDF files online?
                </h3>
                <p className="text-gray-700">
                  Yes, our PDF merger uses bank-level 256-bit SSL encryption to protect your files during upload and processing. All files are automatically deleted from our servers within 24 hours, and we never store, share, or access your documents.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How many PDF files can I merge at once?
                </h3>
                <p className="text-gray-700">
                  There's no limit on the number of PDF files you can merge. Our system efficiently handles everything from 2 files to over 100 documents simultaneously, with each file supporting up to 100MB in size.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will the quality of my PDFs be affected after merging?
                </h3>
                <p className="text-gray-700">
                  No, our advanced merging algorithm preserves the original quality, formatting, fonts, images, and metadata of your PDF files. The merged document maintains the same visual fidelity as your source files.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do I need to register or pay to use this PDF merger?
                </h3>
                <p className="text-gray-700">
                  No registration or payment required. Our PDF merger is completely free with no hidden costs, subscription fees, or premium accounts. All features are available to everyone at no charge.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I merge password-protected PDF files?
                </h3>
                <p className="text-gray-700">
                  Currently, password-protected PDFs cannot be merged directly. You'll need to remove password protection from your PDFs before uploading them for merging. This ensures the security and integrity of the merging process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}