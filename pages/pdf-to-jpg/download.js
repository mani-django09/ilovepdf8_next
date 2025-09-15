// pages/pdf-to-jpg/download.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { CheckCircle, Download, RotateCcw, ArrowLeft, ArrowRight, Archive } from 'lucide-react'

export default function PdfToJpgDownload() {
  const [downloadReady, setDownloadReady] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = sessionStorage.getItem('downloadUrl')
      const name = sessionStorage.getItem('fileName')
      const size = sessionStorage.getItem('fileSize')
      
      if (url && name) {
        setDownloadUrl(url)
        setFileName(name)
        setFileSize(size || '0')
        setDownloadReady(true)
      } else {
        router.push('/pdf-to-jpg')
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
      delete window.convertPdfFiles
    }
    router.push('/pdf-to-jpg')
  }

  if (isLoading || !downloadReady) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-orange-200 border-t-orange-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Conversion Complete</h2>
            <p className="text-gray-600 mb-3 text-sm">Preparing download...</p>
            <div className="bg-gray-200 rounded-full h-2 w-48 mx-auto">
              <div className="bg-orange-600 h-2 rounded-full animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Download Images - PDF Conversion Complete</title>
        <meta name="description" content="Your PDF has been converted to images. Download your files now." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            {/* Success Icon */}
            <div className="text-center mb-6">
              <div className="bg-orange-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-3 mb-6 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-orange-600 font-medium">Upload</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-orange-600 font-medium">Convert</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-orange-600 font-medium">Done</span>
                </div>
              </div>
              
              {/* Success Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                All Done!
              </h1>
              <p className="text-gray-600 mb-6 text-sm">
                Your PDF pages are now high-quality images in a ZIP file.
              </p>
              
              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-orange-500 rounded-lg p-2">
                    <Archive className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{fileName}</p>
                    <p className="text-gray-500 text-sm">{fileSize} MB ZIP file</p>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              {!downloaded ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors mb-4 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download ZIP</span>
                </button>
              ) : (
                <div className="w-full bg-orange-100 text-orange-800 py-3 px-4 rounded-lg font-semibold mb-4 flex items-center justify-center space-x-2 border-2 border-orange-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Downloaded!</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={startOver}
                  className="w-full border-2 border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Convert Another PDF</span>
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 py-1 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Tools</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}