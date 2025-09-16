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
    question: "Do I really not have to pay anything?",
    answer: "Nope, it's all free. I know that sounds suspicious because most sites hit you with upgrade prompts after you upload your file. We just don't do that. Been running this way for years and plan to keep it that way."
  },
  {
    question: "What happens to my files after I upload them?",
    answer: "We delete them automatically after about an hour. Your file gets converted, sits on our server temporarily, then gets wiped. We're not looking at your stuff or storing it anywhere. It's just there long enough to do the conversion and then it's gone forever."
  },
  {
    question: "Why don't I need to make an account?",
    answer: "Because that's annoying. If you just need to convert one PDF, why should you have to give us your email and create another password? Just upload your file, convert it, download the result. That's it."
  },
  {
    question: "Will my converted files look decent?",
    answer: "They should look pretty good. We've spent time making sure fonts don't get messed up, images stay crisp, and layouts don't break. Every document is different though, so sometimes weird stuff happens. If something looks off, try a different format or just try again."
  },
  {
    question: "Is this safe for important work documents?",
    answer: "We do our best to keep things secure. Files go through encrypted connections, get deleted automatically, and we don't keep logs of what you convert. That said, if you're dealing with super sensitive stuff, you might want to use offline tools just to be extra careful."
  },
  {
    question: "Does this actually work on phones?",
    answer: "Yep, should work fine on your phone or tablet. We built everything to work on mobile devices, not just computers. The buttons might be a bit smaller but the conversion process is exactly the same."
  },
  {
    question: "What if my file is really big?",
    answer: "We cap things at 100MB, which handles most documents. If you're hitting that limit, try compressing your PDF first or splitting it into smaller pieces. Usually that does the trick."
  },

]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
          >
            <h3 className="font-medium text-gray-900 pr-4">{faq.question}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-6 py-4 bg-white border-t border-gray-100">
              <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <SEO 
        title="iLovePDF - Free Online PDF & Document Tools"
        description="Every tool you need to work with PDFs in one place. Convert, merge, compress, and edit PDF files online for free. Fast, secure, and easy to use."
        canonical="/"
      />
      
      <Layout>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-red-50 via-white to-purple-50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Every tool you need to work with 
                <span className="text-red-600"> PDFs </span>
                in one place
              </h1>
              <p className="text-lg text-gray-600 mb-4 max-w-2xl mx-auto">
                Free PDF tools to merge, compress, convert, and edit your documents. 
                No downloads, no registration, no nonsense.
              </p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div id="tools" className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Why People Use Our Tools
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm">
                Simple, fast, and actually free
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Dead Simple</h3>
                <p className="text-gray-600 text-xs">Drag, drop, done</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Actually Safe</h3>
                <p className="text-gray-600 text-xs">Files get deleted</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Pretty Fast</h3>
                <p className="text-gray-600 text-xs">Usually under 30 seconds</p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 rounded-full p-2 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-sm mb-1">Works Everywhere</h3>
                <p className="text-gray-600 text-xs">Phone, tablet, computer</p>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="py-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                How This Works
              </h2>
              <p className="text-gray-600 text-sm">
                Three steps, takes about a minute
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-red-600" />
                </div>
                <div className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload Your File</h3>
                <p className="text-gray-600 text-sm">
                  Click to browse or just drag your file onto the page.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">We Process It</h3>
                <p className="text-gray-600 text-sm">
                  Our servers do the conversion work for you.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Download Result</h3>
                <p className="text-gray-600 text-sm">
                  Get your converted file and you're done.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-red-600 text-white py-8">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold mb-1">Used by People Everywhere</h2>
              <p className="text-red-100 text-sm">These numbers keep going up</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold mb-1">1M+</div>
                <div className="text-red-100 text-xs">Files per month</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-red-100 text-xs">Different tools</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-red-100 text-xs">Actually free</div>
              </div>
              <div>
                <div className="text-2xl font-bold mb-1">24/7</div>
                <div className="text-red-100 text-xs">Always working</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Questions People Ask
              </h2>
              <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                Here's what users want to know about our tools.
              </p>
            </div>
            
            <FAQ />
            
            {/* Help Section */}
            <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Something not working right?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Most issues are quick fixes. Try refreshing the page or using a different browser if something seems stuck.
              </p>
              <div className="text-sm text-gray-500">
                Still having trouble? Send us a message and we'll help you figure it out.
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}