// components/ImageUploader.js
import { useState, useCallback, useRef } from 'react'
import { Upload, Image, X, Plus } from 'lucide-react'

export default function ImageUploader({ onImagesSelect, accept, multiple, toolName }) {
  const [dragActive, setDragActive] = useState(false)
  const [images, setImages] = useState([])
  const fileInputRef = useRef(null)

  // Define accepted file types based on toolName
  const getAcceptedTypes = () => {
    switch (toolName) {
      case 'png-to-jpg':
        return ['image/png']
        case 'png-to-pdf':
        return ['image/png']
      case 'jpg-to-png':
        return ['image/jpeg', 'image/jpg']
      case 'webp-to-png':
        return ['image/webp']
      case 'png-to-webp':
        return ['image/png']
      case 'jpg-to-webp':
        return ['image/jpeg', 'image/jpg']
      case 'webp-to-jpg':
        return ['image/webp']
      default:
        return ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/bmp']
    }
  }

  // Get file extension validation
  const getAcceptedExtensions = () => {
    switch (toolName) {
      case 'png-to-jpg':
        return ['.png']
      case 'jpg-to-png':
        return ['.jpg', '.jpeg']
      case 'webp-to-png':
        return ['.webp']
      case 'png-to-webp':
        return ['.png']
      case 'jpg-to-webp':
        return ['.jpg', '.jpeg']
      case 'webp-to-jpg':
        return ['.webp']
      default:
        return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp']
    }
  }

  // Validate file type and size with strict checking
  const validateFile = (file) => {
    const acceptedTypes = getAcceptedTypes()
    const acceptedExtensions = getAcceptedExtensions()
    
    // Get file extension
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
    
    // Check file size (50MB limit)
    const isValidSize = file.size > 0 && file.size <= 50 * 1024 * 1024
    
    // Strict validation based on tool
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

    // Tool-specific validation
    switch (toolName) {
      case 'png-to-jpg':
        if (file.type !== 'image/png' && fileExtension !== '.png') {
          reason = 'Only PNG files are allowed'
        } else if (file.type === 'image/jpeg' || fileExtension === '.jpg' || fileExtension === '.jpeg') {
          reason = 'JPG files not allowed. This tool converts PNG to JPG.'
        }
        break
        
      case 'jpg-to-png':
        if (file.type !== 'image/jpeg' && fileExtension !== '.jpg' && fileExtension !== '.jpeg') {
          reason = 'Only JPG/JPEG files are allowed'
        } else if (file.type === 'image/png' || fileExtension === '.png') {
          reason = 'PNG files not allowed. This tool converts JPG to PNG.'
        }
        break
        
      case 'webp-to-png':
        if (file.type !== 'image/webp' && fileExtension !== '.webp') {
          reason = 'Only WebP files are allowed'
        } else if (file.type === 'image/png' || fileExtension === '.png') {
          reason = 'PNG files not allowed. This tool converts WebP to PNG.'
        }
        break
        
      case 'png-to-webp':
        if (file.type !== 'image/png' && fileExtension !== '.png') {
          reason = 'Only PNG files are allowed'
        } else if (file.type === 'image/webp' || fileExtension === '.webp') {
          reason = 'WebP files not allowed. This tool converts PNG to WebP.'
        }
        break
        
      case 'jpg-to-webp':
        if (file.type !== 'image/jpeg' && fileExtension !== '.jpg' && fileExtension !== '.jpeg') {
          reason = 'Only JPG/JPEG files are allowed'
        } else if (file.type === 'image/webp' || fileExtension === '.webp') {
          reason = 'WebP files not allowed. This tool converts JPG to WebP.'
        }
        break
        
      case 'webp-to-jpg':
        if (file.type !== 'image/webp' && fileExtension !== '.webp') {
          reason = 'Only WebP files are allowed'
        } else if (file.type === 'image/jpeg' || fileExtension === '.jpg' || fileExtension === '.jpeg') {
          reason = 'JPG files not allowed. This tool converts WebP to JPG.'
        }
        break
    }

    if (!isValidSize) {
      reason = 'File too large (max 50MB)'
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

  // Get error message based on tool
  const getErrorMessage = () => {
    switch (toolName) {
      case 'png-to-jpg':
        return 'Please select valid PNG files only. Other formats are not supported.'
      case 'jpg-to-png':
        return 'Please select valid JPG/JPEG files only. Other formats are not supported.'
      case 'webp-to-png':
        return 'Please select valid WebP files only. Other formats are not supported.'
      case 'png-to-webp':
        return 'Please select valid PNG files only. WebP and other formats are not supported.'
      case 'jpg-to-webp':
        return 'Please select valid JPG/JPEG files only. Other formats are not supported.'
      case 'webp-to-jpg':
        return 'Please select valid WebP files only. Other formats are not supported.'
      default:
        return 'Please select valid image files'
    }
  }

  // Get upload text based on tool
  const getUploadText = () => {
    switch (toolName) {
      case 'png-to-jpg':
        return {
          title: 'Select PNG images',
          subtitle: 'Drag and drop your PNG files or click to browse',
          button: 'Choose PNG Files',
          info: 'Up to 50MB per image • PNG format only'
        }
      case 'jpg-to-png':
        return {
          title: 'Select JPG images', 
          subtitle: 'Drag and drop your JPG/JPEG files or click to browse',
          button: 'Choose JPG Files',
          info: 'Up to 50MB per image • JPG, JPEG supported'
        }
      case 'webp-to-png':
        return {
          title: 'Select WebP images',
          subtitle: 'Drag and drop your WebP files or click to browse', 
          button: 'Choose WebP Files',
          info: 'Up to 50MB per image • WebP format only'
        }
      case 'png-to-webp':
        return {
          title: 'Select PNG images',
          subtitle: 'Drag and drop your PNG files or click to browse',
          button: 'Choose PNG Files',
          info: 'Up to 50MB per image • PNG format only'
        }
      case 'jpg-to-webp':
        return {
          title: 'Select JPG images',
          subtitle: 'Drag and drop your JPG/JPEG files or click to browse',
          button: 'Choose JPG Files',
          info: 'Up to 50MB per image • JPG, JPEG supported'
        }
      case 'webp-to-jpg':
        return {
          title: 'Select WebP images',
          subtitle: 'Drag and drop your WebP files or click to browse',
          button: 'Choose WebP Files',
          info: 'Up to 50MB per image • WebP format only'
        }
      default:
        return {
          title: 'Select images to convert',
          subtitle: 'Drag and drop your images or click to browse',
          button: 'Choose Images',
          info: 'Up to 50MB per image • Multiple formats supported'
        }
    }
  }

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles)
    const validFiles = []
    const invalidFiles = []
    
    console.log(`Processing ${fileArray.length} files for ${toolName}`)
    
    // Validate each file
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

    // Show error if no valid files
    if (validFiles.length === 0) {
      if (invalidFiles.length > 0) {
        const errorDetails = invalidFiles.map(f => `${f.name}: ${f.reason}`).join('\n')
        alert(`${getErrorMessage()}\n\nIssues found:\n${errorDetails}`)
      } else {
        alert(getErrorMessage())
      }
      return
    }

    // Show warning for invalid files but continue with valid ones
    if (invalidFiles.length > 0) {
      const errorDetails = invalidFiles.map(f => `${f.name}: ${f.reason}`).join('\n')
      alert(`Some files were skipped:\n${errorDetails}`)
    }

    // Update state
    const updatedFiles = multiple ? [...images, ...validFiles] : validFiles
    setImages(updatedFiles)
    onImagesSelect(updatedFiles)
  }

  const removeImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index)
    setImages(updatedImages)
    onImagesSelect(updatedImages)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [images, toolName])

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

  // Get theme colors based on tool
  const getThemeColors = () => {
    switch (toolName) {
      case 'png-to-jpg':
        return {
          border: dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50',
          icon: 'bg-green-100',
          iconColor: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          badge: 'bg-green-500',
          addMore: 'text-green-600 hover:text-green-700'
        }
      case 'jpg-to-png':
        return {
          border: dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50',
          icon: 'bg-blue-100',
          iconColor: 'text-blue-600', 
          button: 'bg-blue-600 hover:bg-blue-700',
          badge: 'bg-orange-500',
          addMore: 'text-blue-600 hover:text-blue-700'
        }
      case 'webp-to-png':
        return {
          border: dragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50',
          icon: 'bg-purple-100',
          iconColor: 'text-purple-600',
          button: 'bg-purple-600 hover:bg-purple-700',
          badge: 'bg-purple-500',
          addMore: 'text-purple-600 hover:text-purple-700'
        }
      case 'png-to-webp':
        return {
          border: dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50',
          icon: 'bg-green-100',
          iconColor: 'text-green-600',
          button: 'bg-green-600 hover:bg-green-700',
          badge: 'bg-blue-500',
          addMore: 'text-green-600 hover:text-green-700'
        }
      case 'jpg-to-webp':
        return {
          border: dragActive ? 'border-orange-500 bg-orange-50' : 'border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50',
          icon: 'bg-orange-100',
          iconColor: 'text-orange-600',
          button: 'bg-orange-600 hover:bg-orange-700',
          badge: 'bg-orange-500',
          addMore: 'text-orange-600 hover:text-orange-700'
        }
      case 'webp-to-jpg':
        return {
          border: dragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white hover:border-red-400 hover:bg-red-50',
          icon: 'bg-red-100',
          iconColor: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700',
          badge: 'bg-purple-500',
          addMore: 'text-red-600 hover:text-red-700'
        }
      default:
        return {
          border: dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50',
          icon: 'bg-blue-100',
          iconColor: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
          badge: 'bg-blue-500',
          addMore: 'text-blue-600 hover:text-blue-700'
        }
    }
  }

  // Get source format for badge display
  const getSourceFormat = () => {
    switch (toolName) {
      case 'png-to-jpg':
      case 'png-to-webp':
        return 'PNG'
      case 'jpg-to-png':
      case 'jpg-to-webp':
        return 'JPG'
      case 'webp-to-png':
      case 'webp-to-jpg':
        return 'WebP'
      default:
        return 'IMG'
    }
  }

  const uploadText = getUploadText()
  const themeColors = getThemeColors()
  const acceptedExtensions = getAcceptedExtensions()
  const sourceFormat = getSourceFormat()

  return (
    <div className="w-full">
      {/* Main Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${themeColors.border}`}
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedExtensions.join(',')}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="pointer-events-none">
          <div className="flex justify-center mb-6">
            <div className={`${themeColors.icon} rounded-full p-4 ${dragActive ? 'animate-bounce' : ''}`}>
              <Upload className={`w-10 h-10 ${themeColors.iconColor}`} />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            {dragActive ? 'Drop files here' : uploadText.title}
          </h3>
          
          <p className="text-gray-600 mb-6">
            {uploadText.subtitle}
          </p>

          <button
            type="button"
            className={`${themeColors.button} text-white px-8 py-3 rounded-lg font-semibold transition-colors pointer-events-auto`}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadText.button}
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            {uploadText.info}
          </p>
        </div>
      </div>

      {/* Selected Images */}
      {images.length > 0 && (
        <div className="mt-6 bg-white rounded-xl border p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">
              Selected Images ({images.length})
            </h4>
            {multiple && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`${themeColors.addMore} font-medium text-sm`}
              >
                Add more
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-64 overflow-y-auto">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-2">
                  <p className="text-xs font-medium text-gray-900 truncate" title={image.name}>
                    {image.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(image.size / 1024 / 1024).toFixed(1)} MB
                  </p>
                  <div className="mt-1">
                    <span className={`${themeColors.badge} text-white px-2 py-1 rounded text-xs font-bold`}>
                      {sourceFormat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}