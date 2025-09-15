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
  Gauge
} from 'lucide-react'

export default function CompressPdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
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

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PDF Compressor - Reduce PDF File Size Online",
    "description": "Compress PDF files online for free. Reduce PDF file size while maintaining quality. Fast, secure, and easy to use PDF compression tool.",
    "url": "https://yoursite.com/compress-pdf",
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
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Archive className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing PDF Document</h2>
              <p className="text-gray-600 mb-4">Preparing compression interface...</p>
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
        <title>Free PDF Compressor Online - Reduce PDF File Size | Fast & Secure</title>
        <meta name="description" content="Compress PDF files online for free. Reduce file size up to 90% while maintaining quality. No software download required. Fast, secure PDF compression tool." />
        <meta name="keywords" content="PDF compressor, compress PDF online free, reduce PDF file size, PDF size reducer, optimize PDF, shrink PDF file" />
        
        <meta property="og:title" content="Free PDF Compressor - Reduce PDF File Size Online" />
        <meta property="og:description" content="Compress PDF files for free. Reduce file size while maintaining quality. Fast and secure online PDF compression." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/compress-pdf" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF Compressor - Reduce File Size Online" />
        <meta name="twitter:description" content="Compress PDF files online for free. Reduce size while maintaining quality." />
        
        <link rel="canonical" href="https://yoursite.com/compress-pdf" />
        
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
                <Archive className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-blue-600 font-semibold text-sm">PDF Compression Tool</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Compress PDF Files Online <span className="text-blue-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Reduce PDF file size while maintaining quality. Perfect for email attachments, web uploads, and storage optimization.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <TrendingDown className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Up to 90% Smaller</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-700">Fast Process</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Quality Preserved</span>
                </div>
              </div>
            </div>

            {/* PDF Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="compress-pdf"
              />
            </div>

            {/* Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready for Compression
                    </h3>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="bg-red-500 rounded p-2">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{selectedFiles[0].name}</p>
                      <p className="text-sm text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      PDF Document
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
                Smart PDF Compression Technology
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Advanced compression algorithms to reduce file size while preserving document quality and readability
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Significant Size Reduction</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Reduce PDF file size by up to 90% without compromising readability. Perfect for email and web sharing.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Quality Preservation</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Maintain text clarity and image quality with intelligent compression algorithms optimized for document content.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Gauge className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Multiple Compression Levels</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose from low, medium, or high compression based on your quality vs size requirements.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your PDFs are processed securely and deleted immediately after compression. Complete privacy guaranteed.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Compress large PDF files in seconds. No waiting around for lengthy processing times.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <HardDrive className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Storage Optimization</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Save valuable storage space on your devices and cloud services with optimized file sizes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Compress PDF Files Online: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Compression Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload PDF:</strong> Select your PDF document by clicking "Choose Files" or drag and drop it into the upload area.</li>
                  <li><strong>Choose compression:</strong> Select compression level and quality settings for optimal results.</li>
                  <li><strong>Compress file:</strong> Click "Compress PDF" and wait for processing to complete.</li>
                  <li><strong>Download result:</strong> Download your compressed PDF with significantly reduced file size.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Compression Levels Guide</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>Low:</strong> Minimal compression, maintains highest quality</li>
                  <li><strong>Medium:</strong> Balanced compression for most use cases</li>
                  <li><strong>High:</strong> Maximum compression for smallest file size</li>
                  <li><strong>Custom:</strong> Fine-tune settings for specific requirements</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              When to Compress PDF Documents
            </h3>
            <p className="text-gray-700 mb-6">
              PDF compression is essential when file size becomes a barrier to sharing, storing, or uploading documents. Large PDFs can slow down email delivery, exceed attachment limits, and consume unnecessary storage space.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Ideal Scenarios for Compression</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Email attachments with size limits</li>
                  <li>• Web uploads and form submissions</li>
                  <li>• Cloud storage optimization</li>
                  <li>• Mobile device storage</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Benefits of Compression</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Faster upload and download times</li>
                  <li>• Reduced bandwidth usage</li>
                  <li>• Better user experience</li>
                  <li>• Lower storage costs</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding PDF Compression Technology
            </h3>
            <p className="text-gray-700 mb-6">
              PDF compression works by optimizing various elements within the document structure. This includes removing redundant data, optimizing images, and streamlining the document's internal organization without affecting the visual appearance or functionality.
            </p>

            <div className="bg-white rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Compression Techniques</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Image Optimization</strong>
                  <p>Reduce image file sizes while maintaining visual quality</p>
                </div>
                <div>
                  <strong>Data Optimization</strong>
                  <p>Remove redundant and unnecessary metadata</p>
                </div>
                <div>
                  <strong>Structure Optimization</strong>
                  <p>Streamline PDF internal structure and organization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              PDF Compression FAQ
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How much can I reduce my PDF file size?
                </h3>
                <p className="text-gray-700">
                  Compression results vary depending on the content, but typically you can expect 30-90% size reduction. PDFs with many images tend to compress more than text-only documents.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will compression affect the quality of my PDF?
                </h3>
                <p className="text-gray-700">
                  Our compression algorithm is designed to maintain visual quality while reducing file size. Text remains crisp, and images are optimized without noticeable quality loss.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's the maximum file size I can compress?
                </h3>
                <p className="text-gray-700">
                  You can compress PDF files up to 100MB in size. For larger files, consider splitting them into smaller documents before compression.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Is my PDF secure during compression?
                </h3>
                <p className="text-gray-700">
                  Yes, your files are processed securely and deleted immediately after compression. We don't store or access your document content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}