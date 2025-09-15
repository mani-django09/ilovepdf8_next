// pages/pdf-to-word/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, FileText, AlertCircle, ArrowRight, Edit3, Type } from 'lucide-react'

export default function PdfToWordPreview() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfPreview, setPdfPreview] = useState(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [outputFormat, setOutputFormat] = useState('docx')
  const [preserveLayout, setPreserveLayout] = useState(true)
  const [extractImages, setExtractImages] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertPdfToWordFiles) {
        const storedFiles = window.convertPdfToWordFiles
        
        if (storedFiles.length === 0) {
          router.push('/pdf-to-word')
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
        router.push('/pdf-to-word')
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
      formData.append('outputFormat', outputFormat)
      formData.append('preserveLayout', preserveLayout.toString())
      formData.append('extractImages', extractImages.toString())

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 800)

      const response = await fetch('/api/pdf-to-word', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        const contentType = response.headers.get('content-type')
        let errorMessage = `Server error: ${response.status}`
        // Continuing pages/pdf-to-word/preview.js from the error handling

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
      const fileName = `converted-${pdfFile.name.replace('.pdf', `.${outputFormat}`)}`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))
      sessionStorage.setItem('outputFormat', outputFormat)

      if (typeof window !== 'undefined') {
        delete window.convertPdfToWordFiles
      }
      
      router.push('/pdf-to-word/download')

    } catch (error) {
      setError(`Failed to convert PDF: ${error.message}`)
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
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 border-t-green-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600">Analyzing PDF document...</p>
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
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-green-200 border-t-green-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Converting PDF to Word</h2>
            <p className="text-gray-600 mb-6">Extracting text and preserving formatting...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 30 ? 'Analyzing document structure...' : 
               progress < 60 ? 'Extracting text content...' : 
               progress < 90 ? 'Preserving formatting...' : 'Finalizing conversion...'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert PDF to Word - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/pdf-to-word')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-green-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-green-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                PDF to Word Conversion Settings
              </h1>
              <p className="text-gray-600">
                Customize conversion options for optimal Word document output.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversion Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setOutputFormat('docx')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            outputFormat === 'docx'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          DOCX
                        </button>
                        <button
                          onClick={() => setOutputFormat('doc')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            outputFormat === 'doc'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          DOC
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {outputFormat === 'docx' ? 'Modern Word format (recommended)' : 'Legacy Word format'}
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={preserveLayout}
                          onChange={(e) => setPreserveLayout(e.target.checked)}
                          className="text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Preserve original layout
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1 ml-6">
                        Attempts to maintain formatting and structure
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={extractImages}
                          onChange={(e) => setExtractImages(e.target.checked)}
                          className="text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Extract images from PDF
                        </span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1 ml-6">
                        Include images in the Word document
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Conversion Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>PDF File:</span>
                      <span className="font-medium text-gray-900 truncate max-w-32" title={pdfFile?.name}>
                        {pdfFile?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Size:</span>
                      <span className="font-medium text-gray-900">{(pdfFile?.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    {pdfPreview && (
                      <div className="flex justify-between">
                        <span>Pages:</span>
                        <span className="font-medium text-gray-900">{pdfPreview.pageCount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Output:</span>
                      <span className="font-medium text-gray-900">{outputFormat.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Layout:</span>
                      <span className="font-medium text-gray-900">{preserveLayout ? 'Preserve' : 'Basic'}</span>
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
                                <p>Ready for Word conversion</p>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Ready
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conversion Info */}
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Type className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium text-green-900">Conversion Notes</h4>
                    </div>
                    <div className="text-green-700 text-sm space-y-1">
                      <p>• Text will be extracted and made fully editable</p>
                      <p>• {preserveLayout ? 'Original formatting will be preserved where possible' : 'Basic text formatting will be applied'}</p>
                      <p>• {extractImages ? 'Images will be included in the Word document' : 'Images will not be extracted'}</p>
                      <p>• Output format: Microsoft Word {outputFormat.toUpperCase()}</p>
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
                    disabled={!pdfFile}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      pdfFile
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to Word Document
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Extract editable text and formatting to {outputFormat.toUpperCase()} format
                  </p>
                  
                  {pdfPreview && (
                    <p className="text-gray-500 text-xs mt-2">
                      Converting {pdfPreview.pageCount} pages to editable Word format
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