// pages/merge-pdf/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, FileText, Download, AlertCircle, Plus, ArrowRight } from 'lucide-react'

export default function MergePdfPreview() {
  const [files, setFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.mergeFiles) {
        const storedFiles = window.mergeFiles
        const validFiles = storedFiles.filter(file => file && file.size > 0)
        
        if (validFiles.length === 0) {
          router.push('/merge-pdf')
          return
        }
        
        setFiles(validFiles)
        setIsLoading(false)
      } else {
        router.push('/merge-pdf')
      }
    }, 1000)

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

    try {
      const formData = new FormData()
      
      files.forEach((file) => {
        formData.append('files', file)
      })

      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 300)

      const response = await fetch('/api/merge-pdf', {
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

      // Store for download page
      const url = URL.createObjectURL(blob)
      const fileName = `merged-pdf-${new Date().getTime()}.pdf`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.mergeFiles
      }
      
      router.push('/merge-pdf/download')

    } catch (error) {
      setError(`Failed to merge PDFs: ${error.message}`)
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600">Preparing your files...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Processing state
  if (isUploading) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="relative mb-8">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Merging PDFs</h2>
            <p className="text-gray-600 mb-6">Processing {files.length} files...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Reading files...' : progress < 90 ? 'Combining pages...' : 'Almost done!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Preview & Merge PDFs - Arrange Your Documents</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/merge-pdf')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
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
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-600 font-medium">Preview</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Review & Arrange PDFs
              </h1>
              <p className="text-gray-600">
                Reorder files as needed. First file appears first in the merged document.
              </p>
            </div>

            {/* Files List */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Files to Merge ({files.length})
                </h2>
                <button
                  onClick={() => router.push('/merge-pdf')}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Add more files
                </button>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={`${file.name}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-4">
                      <div className="bg-red-500 rounded-lg p-2">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 truncate max-w-xs" title={file.name}>
                          {file.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                        #{index + 1}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        className="p-2 text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 text-red-500 hover:text-red-700 rounded"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Error</p>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Merge Button */}
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <button
                onClick={handleMerge}
                disabled={files.length < 2}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  files.length >= 2
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Merge {files.length} PDF{files.length > 1 ? 's' : ''}
              </button>
              
              <p className="text-gray-600 text-sm mt-3">
                {files.length >= 2 
                  ? `Combine ${files.length} files into one document`
                  : 'At least 2 files required'
                }
              </p>
            </div>
          </div>
        </div>
      </Layout>
      </>
  )
}