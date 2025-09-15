// pages/jpg-to-pdf/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, ArrowUp, ArrowDown, Trash2, Image, Download, AlertCircle, Plus, ArrowRight } from 'lucide-react'

export default function JpgToPdfPreview() {
  const [images, setImages] = useState([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState('A4')
  const [orientation, setOrientation] = useState('portrait')
  const [imagePerPage, setImagePerPage] = useState('1')
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.convertImages) {
        const storedImages = window.convertImages
        const validImages = storedImages.filter(image => image && image.size > 0)
        
        if (validImages.length === 0) {
          router.push('/jpg-to-pdf')
          return
        }
        
        setImages(validImages)
        setIsLoading(false)
      } else {
        router.push('/jpg-to-pdf')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  const moveImage = (index, direction) => {
    const newImages = [...images]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex >= 0 && targetIndex < images.length) {
      [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]]
      setImages(newImages)
      if (typeof window !== 'undefined') {
        window.convertImages = newImages
      }
    }
  }

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
    
    if (typeof window !== 'undefined') {
      window.convertImages = newImages
    }
    
    if (newImages.length === 0) {
      router.push('/jpg-to-pdf')
    }
  }

  const handleConvert = async () => {
    if (images.length === 0) {
      setError('Please select at least one image to convert')
      return
    }

    setIsConverting(true)
    setError('')
    setProgress(0)

    try {
      const formData = new FormData()
      
      images.forEach((image) => {
        formData.append('images', image)
      })
      
      formData.append('pageSize', pageSize)
      formData.append('orientation', orientation)
      formData.append('imagePerPage', imagePerPage)

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

      const response = await fetch('/api/jpg-to-pdf', {
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
      const fileName = `converted-images-${new Date().getTime()}.pdf`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertImages
      }
      
      router.push('/jpg-to-pdf/download')

    } catch (error) {
      setError(`Failed to convert images: ${error.message}`)
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
            <p className="text-gray-600">Analyzing your images...</p>
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
                <Image className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Converting to PDF</h2>
            <p className="text-gray-600 mb-6">Processing {images.length} images...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Reading images...' : progress < 90 ? 'Creating PDF...' : 'Almost done!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Preview & Convert Images to PDF - Customize Your Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-6xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/jpg-to-pdf')}
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
                    <span className="text-green-600 font-medium">Preview</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Review Images & PDF Settings
              </h1>
              <p className="text-gray-600">
                Customize your PDF settings and arrange image order before conversion.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">PDF Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Portrait
                        </button>
                        <button
                          onClick={() => setOrientation('landscape')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            orientation === 'landscape'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Landscape
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Images per Page</label>
                      <select
                        value={imagePerPage}
                        onChange={(e) => setImagePerPage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      >
                        <option value="1">1 image per page</option>
                        <option value="2">2 images per page</option>
                        <option value="4">4 images per page</option>
                        <option value="auto">Auto fit</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Total Images:</span>
                      <span className="font-medium text-gray-900">{images.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page Size:</span>
                      <span className="font-medium text-gray-900">{pageSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orientation:</span>
                      <span className="font-medium text-gray-900">{orientation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Layout:</span>
                      <span className="font-medium text-gray-900">{imagePerPage === '1' ? '1 per page' : `${imagePerPage} per page`}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Images to Convert ({images.length})
                    </h2>
                    <button
                      onClick={() => router.push('/jpg-to-pdf')}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      Add more images
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {images.map((image, index) => (
                      <div key={`${image.name}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-4">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={image.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="font-medium text-gray-900 truncate max-w-xs" title={image.name}>
                              {image.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {(image.size / 1024 / 1024).toFixed(2)} MB • {image.type}
                            </p>
                          </div>
                          <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                            #{index + 1}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => moveImage(index, 'up')}
                            disabled={index === 0}
                            className="p-2 text-gray-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Move up"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => moveImage(index, 'down')}
                            disabled={index === images.length - 1}
                            className="p-2 text-gray-500 hover:text-green-600 disabled:opacity-30 disabled:cursor-not-allowed rounded"
                            title="Move down"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => removeImage(index)}
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

                {/* Convert Button */}
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={images.length === 0}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      images.length > 0
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert {images.length} Image{images.length !== 1 ? 's' : ''} to PDF
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    {images.length > 0 
                      ? `Create PDF with ${images.length} image${images.length !== 1 ? 's' : ''}`
                      : 'Select images to convert'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}