import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { CheckCircle, Download, RotateCcw, ArrowLeft, FileText, Star, Clock } from 'lucide-react'

export default function MergePdfDownload() {
  const [downloadReady, setDownloadReady] = useState(false)
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [originalCount, setOriginalCount] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('Finalizing merge...')
  const router = useRouter()

  useEffect(() => {
    // Enhanced loading sequence
    const loadingSteps = [
      { text: 'Finalizing merge...', duration: 500 },
      { text: 'Optimizing file size...', duration: 400 },
      { text: 'Preparing download...', duration: 300 },
      { text: 'Almost ready...', duration: 400 }
    ]

    let currentStep = 0
    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingText(loadingSteps[currentStep].text)
        currentStep++
      } else {
        clearInterval(stepInterval)
        
        // Check for download data
        const url = sessionStorage.getItem('downloadUrl')
        const name = sessionStorage.getItem('fileName')
        const size = sessionStorage.getItem('fileSize')
        const count = sessionStorage.getItem('originalCount')
        
        if (url && name) {
          setDownloadUrl(url)
          setFileName(name)
          setFileSize(size || '0')
          setOriginalCount(count || '0')
          setDownloadReady(true)
        } else {
          router.push('/merge-pdf')
        }
        setIsLoading(false)
      }
    }, 600)

    return () => clearInterval(stepInterval)
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
      delete window.mergeFiles
    }
    router.push('/merge-pdf')
  }

  // Clean loading state without decorative elements
  if (isLoading || !downloadReady) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Merge Successful!</h2>
            <p className="text-gray-600 mb-6">{loadingText}</p>
            
            <div className="bg-gray-200 rounded-full h-2 w-full overflow-hidden mb-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Download Merged PDF - Your Document is Ready</title>
        <meta name="description" content="Your PDF files have been successfully merged. Download your combined document now." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full">
            {/* Simple Success Icon */}
            <div className="text-center mb-8">
              <div className="bg-green-500 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              {/* Success Message */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                PDF Merge Complete!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Successfully combined {originalCount} documents into one professional PDF file.
              </p>
              
              {/* File Info */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 mb-8 border border-gray-200">
                <div className="flex items-center justify-center space-x-4">
                  <div className="bg-red-500 rounded-lg p-4 shadow-sm">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-lg truncate max-w-xs" title={fileName}>
                      {fileName}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{fileSize} MB</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span>High Quality</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Download Button */}
              {!downloaded ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-green-700 transition-all duration-200 mb-6 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Download className="w-6 h-6" />
                  <span>Download Merged PDF</span>
                </button>
              ) : (
                <div className="w-full bg-green-100 text-green-800 py-4 px-6 rounded-xl font-bold text-lg mb-6 flex items-center justify-center space-x-3 border-2 border-green-200">
                  <CheckCircle className="w-6 h-6" />
                  <span>Download Complete!</span>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={startOver}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Merge More Files</span>
                </button>
                
                <button
                  onClick={() => router.push('/')}
                  className="w-full text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-2 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Tools</span>
                </button>
              </div>
              
              {/* Security Notice */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 leading-relaxed">
                  Your file will be automatically deleted from our servers within 1 hour for security. 
                  Please save it to your device now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}