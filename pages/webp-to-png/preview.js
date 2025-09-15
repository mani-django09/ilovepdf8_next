// pages/webp-to-png/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, Image, Download, AlertCircle, ArrowRight } from 'lucide-react'

export default function WebpToPngPreview() {
  const [images, setImages] = useState([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [preserveTransparency, setPreserveTransparency] = useState(true)
  const [imagePreviews, setImagePreviews] = useState([])
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertImageFiles) {
        const storedImages = window.convertImageFiles
        
        if (storedImages.length === 0) {
          router.push('/webp-to-png')
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
        router.push('/webp-to-png')
      }
    }, 600)

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
      
      formData.append('preserveTransparency', preserveTransparency)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      const response = await fetch('/api/webp-to-png', {
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
      
      router.push('/webp-to-png/download')

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
          <div className="text-center bg-white rounded-lg shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-200 border-t-purple-600 mx-auto mb-3"></div>
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading Preview</h2>
            <p className="text-gray-600 text-sm">Analyzing images...</p>
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
          <div className="text-center max-w-sm">
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">Converting Images</h2>
            <p className="text-gray-600 mb-4 text-sm">Converting WebP images to PNG format...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Processing...' : progress < 90 ? 'Converting...' : 'Finishing!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert WebP to PNG - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-6">
          <div className="max-w-4xl mx-auto px-4">
            {/* Compact Header */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => router.push('/webp-to-png')}
                  className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back</span>
                </button>
                
                {/* Progress Steps */}
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs font-bold">✓</div>
                    <span className="text-purple-600 font-medium">Upload</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-purple-600 font-medium">Convert</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <div className="flex items-center space-x-1">
                    <div className="w-5 h-5 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500 text-xs">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                WebP to PNG Conversion
              </h1>
              <p className="text-gray-600 text-sm">
                Review and convert your WebP images to PNG format.
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
              {/* Minimal Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h2 className="font-semibold text-gray-900 mb-3 text-sm">Settings</h2>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={preserveTransparency}
                          onChange={(e) => setPreserveTransparency(e.target.checked)}
                          className="mr-2 text-purple-600"
                        />
                        <span className="text-gray-700">Preserve Transparency</span>
                      </label>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3">
                      <h4 className="text-xs font-semibold text-purple-900 mb-1">Conversion Info</h4>
                      <ul className="text-xs text-purple-800 space-y-0.5">
                        <li>• Lossless quality</li>
                        <li>• Universal compatibility</li>
                        <li>• Transparency support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Summary</h3>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Images:</span>
                      <span className="font-medium text-gray-900">{images.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium text-gray-900">PNG</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Image Preview Grid */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <h2 className="font-semibold text-gray-900 mb-3 text-sm">
                    Images to Convert ({imagePreviews.length})
                  </h2>

                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 max-h-64 overflow-y-auto">
                    {imagePreviews.map((preview) => (
                      <div key={preview.id} className="bg-gray-50 rounded p-2">
                        <div className="aspect-square bg-white rounded mb-1 overflow-hidden shadow-sm">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-gray-900 truncate" title={preview.name}>
                            {preview.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="bg-purple-100 text-purple-800 px-1 py-0.5 rounded text-xs font-medium">
                              WebP
                            </span>
                            <span className="text-xs text-gray-400">→</span>
                            <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded text-xs font-medium">
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
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 font-medium text-sm">Conversion Error</p>
                      <p className="text-red-600 text-xs">{error}</p>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!images || images.length === 0}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      images && images.length > 0
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to PNG Format
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-2">
                    Convert {images.length} WebP image{images.length !== 1 ? 's' : ''} to PNG
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