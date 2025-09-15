// components/FileUploader.js
import { useState, useCallback, useRef } from 'react'
import { Upload, FileText, X, Plus } from 'lucide-react'

export default function FileUploader({ onFilesSelect, accept, multiple, toolName }) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles)
    const validFiles = fileArray.filter(file => 
      file.type === 'application/pdf' && file.size > 0
    )
    
    if (validFiles.length === 0) {
      alert('Please select valid PDF files')
      return
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
    setFiles(updatedFiles)
    onFilesSelect(updatedFiles)
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesSelect(updatedFiles)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [files])

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleDragEvents = (e, active) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(active)
  }

  return (
    <div className="w-full">
      {/* Main Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={Object.keys(accept).join(',')}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="pointer-events-none">
          <div className="flex justify-center mb-6">
            <div className={`bg-blue-100 rounded-full p-4 ${dragActive ? 'animate-bounce' : ''}`}>
              <Upload className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {dragActive ? 'Drop files here' : 'Select PDF files'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            Drag and drop your PDFs or click to browse
          </p>

          <button
            type="button"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors pointer-events-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Files
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Up to 100MB per file • PDF format only
          </p>
        </div>
      </div>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Selected Files ({files.length})
            </h4>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              Add more
            </button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  title="Remove file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}