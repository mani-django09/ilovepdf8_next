// pages/pdf-to-jpg/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, FileImage, Download, AlertCircle, ArrowRight, Loader2 } from 'lucide-react'

export default function PdfToJpgPreview() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfPreview, setPdfPreview] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [quality, setQuality] = useState('150')
  const [format, setFormat] = useState('jpg')
  const [pageRange, setPageRange] = useState('all')
  const [customRange, setCustomRange] = useState('')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertPdfFiles) {
        const storedFiles = window.convertPdfFiles
        
        if (storedFiles.length === 0) {
          router.push('/pdf-to-jpg')
          return
        }
        
        const file = storedFiles[0]
        setPdfFile(file)

        try {
          const formData = new FormData()
          formData.append('pdf', file)

          const response = await fetch('/api/pdf-preview', {
            method: 'POST',
            body: formData
          })

          if (response.ok) {
            const previewData = await response.json()
            setPdfPreview(previewData)
          }
        } catch (error) {
          console.error('Error generating preview:', error)
        }

        setIsLoading(false)
      } else {
        router.push('/pdf-to-jpg')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleConvert = async () => {
    if (!pdfFile) {
      setError('No PDF file selected')
      return
    }

    setIsConverting(true)
    setError('')
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('pdf', pdfFile)
      formData.append('quality', quality)
      formData.append('format', format)
      formData.append('pageRange', pageRange)
      formData.append('customRange', customRange)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 500)

      const response = await fetch('/api/pdf-to-jpg', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let errorMessage = `Server error: ${response.status}`
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          errorMessage = errorData.details || errorData.error || errorMessage
        }
        
        throw new Error(errorMessage)
      }

      const blob = await response.blob()

      if (blob.size === 0) {
        throw new Error('Received empty file from server')
      }

      const url = URL.createObjectURL(blob)
      const fileName = `extracted-images-${new Date().getTime()}.zip`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertPdfFiles
      }
      
      router.push('/pdf-to-jpg/download')

    } catch (error) {
      setError(`Failed to convert PDF: ${error.message}`)
    } finally {
      setIsConverting(false)
      setProgress(0)
    }
  }

  // Enhanced loading state with smooth animation
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-xl p-8 max-w-sm w-full mx-4 border border-orange-100">
            {/* Impressive spinner */}
            <div className="relative mb-6">
              {/* Outer ring */}
              <div className="w-20 h-20 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin"></div>
                
                {/* Inner rotating element */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-orange-500 to-red-500 animate-pulse flex items-center justify-center">
                  <FileImage className="w-6 h-6 text-white animate-bounce" />
                </div>
              </div>
              
              {/* Floating dots */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analyzing PDF</h2>
            <p className="text-gray-600 text-sm mb-4">Reading document structure...</p>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1.5 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500">This usually takes just a moment</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Enhanced converting state
  if (isConverting) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-sm px-6">
            {/* Advanced spinner for conversion */}
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto relative">
                {/* Multiple rotating rings */}
                <div className="absolute inset-0 rounded-full border-4 border-orange-100"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 border-r-orange-500 animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-3 border-transparent border-t-red-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-full p-3 animate-pulse">
                    <FileImage className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                <div className="absolute top-0 left-1/2 w-3 h-3 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-red-400 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Converting to Images</h2>
            <p className="text-gray-600 mb-6">Extracting pages from your PDF document...</p>
            
            {/* Enhanced progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 shadow-inner">
              <div 
                className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 h-3 rounded-full transition-all duration-500 shadow-sm relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                {progress < 30 ? 'Reading PDF structure...' : 
                 progress < 60 ? 'Extracting images...' : 
                 progress < 90 ? 'Optimizing quality...' : 'Finalizing download...'}
              </p>
              <p className="text-xs text-gray-500">{progress}% complete</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert PDF to Images - Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-4xl mx-auto px-6">
            {/* Compact Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => router.push('/pdf-to-jpg')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-orange-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-orange-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                Choose Your Settings
              </h1>
              <p className="text-gray-600 text-sm">
                Pick quality and format for your images.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Options</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="72">72 DPI - Web</option>
                        <option value="150">150 DPI - Standard</option>
                        <option value="300">300 DPI - Print</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setFormat('jpg')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            format === 'jpg'
                              ? 'bg-orange-100 border-orange-500 text-orange-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          JPG
                        </button>
                        <button
                          onClick={() => setFormat('png')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            format === 'png'
                              ? 'bg-orange-100 border-orange-500 text-orange-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          PNG
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pages</label>
                      <div className="space-y-2 text-sm">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="pageRange"
                            value="all"
                            checked={pageRange === 'all'}
                            onChange={(e) => setPageRange(e.target.value)}
                            className="text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-gray-700">
                            All pages {pdfPreview && `(${pdfPreview.pageCount})`}
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="pageRange"
                            value="first"
                            checked={pageRange === 'first'}
                            onChange={(e) => setPageRange(e.target.value)}
                            className="text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-gray-700">First page only</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="pageRange"
                            value="custom"
                            checked={pageRange === 'custom'}
                            onChange={(e) => setPageRange(e.target.value)}
                            className="text-orange-600 focus:ring-orange-500"
                          />
                          <span className="ml-2 text-gray-700">Custom range</span>
                        </label>
                        {pageRange === 'custom' && (
                          <input
                            type="text"
                            placeholder={`e.g., 1,3,5-${pdfPreview?.pageCount || 10}`}
                            value={customRange}
                            onChange={(e) => setCustomRange(e.target.value)}
                            className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Summary</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>File:</span>
                      <span className="font-medium text-gray-900 truncate max-w-24" title={pdfFile?.name}>
                        {pdfFile?.name}
                      </span>
                    </div>
                    {pdfPreview && (
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium text-gray-900">{pdfPreview.pageCount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium text-gray-900">{quality} DPI</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium text-gray-900">{format.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Your PDF
                  </h2>

                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg border">
                    {pdfPreview?.thumbnail && (
                      <div className="flex-shrink-0">
                        <img
                          src={pdfPreview.thumbnail}
                          alt="PDF Preview"
                          className="w-20 h-24 object-cover rounded border"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-500 rounded-lg p-2 flex-shrink-0">
                          <FileImage className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{pdfFile.name}</h3>
                          <div className="space-y-1 text-sm text-gray-500">
                            <p>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            {pdfPreview && (
                              <p>{pdfPreview.pageCount} pages ready to convert</p>
                            )}
                          </div>
                        </div>
                        <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                          Ready
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium text-sm">Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!pdfFile}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      pdfFile
                        ? 'bg-orange-600 text-white hover:bg-orange-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to Images
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-2">
                    Extract as {format.toUpperCase()} images
                  </p>
                  
                  {pdfPreview && pageRange === 'all' && (
                    <p className="text-gray-500 text-xs mt-1">
                      Will create {pdfPreview.pageCount} image files
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}