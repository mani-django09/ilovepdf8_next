// pages/pdf-to-word.js
import { useState } from 'react'
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
  CheckCircle,
  Edit3,
  Copy,
  Award,
  Clock,
  Layers,
  Type
} from 'lucide-react'

export default function PdfToWord() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleFilesSelect = (files) => {
    setSelectedFiles(files)
    
    if (typeof window !== 'undefined') {
      window.convertPdfToWordFiles = files
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/pdf-to-word/preview')
      }, 2000)
    }
  }

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free PDF to Word Converter - Convert PDF to Editable Word Documents",
    "description": "Convert PDF files to editable Word documents online for free. Extract text and formatting from PDF to DOC/DOCX format. No software required.",
    "url": "https://yoursite.com/pdf-to-word",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "browserRequirements": "HTML5",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PDF to Word for free",
      "Extract editable text from PDF",
      "Preserve document formatting",
      "Support for DOC and DOCX formats",
      "OCR text recognition",
      "Batch PDF processing"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "8432"
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing PDF - PDF to Word Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analyzing PDF Document</h2>
              <p className="text-gray-600 mb-4">Preparing conversion interface...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
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
        <title>Free PDF to Word Converter Online - Convert PDF to Editable DOC/DOCX | No Software Required</title>
        <meta name="description" content="Convert PDF files to editable Word documents online for free. Extract text and preserve formatting from PDF to DOC/DOCX. Fast, secure, and easy to use." />
        <meta name="keywords" content="PDF to Word converter, PDF to DOC converter, PDF to DOCX, convert PDF to Word online free, PDF text extraction, editable Word document" />
        
        <meta property="og:title" content="Free PDF to Word Converter - Convert PDF to Editable Documents" />
        <meta property="og:description" content="Convert PDF files to editable Word documents for free. Extract text and formatting instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/pdf-to-word" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free PDF to Word Converter - Extract Editable Text from PDF" />
        <meta name="twitter:description" content="Convert PDF to Word online for free. Make PDFs editable in Microsoft Word." />
        
        <link rel="canonical" href="https://yoursite.com/pdf-to-word" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            {/* Main Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-xl mb-4">
                <FileText className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold text-sm">PDF to Word Converter</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Convert PDF to Word Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                Transform PDF documents into editable Word files. Perfect for editing content, extracting text, and reusing document layouts.
              </p>
              
              {/* Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Edit3 className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Fully Editable</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Secure</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Preserve Layout</span>
                </div>
                <div className="flex items-center space-x-1 bg-white rounded-full px-4 py-2 shadow-sm">
                  <Type className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-gray-700">Extract Text</span>
                </div>
              </div>
            </div>

            {/* PDF Uploader */}
            <div className="max-w-3xl mx-auto mb-8">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="pdf-to-word"
              />
            </div>

            {/* Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">
                      Ready for Conversion
                    </h3>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
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
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
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
                Advanced PDF to Word Conversion
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Intelligent conversion technology that preserves formatting and extracts editable content from PDF documents
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Edit3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Fully Editable Output</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Extract text, paragraphs, and formatting that you can edit directly in Microsoft Word or any word processor.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Layout Preservation</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Maintain original document structure, headings, lists, and paragraph formatting as much as possible.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Text Extraction</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Advanced OCR technology extracts text from both searchable PDFs and scanned documents.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your PDFs are processed securely and deleted immediately after conversion. Complete privacy guaranteed.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Fast Conversion</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Convert PDF documents to Word format in seconds, even for multi-page documents with complex layouts.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Multiple Formats</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Export to DOC or DOCX format compatible with Microsoft Word, Google Docs, and other word processors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              How to Convert PDF to Word Documents: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Conversion Process</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li><strong>Upload PDF:</strong> Select your PDF document by clicking "Choose Files" or drag and drop it into the upload area.</li>
                  <li><strong>Choose options:</strong> Select output format (DOC/DOCX) and conversion preferences.</li>
                  <li><strong>Convert document:</strong> Click "Convert to Word" and wait for processing to complete.</li>
                  <li><strong>Download result:</strong> Download your editable Word document ready for editing.</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Output Format Options</h3>
                <ul className="list-disc list-inside space-y-3 text-gray-700">
                  <li><strong>DOCX:</strong> Modern Word format, best compatibility</li>
                  <li><strong>DOC:</strong> Legacy format for older Word versions</li>
                  <li><strong>Layout mode:</strong> Preserve original formatting</li>
                  <li><strong>Text mode:</strong> Extract plain text for editing</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Why Convert PDF to Word Format?
            </h3>
            <p className="text-gray-700 mb-6">
              Converting PDF documents to Word format enables editing, reusing content, and reformatting text that would otherwise be locked in the PDF structure. This is essential for collaborative work, content adaptation, and document updates.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Use Cases</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Edit contracts and legal documents</li>
                  <li>• Reuse content from reports and proposals</li>
                  <li>• Update company policies and procedures</li>
                  <li>• Extract text for translation projects</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl p-6 border">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Academic Applications</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Edit research papers and theses</li>
                  <li>• Extract citations and references</li>
                  <li>• Reformat academic documents</li>
                  <li>• Collaborate on shared documents</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Understanding PDF to Word Conversion Technology
            </h3>
            <p className="text-gray-700 mb-6">
              PDF to Word conversion involves complex text recognition and layout analysis. The process extracts text, identifies formatting patterns, and reconstructs the document structure in an editable format while preserving as much of the original appearance as possible.
            </p>

            <div className="bg-white rounded-xl p-6 border">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Conversion Quality Factors</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Text-based PDFs</strong>
                  <p>Highest quality conversion with preserved formatting</p>
                </div>
                <div>
                  <strong>Scanned Documents</strong>
                  <p>OCR technology extracts text from images</p>
                </div>
                <div>
                  <strong>Complex Layouts</strong>
                  <p>May require manual formatting adjustments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              PDF to Word Conversion FAQ
            </h2>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Will the Word document look exactly like the original PDF?
                </h3>
                <p className="text-gray-700">
                  While we preserve formatting as much as possible, some adjustments may be needed. Text-based PDFs convert better than scanned documents or complex layouts with graphics.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can you convert password-protected PDFs?
                </h3>
                <p className="text-gray-700">
                  Currently, password-protected PDFs cannot be converted. You'll need to remove the password protection from your PDF before uploading it for conversion.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What's the maximum file size for conversion?
                </h3>
                <p className="text-gray-700">
                  You can convert PDF files up to 100MB in size. For larger files, consider splitting them into smaller documents before conversion.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Does the converter work with scanned PDFs?
                </h3>
                <p className="text-gray-700">
                  Yes, our OCR technology can extract text from scanned documents and images within PDFs, though formatting may be more basic than text-based PDFs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}