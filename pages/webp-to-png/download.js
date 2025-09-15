// pages/webp-to-png/download.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { CheckCircle, Download, RotateCcw, ArrowLeft, ArrowRight, Archive } from 'lucide-react'

export default function WebpToPngDownload() {
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
        router.push('/webp-to-png')
      }
      setIsLoading(false)
    }, 1000)

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
      delete window.convertImageFiles
    }
    router.push('/webp-to-png')
  }

  // Loading state
  if (isLoading || !downloadReady) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Conversion Complete</h2>
            <p className="text-gray-600 mb-3 text-sm">Preparing your PNG download...</p>
            <div className="bg-gray-200 rounded-full h-1.5 w-48 mx-auto">
              <div className="bg-purple-600 h-1.5 rounded-full animate-pulse w-4/5"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  const isZipFile = fileName.endsWith('.zip')

  return (
    <>
      <Head>
        <title>Download PNG Images - WebP to PNG Conversion Complete</title>
        <meta name="description" content="Your WebP images have been successfully converted to PNG format. Download your files now." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            {/* Success Animation */}
            <div className="text-center mb-6">
              <div className="bg-purple-500 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-2 mb-6 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-purple-600 font-medium">Upload</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                  <span className="text-purple-600 font-medium">Convert</span>
                </div>
                <ArrowRight className="w-3 h-3 text-gray-400" />
                <div className="flex items-center space-x-1">
                  <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span className="text-purple-600 font-medium">Complete</span>
                </div>
              </div>
              
              {/* Success Message */}
              <h1 className="text-2xl font-bold text-gray-900 mb-3">
                Images Converted Successfully!
              </h1>
              <p className="text-gray-600 mb-6 text-sm">
                Your WebP images have been converted to PNG format for universal compatibility.
              </p>
              
              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-purple-500 rounded-lg p-2">
                    {isZipFile ? (
                      <Archive className="w-5 h-5 text-white" />
                    ) : (
                      <Download className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-900">{fileName}</p>
                    <p className="text-gray-500 text-sm">
                      {fileSize} MB • {isZipFile ? 'ZIP Archive with PNG Images' : 'PNG Image'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              {!downloaded ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors mb-4 flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Download {isZipFile ? 'Images ZIP' : 'PNG Image'}</span>
                </button>
              ) : (
                <div className="w-full bg-purple-100 text-purple-800 py-3 px-6 rounded-lg font-semibold mb-4 flex items-center justify-center space-x-2 border-2 border-purple-200">
                  <CheckCircle className="w-5 h-5" />
                  <span>Download Successful!</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={startOver}
                  className="w-full border-2 border-gray-300 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Convert More Images</span>
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