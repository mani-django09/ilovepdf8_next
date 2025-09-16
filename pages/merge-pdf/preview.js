import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, FileText, AlertCircle, ArrowRight, Loader } from 'lucide-react'

export default function MergePdfPreview() {
  const [files, setFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [progressText, setProgressText] = useState('Analyzing files...')
  const router = useRouter()

  useEffect(() => {
    // Simulate realistic loading with progress updates
    setProgressText('Loading files...')
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.mergeFiles) {
        const storedFiles = window.mergeFiles
        const validFiles = storedFiles.filter(file => file && file.size > 0)
        
        if (validFiles.length === 0) {
          router.push('/merge-pdf')
          return
        }
        
        setProgressText('Preparing preview...')
        setTimeout(() => {
          setFiles(validFiles)
          setIsLoading(false)
        }, 300)
      } else {
        router.push('/merge-pdf')
      }
    }, 1200)

    return () => clearTimeout(timer)
  }, [router])

  const moveFile = (index, direction) => {
    const newFiles = [...files]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < files.length) {
      [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]]
      setFiles(newFiles)
      if (typeof window !== 'undefined') {
        window.mergeFiles = newFiles
      }
    }
  }

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    
    if (typeof window !== 'undefined') {
      window.mergeFiles = newFiles
    }
    
    if (newFiles.length === 0) {
      router.push('/merge-pdf')
    }
  }

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge')
      return
    }

    setIsUploading(true)
    setError('')
    setProgress(0)
    setProgressText('Preparing files...')

    try {
      const formData = new FormData()
      
      files.forEach((file) => {
        formData.append('files', file)
      })

      // Realistic progress simulation with text updates
      const progressSteps = [
        { progress: 15, text: 'Uploading files...' },
        { progress: 35, text: 'Processing PDFs...' },
        { progress: 55, text: 'Combining pages...' },
        { progress: 75, text: 'Optimizing document...' },
        { progress: 90, text: 'Finalizing merge...' }
      ]

      let stepIndex = 0
      const progressInterval = setInterval(() => {
        if (stepIndex < progressSteps.length) {
          setProgress(progressSteps[stepIndex].progress)
          setProgressText(progressSteps[stepIndex].text)
          stepIndex++
        } else {
          clearInterval(progressInterval)
        }
      }, 400)

      const response = await fetch('/api/merge-pdf', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setProgress(100)
      setProgressText('Complete!')

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

      // Store for download page
      const url = URL.createObjectURL(blob)
      const fileName = `merged-pdf-${new Date().getTime()}.pdf`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))
      sessionStorage.setItem('originalCount', files.length.toString())

      if (typeof window !== 'undefined') {
        delete window.mergeFiles
      }
      
      // Small delay to show completion
      setTimeout(() => {
        router.push('/merge-pdf/download')
      }, 800)

    } catch (error) {
      setError(`Failed to merge PDFs: ${error.message}`)
      setProgress(0)
      setProgressText('')
    } finally {
      if (!error) return // Don't reset if successful
      setIsUploading(false)
    }
  }

  // Enhanced loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-sm p-8 max-w-sm w-full mx-4">
            <div className="relative mb-6">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 mt-2" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600 text-sm mb-4">{progressText}</p>
            
            <div className="flex justify-center space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // Enhanced processing state
  if (isUploading) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <div className="relative mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Loader className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{files.length}</span>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Merging Your PDFs</h2>
            <p className="text-gray-600 mb-6">Combining {files.length} documents into one file...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 relative"
                style={{width: `${progress}%`}}
              >
                <div className="absolute inset-0 bg-white opacity-20 animate-pulse rounded-full"></div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <p className="text-sm text-gray-600 font-medium">{progressText}</p>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            </div>
            
            <p className="text-xs text-gray-500">
              {progress}% complete • Please don't close this window
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Preview & Arrange PDFs - Ready to Merge</title>
        <meta name="description" content="Review and arrange your PDF files before merging them into one document." />
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-3xl mx-auto px-4">
            {/* Compact Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => router.push('/merge-pdf')}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">✓</div>
                    <span className="text-green-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</div>
                    <span className="text-blue-600 font-medium">Preview</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-1">Arrange Your PDFs</h1>
              <p className="text-gray-600 text-sm">Drag to reorder files. The first file will appear first in your merged document.</p>
            </div>

            {/* Enhanced Files List */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">{files.length} Files Ready to Merge</h2>
                <button
                  onClick={() => router.push('/merge-pdf')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  + Add More
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-sm transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-500 rounded-lg p-2 shadow-sm">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 truncate max-w-xs" title={file.name}>
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(1)} MB • Page order: #{index + 1}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        #{index + 1}
                      </div>
                      
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => moveFile(index, 'up')}
                          disabled={index === 0}
                          className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
                          title="Move up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => moveFile(index, 'down')}
                          disabled={index === files.length - 1}
                          className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
                          title="Move down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => removeFile(index)}
                          className="p-2 text-red-500 hover:text-red-700 rounded-lg hover:bg-white transition-colors"
                          title="Remove file"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-red-700 font-semibold">Merge Failed</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Enhanced Merge Button */}
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <button
                onClick={handleMerge}
                disabled={files.length < 2}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all transform ${
                  files.length >= 2
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Merge {files.length} PDF{files.length !== 1 ? 's' : ''} Now
              </button>
              
              <p className="text-gray-600 text-sm mt-3">
                {files.length >= 2 
                  ? `Estimated output size: ${Math.round(files.reduce((acc, file) => acc + file.size, 0) / 1024 / 1024)} MB`
                  : 'At least 2 files are required for merging'
                }
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}