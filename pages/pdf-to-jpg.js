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
  Globe,
  CheckCircle,
  Image,
  Download,
  Award,
  ChevronDown,
  ChevronUp,
  Lock,
  Users,
  Clock
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
      question: "Does this work with password-protected PDFs?",
      answer: "Not directly - you'll need to remove the password first. Most PDF viewers have an option to save without password protection. This keeps things secure since we never ask for your passwords."
    },
    {
      question: "Should I use JPG or PNG for my images?",
      answer: "JPG works great for most situations and creates smaller files. Go with PNG if your PDF has transparent backgrounds or you need crisp text. When in doubt, JPG is usually the right choice."
    },
    {
      question: "What's all this DPI stuff about?",
      answer: "Think of DPI like image sharpness. 72 DPI is fine for viewing on screens and sharing online. 150 DPI looks good for basic printing. 300 DPI is what you want for professional printing or when image quality really matters."
    },
    {
      question: "Can I convert really old scanned documents?",
      answer: "Absolutely. The quality depends on how good the original scan was, but we can extract images from any PDF. Really old scans might look grainy, but that's just how they were originally scanned."
    },
    {
      question: "How big can my PDF file be?",
      answer: "Up to 100MB per file. That covers most documents - even lengthy reports with lots of images. If your file is bigger, try compressing it first or splitting it into smaller chunks."
    },
    {
      question: "What happens to my files after conversion?",
      answer: "We delete everything within an hour. Your files are processed securely and never stored permanently. Think of it like a digital shredder that activates automatically."
    },
    {
      question: "Can I select specific pages to convert?",
      answer: "Yes! You can convert all pages, just the first page, or specify custom page ranges like '1,3,5-10'. This is handy when you only need certain sections from a long document."
    },
    {
      question: "Will the image quality be as good as the original PDF?",
      answer: "The images will match or exceed the quality of what's in your PDF. If your PDF has high-resolution images, you'll get high-resolution outputs. The DPI setting lets you control the final quality vs file size balance."
    }
  ]

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PDF to JPG Converter - Extract Images from PDF Online",
    "description": "Convert PDF pages to high-quality JPG images instantly. Free online tool with custom resolution settings and batch processing capabilities.",
    "url": "https://yoursite.com/pdf-to-jpg",
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
      "reviewCount": "12,847"
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
              <div className="relative mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-3 border-orange-200 border-t-orange-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileImage className="w-4 h-4 text-orange-600" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">Reading your PDF</h2>
              <p className="text-gray-600 text-sm">Setting up the converter...</p>
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
        
        <link rel="canonical" href="https://yoursite.com/pdf-to-jpg" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      <Layout>
        {/* Compact Hero with wider upload */}
        <div className="bg-gradient-to-br from-orange-50 to-red-50 py-6">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-orange-100 rounded-lg px-3 py-1 mb-3">
                <FileImage className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-orange-600 font-medium text-sm">PDF to JPG</span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Turn PDF Pages into <span className="text-orange-600">High-Quality Images</span>
              </h1>
              
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
                Extract each page as a separate JPG or PNG file. Perfect for presentations, websites, social media, or when you just need the images from your documents.
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span className="flex items-center text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                  High quality output
                </span>
                <span className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 text-blue-600 mr-1" />
                  Private & secure
                </span>
                <span className="flex items-center text-gray-600">
                  <Zap className="w-4 h-4 text-yellow-600 mr-1" />
                  Lightning fast
                </span>
              </div>
            </div>

            {/* Wider Upload Area */}
            <div className="max-w-2xl mx-auto">
              <FileUploader
                onFilesSelect={handleFilesSelect}
                accept={{ 'application/pdf': ['.pdf'] }}
                multiple={false}
                toolName="pdf-to-jpg"
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-500 rounded p-1.5">
                      <FileImage className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{selectedFiles[0].name}</p>
                      <p className="text-xs text-gray-500">{(selectedFiles[0].size / 1024 / 1024).toFixed(1)} MB • Ready for conversion</p>
                    </div>
                    <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why people choose our PDF to image converter
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Professional-grade conversion tool that handles everything from simple documents to complex multi-page files with ease.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                <div className="bg-orange-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <FileImage className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Complete page extraction</h3>
                <p className="text-gray-600 text-sm">
                  Extract every single page of your PDF into individual high-quality images. Choose specific pages or convert the entire document with one click.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="bg-blue-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Superior image quality</h3>
                <p className="text-gray-600 text-sm">
                  Maintain pixel-perfect quality with resolution options from web-friendly 72 DPI to print-ready 300 DPI. Your images look as good as the original.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="bg-green-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Multiple output formats</h3>
                <p className="text-gray-600 text-sm">
                  Export as JPG for smaller files and photographs, or PNG for transparency support and crisp text rendering. Choose what works best for your needs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100">
                <div className="bg-purple-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bank-level security</h3>
                <p className="text-gray-600 text-sm">
                  Your documents are processed with enterprise-grade encryption. All files are automatically deleted after conversion for complete privacy protection.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="bg-teal-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning-fast processing</h3>
                <p className="text-gray-600 text-sm">
                  Advanced conversion algorithms process even large documents in seconds. No waiting around - get your images instantly.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-100">
                <div className="bg-pink-500 rounded-lg p-3 w-12 h-12 mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Organized downloads</h3>
                <p className="text-gray-600 text-sm">
                  Download all images in a convenient ZIP archive or get individual files. Professional naming convention keeps everything organized.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="py-10 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                How to convert PDF to images in 3 simple steps
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Transform your PDF documents into high-quality images without any technical knowledge required.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload your PDF file</h3>
                <p className="text-gray-600 text-sm">
                  Drag and drop your PDF file or click to browse. Files up to 100MB are supported with unlimited pages. Works with any type of PDF document.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Customize your settings</h3>
                <p className="text-gray-600 text-sm">
                  Choose image quality (72-300 DPI), format (JPG/PNG), and select specific pages or convert the entire document. Preview before converting.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-500 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download your images</h3>
                <p className="text-gray-600 text-sm">
                  Get your converted images instantly. Download as individual files or a complete ZIP archive with all images organized and ready to use.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comprehensive FAQ */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Frequently asked questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to know about converting PDFs to images, quality settings, and getting the best results.
              </p>
            </div>

            <div className="space-y-3">
              {faqData.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                  >
                    <h3 className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openFaq === index && (
                    <div className="px-6 pb-4 border-t border-gray-100">
                      <p className="text-gray-700 pt-4 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use cases and applications */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                When you need PDF to image conversion
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover the practical applications and benefits of extracting images from PDF documents across various industries and personal projects.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Business & professional use</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Presentation creation:</strong> Extract charts, graphs, and diagrams from reports to create compelling slide decks and visual presentations.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Marketing materials:</strong> Convert brochures and catalogs into individual images for websites, social media campaigns, and digital marketing.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Document archival:</strong> Preserve important documents as images for long-term storage, compliance, and easy accessibility across systems.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Content management:</strong> Convert PDF manuals and guides into images for content management systems that work better with image formats.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Creative & personal projects</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Artwork extraction:</strong> Pull illustrations and designs from PDFs for editing in graphic design software like Photoshop or Illustrator.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Social media content:</strong> Convert PDF pages into shareable images for Instagram stories, Facebook posts, and Twitter updates.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Portfolio building:</strong> Create image galleries from design portfolios, project documentation, and creative work showcases.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Educational materials:</strong> Convert textbook pages, worksheets, and study guides into images for easier sharing and annotation.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Choose the right quality for your needs</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-lg p-4 mb-3">
                    <Globe className="w-8 h-8 text-blue-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Web & Digital (72-96 DPI)</h4>
                  <p className="text-sm text-gray-600 mb-3">Perfect for websites, emails, social media posts, and online portfolios. Creates smaller file sizes for faster loading and easier sharing.</p>
                  <div className="text-xs text-gray-500">
                    <p>• Website images</p>
                    <p>• Social media posts</p>
                    <p>• Email attachments</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-lg p-4 mb-3">
                    <FileImage className="w-8 h-8 text-green-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Standard Print (150 DPI)</h4>
                  <p className="text-sm text-gray-600 mb-3">Good balance of quality and file size for office documents, presentations, and standard printing needs. Works for most everyday uses.</p>
                  <div className="text-xs text-gray-500">
                    <p>• Office presentations</p>
                    <p>• Standard printing</p>
                    <p>• Document sharing</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-lg p-4 mb-3">
                    <Award className="w-8 h-8 text-purple-600 mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Professional Print (300+ DPI)</h4>
                  <p className="text-sm text-gray-600 mb-3">Maximum quality for professional printing, detailed artwork, and when image quality is critical. Larger files but superior results.</p>
                  <div className="text-xs text-gray-500">
                    <p>• Professional printing</p>
                    <p>• Marketing materials</p>
                    <p>• High-quality artwork</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional benefits */}
        <div className="py-10 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Why choose our converter over desktop software
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get professional results without the hassle of downloads, installations, or subscription fees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4">
                <div className="bg-orange-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Works anywhere</h3>
                <p className="text-gray-600 text-sm">Access from any device with an internet connection. No software to install or update.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-green-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Free for everyone</h3>
                <p className="text-gray-600 text-sm">No hidden fees, subscriptions, or premium tiers. Professional features available to all users.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Always up to date</h3>
                <p className="text-gray-600 text-sm">Latest conversion technology and security updates applied automatically.</p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-purple-100 rounded-lg p-3 w-12 h-12 mx-auto mb-3">
                  <Lock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Privacy focused</h3>
                <p className="text-gray-600 text-sm">Your files never leave our secure servers and are deleted automatically after processing.</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}