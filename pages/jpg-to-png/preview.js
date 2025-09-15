// pages/jpg-to-png/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, Image, Download, AlertCircle, ArrowRight } from 'lucide-react'

export default function JpgToPngPreview() {
  const [images, setImages] = useState([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [compressionLevel, setCompressionLevel] = useState('6')
  const [imagePreviews, setImagePreviews] = useState([])
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertImageFiles) {
        const storedImages = window.convertImageFiles
        
        if (storedImages.length === 0) {
          router.push('/jpg-to-png')
          return
        }
        
        setImages(storedImages)

        // Generate image previews
        const previews = await Promise.all(
          storedImages.map(async (image, index) => {
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onload = (e) => {
                const img = new window.Image()
                img.onload = () => {
                  resolve({
                    id: index,
                    name: image.name,
                    size: image.size,
                    url: e.target.result,
                    dimensions: { width: img.width, height: img.height },
                    type: image.type
                  })
                }
                img.src = e.target.result
              }
              reader.readAsDataURL(image)
            })
          })
        )
        
        setImagePreviews(previews)
        setIsLoading(false)
      } else {
        router.push('/jpg-to-png')
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
      
      images.forEach((image) => {
        formData.append('images', image)
      })
      
      formData.append('compressionLevel', compressionLevel)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 12
        })
      }, 400)

      const response = await fetch('/api/jpg-to-png', {
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
      const fileName = images.length === 1 
        ? `converted-${images[0].name.replace(/\.[^/.]+$/, '')}.png`
        : `converted-images-${new Date().getTime()}.zip`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertImageFiles
      }
      
      router.push('/jpg-to-png/download')

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
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600">Analyzing images...</p>
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
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Converting Images</h2>
            <p className="text-gray-600 mb-6">Converting JPG images to PNG format...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Processing images...' : progress < 90 ? 'Converting format...' : 'Almost done!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert JPG to PNG - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-5xl mx-auto px-4">
            {/* Compact Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/jpg-to-png')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-blue-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-blue-600 font-medium">Convert</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                JPG to PNG Conversion
              </h1>
              <p className="text-gray-600">
                Review your images and customize conversion settings.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Compact Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">PNG Compression</label>
                      <select
                        value={compressionLevel}
                        onChange={(e) => setCompressionLevel(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="0">No Compression</option>
                        <option value="3">Low Compression</option>
                        <option value="6">Standard Compression</option>
                        <option value="9">Maximum Compression</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">PNG Benefits</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• Lossless quality</li>
                        <li>• Transparency support</li>
                        <li>• Perfect for graphics</li>
                        <li>• Web-friendly format</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Images:</span>
                      <span className="font-medium text-gray-900">{images.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium text-gray-900">PNG</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium text-gray-900">Lossless</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Preview Grid */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Images to Convert ({imagePreviews.length})
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-80 overflow-y-auto">
                    {imagePreviews.map((preview) => (
                      <div key={preview.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="aspect-square bg-white rounded-lg mb-2 overflow-hidden shadow-sm">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900 truncate" title={preview.name}>
                            {preview.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {preview.dimensions.width}×{preview.dimensions.height}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium">
                              JPG
                            </span>
                            <span className="text-xs text-gray-400">→</span>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              PNG
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium">Conversion Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!images || images.length === 0}
                    className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
                      images && images.length > 0
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to PNG Format
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Convert {images.length} JPG image{images.length !== 1 ? 's' : ''} to PNG format
                  </p>
                  
                  <p className="text-gray-500 text-xs mt-2">
                    Lossless conversion with transparency support
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