// pages/png-to-webp/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import { ArrowLeft, Image, Download, AlertCircle, ArrowRight } from 'lucide-react'

export default function PngToWebpPreview() {
  const [images, setImages] = useState([])
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [quality, setQuality] = useState('80')
  const [compressionMode, setCompressionMode] = useState('lossy')
  const [imagePreviews, setImagePreviews] = useState([])
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (typeof window !== 'undefined' && window.convertImageFiles) {
        const storedImages = window.convertImageFiles
        
        if (storedImages.length === 0) {
          router.push('/png-to-webp')
          return
        }
        
        setImages(storedImages)
        
        // Generate image previews
        const previews = storedImages.map(image => ({
          name: image.name,
          size: image.size,
          url: URL.createObjectURL(image),
          type: image.type
        }))
        
        setImagePreviews(previews)
        setIsLoading(false)
      } else {
        router.push('/png-to-webp')
      }
    }, 1000)

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
      formData.append('quality', quality)
      formData.append('compressionMode', compressionMode)

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 15
        })
      }, 500)

      const response = await fetch('/api/png-to-webp', {
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
        ? `${images[0].name.replace(/\.[^/.]+$/, '')}.webp`
        : `converted-images-${new Date().getTime()}.zip`
      
      sessionStorage.setItem('downloadUrl', url)
      sessionStorage.setItem('fileName', fileName)
      sessionStorage.setItem('fileSize', (blob.size / 1024 / 1024).toFixed(2))

      if (typeof window !== 'undefined') {
        delete window.convertImageFiles
      }
      
      router.push('/png-to-webp/download')

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
            <p className="text-gray-600">Analyzing PNG images...</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Converting PNG to WebP</h2>
            <p className="text-gray-600 mb-6">Optimizing your images with WebP compression...</p>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              {progress < 50 ? 'Processing images...' : progress < 90 ? 'Applying compression...' : 'Almost done!'}
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>Convert PNG to WebP - Customize Settings</title>
      </Head>
      
      <Layout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => router.push('/png-to-webp')}
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
                    <span className="text-green-600 font-medium">Settings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-gray-500">Download</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                PNG to WebP Conversion Settings
              </h1>
              <p className="text-gray-600">
                Customize compression settings for optimal file size and quality balance.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Settings Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Compression Settings</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compression Mode</label>
                      <div className="grid grid-cols-1 gap-2">
                        <button
                          onClick={() => setCompressionMode('lossless')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            compressionMode === 'lossless'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Lossless (Perfect Quality)
                        </button>
                        <button
                          onClick={() => setCompressionMode('lossy')}
                          className={`px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            compressionMode === 'lossy'
                              ? 'bg-green-100 border-green-500 text-green-700'
                              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Lossy (Smaller Files)
                        </button>
                      </div>
                    </div>

                    {compressionMode === 'lossy' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quality Level: {quality}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Smaller</span>
                          <span>Better Quality</span>
                        </div>
                      </div>
                    )}

                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Quality Guide</h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>90-100%: Excellent quality, good compression</div>
                        <div>70-89%: Very good quality, better compression</div>
                        <div>50-69%: Good quality, maximum compression</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Conversion Summary</h3>
                  <div className="space-y-2 text-sm text-gray-600">
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
                      <span>Mode:</span>
                      <span className="font-medium text-gray-900 capitalize">{compressionMode}</span>
                    </div>
                    {compressionMode === 'lossy' && (
                      <div className="flex justify-between">
                        <span>Quality:</span>
                        <span className="font-medium text-gray-900">{quality}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Expected Reduction:</span>
                      <span className="font-medium text-green-600">
                        {compressionMode === 'lossless' ? '10-25%' : '25-50%'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Images Preview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Selected PNG Images ({images.length})
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border">
                        <div className="flex-shrink-0">
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="w-16 h-16 object-cover rounded-lg border"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate" title={preview.name}>
                            {preview.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(preview.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold inline-block mt-1">
                            PNG
                          </div>
                        </div>
                        <div className="text-green-600 text-sm font-medium">
                          Ready
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
                      <p className="text-red-700 font-medium">Conversion Error</p>
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  </div>
                )}

                {/* Convert Button */}
                <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                  <button
                    onClick={handleConvert}
                    disabled={!images.length}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                      images.length
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Convert to WebP Format
                  </button>
                  
                  <p className="text-gray-600 text-sm mt-3">
                    Convert PNG images to optimized WebP format
                  </p>
                  
                  <p className="text-gray-500 text-xs mt-2">
                    Expected file size reduction: {compressionMode === 'lossless' ? '10-25%' : '25-50%'}
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