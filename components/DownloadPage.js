// components/DownloadPage.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CheckCircle, Download, RotateCcw, ArrowLeft } from 'lucide-react'

export default function DownloadPage({ toolName, toolTitle }) {
  const [downloadUrl, setDownloadUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Get download data from sessionStorage
    const url = sessionStorage.getItem('downloadUrl')
    const name = sessionStorage.getItem('fileName')
    
    if (!url || !name) {
      // Redirect back if no download data
      router.push(`/${toolName}`)
      return
    }
    
    setDownloadUrl(url)
    setFileName(name)
  }, [toolName, router])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Clean up
    URL.revokeObjectURL(downloadUrl)
    sessionStorage.removeItem('downloadUrl')
    sessionStorage.removeItem('fileName')
  }

  const startOver = () => {
    // Clean up
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
    }
    sessionStorage.removeItem('downloadUrl')
    sessionStorage.removeItem('fileName')
    
    router.push(`/${toolName}`)
  }

  if (!downloadUrl) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          
          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Conversion Complete!
          </h1>
          <p className="text-gray-600 mb-8">
            Your file has been converted successfully and is ready for download.
          </p>
          
          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 mb-4"
          >
            <Download className="w-5 h-5" />
            <span>Download File</span>
          </button>
          
          {/* Start Over Button */}
          <button
            onClick={startOver}
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Convert Another File</span>
          </button>
          
          {/* Back to Home */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => router.push('/')}
              className="text-gray-500 hover:text-gray-700 transition-colors flex items-center justify-center space-x-1 w-full"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Tools</span>
            </button>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="text-center mt-4">
          <div className="text-sm text-gray-500">Step 3 of 3 - Complete</div>
        </div>
      </div>
    </div>
  )
}