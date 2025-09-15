// server/utils/enhanced-file-processors.js
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const mammoth = require('mammoth');
const archiver = require('archiver');
const { createWriteStream, createReadStream } = require('fs');

// Utility function to ensure temp directory exists
const ensureTempDir = async () => {
  const tempDir = path.join(process.cwd(), 'temp');
  try {
    await fs.access(tempDir);
  } catch {
    await fs.mkdir(tempDir, { recursive: true });
  }
  return tempDir;
};

// Cleanup function
const cleanupFiles = async (filePaths) => {
  for (const filePath of filePaths) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.warn(`Failed to cleanup file: ${filePath}`, error.message);
    }
  }
};

// Enhanced PDF to Word conversion
const pdfToWord = async (pdfPath) => {
  const tempDir = await ensureTempDir();
  const outputPath = path.join(tempDir, `converted-${Date.now()}.docx`);
  
  try {
    // Read PDF
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    
    // Extract text from PDF (simplified - in production, use a more robust library)
    let extractedText = `Document converted from PDF\nOriginal had ${pageCount} pages\n\n`;
    
    // For demo purposes, create a simple Word document
    // In production, use a library like pdf2docx or similar
    const officegen = require('officegen');
    const docx = officegen('docx');
    
    const pObj = docx.createP();
    pObj.addText(extractedText + 'This is a demo conversion. For production use, implement proper PDF text extraction.');
    
    return new Promise((resolve, reject) => {
      const out = createWriteStream(outputPath);
      
      out.on('error', reject);
      out.on('close', () => resolve(outputPath));
      
      docx.generate(out);
    });
  } catch (error) {
    await cleanupFiles([outputPath]);
    throw new Error(`PDF to Word conversion failed: ${error.message}`);
  }
};

// Enhanced Word to PDF conversion
const wordToPdf = async (wordPath) => {
  const tempDir = await ensureTempDir();
  const outputPath = path.join(tempDir, `converted-${Date.now()}.pdf`);
  
  try {
    // Extract text from Word document
    const result = await mammoth.extractRawText({ path: wordPath });
    const text = result.value;
    
    if (!text || text.trim().length === 0) {
      throw new Error('No text content found in Word document');
    }
    
    // Create PDF with extracted text
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    
    // Split text into lines that fit the page
    const fontSize = 12;
    const lineHeight = fontSize * 1.2;
    const maxWidth = width - 100; // 50px margins on each side
    const maxLines = Math.floor((height - 100) / lineHeight);
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      if (testLine.length * (fontSize * 0.6) < maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    
    // Add text to PDF
    const displayLines = lines.slice(0, maxLines);
    displayLines.forEach((line, index) => {
      page.drawText(line, {
        x: 50,
        y: height - 50 - (index * lineHeight),
        size: fontSize,
      });
    });
    
    if (lines.length > maxLines) {
      page.drawText('... (content truncated)', {
        x: 50,
        y: height - 50 - (maxLines * lineHeight),
        size: fontSize - 2,
      });
    }
    
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    await cleanupFiles([outputPath]);
    throw new Error(`Word to PDF conversion failed: ${error.message}`);
  }
};

// Enhanced Image to PDF conversion
const imageToPdf = async (imagePaths) => {
  const tempDir = await ensureTempDir();
  const outputPath = path.join(tempDir, `converted-${Date.now()}.pdf`);
  
  try {
    const pdfDoc = await PDFDocument.create();
    
    for (const imagePath of imagePaths) {
      const imageBytes = await fs.readFile(imagePath);
      
      // Optimize image if needed
      const optimizedImageBytes = await sharp(imageBytes)
        .resize(2000, 2000, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ quality: 90 })
        .toBuffer();
      
      // Determine image type and embed
      const ext = path.extname(imagePath).toLowerCase();
      let image;
      
      if (ext === '.png') {
        // Convert PNG to JPEG for better PDF compatibility
        const jpegBytes = await sharp(imageBytes).jpeg({ quality: 90 }).toBuffer();
        image = await pdfDoc.embedJpg(jpegBytes);
      } else {
        image = await pdfDoc.embedJpg(optimizedImageBytes);
      }
      
      // Add new page for each image
      const page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      
      // Calculate image dimensions to fit page
      const imageAspectRatio = image.width / image.height;
      const pageAspectRatio = width / height;
      
      let imageWidth, imageHeight;
      
      if (imageAspectRatio > pageAspectRatio) {
        // Image is wider, fit to width
        imageWidth = width - 40; // 20px margin on each side
        imageHeight = imageWidth / imageAspectRatio;
      } else {
        // Image is taller, fit to height
        imageHeight = height - 40; // 20px margin on top/bottom
        imageWidth = imageHeight * imageAspectRatio;
      }
      
      // Center the image on the page
      const x = (width - imageWidth) / 2;
      const y = (height - imageHeight) / 2;
      
      page.drawImage(image, {
        x,
        y,
        width: imageWidth,
        height: imageHeight,
      });
    }
    
    const pdfBytes = await pdfDoc.save();
    await fs.writeFile(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    await cleanupFiles([outputPath]);
    throw new Error(`Image to PDF conversion failed: ${error.message}`);
  }
};

// Enhanced PDF to Image conversion
const pdfToImages = async (pdfPath) => {
  const tempDir = await ensureTempDir();
  
  try {
    // Use pdf2pic for PDF to image conversion
    const pdf2pic = require('pdf2pic');
    
    const convert = pdf2pic.fromPath(pdfPath, {
      density: 300,           // Higher quality
      saveFilename: `page-${Date.now()}`,
      savePath: tempDir,
      format: 'jpg',
      width: 2000,
      height: 2000
    });
    
    const results = await convert.bulk(-1, { responseType: 'image' });
    
    if (!results || results.length === 0) {
      throw new Error('No pages found in PDF');
    }
    
    return results.map(result => result.path);
  } catch (error) {
    throw new Error(`PDF to Image conversion failed: ${error.message}`);
  }
};

// PDF merge functionality
const mergePdfs = async (pdfPaths) => {
  const tempDir = await ensureTempDir();
  const outputPath = path.join(tempDir, `merged-${Date.now()}.pdf`);
  
  try {
    const mergedPdf = await PDFDocument.create();
    
    for (const pdfPath of pdfPaths) {
      const pdfBytes = await fs.readFile(pdfPath);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }
    
    const pdfBytes = await mergedPdf.save();
    await fs.writeFile(outputPath, pdfBytes);
    
    return outputPath;
  } catch (error) {
    await cleanupFiles([outputPath]);
    throw new Error(`PDF merge failed: ${error.message}`);
  }
};

// PDF compression
const compressPdf = async (pdfPath) => {
  const tempDir = await ensureTempDir();
  const outputPath = path.join(tempDir, `compressed-${Date.now()}.pdf`);
  
  try {
    const pdfBytes = await fs.readFile(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    // Basic compression by re-saving
    // In production, implement more sophisticated compression
    const compressedBytes = await pdfDoc.save({
      useObjectStreams: false,
      addDefaultPage: false
    });
    
    await fs.writeFile(outputPath, compressedBytes);
    
    return outputPath;
  } catch (error) {
    await cleanupFiles([outputPath]);
    throw new Error(`PDF compression failed: ${error.message}`);
  }
};

// Create ZIP archive for multiple files
const createZipArchive = (files, outputPath) => {
  return new Promise((resolve, reject) => {
    const output = createWriteStream(outputPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => resolve(outputPath));
    output.on('error', reject);
    archive.on('error', reject);

    archive.pipe(output);

    files.forEach((file, index) => {
      const filename = file.name || `file-${index + 1}${path.extname(file.path)}`;
      archive.file(file.path, { name: filename });
    });

    archive.finalize();
  });
};

module.exports = {
  pdfToWord,
  wordToPdf,
  imageToPdf,
  pdfToImages,
  mergePdfs,
  compressPdf,
  createZipArchive,
  cleanupFiles,
  ensureTempDir
};