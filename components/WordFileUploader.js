// components/WordFileUploader.js
import { useState, useCallback, useRef } from 'react'
import { Upload, FileText, X } from 'lucide-react'

export default function WordFileUploader({ onFilesSelect }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFile = (newFile) => {
    if (!newFile) return

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
      'application/vnd.ms-word'
    ]
    
    const isValidType = validTypes.includes(newFile.type) || 
                       newFile.name.toLowerCase().endsWith('.doc') ||
                       newFile.name.toLowerCase().endsWith('.docx')
    
    if (!isValidType) {
      alert('Please select a valid Word document (.doc or .docx)')
      return
    }

    if (newFile.size > 50 * 1024 * 1024) { // 50MB limit
      alert('File size must be less than 50MB')
      return
    }

    setFile(newFile)
    onFilesSelect([newFile])
  }

  const removeFile = () => {
    setFile(null)
    onFilesSelect([])
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
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
          accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
            {dragActive ? 'Drop Word document here' : 'Select Word document'}
          </h3>
          
          <p className="text-gray-600 mb-6">
            Drag and drop your DOC or DOCX file or click to browse
          </p>

          <button
            type="button"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors pointer-events-auto"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Word File
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Up to 50MB • DOC, DOCX formats supported
          </p>
        </div>
      </div>

      {/* Selected File */}
      {file && (
        <div className="mt-6 bg-white rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Selected File</h4>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-lg p-2">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate" title={file.name}>
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Word Document
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
        </div>
      )}
    </div>
  )
}