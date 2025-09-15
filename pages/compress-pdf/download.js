// pages/compress-pdf/download.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { CheckCircle, Download, RotateCcw, ArrowLeft, ArrowRight, Archive, TrendingDown } from 'lucide-react'

export default function CompressPdfDownload() {
  const [downloadReady, setDownloadReady] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [originalSize, setOriginalSize] = useState('')
  const [compressionRatio, setCompressionRatio] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      const url = sessionStorage.getItem('downloadUrl')
      const name = sessionStorage.getItem('fileName')
      const size = sessionStorage.getItem('fileSize')
      const origSize = sessionStorage.getItem('originalSize')
      const ratio = sessionStorage.getItem('compressionRatio')
      
      if (url && name) {
        setDownloadUrl(url)
        setFileName(name)
        setFileSize(size || '0')
        setOriginalSize(origSize || '0')
        setCompressionRatio(ratio || '0')
        setDownloadReady(true)
      } else {
        router.push('/compress-pdf')
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
      delete window.compressPdfFiles
    }
    router.push('/compress-pdf')
  }

  // Loading state
  if (isLoading || !downloadReady) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compression Complete</h2>
            <p className="text-gray-600 mb-4">Preparing your compressed PDF...</p>
            <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Download Compressed PDF - Compression Complete</title>
        <meta name="description" content="Your PDF has been successfully compressed. Download your optimized file now." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            {/* Success Animation */}
            <div className="text-center mb-8">
              <div className="bg-blue-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-3 mb-8 text-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-blue-600 font-medium">Upload</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-blue-600 font-medium">Compress</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-blue-600 font-medium">Complete</span>
                </div>
              </div>
              
              {/* Success Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                PDF Compressed Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your PDF file has been optimized and is ready for download.
              </p>
              
              {/* Compression Results */}
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <TrendingDown className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">Compression Results</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-blue-600 font-medium">Original Size</p>
                    <p className="text-2xl font-bold text-blue-900">{originalSize} MB</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-blue-600 font-medium">Compressed Size</p>
                    <p className="text-2xl font-bold text-blue-900">{fileSize} MB</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-blue-600 font-medium">Size Reduction</p>
                  <p className="text-3xl font-bold text-green-600">{compressionRatio}%</p>
                </div>
              </div>
              
              {/* File Info */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-blue-500 rounded-lg p-3">
                    <Archive className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900 text-lg">{fileName}</p>
                    <p className="text-gray-500">{fileSize} MB • Compressed PDF</p>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              {!downloaded ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors mb-6 flex items-center justify-center space-x-3"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Compressed PDF</span>
                </button>
              ) : (
                <div className="w-full bg-blue-100 text-blue-800 py-4 px-6 rounded-xl font-semibold text-lg mb-6 flex items-center justify-center space-x-3 border-2 border-blue-200">
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
                  <span>Compress Another PDF</span>
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Tools</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}