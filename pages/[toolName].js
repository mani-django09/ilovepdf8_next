// pages/[toolName].js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ImageUploader from '../components/ImageUploader'
import Layout from '../components/Layout'
import FileUploader from '../components/FileUploader'
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react'

// Tool configurations
const toolConfigs = {
  'pdf-to-word': {
    title: 'PDF to Word Converter',
    description: 'Convert PDF documents to editable Word files',
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    icon: '📄➡️📃'
  },
'pdf-to-png': {
  title: 'PDF to PNG Converter',
  description: 'Convert PDF pages to PNG images with transparency support',
  accept: { 'application/pdf': ['.pdf'] },
  multiple: false,
  icon: '📄➡️🖼️'
},
'compress-pdf': {
  title: 'PDF Compressor',
  description: 'Reduce PDF file size while maintaining quality',
  accept: { 'application/pdf': ['.pdf'] },
  multiple: false,
  icon: '📄➡️🗜️'
},
'pdf-to-word': {
  title: 'PDF to Word Converter',
  description: 'Convert PDF documents to editable Word files',
  accept: { 'application/pdf': ['.pdf'] },
  multiple: false,
  icon: '📄➡️📃'
},

'png-to-pdf': {
  title: 'PNG to PDF Converter',
  description: 'Convert PNG images to PDF documents',
  accept: { 'image/png': ['.png'] },
  multiple: true,
  icon: '🖼️➡️📄'
},

'png-to-webp': {
  title: 'PNG to WebP Converter',
  description: 'Convert PNG images to WebP format for better web performance',
  accept: { 'image/png': ['.png'] },
  multiple: true,
  icon: '🖼️➡️🌐'
},
  'jpg-to-png': {
    title: 'JPG to PNG Converter',
    description: 'Convert JPG/JPEG images to PNG format with lossless quality',
    accept: { 'image/jpeg': ['.jpg', '.jpeg'] },
    multiple: true,
    icon: '🖼️➡️🖼️'
  },
 'webp-to-png': {
    title: 'WebP to PNG Converter',
    description: 'Convert WebP images to PNG format for universal compatibility',
    accept: { 'image/webp': ['.webp'] },
    multiple: true,
    icon: '🖼️➡️🖼️'
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter',
    description: 'Convert Word documents to PDF format',
    accept: { 
      'application/msword': ['.doc'], 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] 
    },
    multiple: false,
    icon: '📃➡️📄'
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF documents',
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    multiple: true,
    icon: '🖼️➡️📄'
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter',
    description: 'Convert PDF pages to JPG images',
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    icon: '📄➡️🖼️'
  },
  'png-to-jpg': {
    title: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format',
    accept: { 'image/png': ['.png'] },
    multiple: true,
    icon: '🖼️➡️🖼️'
  }
}


export default function ToolPage() {
  const router = useRouter()
  const { toolName } = router.query
  const [files, setFiles] = useState([])
  
  const config = toolConfigs[toolName]

  useEffect(() => {
    // Clear any previous session data
    sessionStorage.removeItem('downloadUrl')
    sessionStorage.removeItem('fileName')
  }, [])

  if (!config) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  const handleFilesSelect = (selectedFiles) => {
    setFiles(selectedFiles)
    
    if (typeof window !== 'undefined') {
      // Store files for the preview page
      if (toolName === 'pdf-to-jpg') {
        window.convertPdfFiles = selectedFiles
      } else if (toolName === 'png-to-jpg') {
        window.convertImageFiles = selectedFiles
      } else {
        window.selectedFiles = selectedFiles
      }
      
      // Navigate to appropriate preview/processing page
      setTimeout(() => {
        if (toolName === 'pdf-to-jpg') {
          router.push('/pdf-to-jpg/preview')
        } else if (toolName === 'png-to-jpg') {
          router.push('/png-to-jpg/preview')
        } else if (toolName === 'word-to-pdf') {
          router.push('/word-to-pdf/preview')
        } else {
          // For other tools, you can add their specific preview pages
          // For now, just show an alert
          alert('Feature coming soon! This tool is being developed.')
        }
      }, 1500)
    }
  }

  return (
    <>
      <Head>
        <title>{config.title} - Free Online Tool</title>
        <meta name="description" content={config.description} />
        <meta name="keywords" content={`${toolName}, PDF converter, online tool, free`} />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">{config.icon}</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {config.title}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
                {config.description}
              </p>
              
              {/* Steps Indicator */}
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">1</div>
                  <span className="font-medium">Upload</span>
                </div>
                <ArrowRight className="w-4 h-4" />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">2</div>
                  <span>Preview</span>
                </div>
                <ArrowRight className="w-4 h-4" />
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-semibold">3</div>
                  <span>Download</span>
                </div>
              </div>
            </div>

            {/* File Uploader */}
            <div className="mb-12">
              {toolName === 'png-to-jpg' ? (
                <ImageUploader
                  onImagesSelect={handleFilesSelect}
                  accept={config.accept}
                  multiple={config.multiple}
                  toolName={toolName}
                />
              ) : (
                <FileUploader
                  onFilesSelect={handleFilesSelect}
                  accept={config.accept}
                  multiple={config.multiple}
                  toolName={toolName}
                />
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">100% Secure</h3>
                <p className="text-gray-600 text-sm">Your files are processed securely and deleted automatically</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Convert your files in seconds with our optimized algorithms</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Works Anywhere</h3>
                <p className="text-gray-600 text-sm">No software installation required, works in any browser</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}