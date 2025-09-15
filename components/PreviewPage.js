// components/PreviewPage.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft, Plus, Trash2, Download } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

export default function PreviewPage({ toolName, toolTitle, files, setFiles }) {
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const removeFile = (fileToRemove) => {
    const newFiles = files.filter(file => file !== fileToRemove)
    setFiles(newFiles)
  }

  const addMoreFiles = () => {
    router.push(`/${toolName}`)
  }

  const startConversion = async () => {
    if (files.length === 0) {
      setError('Please select at least one file.')
      return
    }

    setIsConverting(true)
    setError('')

    try {
      const formData = new FormData()
      
      if (files.length === 1) {
        formData.append('file', files[0])
      } else {
        files.forEach(file => {
          formData.append('files', file)
        })
      }

      const response = await fetch(`/api/tools/${toolName}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      // Store conversion result and redirect
      const result = await response.blob()
      const url = URL.createObjectURL(result)
      
      // Store in sessionStorage for download page
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', `converted-${Date.now()}.${getOutputExtension()}`)
      
      router.push(`/${toolName}/download`)
    } catch (error) {
      console.error('Conversion error:', error)
      setError('Conversion failed. Please try again.')
    } finally {
      setIsConverting(false)
    }
  }

  const getOutputExtension = () => {
    const extensions = {
      'pdf-to-word': 'docx',
      'word-to-pdf': 'pdf',
      'jpg-to-pdf': 'pdf',
      'pdf-to-jpg': 'jpg',
      'merge-pdf': 'pdf',
      'compress-pdf': 'pdf'
    }
    return extensions[toolName] || 'pdf'
  }

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase()
    switch (ext) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📃'
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️'
      default: return '📎'
    }
  }

  if (isConverting) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner text={`Converting your ${files.length > 1 ? 'files' : 'file'}...`} />
          <p className="text-gray-600 mt-4">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.push(`/${toolName}`)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Upload</span>
            </button>
            <div className="text-sm text-gray-500">
              Step 2 of 3
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{toolTitle}</h1>
          <p className="text-gray-600">Review your files and start the conversion</p>
        </div>

        {/* Files Preview */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Selected Files ({files.length})
            </h2>
            <button
              onClick={addMoreFiles}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add More</span>
            </button>
          </div>

          {files.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No files selected</p>
              <button
                onClick={addMoreFiles}
                className="mt-4 btn-primary"
              >
                <Plus className="w-4 h-4" />
                <span>Add Files</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">{getFileIcon(file.name)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(file)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Convert Button */}
        <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
          <button
            onClick={startConversion}
            disabled={files.length === 0 || isConverting}
            className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-5 h-5" />
            <span>Convert {files.length > 1 ? 'Files' : 'File'}</span>
          </button>
          
          {files.length > 0 && (
            <p className="text-gray-500 text-sm mt-3">
              Ready to convert {files.length} {files.length === 1 ? 'file' : 'files'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}