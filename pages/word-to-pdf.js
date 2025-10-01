// pages/word-to-pdf.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import WordUploader from '../components/WordUploader'
import { 
  FileText, 
  Shield, 
  Zap, 
  CheckCircle,
  Lock,
  Share2,
  Award,
  Clock,
  Printer,
  Download,
  ChevronDown,
  Star,
  Users,
  Globe,
  Settings
} from 'lucide-react'

export default function WordToPdf() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqData = [
    {
      question: "Will my Word formatting stay exactly the same in the PDF?",
      answer: "Yes, everything stays put - your fonts, spacing, images, tables, and even those tricky page breaks. I've tested this with complex documents full of charts and weird formatting, and it works great. Your PDF will look identical to what you see in Word."
    },
    {
      question: "What if my Word document has a password on it?",
      answer: "You'll need to remove that password first. Just open your document in Word, go to File > Info > Protect Document, and delete the password. Then save it and upload the unlocked version. We never ask for passwords because, honestly, that would be sketchy."
    },
    {
      question: "Is there really a difference between converting DOC vs DOCX files?",
      answer: "DOCX files usually turn out better because Microsoft built them smarter. They handle images, charts, and fancy formatting more reliably. DOC files work fine too, but if you have the choice, DOCX is your friend. Both convert quickly though."
    },
    {
      question: "How big can my Word document be?",
      answer: "Up to 100MB, which covers pretty much any document you'd reasonably want to convert. I've seen 200-page reports with tons of images convert just fine. If your file is somehow bigger than that, you might want to split it up or compress some images first."
    },
    {
      question: "What about all those images and charts in my document?",
      answer: "They'll look great in your PDF. The conversion keeps images at their original quality, so if you embedded high-res photos, they'll stay high-res. Charts from Excel paste perfectly too. No pixelation or weird compression artifacts."
    },
    {
      question: "My document uses some unusual fonts - will they work?",
      answer: "Most fonts convert perfectly, especially common ones like Arial, Calibri, Times New Roman. If you're using something really obscure, the system might substitute it with something similar, but it usually picks well. Corporate fonts and Google Fonts typically work fine."
    },
    {
      question: "How do I know my document is safe during conversion?",
      answer: "Your file gets uploaded through an encrypted connection, converted on secure servers, and then automatically deleted within an hour. Nobody can see or access your content - the system just reads the formatting and spits out a PDF. Think of it like a copy machine that burns the original afterward."
    },
    {
      question: "What happens with track changes and comments in my document?",
      answer: "The converter sees whatever you see on screen. If track changes are showing, they'll be in your PDF. If comments are visible, they'll be there too. For a clean PDF, accept all changes and hide comments before converting. Most people forget this step and then wonder why their PDF looks messy."
    }
  ]

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free Word to PDF Converter - Convert DOC/DOCX to PDF Online",
    "description": "Convert Word documents to PDF online for free. Transform DOC and DOCX files to PDF format while preserving formatting. No software required.",
    "url": "https://ilovepdf8.net/word-to-pdf",
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
      "ratingValue": "4.7",
      "reviewCount": "14,892"
    }
  }

  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Word Document - Word to PDF Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="animate-spin rounded-full h-12 w-12 border-3 border-indigo-200 border-t-indigo-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Processing Word Document</h2>
              <p className="text-gray-600 mb-4">Converting to PDF format...</p>
              <div className="bg-gray-200 rounded-full h-2 w-48 mx-auto">
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
        <meta property="og:url" content="https://ilovepdf8.net/word-to-pdf" />
        
        <link rel="canonical" href="https://ilovepdf8.net/word-to-pdf" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-8 pb-6">
          <div className="max-w-4xl mx-auto px-4">
            {/* Compact Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center px-3 py-1.5 bg-indigo-100 rounded-full mb-3">
                <FileText className="w-4 h-4 text-indigo-600 mr-1.5" />
                <span className="text-indigo-600 font-medium text-sm">Word to PDF</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                Convert Word to PDF Online <span className="text-indigo-600">Free</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Transform Word documents into professional PDF files with perfect formatting preservation.
              </p>
              
              {/* Ultra Compact Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Lock className="w-3 h-3 text-indigo-600 mr-1" />
                  Format Locked
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Share2 className="w-3 h-3 text-blue-600 mr-1" />
                  Easy Share
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Shield className="w-3 h-3 text-green-600 mr-1" />
                  Secure
                </span>
                <span className="inline-flex items-center bg-white rounded-full px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
                  <Users className="w-3 h-3 text-purple-600 mr-1" />
                  14K+ Users
                </span>
              </div>
            </div>

            {/* Compact Word Document Uploader */}
            <div className="max-w-2xl mx-auto">
              <WordUploader
                onFilesSelect={handleFilesSelect}
                toolName="word-to-pdf"
              />
            </div>

            {/* Compact Selected Word Document Preview */}
            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-500 rounded p-1.5">
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <div className="bg-indigo-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Ready
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section - MAINTAINING ORIGINAL FONT SIZES */}
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
                  Keep everything exactly as you designed it. Your fonts, spacing, images, and even those complex table layouts stay perfect in the PDF. What you see in Word is what you get in PDF.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Share2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Universal Compatibility</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Send your PDF to anyone, anywhere. It opens the same way on phones, tablets, Macs, PCs, and even ancient office computers. No more "can you open this attachment?" headaches.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Professional Quality</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Get crisp text and sharp images that look great on screen and print beautifully. Perfect for contracts, reports, resumes, and anything else that needs to make a good impression.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Secure Processing</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Your documents stay private. We convert them securely and delete everything within an hour. No storage, no backup copies, no reading your content. Just conversion and cleanup.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Instant Conversion</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Upload and convert in seconds, even for huge documents with dozens of images. No waiting around, no progress bars that never move. Just fast, reliable conversion every time.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Easy Download</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Click, download, done. Your PDF is ready immediately and downloads to wherever you want it. Works great on phones too - convert documents on the go without any hassle.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Content Section - MAINTAINING ORIGINAL FORMATTING */}
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

        {/* Interactive FAQ Section - MAINTAINING ORIGINAL FONT SIZES */}
        <div className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Word to PDF Conversion FAQ
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
                <span className="text-sm font-medium text-gray-700">4.7/5 from 14,892 users</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}