// pages/pdf-to-word/download.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { CheckCircle, Download, RotateCcw, ArrowLeft, ArrowRight, FileText, Edit3 } from 'lucide-react'

export default function PdfToWordDownload() {
  const [downloadReady, setDownloadReady] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [outputFormat, setOutputFormat] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = sessionStorage.getItem('downloadUrl')
      const name = sessionStorage.getItem('fileName')
      const size = sessionStorage.getItem('fileSize')
      const format = sessionStorage.getItem('outputFormat')
      
      if (url && name) {
        setDownloadUrl(url)
        setFileName(name)
        setFileSize(size || '0')
        setOutputFormat(format || 'docx')
        setDownloadReady(true)
      } else {
        router.push('/pdf-to-word')
      }
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  const handleDownload = () => {
    if (!downloadUrl || !fileName) return
    
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setDownloaded(true)
  }

  const startOver = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
    }
    sessionStorage.clear()
    if (typeof window !== 'undefined') {
      delete window.convertPdfToWordFiles
    }
    router.push('/pdf-to-word')
  }

  // Loading state
  if (isLoading || !downloadReady) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conversion Complete</h2>
            <p className="text-gray-600 mb-4">Preparing your Word document...</p>
            <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
              <div className="bg-green-600 h-2 rounded-full animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Download Word Document - PDF to Word Conversion Complete</title>
        <meta name="description" content="Your PDF has been successfully converted to Word format. Download your editable document now." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="bg-green-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-3 mb-8 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-green-600 font-medium">Upload</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-green-600 font-medium">Convert</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-green-600 font-medium">Complete</span>
                </div>
              </div>
              
              {/* Success Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                PDF Converted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your PDF has been converted to an editable Word document and is ready for download.
              </p>
              
              {/* File Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-green-500 rounded-lg p-3">
                    <Edit3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">{fileName}</p>
                    <p className="text-gray-500">{fileSize} MB • {outputFormat.toUpperCase()} Document</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Your Word Document Features</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Fully Editable Text</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Preserved Formatting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Copy & Paste Ready</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Word Compatible</span>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              {!downloaded ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors mb-6 flex items-center justify-center space-x-3"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Word Document</span>
                </button>
              ) : (
                <div className="w-full bg-green-100 text-green-800 py-4 px-6 rounded-xl font-semibold text-lg mb-6 flex items-center justify-center space-x-3 border-2 border-green-200">
                  <CheckCircle className="w-6 h-6" />
                  <span>Download Successful!</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={startOver}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Convert Another PDF</span>
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Tools</span>
                </button>
              </div>

              {/* Usage Tips */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-left">
                <h4 className="font-semibold text-gray-900 mb-2">Next Steps:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Open in Microsoft Word, Google Docs, or any word processor</li>
                  <li>• Edit text, change formatting, and add new content</li>
                  <li>• Save as different formats if needed</li>
                  <li>• Share with collaborators for editing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}