// components/WordUploader.js
import { useState, useCallback, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function WordUploader({ onFilesSelect, toolName }) {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  // Define accepted file types for Word documents
  const getAcceptedTypes = () => {
    return [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
  }

  const getAcceptedExtensions = () => {
    return ['.doc', '.docx']
  }

  // Validate Word document
  const validateFile = (file) => {
    const acceptedTypes = getAcceptedTypes()
    const acceptedExtensions = getAcceptedExtensions()
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    const isValidSize = file.size > 0 && file.size <= 100 * 1024 * 1024 // 100MB
    
    let isValidType = false
    let isValidExtension = false
    let reason = ''

    // Check MIME type
    if (file.type && acceptedTypes.includes(file.type)) {
      isValidType = true
    }
    
    // Check file extension
    if (acceptedExtensions.includes(fileExtension)) {
      isValidExtension = true
    }

    if (!isValidSize) {
      reason = 'File too large (max 100MB)'
    } else if (!isValidType && !isValidExtension) {
      reason = 'Only Word documents (.doc, .docx) are allowed'
    }

    const isValid = (isValidType || isValidExtension) && isValidSize && reason === ''

    return {
      isValid: isValid,
      type: file.type,
      extension: fileExtension,
      size: file.size,
      reason: reason || 'Valid'
    }
  }

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles)
    const validFiles = []
    const invalidFiles = []
    
    console.log(`Processing ${fileArray.length} files for ${toolName}`)
    
    fileArray.forEach(file => {
      console.log(`Validating file: ${file.name}, type: ${file.type}, size: ${file.size}`)
      const validation = validateFile(file)
      console.log(`Validation result:`, validation)
      
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        invalidFiles.push({
          name: file.name,
          reason: validation.reason
        })
      }
    })

    console.log(`Valid files: ${validFiles.length}, Invalid files: ${invalidFiles.length}`)

    if (validFiles.length === 0) {
      if (invalidFiles.length > 0) {
        const errorDetails = invalidFiles.map(f => `${f.name}: ${f.reason}`).join('\n')
        alert(`Please select valid Word documents (.doc or .docx files).\n\nIssues found:\n${errorDetails}`)
      } else {
        alert('Please select valid Word documents (.doc or .docx files).')
      }
      return
    }

    if (invalidFiles.length > 0) {
      const errorDetails = invalidFiles.map(f => `${f.name}: ${f.reason}`).join('\n')
      alert(`Some files were skipped:\n${errorDetails}`)
    }

    // Take only the first file (single file upload)
    const selectedFile = [validFiles[0]]
    setFiles(selectedFile)
    onFilesSelect(selectedFile)
  }

  const removeFile = () => {
    setFiles([])
    onFilesSelect([])
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

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
            ? 'border-indigo-500 bg-indigo-50' 
            : 'border-gray-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'
        }`}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="pointer-events-none">
          <div className="flex justify-center mb-6">
            <div className={`bg-indigo-100 rounded-full p-4 ${dragActive ? 'animate-bounce' : ''}`}>
              <Upload className="w-10 h-10 text-indigo-600" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {dragActive ? 'Drop files here' : 'Select Word documents'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            Drag and drop your Word files or click to browse
          </p>

          <button
            type="button"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors pointer-events-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Word Files
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Up to 100MB per file • DOC, DOCX formats supported
          </p>
        </div>
      </div>

      {/* Selected File */}
      {files.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Selected Document ({files.length})
            </h4>
          </div>
          
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-500" />
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
                  onClick={removeFile}
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