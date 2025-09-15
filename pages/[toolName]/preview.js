// pages/[toolName]/preview.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PreviewPage from '../../components/PreviewPage'

const toolConfigs = {
  'pdf-to-word': {
    title: 'PDF to Word Converter',
    description: 'Convert PDF documents to editable Word files'
  },
  'word-to-pdf': {
    title: 'Word to PDF Converter',
    description: 'Convert Word documents to PDF format'
  },
  'jpg-to-pdf': {
    title: 'JPG to PDF Converter',
    description: 'Convert JPG images to PDF documents'
  },
  'pdf-to-jpg': {
    title: 'PDF to JPG Converter',
    description: 'Convert PDF pages to JPG images'
  }
}

export default function Preview() {
  const router = useRouter()
  const { toolName } = router.query
  const [files, setFiles] = useState([])
  
  const config = toolConfigs[toolName]

  useEffect(() => {
    // Retrieve files from sessionStorage (in a real app, you might use a more robust solution)
    const savedFiles = sessionStorage.getItem('selectedFiles')
    if (savedFiles) {
      try {
        const fileData = JSON.parse(savedFiles)
        // Convert back to File-like objects for display
        setFiles(fileData)
      } catch (error) {
        console.error('Error loading files:', error)
        router.push(`/${toolName}`)
      }
    } else {
      router.push(`/${toolName}`)
    }
  }, [toolName, router])

  if (!config) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Back to Home
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Head>
        <title>{config.title} - Preview Files</title>
        <meta name="description" content={`Preview and convert your files with ${config.title}`} />
      </Head>
      
      <Layout>
        <PreviewPage 
          toolName={toolName}
          toolTitle={config.title}
          files={files}
          setFiles={setFiles}
        />
      </Layout>
    </>
  )
}