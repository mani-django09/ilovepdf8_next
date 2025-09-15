// pages/word-to-pdf/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, FileText, AlertCircle, ArrowRight, Lock, Printer } from 'lucide-react'

export default function WordToPdfPreview() {
  // Continuing pages/word-to-pdf/preview.js from the useState declarations

  const [wordFile, setWordFile] = useState(null)
  const [wordPreview, setWordPreview] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [quality, setQuality] = useState('standard')
  const [pageSize, setPageSize] = useState('A4')
  const [orientation, setOrientation] = useState('portrait')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertWordToPdfFiles) {
        const storedFiles = window.convertWordToPdfFiles
        
        if (storedFiles.length === 0) {
          router.push('/word-to-pdf')
          return
        }
        
        const file = storedFiles[0]
        setWordFile(file)

        // Generate Word preview
        try {
          const formData = new FormData()
          formData.append('word', file)

          const response = await fetch('/api/word-preview', {
            method: 'POST',
            body: formData
          })

          if (response.ok) {
            const previewData = await response.json()
            setWordPreview(previewData)
          }
        } catch (error) {
          console.error('Error generating preview:', error)
        }

        setIsLoading(false)
      } else {
        router.push('/word-to-pdf')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const handleConvert = async () => {
    if (!wordFile) {
      setError('No Word file selected')
      return
    }

    setIsConverting(true)
    setError('')
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append('word', wordFile)
      formData.append('quality', quality)
      formData.append('pageSize', pageSize)
      formData.append('orientation', orientation)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 12
        })
      }, 600)

      const response = await fetch('/api/word-to-pdf', {
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
      const fileName = `${wordFile.name.replace(/\.(doc|docx)$/i, '')}.pdf`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertWordToPdfFiles
      }
      
      router.push('/word-to-pdf/download')

    } catch (error) {
      setError(`Failed to convert Word document: ${error.message}`)
    } finally {
      setIsConverting(false)
      setProgress(0)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600">Analyzing Word document...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Converting state
  if (isConverting) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Converting Word to PDF</h2>
            <p className="text-gray-600 mb-6">Creating professional PDF document...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 30 ? 'Processing document...' : 
               progress < 60 ? 'Converting to PDF...' : 
               progress < 90 ? 'Applying formatting...' : 'Finalizing PDF...'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert Word to PDF - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/word-to-pdf')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-indigo-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-indigo-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Word to PDF Conversion Settings
              </h1>
              <p className="text-gray-600">
                Customize PDF output settings for optimal results.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PDF Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PDF Quality</label>
                      <select
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="maximum">Maximum Quality</option>
                        <option value="high">High Quality</option>
                        <option value="standard">Standard Quality</option>
                        <option value="compressed">Compressed Size</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="A4">A4 (210 × 297 mm)</option>
                        <option value="Letter">Letter (8.5 × 11 in)</option>
                        <option value="Legal">Legal (8.5 × 14 in)</option>
                        <option value="A3">A3 (297 × 420 mm)</option>
                        <option value="A5">A5 (148 × 210 mm)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setOrientation('portrait')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            orientation === 'portrait'
                              ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Portrait
                        </button>
                        <button
                          onClick={() => setOrientation('landscape')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            orientation === 'landscape'
                              ? 'bg-indigo-100 border-indigo-500 text-indigo-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Landscape
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Conversion Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Word File:</span>
                      <span className="font-medium text-gray-900 truncate max-w-32" title={wordFile?.name}>
                        {wordFile?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span className="font-medium text-gray-900">{(wordFile?.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    {wordPreview && (
                      <>
                        <div className="flex justify-between">
                          <span>Word Count:</span>
                          <span className="font-medium text-gray-900">{wordPreview.wordCount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Est. Pages:</span>
                          <span className="font-medium text-gray-900">{wordPreview.estimatedPages}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium text-gray-900 capitalize">{quality}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page Size:</span>
                      <span className="font-medium text-gray-900">{pageSize}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Word Document Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Word Document Preview
                  </h2>

                  <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6 p-4 bg-gray-50 rounded-lg border">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg shadow-sm border flex items-center justify-center">
                        <FileText className="w-16 h-16 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-500 rounded-lg p-2 flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{wordFile.name}</h3>
                          <div className="space-y-1 text-sm text-gray-500">
                            <p>{(wordFile.size / 1024 / 1024).toFixed(2)} MB • Word Document</p>
                            {wordPreview && (
                              <>
                                <p>{wordPreview.wordCount.toLocaleString()} words • {wordPreview.estimatedPages} pages</p>
                                <p>{wordPreview.hasImages ? 'Contains images' : 'Text only'} • {wordPreview.hasTables ? 'Contains tables' : 'No tables'}</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Ready
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Document Preview Text */}
                  {wordPreview?.preview && (
                    <div className="mt-4 p-4 bg-white rounded-lg border">
                      <h4 className="font-medium text-gray-900 mb-2">Document Preview</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {wordPreview.preview}
                      </p>
                    </div>
                  )}

                  {/* Conversion Info */}
                  <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Printer className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-medium text-indigo-900">PDF Conversion Notes</h4>
                    </div>
                    <div className="text-indigo-700 text-sm space-y-1">
                      <p>• All formatting, fonts, and layout will be preserved</p>
                      <p>• {wordPreview?.hasImages ? 'Images will be embedded in the PDF' : 'Text-based conversion for optimal quality'}</p>
                      <p>• PDF will be optimized for {quality} quality</p>
                      <p>• Output format: {pageSize} {orientation}</p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium">Conversion Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!wordFile}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      wordFile
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to PDF Document
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Create professional PDF with preserved formatting
                  </p>
                  
                  {wordPreview && (
                    <p className="text-gray-500 text-xs mt-2">
                      Converting {wordPreview.estimatedPages} pages to PDF format
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