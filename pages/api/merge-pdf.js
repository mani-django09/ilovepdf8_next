// pages/api/merge-pdf.js
import formidable from 'formidable'
import { PDFDocument } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  console.log('=== MERGE PDF API START ===')
  console.log('Method:', req.method)
  
  if (req.method !== 'POST') {
    console.log('Invalid method:', req.method)
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let tempFiles = []

  try {
    console.log('Starting file parsing...')

    // Create formidable parser
    const form = formidable({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024, // 100MB
      uploadDir: path.join(process.cwd(), 'temp')
    })

    // Ensure temp directory exists
    const tempDir = path.join(process.cwd(), 'temp')
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true })
      console.log('Created temp directory:', tempDir)
    }

    // Parse the incoming form
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err)
          reject(err)
        } else {
          console.log('Form parsed successfully')
          console.log('Fields:', Object.keys(fields))
          console.log('Files:', Object.keys(files))
          resolve([fields, files])
        }
      })
    })

    // Handle files array
    let fileArray = []
    if (files.files) {
      fileArray = Array.isArray(files.files) ? files.files : [files.files]
    }

    console.log(`Found ${fileArray.length} files`)
    fileArray.forEach((file, index) => {
      console.log(`File ${index + 1}:`, {
        name: file.originalFilename,
        size: file.size,
        path: file.filepath,
        type: file.mimetype
      })
    })

    if (fileArray.length < 2) {
      return res.status(400).json({ error: 'At least 2 PDF files are required' })
    }

    // Track temp files for cleanup
    tempFiles = fileArray.map(f => f.filepath)

    console.log('Starting PDF merge process...')

    // Create new PDF document
    const mergedPdf = await PDFDocument.create()
    
    // Process each file
    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i]
      console.log(`Processing file ${i + 1}: ${file.originalFilename}`)
      
      try {
        // Check if file exists
        if (!fs.existsSync(file.filepath)) {
          throw new Error(`File not found: ${file.filepath}`)
        }

        // Check file size
        const stats = fs.statSync(file.filepath)
        console.log(`File ${file.originalFilename} size on disk: ${stats.size} bytes`)
        
        if (stats.size === 0) {
          throw new Error(`File is empty: ${file.originalFilename}`)
        }

        // Read file content
        const pdfBytes = fs.readFileSync(file.filepath)
        console.log(`Read ${pdfBytes.length} bytes from ${file.originalFilename}`)
        
        // Load PDF
        const pdf = await PDFDocument.load(pdfBytes)
        const pageCount = pdf.getPageCount()
        console.log(`${file.originalFilename} has ${pageCount} pages`)
        
        // Copy pages
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page)
        })
        
        console.log(`Successfully processed ${file.originalFilename}`)
        
      } catch (fileError) {
        console.error(`Error processing ${file.originalFilename}:`, fileError)
        throw new Error(`Failed to process ${file.originalFilename}: ${fileError.message}`)
      }
    }

    console.log('All files processed. Generating merged PDF...')

    // Generate final PDF
    const mergedPdfBytes = await mergedPdf.save()
    console.log(`Generated merged PDF: ${mergedPdfBytes.length} bytes`)
    
    // Clean up temp files
    console.log('Cleaning up temp files...')
    tempFiles.forEach(filepath => {
      try {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
          console.log(`Deleted temp file: ${filepath}`)
        }
      } catch (e) {
        console.error('Error cleaning up temp file:', filepath, e.message)
      }
    })
    
    // Send response
    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="merged-document.pdf"')
    res.setHeader('Content-Length', mergedPdfBytes.length)
    
    console.log('=== MERGE PDF API SUCCESS ===')
    return res.send(Buffer.from(mergedPdfBytes))

  } catch (error) {
    console.error('=== MERGE PDF API ERROR ===')
    console.error('Error details:', error)
    console.error('Stack trace:', error.stack)
    
    // Clean up temp files on error
    tempFiles.forEach(filepath => {
      try {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath)
          console.log(`Cleaned up temp file on error: ${filepath}`)
        }
      } catch (e) {
        console.error('Error cleaning up temp file on error:', e)
      }
    })
    
    return res.status(500).json({ 
      error: 'Failed to merge PDFs',
      details: error.message
    })
  }
}