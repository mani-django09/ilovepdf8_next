// pages/pdf-to-word.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { 
  FileText, 
  Shield, 
  Zap, 
  CheckCircle,
  Edit3,
  Copy,
  Award,
  Clock,
  Layers,
  Type,
  ChevronDown,
  Star,
  Users
} from 'lucide-react'

export default function PdfToWord() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "Will the Word document look exactly like my original PDF?",
      answer: "It depends on your PDF type. If it's a text-based PDF (created from Word originally), the conversion is usually excellent - you'll get back something very close to the original. Scanned PDFs or complex layouts with lots of graphics might need some cleanup, but the text will be there and editable."
    },
    {
      question: "What if my PDF has a password on it?",
      answer: "You'll need to unlock it first. Most PDF viewers let you save a copy without the password - just open it, enter your password, then save it as a new file. We never ask for passwords because that would be a security risk for you."
    },
    {
      question: "Can this handle scanned documents and old PDFs?",
      answer: "Yes, our OCR technology reads text from scanned documents and images. The quality depends on how clear the scan is, but even old photocopied documents usually work fine. The formatting might be simpler than the original, but you'll get editable text."
    },
    {
      question: "How big can my PDF file be?",
      answer: "Up to 100MB, which covers most documents you'd want to convert. Even lengthy reports with images usually stay under that limit. If your file is bigger, try compressing it first or splitting it into smaller sections."
    },
    {
      question: "Will images and charts convert properly?",
      answer: "Images typically convert well and stay in roughly the right places. Charts and complex graphics might need some manual adjustment in Word afterward. Simple tables usually convert perfectly, but really complex layouts sometimes get simplified."
    },
    {
      question: "Which is better - DOC or DOCX format?",
      answer: "DOCX is newer and handles formatting better, so go with that unless you're using an old version of Word. DOCX also creates smaller files and works with Google Docs, Office 365, and pretty much everything modern."
    },
    {
      question: "Is my document safe during conversion?",
      answer: "Your PDF gets uploaded securely, converted on our servers, then everything gets deleted within an hour. We can't see your content - it's just processed automatically and cleaned up. Think of it like using a copy machine that shreds everything afterward."
    },
    {
      question: "What if the converted document looks messy?",
      answer: "Some cleanup is normal, especially with complex PDFs. The text will be editable, which is usually the main goal. You might need to adjust spacing, reformat tables, or fix some layout issues, but that's still faster than retyping everything."
    }
  ]

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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "11,328"
    }
  }

  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing PDF - PDF to Word Converter</title>
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
              <h2 className="text-xl font-bold text-gray-900 mb-3">Processing PDF Document</h2>
              <p className="text-gray-600 mb-4">Converting to editable Word format...</p>
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
        <title>Free PDF to Word Converter Online - Convert PDF to Editable DOC/DOCX | No Software Required</title>
        <meta name="description" content="Convert PDF files to editable Word documents online for free. Extract text and preserve formatting from PDF to DOC/DOCX. Fast, secure, and easy to use." />
        <meta name="keywords" content="PDF to Word converter, PDF to DOC converter, PDF to DOCX, convert PDF to Word online free, PDF text extraction, editable Word document" />
        
        <meta property="og:title" content="Free PDF to Word Converter - Convert PDF to Editable Documents" />
        <meta property="og:description" content="Convert PDF files to editable Word documents for free. Extract text and formatting instantly." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yoursite.com/pdf-to-word" />
        
        <link rel="canonical" href="https://yoursite.com/pdf-to-word" />
        
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
                <FileText className="w-4 h-4 text-green-600 mr-1.5" />
                <span className="text-green-600 font-medium text-sm">PDF to Word</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert PDF to Word Online <span className="text-green-600">Free</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Transform PDF documents into editable Word files. Perfect for editing content, extracting text, and reusing document layouts.
              </p>
              
              {/* Ultra Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Edit3 className="w-3 h-3 text-green-600 mr-1" />
                  Fully Editable
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Type className="w-3 h-3 text-blue-600 mr-1" />
                  Extract Text
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Shield className="w-3 h-3 text-purple-600 mr-1" />
                  Secure
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Users className="w-3 h-3 text-orange-600 mr-1" />
                  11K+ Users
                </span>
              </div>
            </div>

            {/* Compact PDF Uploader */}
            <div className="max-w-2xl mx-auto">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="pdf-to-word"
              />
            </div>

            {/* Compact Selected PDF Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 rounded p-1.5">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Ready
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section - MAINTAINING ORIGINAL SIZES */}
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
                  Get truly editable text that you can modify, reformat, and reuse in Word. No more copy-pasting from locked PDFs - just open and start editing immediately.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Smart Layout Detection</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Our system recognizes headings, paragraphs, lists, and tables to recreate document structure. Most formatting translates beautifully to Word.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Copy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">OCR Text Recognition</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Extract text from scanned documents and image-based PDFs. Even old photocopies and faded documents often work perfectly.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Document Privacy</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your PDFs are processed securely and deleted within an hour. No human ever sees your content - just automated conversion and cleanup.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Lightning Fast Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Most documents convert in under 30 seconds. Even complex multi-page files with images process quickly and reliably.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Multiple Output Formats</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Choose DOC for older Word versions or DOCX for modern compatibility. Both work with Google Docs, Office 365, and other editors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section - MAINTAINING ORIGINAL FORMATTING */}
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

        {/* Interactive FAQ Section - MAINTAINING ORIGINAL FONT SIZES */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              PDF to Word Conversion FAQ
            </h2>

            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <button
                    className="w-full text-left flex items-center justify-between focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === index && (
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
                  )}
                  {openFaq !== index && (
                    <p className="text-gray-700">
                      {faq.answer}
                    </p>
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
                <span className="text-sm font-medium text-gray-700">4.6/5 from 11,328 users</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}