// pages/png-to-pdf.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../components/Layout'
import ImageUploader from '../components/ImageUploader'
import { 
  FileText, 
  ArrowRight, 
  Shield, 
  Zap, 
  Globe, 
  CheckCircle,
  Monitor,
  Printer,
  Award,
  Download,
  Layers,
  Archive,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const faqs = [
  {
    question: "Can I combine multiple PNG files into one PDF document?",
    answer: "Yes! Upload multiple PNG files and we'll create a single PDF with each image on its own page. You can even drag and drop to reorder them before converting."
  },
  {
    question: "Will my PNG images lose quality when converted to PDF?",
    answer: "Not at all! We preserve the original quality of your PNG images, including transparency. The images are embedded in the PDF without any compression or quality loss."
  },
  {
    question: "What page sizes can I choose for my PDF?",
    answer: "We support all standard sizes including A4, Letter, Legal, A3, and A5. You can also pick portrait or landscape orientation to best fit your images."
  },
  {
    question: "How many PNG files can I convert at once?",
    answer: "You can upload multiple PNG files with a total size limit of 100MB. There's no strict file count limit, but larger collections may take a bit longer to process."
  },
  {
    question: "Can I control how images appear on each PDF page?",
    answer: "Absolutely! Choose to fit images to the page, fill the entire page, or keep original size. You can also set margins and spacing to get the perfect layout."
  },
  {
    question: "Are my PNG files secure during conversion?",
    answer: "Your privacy is our priority. All files are processed securely and automatically deleted from our servers within one hour. We never store or share your images."
  }
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border">
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">{faq.question}</h3>
            {openIndex === index ? (
              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function PngToPdf() {
  const [selectedImages, setSelectedImages] = useState([])
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()

  const handleImagesSelect = (images) => {
    setSelectedImages(images)
    
    if (typeof window !== 'undefined') {
      window.convertImageFiles = images
      setIsRedirecting(true)
      
      setTimeout(() => {
        router.push('/png-to-pdf/preview')
      }, 1500)
    }
  }

  // Loading overlay during redirect
  if (isRedirecting) {
    return (
      <>
        <Head>
          <title>Processing Images - PNG to PDF Converter</title>
        </Head>
        <Layout>
          <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Analyzing Images</h2>
              <p className="text-gray-600 text-sm mb-3">Preparing PDF creation...</p>
              <div className="bg-gray-200 rounded-full h-1.5 w-40 mx-auto">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse w-3/4"></div>
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
        <title>Free PNG to PDF Converter Online - Convert PNG Images to PDF | High Quality</title>
        <meta name="description" content="Convert PNG images to PDF documents online free. Combine multiple PNG files into professional PDFs with custom layouts. Best PNG to PDF converter tool." />
        <meta name="keywords" content="PNG to PDF converter free, convert PNG to PDF online, PNG images to PDF, combine PNG files PDF, PNG merger PDF, images to PDF converter" />
        
        <meta property="og:title" content="Free PNG to PDF Converter - Create Professional PDFs from Images" />
        <meta property="og:description" content="Convert PNG images to PDF documents for free. Combine multiple files with custom layouts and page sizes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ilovepdf8.net/png-to-pdf" />
        
        <link rel="canonical" href="https://ilovepdf8.net/png-to-pdf" />
      </Head>
      
      <Layout>
        {/* Ultra Compact Hero Section */}
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Convert PNG to <span className="text-blue-600">PDF Documents</span>
              </h1>
              
              <p className="text-gray-600 max-w-xl mx-auto mb-4 text-sm">
                Transform PNG images into professional PDF documents. Combine multiple files or create individual PDFs with custom layouts.
              </p>
              
              {/* Mini Features */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                <span className="bg-white rounded-full px-3 py-1 shadow-sm text-xs font-medium text-gray-700">
                  Combine Multiple
                </span>
                <span className="bg-white rounded-full px-3 py-1 shadow-sm text-xs font-medium text-gray-700">
                  Print Ready
                </span>
                <span className="bg-white rounded-full px-3 py-1 shadow-sm text-xs font-medium text-gray-700">
                  Custom Layouts
                </span>
              </div>
            </div>

            {/* Compact Image Uploader */}
            <div className="max-w-2xl mx-auto">
              <ImageUploader
                onImagesSelect={handleImagesSelect}
                accept={{ 'image/png': ['.png'] }}
                multiple={true}
                toolName="png-to-pdf"
              />
            </div>

            {/* Compact Selected Images Preview */}
            {selectedImages.length > 0 && (
              <div className="max-w-2xl mx-auto mt-4">
                <div className="bg-white rounded-lg shadow-sm border p-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      Ready to Create PDF ({selectedImages.length} images)
                    </h3>
                    <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                      Processing...
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative">
                        <div className="aspect-square bg-gray-100 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-blue-500 text-white px-1 py-0.5 rounded text-xs font-bold absolute top-1 left-1">
                          {index + 1}
                        </div>
                      </div>
                    ))}
                    {selectedImages.length > 4 && (
                      <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-gray-500 font-medium text-xs">+{selectedImages.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Compact Features Grid */}
        <div className="py-8 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Why Choose Our PNG to PDF Converter?
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto text-sm">
                Create professional PDF documents from your PNG images
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                <div className="bg-blue-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Archive className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Combine Multiple Images</h3>
                <p className="text-gray-600 text-xs">
                  Merge multiple PNG files into one professional PDF document.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <div className="bg-green-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Printer className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Print-Ready Format</h3>
                <p className="text-gray-600 text-xs">
                  Generate PDFs optimized for printing with proper page sizes.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <div className="bg-purple-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Preserve Quality</h3>
                <p className="text-gray-600 text-xs">
                  Maintain original image quality and transparency without loss.
                </p>
              </div>

              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                <div className="bg-orange-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Custom Page Sizes</h3>
                <p className="text-gray-600 text-xs">
                  Choose from A4, Letter, Legal and other standard sizes.
                </p>
              </div>

              <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
                <div className="bg-teal-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Flexible Layout</h3>
                <p className="text-gray-600 text-xs">
                  Control image placement, scaling, and orientation options.
                </p>
              </div>

              <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
                <div className="bg-pink-500 rounded p-1.5 w-8 h-8 mb-2">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">Secure Processing</h3>
                <p className="text-gray-600 text-xs">
                  Your images are processed securely and deleted automatically.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact How It Works */}
        <div className="py-8 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                How to Convert PNG to PDF
              </h2>
              <p className="text-gray-600 text-sm">Create professional PDFs in three steps</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-2 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  1
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Upload PNG Images</h3>
                <p className="text-gray-600 text-xs">
                  Select multiple PNG files or drag and drop them.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-2 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-green-600" />
                </div>
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  2
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Customize Layout</h3>
                <p className="text-gray-600 text-xs">
                  Choose page size, orientation, and image arrangement.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-2 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Download className="w-6 h-6 text-purple-600" />
                </div>
                <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto mb-2 font-bold text-sm">
                  3
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Download PDF</h3>
                <p className="text-gray-600 text-xs">
                  Get your professional PDF document instantly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compact SEO Content */}
        <div className="py-8 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Convert PNG to PDF: Complete Guide
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">When to Use PDF Format</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  Converting PNG images to PDF creates professional documents perfect for sharing, printing, and archiving. PDFs maintain consistent formatting across all devices and platforms.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li>Business presentations and reports</li>
                  <li>Photo albums and portfolios</li>
                  <li>Documentation with screenshots</li>
                  <li>Print-ready image collections</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Layout Options</h3>
                <p className="text-gray-700 mb-3 text-sm">
                  Choose the perfect layout for your PNG images. Our converter offers flexible options to ensure your images look professional in the final PDF.
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li><strong>Fit to page:</strong> Maintains aspect ratio</li>
                  <li><strong>Fill page:</strong> Uses entire page space</li>
                  <li><strong>Original size:</strong> Keeps natural dimensions</li>
                  <li><strong>Custom spacing:</strong> Add margins and padding</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Why PNG to PDF Conversion Matters
            </h3>
            <p className="text-gray-700 mb-4 text-sm">
              PNG files are perfect for individual images, but PDF format excels for multi-image documents. Converting PNG to PDF creates shareable, printable documents that maintain image quality while providing universal compatibility across all devices and operating systems.
            </p>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Benefits</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <strong>Document Organization</strong>
                  <p>Combine related images into structured, professional documents perfect for business use.</p>
                </div>
                <div>
                  <strong>Universal Sharing</strong>
                  <p>PDFs open consistently on any device, making them ideal for client presentations and team collaboration.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Section */}
        <div className="py-8 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                PNG to PDF Conversion Questions
              </h2>
              <p className="text-gray-600 text-sm">
                Get answers to common questions about converting images to PDF
              </p>
            </div>
            
            <FAQ />
          </div>
        </div>
      </Layout>
    </>
  )
}