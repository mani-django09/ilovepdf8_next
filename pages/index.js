import SEO from '../components/SEO'
import Layout from '../components/Layout'
import ToolCard from '../components/ToolCard'
import { useState } from 'react'
import { 
  FileText, 
  Image, 
  Download, 
  Upload, 
  Merge,
  Minimize,
  FileImage,
  Camera,
  FileDown,
  ImageIcon,
  Shield,
  Zap,
  Globe,
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const tools = [
  {
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into a single document',
    icon: Merge,
    href: '/merge-pdf',
    color: 'bg-red-500',
    category: 'PDF Tools'
  },
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    icon: Minimize,
    href: '/compress-pdf',
    color: 'bg-blue-500',
    category: 'PDF Tools'
  },
  {
    name: 'PDF to JPG',
    description: 'Convert PDF pages to high-quality JPG images',
    icon: FileImage,
    href: '/pdf-to-jpg',
    color: 'bg-orange-500',
    category: 'PDF to Image'
  },
  {
    name: 'JPG to PDF',
    description: 'Convert JPG images to PDF format',
    icon: Image,
    href: '/jpg-to-pdf',
    color: 'bg-purple-500',
    category: 'Image to PDF'
  },
  {
    name: 'Word to PDF',
    description: 'Convert Word documents (.doc, .docx) to PDF',
    icon: FileText,
    href: '/word-to-pdf',
    color: 'bg-green-500',
    category: 'Office to PDF'
  },
  {
    name: 'PDF to Word',
    description: 'Convert PDF to editable Word documents',
    icon: FileDown,
    href: '/pdf-to-word',
    color: 'bg-indigo-500',
    category: 'PDF to Office'
  },
  {
    name: 'PNG to JPG',
    description: 'Convert PNG images to JPG format with quality control',
    icon: ImageIcon,
    href: '/png-to-jpg',
    color: 'bg-pink-500',
    category: 'Image Converter'
  },
  {
    name: 'JPG to PNG',
    description: 'Convert JPG images to PNG with transparency support',
    icon: Camera,
    href: '/jpg-to-png',
    color: 'bg-teal-500',
    category: 'Image Converter'
  },
  {
    name: 'PNG to PDF',
    description: 'Convert PNG images to PDF documents',
    icon: Upload,
    href: '/png-to-pdf',
    color: 'bg-yellow-500',
    category: 'Image to PDF'
  },
  {
    name: 'PDF to PNG',
    description: 'Convert PDF pages to PNG images with transparency',
    icon: Download,
    href: '/pdf-to-png',
    color: 'bg-cyan-500',
    category: 'PDF to Image'
  },
  {
    name: 'WebP to PNG',
    description: 'Convert WebP images to PNG format',
    icon: FileImage,
    href: '/webp-to-png',
    color: 'bg-lime-500',
    category: 'Image Converter'
  },
  {
    name: 'PNG to WebP',
    description: 'Convert PNG images to modern WebP format',
    icon: ImageIcon,
    href: '/png-to-webp',
    color: 'bg-violet-500',
    category: 'Image Converter'
  }
]

const faqs = [
  {
    question: "Are your tools really free?",
    answer: "Yes, all our PDF and document conversion tools are completely free to use with no hidden fees or subscriptions."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. All files are processed securely and automatically deleted from our servers within 1 hour."
  },
  {
    question: "What file formats do you support?",
    answer: "We support PDF, Word (DOC/DOCX), JPG, PNG, WebP and many other popular document and image formats."
  },
  {
    question: "Do I need to create an account?",
    answer: "No registration required. Simply upload your file, convert it, and download the result."
  },
  {
    question: "What's the maximum file size?",
    answer: "Most tools support files up to 100MB. For larger files, try compressing them first."
  },
  {
    question: "Can I use these tools on mobile?",
    answer: "Yes! Our tools work on all devices including smartphones, tablets, and computers."
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900">{faq.question}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <SEO 
        title="PDF Tools Hub - Free Online PDF & Document Conversion Tools"
        description="Free online PDF tools to convert, merge, compress, and edit PDF files. Convert between PDF, Word, JPG, PNG, WebP formats. Fast, secure, and easy to use with no registration required."
        canonical="/"
      />
      
      <Layout>
        {/* Compact Hero Section */}
        <div className="bg-gradient-to-br from-red-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Every tool you need to work with 
                <span className="text-red-600"> PDFs </span>
                in one place
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
                Free online PDF tools to merge, compress, create, edit and convert PDFs. 
                No downloads or registration required.
              </p>
            </div>
          </div>
        </div>

        {/* Compact Tools Grid */}
        <div id="tools" className="max-w-7xl mx-auto px-6 py-12">
          
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>

        {/* Compact Features Section */}
        <div className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Why Choose PDF Tools Hub?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional-grade PDF tools that are completely free
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Easy to Use</h3>
                <p className="text-gray-600 text-sm">Simple drag-and-drop interface</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">100% Secure</h3>
                <p className="text-gray-600 text-sm">Files deleted automatically</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Process files in seconds</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Works Anywhere</h3>
                <p className="text-gray-600 text-sm">All devices and browsers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact How it Works */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                How It Works
              </h2>
              <p className="text-lg text-gray-600">
                Convert your documents in just three simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Upload className="w-10 h-10 text-red-600" />
                </div>
                <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your File</h3>
                <p className="text-gray-600 text-sm">
                  Drag and drop your file or click to browse and select.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Convert Automatically</h3>
                <p className="text-gray-600 text-sm">
                  Our servers process your file securely in seconds.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Download className="w-10 h-10 text-green-600" />
                </div>
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Download Result</h3>
                <p className="text-gray-600 text-sm">
                  Download your converted file instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Stats Section */}
        <div className="bg-red-600 text-white py-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Trusted by Users Worldwide</h2>
              <p className="text-red-100">Join millions who rely on our free PDF tools daily</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-1">1M+</div>
                <div className="text-red-100 text-sm">Files Processed Monthly</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-red-100 text-sm">PDF & Document Tools</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-red-100 text-sm">Free to Use</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-red-100 text-sm">Always Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions about our PDF tools
              </p>
            </div>
            
            <FAQ />
          </div>
        </div>
      </Layout>
    </>
  )
}