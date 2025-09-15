// pages/compress-pdf/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, Archive, AlertCircle, ArrowRight, FileText, TrendingDown } from 'lucide-react'

export default function CompressPdfPreview() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfPreview, setPdfPreview] = useState(null)
  const [isCompressing, setIsCompressing] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [compressionLevel, setCompressionLevel] = useState('medium')
  const [imageQuality, setImageQuality] = useState(75)
  const [removeMetadata, setRemoveMetadata] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.compressPdfFiles) {
        const storedFiles = window.compressPdfFiles
        
        if (storedFiles.length === 0) {
          router.push('/compress-pdf')
          return
        }
        
        const file = storedFiles[0]
        setPdfFile(file)

        // Generate PDF preview
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
        router.push('/compress-pdf')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleCompress = async () => {
    if (!pdfFile) {
      setError('No PDF file selected')
      return
    }

    setIsCompressing(true)
    setError('')
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('pdf', pdfFile)
      formData.append('compressionLevel', compressionLevel)
      formData.append('imageQuality', imageQuality.toString())
      formData.append('removeMetadata', removeMetadata.toString())

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 500)

      const response = await fetch('/api/compress-pdf', {
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
      const originalSize = response.headers.get('X-Original-Size')
      const compressedSize = response.headers.get('X-Compressed-Size')
      const compressionRatio = response.headers.get('X-Compression-Ratio')

      if (blob.size === 0) {
        throw new Error('Received empty file from server')
      }

      const url = URL.createObjectURL(blob)
      const fileName = `compressed-${pdfFile.name}`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))
      sessionStorage.setItem('originalSize', (originalSize / 1024 / 1024).toFixed(2))
      sessionStorage.setItem('compressionRatio', compressionRatio)

      if (typeof window !== 'undefined') {
        delete window.compressPdfFiles
      }
      
      router.push('/compress-pdf/download')

    } catch (error) {
      setError(`Failed to compress PDF: ${error.message}`)
    } finally {
      setIsCompressing(false)
      setProgress(0)
    }
  }

  // Continuing pages/compress-pdf/preview.js from the loading state

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600">Analyzing PDF document...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Compressing state
  if (isCompressing) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Archive className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compressing PDF</h2>
            <p className="text-gray-600 mb-6">Optimizing your document for smaller file size...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Analyzing structure...' : progress < 90 ? 'Optimizing content...' : 'Finalizing compression...'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Compress PDF - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/compress-pdf')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-blue-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                PDF Compression Settings
              </h1>
              <p className="text-gray-600">
                Customize compression options to balance file size and quality.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Compression Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="compressionLevel"
                            value="low"
                            checked={compressionLevel === 'low'}
                            onChange={(e) => setCompressionLevel(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Low - Better quality, larger size
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="compressionLevel"
                            value="medium"
                            checked={compressionLevel === 'medium'}
                            onChange={(e) => setCompressionLevel(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Medium - Balanced (Recommended)
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="compressionLevel"
                            value="high"
                            checked={compressionLevel === 'high'}
                            onChange={(e) => setCompressionLevel(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            High - Smaller size, lower quality
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Quality: {imageQuality}%
                      </label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={imageQuality}
                        onChange={(e) => setImageQuality(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Small size</span>
                        <span>High quality</span>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={removeMetadata}
                          onChange={(e) => setRemoveMetadata(e.target.checked)}
                          className="text-blue-600 focus:ring-blue-500 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Remove metadata (author, creation date, etc.)
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Compression Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>PDF File:</span>
                      <span className="font-medium text-gray-900 truncate max-w-32" title={pdfFile?.name}>
                        {pdfFile?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Size:</span>
                      <span className="font-medium text-gray-900">{(pdfFile?.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    {pdfPreview && (
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium text-gray-900">{pdfPreview.pageCount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-medium text-gray-900 capitalize">{compressionLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium text-gray-900">{imageQuality}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    PDF Document Preview
                  </h2>

                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 bg-gray-50 rounded-lg border">
                    {pdfPreview?.thumbnail && (
                      <div className="flex-shrink-0">
                        <img
                          src={pdfPreview.thumbnail}
                          alt="PDF Preview"
                          className="w-32 h-40 object-cover rounded-lg shadow-sm border"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className="bg-red-500 rounded-lg p-2 flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{pdfFile.name}</h3>
                          <div className="space-y-1 text-sm text-gray-500">
                            <p>{(pdfFile.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                            {pdfPreview && (
                              <>
                                <p>{pdfPreview.pageCount} pages</p>
                                <p>Ready for compression</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Ready
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expected compression info */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium text-blue-900">Expected Results</h4>
                    </div>
                    <p className="text-blue-700 text-sm">
                      With {compressionLevel} compression and {imageQuality}% image quality, expect approximately{' '}
                      <strong>
                        {compressionLevel === 'low' ? '20-40%' : compressionLevel === 'medium' ? '40-70%' : '60-90%'}
                      </strong>{' '}
                      size reduction.
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium">Compression Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Compress Button */}
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <button
                    onClick={handleCompress}
                    disabled={!pdfFile}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      pdfFile
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Compress PDF Document
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Reduce file size while maintaining document quality
                  </p>
                  
                  {pdfPreview && (
                    <p className="text-gray-500 text-xs mt-2">
                      Processing {pdfPreview.pageCount} pages with {compressionLevel} compression
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