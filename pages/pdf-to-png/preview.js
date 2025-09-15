// pages/png-to-pdf/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, FileText, Download, AlertCircle, ArrowRight, GripVertical } from 'lucide-react'

export default function PngToPdfPreview() {
  const [images, setImages] = useState([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [pageSize, setPageSize] = useState('A4')
  const [orientation, setOrientation] = useState('portrait')
  const [layout, setLayout] = useState('fit')
  const [imagePreviews, setImagePreviews] = useState([])
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertImageFiles) {
        const storedImages = window.convertImageFiles
        
        if (storedImages.length === 0) {
          router.push('/png-to-pdf')
          return
        }
        
        setImages(storedImages)
        
        const previews = storedImages.map((image, index) => ({
          id: index,
          name: image.name,
          size: image.size,
          url: URL.createObjectURL(image),
          type: image.type
        }))
        
        setImagePreviews(previews)
        setIsLoading(false)
      } else {
        router.push('/png-to-pdf')
      }
    }, 800)

    return () => clearTimeout(timer)
  }, [router])

  const handleConvert = async () => {
    if (!images || images.length === 0) {
      setError('No images selected')
      return
    }

    setIsConverting(true)
    setError('')
    setProgress(0)

    try {
      const formData = new FormData()
      images.forEach(image => {
        formData.append('images', image)
      })
      formData.append('pageSize', pageSize)
      formData.append('orientation', orientation)
      formData.append('layout', layout)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 400)

      const response = await fetch('/api/png-to-pdf', {
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
      const fileName = `images-to-pdf-${new Date().getTime()}.pdf`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertImageFiles
      }
      
      router.push('/png-to-pdf/download')

    } catch (error) {
      setError(`Failed to create PDF: ${error.message}`)
    } finally {
      setIsConverting(false)
      setProgress(0)
    }
  }

  const moveImage = (fromIndex, toIndex) => {
    const newPreviews = [...imagePreviews]
    const newImages = [...images]
    
    const [movedPreview] = newPreviews.splice(fromIndex, 1)
    const [movedImage] = newImages.splice(fromIndex, 1)
    
    newPreviews.splice(toIndex, 0, movedPreview)
    newImages.splice(toIndex, 0, movedImage)
    
    setImagePreviews(newPreviews)
    setImages(newImages)
  }

  // Compact Loading state
  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white rounded-lg shadow-sm p-6 max-w-sm w-full mx-4">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600 text-sm">Analyzing PNG images...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // Compact Converting state
  if (isConverting) {
    return (
      <Layout>
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center max-w-sm">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Creating PDF</h2>
            <p className="text-gray-600 mb-4 text-sm">Converting PNG images to PDF...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-xs text-gray-500">
              {progress < 50 ? 'Processing images...' : progress < 90 ? 'Generating PDF...' : 'Almost done!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Create PDF from PNG Images - Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-4xl mx-auto px-6">
            {/* Compact Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => router.push('/png-to-pdf')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                
                {/* Compact Progress Steps */}
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-blue-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-2">
                PNG to PDF Settings
              </h1>
              <p className="text-gray-600 text-sm">
                Configure your PDF layout and settings.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Compact Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">PDF Settings</h2>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Size</label>
                      <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                              ? 'bg-blue-100 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Portrait
                        </button>
                        <button
                          onClick={() => setOrientation('landscape')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            orientation === 'landscape'
                              ? 'bg-blue-100 border-blue-500 text-blue-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Landscape
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="layout"
                            value="fit"
                            checked={layout === 'fit'}
                            onChange={(e) => setLayout(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Fit to page</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="layout"
                            value="fill"
                            checked={layout === 'fill'}
                            onChange={(e) => setLayout(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Fill page</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="layout"
                            value="original"
                            checked={layout === 'original'}
                            onChange={(e) => setLayout(e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Original size</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compact Summary */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm">Summary</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Images:</span>
                      <span className="font-medium text-gray-900">{images.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Size:</span>
                      <span className="font-medium text-gray-900">
                        {(images.reduce((sum, img) => sum + img.size, 0) / 1024 / 1024).toFixed(1)} MB
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Page Size:</span>
                      <span className="font-medium text-gray-900">{pageSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orientation:</span>
                      <span className="font-medium text-gray-900 capitalize">{orientation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Images Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    PNG Images ({images.length}) - Drag to reorder
                  </h2>

                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={preview.id}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border cursor-move hover:bg-gray-100 transition-colors"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', index.toString())
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault()
                          const fromIndex = parseInt(e.dataTransfer.getData('text/plain'))
                          moveImage(fromIndex, index)
                        }}
                      >
                        <div className="flex-shrink-0">
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-shrink-0">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                              Page {index + 1}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs font-bold">
                              PNG
                            </span>
                          </div>
                          <p className="font-medium text-gray-900 truncate text-sm" title={preview.name}>
                            {preview.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(preview.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <div className="text-green-600 text-xs font-medium">
                          Ready
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 flex items-start space-x-3">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-red-700 font-medium text-sm">Conversion Error</p>
                      <p className="text-red-600 text-xs">{error}</p>
                    </div>
                  </div>
                )}

                {/* Compact Convert Button */}
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!images.length}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      images.length
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Create PDF Document
                  </button>
                  
                  <p className="text-gray-600 text-xs mt-2">
                    Convert PNG images to professional PDF
                  </p>
                  
                  <p className="text-gray-500 text-xs mt-1">
                    {images.length} image{images.length !== 1 ? 's' : ''} → {images.length} PDF page{images.length !== 1 ? 's' : ''}
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