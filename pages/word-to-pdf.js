// pages/word-to-pdf.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import WordUploader from '../components/WordUploader'
import { 
  FileText, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Lock,
  Share2,
  Award,
  Clock,
  Printer,
  Download
} from 'lucide-react'

export default function WordToPdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.convertWordToPdfFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/word-to-pdf/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Word to PDF Converter - Convert DOC/DOCX to PDF Online",
    "description": "Convert Word documents to PDF online for free. Transform DOC and DOCX files to PDF format while preserving formatting. No software required.",
    "url": "https://yoursite.com/word-to-pdf",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert Word to PDF for free",
      "Support for DOC and DOCX formats",
      "Preserve document formatting",
      "High-quality PDF output",
      "Batch document processing",
      "Secure file conversion"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "11234"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Word Document - Word to PDF Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing Word Document</h2>
              <p className="text-gray-600 mb-4">Preparing conversion interface...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
                <div className="bg-indigo-600 h-2 rounded-full animate-pulse w-3/4"></div>
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
        <title>Free Word to PDF Converter Online - Convert DOC/DOCX to PDF | Preserve Formatting</title>
        <meta name="description" content="Convert Word documents to PDF online for free. Transform DOC and DOCX files to PDF format while preserving formatting, fonts, and layout. Fast and secure." />
        <meta name="keywords" content="Word to PDF converter, DOC to PDF, DOCX to PDF, convert Word document online free, Word PDF converter, document converter" />
        
        <meta property="og:title" content="Free Word to PDF Converter - Convert DOC/DOCX Online" />
        <meta property="og:description" content="Convert Word documents to PDF for free. Preserve formatting and create professional PDFs instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/word-to-pdf" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Word to PDF Converter - Professional PDF Creation" />
        <meta name="twitter:description" content="Convert Word to PDF online for free. Maintain formatting and create shareable PDFs." />
        
        <link rel="canonical" href="https://yoursite.com/word-to-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            {/* Main Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-xl mb-4">
                <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                <span className="text-indigo-600 font-semibold text-sm">Word to PDF Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Convert Word to PDF Online <span className="text-indigo-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Transform Word documents into professional PDF files. Perfect for sharing, printing, and preserving document formatting.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Lock className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Format Locked</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Easy Share</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Printer className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Print Ready</span>
                </div>
              </div>
            </div>

            {/* Word Document Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <WordUploader
                onFilesSelect={handleFilesSelect}
                toolName="word-to-pdf"
              />
            </div>

            {/* Selected Word Document Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready for PDF Conversion
                    </h3>
                    <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-blue-500 rounded p-2">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{selectedFiles[0].name}</p>
                      <p className="text-sm text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Word Document
                    </div>
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
                Professional Word to PDF Conversion
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Create high-quality PDF documents from Word files while maintaining perfect formatting and layout
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                <div className="bg-indigo-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Format Preservation</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Maintain exact formatting, fonts, images, and layout from your original Word document in the PDF output.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Universal Compatibility</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Create PDFs that open perfectly on any device or platform, ensuring your documents look the same everywhere.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Professional Quality</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Generate high-resolution PDFs suitable for professional printing, presentations, and official documentation.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your Word documents are processed securely and deleted immediately after conversion. Privacy guaranteed.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Instant Conversion</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert Word documents to PDF in seconds, even for large files with complex formatting and images.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Easy Download</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Download your converted PDF immediately or access it from any device. Perfect for sharing and archiving.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Convert Word Documents to PDF: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Conversion Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload Word file:</strong> Select your DOC or DOCX document by clicking "Choose Files" or drag and drop it.</li>
                  <li><strong>Choose settings:</strong> Select PDF quality, page size, and orientation preferences.</li>
                  <li><strong>Convert to PDF:</strong> Click "Convert to PDF" and wait for processing to complete.</li>
                  <li><strong>Download result:</strong> Download your professional PDF document ready for sharing.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Supported File Types</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>DOC:</strong> Legacy Microsoft Word format</li>
                  <li><strong>DOCX:</strong> Modern Word format (recommended)</li>
                  <li><strong>Complex documents:</strong> With images, tables, charts</li>
                  <li><strong>Multi-page documents:</strong> Reports, books, manuals</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Convert Word Documents to PDF?
            </h3>
            <p className="text-gray-700 mb-6">
              Converting Word documents to PDF ensures your content remains exactly as intended across all devices and platforms. PDFs preserve formatting, prevent unauthorized editing, and create a professional standard for document sharing.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Business Applications</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Share contracts and agreements</li>
                  <li>• Distribute reports and proposals</li>
                  <li>• Create official documentation</li>
                  <li>• Archive important records</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Personal Uses</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Submit job applications</li>
                  <li>• Share resumes and portfolios</li>
                  <li>• Preserve document formatting</li>
                  <li>• Create printable documents</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding Word to PDF Conversion Quality
            </h3>
            <p className="text-gray-700 mb-6">
              The conversion process analyzes your Word document's structure, formatting, and embedded elements to create a pixel-perfect PDF representation. This ensures consistency across different devices and prevents formatting issues.
            </p>

            <div className="bg-white rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Quality Factors</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Text Quality</strong>
                  <p>Fonts and formatting preserved exactly</p>
                </div>
                <div>
                  <strong>Image Quality</strong>
                  <p>Photos and graphics maintain resolution</p>
                </div>
                <div>
                  <strong>Layout Accuracy</strong>
                  <p>Spacing and positioning maintained</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Word to PDF Conversion FAQ
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will my Word document formatting be preserved in the PDF?
                </h3>
                <p className="text-gray-700">
                  Yes, our converter maintains fonts, spacing, images, tables, and all formatting elements from your original Word document in the resulting PDF.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I convert password-protected Word documents?
                </h3>
                <p className="text-gray-700">
                  Currently, password-protected Word documents cannot be converted. Please remove the password protection before uploading your document.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's the maximum file size for Word documents?
                </h3>
                <p className="text-gray-700">
                  You can convert Word documents up to 100MB in size. This accommodates most documents including those with many images or complex formatting.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Are both DOC and DOCX formats supported?
                </h3>
                <p className="text-gray-700">
                  Yes, we support both legacy DOC files and modern DOCX files. DOCX format generally provides better conversion results due to its advanced structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}