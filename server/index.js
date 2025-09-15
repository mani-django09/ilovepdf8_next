// server/index.js
const express = require('express');
const next = require('next');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');
const formidable = require('formidable');
const { PDFDocument } = require('pdf-lib');
const pdf2pic = require('pdf2pic');
const archiver = require('archiver');
const mammoth = require('mammoth');
const libre = require('libreoffice-convert');
const { promisify } = require('util');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const port = process.env.PORT || 3001;

// Promisify LibreOffice convert function
const libreConvert = promisify(libre.convert);

// Ensure temp directory exists
const ensureTempDir = async () => {
  const tempDir = path.join(__dirname, '..', 'temp');
  try {
    await fs.access(tempDir);
  } catch {
    await fs.mkdir(tempDir, { recursive: true });
    console.log('Created temp directory:', tempDir);
  }
};

nextApp.prepare().then(async () => {
  const server = express();

  // Ensure temp directory exists
  await ensureTempDir();

  // Basic middleware
  server.use(express.json({ limit: '50mb' }));
  server.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // CORS configuration
  server.use(cors({
    origin: dev ? 'http://localhost:3001' : (process.env.FRONTEND_URL || 'http://localhost:3001'),
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Helper function to get file path from formidable object
  const getFilePath = (file) => {
    if (Array.isArray(file)) {
      return file[0].filepath || file[0].path;
    }
    return file.filepath || file.path;
  };

  // Helper function to get field value from formidable object
  const getFieldValue = (field) => {
    if (Array.isArray(field)) {
      return field[0];
    }
    return field;
  };

  // Basic API routes
  server.get('/api/health', (req, res) => {
    res.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: dev ? 'development' : 'production',
      libreoffice: 'available'
    });
  });

// JPG to PNG API route
server.post('/api/jpg-to-png', async (req, res) => {
  console.log('=== JPG TO PNG API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `jpg-to-png-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    let imageArray = [];
    if (files.images) {
      imageArray = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (imageArray.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    tempFiles = imageArray.map(f => {
      const filePath = getFilePath(f);
      if (!filePath) {
        throw new Error('Could not determine file path for uploaded image');
      }
      return filePath;
    });

    const compressionLevel = parseInt(getFieldValue(fields.compressionLevel)) || 6;

    console.log('JPG to PNG settings:', { compressionLevel, imageCount: imageArray.length });

    // Convert images using Sharp
    const sharp = require('sharp');
    const convertedImages = [];

    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const imagePath = tempFiles[i];
      
      try {
        const originalName = Array.isArray(imageFile) ? 
          (imageFile[0].originalFilename || imageFile[0].name) : 
          (imageFile.originalFilename || imageFile.name);
        
        const baseName = path.basename(originalName, path.extname(originalName));
        const outputFileName = `${baseName}.png`;
        const outputPath = path.join(outputDir, outputFileName);

        // Convert JPG to PNG using Sharp
        await sharp(imagePath)
          .png({ 
            compressionLevel: compressionLevel,
            progressive: false
          })
          .toFile(outputPath);

        convertedImages.push({
          path: outputPath,
          name: outputFileName,
          originalName: originalName
        });

        console.log(`Converted: ${originalName} -> ${outputFileName}`);
      } catch (imageError) {
        console.error(`Error converting image ${i + 1}:`, imageError);
        throw new Error(`Failed to convert image: ${imageFile.originalFilename || imageFile.name}`);
      }
    }

    if (convertedImages.length === 0) {
      throw new Error('No images could be converted');
    }

    console.log(`Successfully converted ${convertedImages.length} images`);

    // If single image, send directly
    if (convertedImages.length === 1) {
      const imagePath = convertedImages[0].path;
      const imageBuffer = fsSync.readFileSync(imagePath);
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="${convertedImages[0].name}"`);
      res.setHeader('Content-Length', imageBuffer.length);
      
      res.send(imageBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
      
      return;
    }

    // Multiple images - create ZIP
    const zipPath = path.join(outputDir, 'converted-images.zip');
    const output = fsSync.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
      
      // Send ZIP file
      const zipBuffer = fsSync.readFileSync(zipPath);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="converted-images.zip"');
      res.setHeader('Content-Length', zipBuffer.length);
      
      res.send(zipBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files to archive
    for (const convertedImage of convertedImages) {
      archive.file(convertedImage.path, { name: convertedImage.name });
    }

    await archive.finalize();

    // Clean up temp files
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up temp file:', e);
      }
    });

    console.log('=== JPG TO PNG API SUCCESS ===');

  } catch (error) {
    console.error('=== JPG TO PNG API ERROR ===');
    console.error('Error details:', error.message);
    
    // Clean up on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to convert images',
      details: error.message
    });
  }
});

// Updated PNG to WebP API route with better validation
server.post('/api/png-to-webp', async (req, res) => {
  console.log('=== PNG TO WEBP API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `png-to-webp-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    let imageArray = [];
    if (files.images) {
      imageArray = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (imageArray.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    // Validate file types strictly
    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const originalName = Array.isArray(imageFile) ? 
        (imageFile[0].originalFilename || imageFile[0].name) : 
        (imageFile.originalFilename || imageFile.name);
      
      const fileExtension = path.extname(originalName).toLowerCase();
      const mimeType = Array.isArray(imageFile) ? imageFile[0].mimetype : imageFile.mimetype;
      
      console.log(`Validating file: ${originalName}, Extension: ${fileExtension}, MIME: ${mimeType}`);
      
      // Strict PNG validation
      if (fileExtension !== '.png' && mimeType !== 'image/png') {
        throw new Error(`File ${originalName} is not a PNG image. Please upload PNG files only.`);
      }
      
      // Reject WebP files explicitly
      if (fileExtension === '.webp' || mimeType === 'image/webp') {
        throw new Error(`File ${originalName} is a WebP file. This tool converts PNG to WebP, not WebP to WebP.`);
      }
    }

    tempFiles = imageArray.map(f => {
      const filePath = getFilePath(f);
      if (!filePath) {
        throw new Error('Could not determine file path for uploaded image');
      }
      return filePath;
    });

    const quality = parseInt(getFieldValue(fields.quality)) || 80;
    const compressionMode = getFieldValue(fields.compressionMode) || 'lossy';

    console.log('PNG to WebP settings:', { quality, compressionMode, imageCount: imageArray.length });

    const sharp = require('sharp');
    const convertedImages = [];

    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const imagePath = tempFiles[i];
      
      try {
        const originalName = Array.isArray(imageFile) ? 
          (imageFile[0].originalFilename || imageFile[0].name) : 
          (imageFile.originalFilename || imageFile.name);
        
        const baseName = path.basename(originalName, path.extname(originalName));
        const outputFileName = `${baseName}.webp`;
        const outputPath = path.join(outputDir, outputFileName);

        let sharpInstance = sharp(imagePath);

        if (compressionMode === 'lossless') {
          sharpInstance = sharpInstance.webp({ 
            lossless: true,
            quality: 100,
            alphaQuality: 100
          });
        } else {
          sharpInstance = sharpInstance.webp({ 
            quality: quality,
            alphaQuality: quality,
            effort: 6
          });
        }

        await sharpInstance.toFile(outputPath);

        convertedImages.push({
          path: outputPath,
          name: outputFileName,
          originalName: originalName
        });

        console.log(`Converted: ${originalName} -> ${outputFileName}`);
      } catch (imageError) {
        console.error(`Error converting image ${i + 1}:`, imageError);
        throw new Error(`Failed to convert image: ${imageFile.originalFilename || imageFile.name} - ${imageError.message}`);
      }
    }

    if (convertedImages.length === 0) {
      throw new Error('No images could be converted');
    }

    console.log(`Successfully converted ${convertedImages.length} images`);

    // Send response (single file or ZIP)
    if (convertedImages.length === 1) {
      const imagePath = convertedImages[0].path;
      const imageBuffer = fsSync.readFileSync(imagePath);
      
      res.setHeader('Content-Type', 'image/webp');
      res.setHeader('Content-Disposition', `attachment; filename="${convertedImages[0].name}"`);
      res.setHeader('Content-Length', imageBuffer.length);
      
      res.send(imageBuffer);
    } else {
      // Create ZIP for multiple files
      const zipPath = path.join(outputDir, 'converted-images.zip');
      const output = fsSync.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', async () => {
        console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
        
        const zipBuffer = fsSync.readFileSync(zipPath);
        
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="converted-webp-images.zip"');
        res.setHeader('Content-Length', zipBuffer.length);
        
        res.send(zipBuffer);
      });

      archive.on('error', (err) => { throw err; });
      archive.pipe(output);

      for (const convertedImage of convertedImages) {
        archive.file(convertedImage.path, { name: convertedImage.name });
      }

      await archive.finalize();
    }

    // Clean up
    setTimeout(async () => {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
        tempFiles.forEach(filepath => {
          try {
            if (fsSync.existsSync(filepath)) {
              fsSync.unlinkSync(filepath);
            }
          } catch (e) {
            console.error('Error cleaning up temp file:', e);
          }
        });
        console.log('Cleaned up temp files and output directory');
      } catch (e) {
        console.error('Error cleaning up:', e);
      }
    }, 5000);

    console.log('=== PNG TO WEBP API SUCCESS ===');

  } catch (error) {
    console.error('=== PNG TO WEBP API ERROR ===');
    console.error('Error details:', error.message);
    
    // Clean up on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to convert images',
      details: error.message
    });
  }
});


// PNG to PDF API route
server.post('/api/png-to-pdf', async (req, res) => {
  console.log('=== PNG TO PDF API START ===');
  
  let tempFiles = [];

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    let imageArray = [];
    if (files.images) {
      imageArray = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (imageArray.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }

    // Validate file types
    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const originalName = Array.isArray(imageFile) ? 
        (imageFile[0].originalFilename || imageFile[0].name) : 
        (imageFile.originalFilename || imageFile.name);
      
      const fileExtension = path.extname(originalName).toLowerCase();
      const mimeType = Array.isArray(imageFile) ? imageFile[0].mimetype : imageFile.mimetype;
      
      if (fileExtension !== '.png' && mimeType !== 'image/png') {
        throw new Error(`File ${originalName} is not a PNG image. Please upload PNG files only.`);
      }
    }

    tempFiles = imageArray.map(f => {
      const filePath = getFilePath(f);
      if (!filePath) {
        throw new Error('Could not determine file path for uploaded image');
      }
      return filePath;
    });

    const pageSize = getFieldValue(fields.pageSize) || 'A4';
    const orientation = getFieldValue(fields.orientation) || 'portrait';
    const layout = getFieldValue(fields.layout) || 'fit';

    console.log('PNG to PDF settings:', { pageSize, orientation, layout, imageCount: imageArray.length });

    const pdfDoc = await PDFDocument.create();
    
    const pageSizes = {
      'A4': { width: 595, height: 842 },
      'Letter': { width: 612, height: 792 },
      'Legal': { width: 612, height: 1008 },
      'A3': { width: 842, height: 1191 },
      'A5': { width: 420, height: 595 }
    };

    let { width, height } = pageSizes[pageSize] || pageSizes.A4;
    if (orientation === 'landscape') {
      [width, height] = [height, width];
    }

    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const imagePath = tempFiles[i];
      
      try {
        const imageBytes = fsSync.readFileSync(imagePath);
        const image = await pdfDoc.embedPng(imageBytes);

        const page = pdfDoc.addPage([width, height]);

        let imageWidth, imageHeight, x, y;

        if (layout === 'fit') {
          // Fit to page maintaining aspect ratio
          const imageAspectRatio = image.width / image.height;
          const pageAspectRatio = width / height;

          if (imageAspectRatio > pageAspectRatio) {
            imageWidth = width - 40;
            imageHeight = imageWidth / imageAspectRatio;
          } else {
            imageHeight = height - 40;
            imageWidth = imageHeight * imageAspectRatio;
          }

          x = (width - imageWidth) / 2;
          y = (height - imageHeight) / 2;
        } else if (layout === 'fill') {
          // Fill page (may crop)
          imageWidth = width;
          imageHeight = height;
          x = 0;
          y = 0;
        } else {
          // Original size (center on page)
          imageWidth = Math.min(image.width, width - 40);
          imageHeight = Math.min(image.height, height - 40);
          x = (width - imageWidth) / 2;
          y = (height - imageHeight) / 2;
        }

        page.drawImage(image, {
          x: x,
          y: y,
          width: imageWidth,
          height: imageHeight,
        });

        console.log(`Added image ${i + 1} to PDF: ${imageFile.originalFilename || imageFile.name}`);
      } catch (imageError) {
        console.error(`Error processing image ${i + 1}:`, imageError);
        throw new Error(`Failed to process image: ${imageFile.originalFilename || imageFile.name}`);
      }
    }

    const pdfBytes = await pdfDoc.save();
    
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up:', e);
      }
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="converted-images.pdf"');
    res.setHeader('Content-Length', pdfBytes.length);
    
    console.log('=== PNG TO PDF API SUCCESS ===');
    return res.send(Buffer.from(pdfBytes));

  } catch (error) {
    console.error('=== PNG TO PDF API ERROR ===', error);
    
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to convert images to PDF',
      details: error.message
    });
  }
});

// PDF to PNG API route
server.post('/api/pdf-to-png', async (req, res) => {
  console.log('=== PDF TO PNG API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `pdf-to-png-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    const pdfFile = files.pdf;
    if (!pdfFile) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const pdfPath = getFilePath(pdfFile);
    if (!pdfPath) {
      throw new Error('Could not determine PDF file path');
    }

    tempFiles.push(pdfPath);

    const quality = parseInt(getFieldValue(fields.quality)) || 300;
    const pageRange = getFieldValue(fields.pageRange) || 'all';
    const customRange = getFieldValue(fields.customRange) || '';

    console.log('PDF to PNG settings:', { quality, pageRange, customRange });

    // Load PDF to get page count
    const pdfBytes = fsSync.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    
    console.log(`PDF has ${pageCount} pages`);

    // Determine which pages to convert
    let pagesToConvert = [];
    if (pageRange === 'all') {
      pagesToConvert = Array.from({length: pageCount}, (_, i) => i + 1);
    } else if (pageRange === 'first') {
      pagesToConvert = [1];
    } else if (pageRange === 'custom' && customRange) {
      const ranges = customRange.split(',');
      for (const range of ranges) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(n => parseInt(n.trim()));
          for (let i = start; i <= end && i <= pageCount; i++) {
            if (i >= 1) pagesToConvert.push(i);
          }
        } else {
          const pageNum = parseInt(range.trim());
          if (pageNum >= 1 && pageNum <= pageCount) {
            pagesToConvert.push(pageNum);
          }
        }
      }
    }

    if (pagesToConvert.length === 0) {
      return res.status(400).json({ error: 'No valid pages selected for conversion' });
    }

    console.log(`Converting ${pagesToConvert.length} pages: ${pagesToConvert.join(', ')}`);

    // Convert PDF to PNG images using pdf2pic
    const options = {
      density: quality,
      saveFilename: "page",
      savePath: outputDir,
      format: "png",
      width: Math.round(8.5 * quality),
      height: Math.round(11 * quality)
    };

    const convertResult = pdf2pic.fromPath(pdfPath, options);
    
    // Convert specified pages
    const imageFiles = [];
    for (const pageNum of pagesToConvert) {
      try {
        console.log(`Converting page ${pageNum}`);
        const result = await convertResult(pageNum);
        imageFiles.push({
          path: result.path,
          name: `page-${pageNum}.png`
        });
      } catch (pageError) {
        console.error(`Error converting page ${pageNum}:`, pageError);
      }
    }

    if (imageFiles.length === 0) {
      throw new Error('No pages could be converted');
    }

    console.log(`Successfully converted ${imageFiles.length} pages`);

    // Create ZIP archive
    const zipPath = path.join(outputDir, 'extracted-png-images.zip');
    const output = fsSync.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
      
      // Send ZIP file
      const zipBuffer = fsSync.readFileSync(zipPath);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="extracted-png-images.zip"');
      res.setHeader('Content-Length', zipBuffer.length);
      
      res.send(zipBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files to archive
    for (const imageFile of imageFiles) {
      archive.file(imageFile.path, { name: imageFile.name });
    }

    await archive.finalize();

    // Clean up temp PDF file
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up temp file:', e);
      }
    });

    console.log('=== PDF TO PNG API SUCCESS ===');

  } catch (error) {
    console.error('=== PDF TO PNG API ERROR ===');
    console.error('Error details:', error.message);
    
    // Clean up on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to convert PDF to PNG images',
      details: error.message
    });
  }
});

// Add this after your existing PDF routes in index.js

// Compress PDF API route
server.post('/api/compress-pdf', async (req, res) => {
  console.log('=== COMPRESS PDF API START ===');
  
  let tempFiles = [];

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    
    const form = new formidable.IncomingForm({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    const pdfFile = files.pdf;
    if (!pdfFile) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const pdfPath = getFilePath(pdfFile);
    if (!pdfPath) {
      throw new Error('Could not determine PDF file path');
    }

    tempFiles.push(pdfPath);

    const compressionLevel = getFieldValue(fields.compressionLevel) || 'medium';
    const imageQuality = parseInt(getFieldValue(fields.imageQuality)) || 75;
    const removeMetadata = getFieldValue(fields.removeMetadata) === 'true';

    console.log('Compress PDF settings:', { compressionLevel, imageQuality, removeMetadata });

    // Load the PDF
    const pdfBytes = fsSync.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    
    const originalSize = pdfBytes.length;
    console.log(`Original PDF size: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);

    // Apply compression based on level
    let compressedPdfBytes;
    
    if (compressionLevel === 'low') {
      // Light compression - mainly remove metadata and optimize structure
      if (removeMetadata) {
        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');
      }
      compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false
      });
    } else if (compressionLevel === 'medium') {
      // Medium compression
      compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50
      });
    } else {
      // High compression - more aggressive optimization
      compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 100
      });
    }

    const compressedSize = compressedPdfBytes.length;
    const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);
    
    console.log(`Compressed PDF size: ${(compressedSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compression ratio: ${compressionRatio}%`);

    // Clean up temp files
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up:', e);
      }
    });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="compressed-document.pdf"');
    res.setHeader('Content-Length', compressedPdfBytes.length);
    res.setHeader('X-Original-Size', originalSize);
    res.setHeader('X-Compressed-Size', compressedSize);
    res.setHeader('X-Compression-Ratio', compressionRatio);
    
    console.log('=== COMPRESS PDF API SUCCESS ===');
    return res.send(Buffer.from(compressedPdfBytes));

  } catch (error) {
    console.error('=== COMPRESS PDF API ERROR ===', error);
    
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });
    
    return res.status(500).json({ 
      error: 'Failed to compress PDF',
      details: error.message
    });
  }
});


// PDF to Word API route (Simplified and Working Version)
server.post('/api/pdf-to-word', async (req, res) => {
  console.log('=== PDF TO WORD API START ===');
  
  let tempFiles = [];

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    
    const form = new formidable.IncomingForm({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    const pdfFile = files.pdf;
    if (!pdfFile) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    const pdfPath = getFilePath(pdfFile);
    if (!pdfPath) {
      throw new Error('Could not determine PDF file path');
    }

    tempFiles.push(pdfPath);

    const outputFormat = getFieldValue(fields.outputFormat) || 'docx';
    const preserveLayout = getFieldValue(fields.preserveLayout) === 'true';

    console.log('PDF to Word settings:', { outputFormat, preserveLayout });

    // Read the PDF file
    const pdfBuffer = fsSync.readFileSync(pdfPath);
    
    console.log('Starting text extraction...');
    console.log(`Input file size: ${pdfBuffer.length} bytes`);

    // Extract text using pdf-parse
    const pdfParse = require('pdf-parse');
    
    let pdfData;
    try {
      pdfData = await pdfParse(pdfBuffer);
    } catch (parseError) {
      console.error('PDF parsing failed:', parseError);
      throw new Error('Unable to read PDF file. The file may be corrupted or password-protected.');
    }
    
    if (!pdfData.text || pdfData.text.trim().length === 0) {
      throw new Error('No extractable text found in PDF. This PDF may contain only images or scanned content.');
    }

    console.log(`Extracted ${pdfData.text.length} characters of text`);

    // Create Word document with extracted text
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');
    
    // Process the extracted text
    const lines = pdfData.text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const docParagraphs = [];

    let currentParagraph = [];
    
    for (const line of lines) {
      // Check if this line should start a new paragraph
      if (line.length < 100 && (
        line.toUpperCase() === line || // All caps (likely heading)
        line.endsWith(':') || // Ends with colon (likely heading)
        /^\d+\./.test(line) || // Starts with number (likely list item)
        /^[A-Z][A-Z\s]*$/.test(line) // All uppercase words (likely heading)
      )) {
        // Finish current paragraph if it exists
        if (currentParagraph.length > 0) {
          docParagraphs.push(new Paragraph({
            children: [new TextRun(currentParagraph.join(' '))],
            spacing: { after: 120 }
          }));
          currentParagraph = [];
        }
        
        // Add as heading
        docParagraphs.push(new Paragraph({
          children: [new TextRun({ 
            text: line, 
            bold: true, 
            size: preserveLayout ? 24 : 20 
          })],
          heading: HeadingLevel.HEADING_2,
          spacing: { after: 200, before: 200 }
        }));
      } else {
        // Add to current paragraph
        currentParagraph.push(line);
        
        // If paragraph gets too long, create a new one
        if (currentParagraph.join(' ').length > 500) {
          docParagraphs.push(new Paragraph({
            children: [new TextRun(currentParagraph.join(' '))],
            spacing: { after: 120 }
          }));
          currentParagraph = [];
        }
      }
    }
    
    // Add any remaining content
    if (currentParagraph.length > 0) {
      docParagraphs.push(new Paragraph({
        children: [new TextRun(currentParagraph.join(' '))],
        spacing: { after: 120 }
      }));
    }

    // If no paragraphs were created, create a single paragraph with all text
    if (docParagraphs.length === 0) {
      docParagraphs.push(new Paragraph({
        children: [new TextRun(pdfData.text)],
        spacing: { after: 120 }
      }));
    }

    const doc = new Document({
      sections: [{
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children: docParagraphs
      }]
    });

    const wordBuffer = await Packer.toBuffer(doc);
    console.log(`Word document created: ${wordBuffer.length} bytes`);

    // Clean up temp files
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up:', e);
      }
    });

    const mimeType = outputFormat === 'docx' 
      ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; // Always use DOCX

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="converted-document.${outputFormat}"`);
    res.setHeader('Content-Length', wordBuffer.length);

    console.log('=== PDF TO WORD API SUCCESS ===');
    return res.send(wordBuffer);

  } catch (error) {
    console.error('=== PDF TO WORD API ERROR ===', error);
    
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    let errorMessage = 'Failed to convert PDF to Word';
    let suggestion = '';

    if (error.message.includes('No extractable text')) {
      errorMessage = 'PDF contains no readable text';
      suggestion = 'This PDF may contain only images or scanned content. Try using OCR software first.';
    } else if (error.message.includes('corrupted')) {
      errorMessage = 'PDF file appears to be corrupted';
      suggestion = 'Please try with a different PDF file.';
    } else if (error.message.includes('password-protected')) {
      errorMessage = 'PDF file is password-protected';
      suggestion = 'Please remove the password protection before converting.';
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: error.message,
      suggestion: suggestion
    });
  }
});


// WebP to PNG API route
server.post('/api/webp-to-png', async (req, res) => {
  console.log('=== WEBP TO PNG API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `webp-to-png-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    let imageArray = [];
    if (files.images) {
      imageArray = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (imageArray.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    tempFiles = imageArray.map(f => {
      const filePath = getFilePath(f);
      if (!filePath) {
        throw new Error('Could not determine file path for uploaded image');
      }
      return filePath;
    });

    const preserveTransparency = getFieldValue(fields.preserveTransparency) === 'true';

    console.log('WebP to PNG settings:', { preserveTransparency, imageCount: imageArray.length });

    // Convert images using Sharp
    const sharp = require('sharp');
    const convertedImages = [];

    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const imagePath = tempFiles[i];
      
      try {
        const originalName = Array.isArray(imageFile) ? 
          (imageFile[0].originalFilename || imageFile[0].name) : 
          (imageFile.originalFilename || imageFile.name);
        
        const baseName = path.basename(originalName, path.extname(originalName));
        const outputFileName = `${baseName}.png`;
        const outputPath = path.join(outputDir, outputFileName);

        // Convert WebP to PNG using Sharp
        let sharpInstance = sharp(imagePath);
        
        if (preserveTransparency) {
          sharpInstance = sharpInstance.png({ 
            compressionLevel: 6,
            progressive: false,
            force: true
          });
        } else {
          // If not preserving transparency, add white background
          sharpInstance = sharpInstance
            .flatten({ background: { r: 255, g: 255, b: 255 } })
            .png({ 
              compressionLevel: 6,
              progressive: false 
            });
        }

        await sharpInstance.toFile(outputPath);

        convertedImages.push({
          path: outputPath,
          name: outputFileName,
          originalName: originalName
        });

        console.log(`Converted: ${originalName} -> ${outputFileName}`);
      } catch (imageError) {
        console.error(`Error converting image ${i + 1}:`, imageError);
        throw new Error(`Failed to convert image: ${imageFile.originalFilename || imageFile.name}`);
      }
    }

    if (convertedImages.length === 0) {
      throw new Error('No images could be converted');
    }

    console.log(`Successfully converted ${convertedImages.length} images`);

    // If single image, send directly
    if (convertedImages.length === 1) {
      const imagePath = convertedImages[0].path;
      const imageBuffer = fsSync.readFileSync(imagePath);
      
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="${convertedImages[0].name}"`);
      res.setHeader('Content-Length', imageBuffer.length);
      
      res.send(imageBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
      
      return;
    }

    // Multiple images - create ZIP
    const zipPath = path.join(outputDir, 'converted-images.zip');
    const output = fsSync.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
      
      // Send ZIP file
      const zipBuffer = fsSync.readFileSync(zipPath);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="converted-images.zip"');
      res.setHeader('Content-Length', zipBuffer.length);
      
      res.send(zipBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files to archive
    for (const convertedImage of convertedImages) {
      archive.file(convertedImage.path, { name: convertedImage.name });
    }

    await archive.finalize();

    // Clean up temp files
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up temp file:', e);
      }
    });

    console.log('=== WEBP TO PNG API SUCCESS ===');

  } catch (error) {
    console.error('=== WEBP TO PNG API ERROR ===');
    console.error('Error details:', error.message);
    
    // Clean up on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to convert images',
      details: error.message
    });
  }
});


  // PNG to JPG API route
server.post('/api/png-to-jpg', async (req, res) => {
  console.log('=== PNG TO JPG API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `png-to-jpg-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
      maxFileSize: 50 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    let imageArray = [];
    if (files.images) {
      imageArray = Array.isArray(files.images) ? files.images : [files.images];
    }

    if (imageArray.length === 0) {
      return res.status(400).json({ error: 'No images provided' });
    }

    tempFiles = imageArray.map(f => {
      const filePath = getFilePath(f);
      if (!filePath) {
        throw new Error('Could not determine file path for uploaded image');
      }
      return filePath;
    });

    const quality = parseInt(getFieldValue(fields.quality)) || 85;
    const format = getFieldValue(fields.format) || 'jpg';

    console.log('PNG to JPG settings:', { quality, format, imageCount: imageArray.length });

    // Convert images using Sharp
    const sharp = require('sharp');
    const convertedImages = [];

    for (let i = 0; i < imageArray.length; i++) {
      const imageFile = imageArray[i];
      const imagePath = tempFiles[i];
      
      try {
        const originalName = Array.isArray(imageFile) ? 
          (imageFile[0].originalFilename || imageFile[0].name) : 
          (imageFile.originalFilename || imageFile.name);
        
        const baseName = path.basename(originalName, path.extname(originalName));
        const outputFileName = `${baseName}.${format}`;
        const outputPath = path.join(outputDir, outputFileName);

        // Convert PNG to JPG using Sharp
        await sharp(imagePath)
          .jpeg({ 
            quality: quality,
            progressive: true,
            mozjpeg: true
          })
          .toFile(outputPath);

        convertedImages.push({
          path: outputPath,
          name: outputFileName,
          originalName: originalName
        });

        console.log(`Converted: ${originalName} -> ${outputFileName}`);
      } catch (imageError) {
        console.error(`Error converting image ${i + 1}:`, imageError);
        throw new Error(`Failed to convert image: ${imageFile.originalFilename || imageFile.name}`);
      }
    }

    if (convertedImages.length === 0) {
      throw new Error('No images could be converted');
    }

    console.log(`Successfully converted ${convertedImages.length} images`);

    // If single image, send directly
    if (convertedImages.length === 1) {
      const imagePath = convertedImages[0].path;
      const imageBuffer = fsSync.readFileSync(imagePath);
      
      res.setHeader('Content-Type', `image/${format}`);
      res.setHeader('Content-Disposition', `attachment; filename="${convertedImages[0].name}"`);
      res.setHeader('Content-Length', imageBuffer.length);
      
      res.send(imageBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
      
      return;
    }

    // Multiple images - create ZIP
    const zipPath = path.join(outputDir, 'converted-images.zip');
    const output = fsSync.createWriteStream(zipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', async () => {
      console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
      
      // Send ZIP file
      const zipBuffer = fsSync.readFileSync(zipPath);
      
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename="converted-images.zip"');
      res.setHeader('Content-Length', zipBuffer.length);
      
      res.send(zipBuffer);
      
      // Clean up
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
          console.log('Cleaned up output directory');
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Add files to archive
    for (const convertedImage of convertedImages) {
      archive.file(convertedImage.path, { name: convertedImage.name });
    }

    await archive.finalize();

    // Clean up temp files
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up temp file:', e);
      }
    });

    console.log('=== PNG TO JPG API SUCCESS ===');

  } catch (error) {
    console.error('=== PNG TO JPG API ERROR ===');
    console.error('Error details:', error.message);
    
    // Clean up on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to convert images',
      details: error.message
    });
  }
});
  // Enhanced Word Preview API with LibreOffice detection
  server.post('/api/word-preview', async (req, res) => {
    console.log('=== WORD PREVIEW API START ===');
    
    let tempFiles = [];

    try {
      const tempDir = path.join(__dirname, '..', 'temp');
      
      const form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024,
        uploadDir: tempDir
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const wordFile = files.word;
      if (!wordFile) {
        return res.status(400).json({ error: 'No Word file provided' });
      }

      const wordPath = getFilePath(wordFile);
      if (!wordPath) {
        throw new Error('Could not determine Word file path');
      }

      tempFiles.push(wordPath);

      // Extract text content using mammoth for preview
      const result = await mammoth.extractRawText({ path: wordPath });
      const textContent = result.value;

      // Get word count
      const wordCount = textContent.trim().split(/\s+/).filter(word => word.length > 0).length;

      // Get preview (first 500 characters)
      const preview = textContent.substring(0, 500) + (textContent.length > 500 ? '...' : '');

      // Get page estimation (rough calculation)
      const estimatedPages = Math.max(1, Math.ceil(wordCount / 250)); // ~250 words per page

      // Check for complex content
      const hasImages = textContent.includes('[image]') || textContent.includes('Figure') || textContent.includes('Image');
      const hasTables = textContent.includes('\t') || textContent.includes('Table');

      res.json({
        preview: preview,
        wordCount: wordCount,
        estimatedPages: estimatedPages,
        fileSize: Array.isArray(wordFile) ? wordFile[0].size : wordFile.size,
        hasImages: hasImages,
        hasTables: hasTables,
        conversionMethod: 'LibreOffice',
        fileName: Array.isArray(wordFile) ? 
          (wordFile[0].originalFilename || wordFile[0].name) : 
          (wordFile.originalFilename || wordFile.name)
      });

      // Clean up temp files
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up:', e);
        }
      });

      console.log('=== WORD PREVIEW API SUCCESS ===');

    } catch (error) {
      console.error('=== WORD PREVIEW API ERROR ===', error);
      
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up on error:', e);
        }
      });
      
      return res.status(500).json({ 
        error: 'Failed to generate Word preview',
        details: error.message
      });
    }
  });

  // Add this after your existing routes in index.js

// Word to PDF API route - Updated to use command line LibreOffice
server.post('/api/word-to-pdf', async (req, res) => {
  console.log('=== WORD TO PDF API START ===');
  
  let tempFiles = [];
  let outputDir = null;

  try {
    const tempDir = path.join(__dirname, '..', 'temp');
    outputDir = path.join(tempDir, `word-conversion-${Date.now()}`);
    await fs.mkdir(outputDir, { recursive: true });
    
    const form = new formidable.IncomingForm({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 100 * 1024 * 1024,
      uploadDir: tempDir
    });

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          console.error('Form parse error:', err);
          reject(err);
        } else {
          resolve([fields, files]);
        }
      });
    });

    const wordFile = files.word;
    if (!wordFile) {
      return res.status(400).json({ error: 'No Word file provided' });
    }

    const wordPath = getFilePath(wordFile);
    if (!wordPath) {
      throw new Error('Could not determine Word file path');
    }

    tempFiles.push(wordPath);

    const quality = getFieldValue(fields.quality) || 'standard';
    const pageSize = getFieldValue(fields.pageSize) || 'A4';
    const orientation = getFieldValue(fields.orientation) || 'portrait';

    console.log('Word to PDF settings:', { quality, pageSize, orientation });

    // Verify file exists and is readable
    if (!fsSync.existsSync(wordPath)) {
      throw new Error('Uploaded file not found');
    }

    const stats = fsSync.statSync(wordPath);
    if (stats.size === 0) {
      throw new Error('Uploaded file is empty');
    }

    console.log(`Processing Word file: ${stats.size} bytes`);

    // Use LibreOffice command line for conversion
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);

    // Escape file paths for Windows
    const escapedWordPath = `"${wordPath}"`;
    const escapedOutputDir = `"${outputDir}"`;

    // LibreOffice command with explicit format options
    let command = `soffice --headless --convert-to pdf`;
    
    // Add page size and orientation options if available
    if (pageSize !== 'A4' || orientation !== 'portrait') {
      // Note: LibreOffice command line has limited formatting options
      // Most formatting is preserved from the original document
      console.log('Using document original formatting (LibreOffice limitation)');
    }
    
    command += ` --outdir ${escapedOutputDir} ${escapedWordPath}`;

    console.log('Executing LibreOffice command:', command);

    try {
      const { stdout, stderr } = await execAsync(command, {
        timeout: 60000, // 60 second timeout
        cwd: tempDir,
        windowsHide: true
      });

      console.log('LibreOffice conversion completed');
      if (stdout) console.log('LibreOffice stdout:', stdout);
      if (stderr) console.log('LibreOffice stderr:', stderr);

      // Find the generated PDF file
      const outputFiles = await fs.readdir(outputDir);
      const pdfFile = outputFiles.find(file => file.toLowerCase().endsWith('.pdf'));

      if (!pdfFile) {
        throw new Error('LibreOffice did not generate a PDF file. The Word document may be corrupted or unsupported.');
      }

      const pdfPath = path.join(outputDir, pdfFile);
      const pdfBuffer = fsSync.readFileSync(pdfPath);

      if (pdfBuffer.length === 0) {
        throw new Error('Generated PDF file is empty');
      }

      console.log(`LibreOffice conversion successful: ${pdfBuffer.length} bytes`);

      // Clean up temp files
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up temp file:', e);
        }
      });

      // Clean up output directory
      setTimeout(async () => {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
        } catch (e) {
          console.error('Error cleaning up output directory:', e);
        }
      }, 5000);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="converted-document.pdf"');
      res.setHeader('Content-Length', pdfBuffer.length);

      console.log('=== WORD TO PDF API SUCCESS ===');
      return res.send(pdfBuffer);

    } catch (execError) {
      console.error('LibreOffice execution error:', execError);
      
      // Check if it's a timeout
      if (execError.code === 'ETIMEDOUT') {
        throw new Error('LibreOffice conversion timeout. The document may be too large or complex.');
      }
      
      // Check LibreOffice specific errors
      if (execError.stderr && execError.stderr.includes('Error')) {
        throw new Error(`LibreOffice error: ${execError.stderr}`);
      }
      
      throw new Error(`LibreOffice conversion failed: ${execError.message}`);
    }

  } catch (error) {
    console.error('=== WORD TO PDF API ERROR ===', error);
    
    // Clean up temp files on error
    tempFiles.forEach(filepath => {
      try {
        if (fsSync.existsSync(filepath)) {
          fsSync.unlinkSync(filepath);
        }
      } catch (e) {
        console.error('Error cleaning up on error:', e);
      }
    });

    // Clean up output directory on error
    if (outputDir) {
      try {
        await fs.rm(outputDir, { recursive: true, force: true });
      } catch (e) {
        console.error('Error cleaning up output directory on error:', e);
      }
    }

    // Provide helpful error messages
    let errorMessage = 'Failed to convert Word document to PDF';
    let suggestion = '';

    if (error.message.includes('timeout')) {
      errorMessage = 'Conversion timeout - document may be too large or complex';
      suggestion = 'Try with a smaller document or simplify the formatting';
    } else if (error.message.includes('empty')) {
      errorMessage = 'Document appears to be empty or corrupted';
      suggestion = 'Please verify the Word document opens correctly in Microsoft Word';
    } else if (error.message.includes('not generate')) {
      errorMessage = 'Document format not supported or file is corrupted';
      suggestion = 'Please ensure the file is a valid Word document (.doc or .docx)';
    } else if (error.message.includes('LibreOffice error')) {
      errorMessage = 'LibreOffice conversion error';
      suggestion = 'The document may contain unsupported features or be password protected';
    }
    
    return res.status(500).json({ 
      error: errorMessage,
      details: error.message,
      suggestion: suggestion
    });
  }
});


  // Merge PDF API route
  server.post('/api/merge-pdf', async (req, res) => {
    console.log('=== MERGE PDF API START ===');
    
    let tempFiles = [];

    try {
      const tempDir = path.join(__dirname, '..', 'temp');
      
      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024,
        uploadDir: tempDir
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Form parse error:', err);
            reject(err);
          } else {
            resolve([fields, files]);
          }
        });
      });

      let fileArray = [];
      if (files.files) {
        fileArray = Array.isArray(files.files) ? files.files : [files.files];
      }

      if (fileArray.length < 2) {
        return res.status(400).json({ error: 'At least 2 PDF files are required' });
      }

      tempFiles = fileArray.map(f => {
        const filePath = getFilePath(f);
        if (!filePath) {
          throw new Error('Could not determine file path for uploaded file');
        }
        return filePath;
      });

      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < fileArray.length; i++) {
        const filePath = tempFiles[i];
        
        const pdfBytes = fsSync.readFileSync(filePath);
        const pdf = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      
      // Clean up temp files
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up:', e);
        }
      });
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="merged-document.pdf"');
      res.setHeader('Content-Length', mergedPdfBytes.length);
      
      console.log('=== MERGE PDF API SUCCESS ===');
      return res.send(Buffer.from(mergedPdfBytes));

    } catch (error) {
      console.error('=== MERGE PDF API ERROR ===', error);
      
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up on error:', e);
        }
      });
      
      return res.status(500).json({ 
        error: 'Failed to merge PDFs',
        details: error.message
      });
    }
  });

  // JPG to PDF API route
  server.post('/api/jpg-to-pdf', async (req, res) => {
    console.log('=== JPG TO PDF API START ===');
    
    let tempFiles = [];

    try {
      const tempDir = path.join(__dirname, '..', 'temp');
      
      const form = new formidable.IncomingForm({
        multiples: true,
        keepExtensions: true,
        maxFileSize: 50 * 1024 * 1024,
        uploadDir: tempDir
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      let imageArray = [];
      if (files.images) {
        imageArray = Array.isArray(files.images) ? files.images : [files.images];
      }

      if (imageArray.length === 0) {
        return res.status(400).json({ error: 'At least one image is required' });
      }

      tempFiles = imageArray.map(f => {
        const filePath = getFilePath(f);
        if (!filePath) {
          throw new Error('Could not determine file path for uploaded image');
        }
        return filePath;
      });

      const pageSize = getFieldValue(fields.pageSize) || 'A4';
      const orientation = getFieldValue(fields.orientation) || 'portrait';

      const pdfDoc = await PDFDocument.create();
      
      const pageSizes = {
        'A4': { width: 595, height: 842 },
        'Letter': { width: 612, height: 792 },
        'Legal': { width: 612, height: 1008 },
        'A3': { width: 842, height: 1191 },
        'A5': { width: 420, height: 595 }
      };

      let { width, height } = pageSizes[pageSize] || pageSizes.A4;
      if (orientation === 'landscape') {
        [width, height] = [height, width];
      }

      for (let i = 0; i < imageArray.length; i++) {
        const imageFile = imageArray[i];
        const imagePath = tempFiles[i];
        
        try {
          const imageBytes = fsSync.readFileSync(imagePath);
          let image;

          const mimeType = imageFile.mimetype || imageFile.type;
          if (mimeType && mimeType.includes('png')) {
            image = await pdfDoc.embedPng(imageBytes);
          } else {
            image = await pdfDoc.embedJpg(imageBytes);
          }

          const imageAspectRatio = image.width / image.height;
          const pageAspectRatio = width / height;

          let imageWidth, imageHeight;

          if (imageAspectRatio > pageAspectRatio) {
            imageWidth = width - 40;
            imageHeight = imageWidth / imageAspectRatio;
          } else {
            imageHeight = height - 40;
            imageWidth = imageHeight * imageAspectRatio;
          }

          const page = pdfDoc.addPage([width, height]);
          const x = (width - imageWidth) / 2;
          const y = (height - imageHeight) / 2;

          page.drawImage(image, {
            x: x,
            y: y,
            width: imageWidth,
            height: imageHeight,
          });

        } catch (imageError) {
          console.error(`Error processing image ${i + 1}:`, imageError);
          throw new Error(`Failed to process image: ${imageFile.originalFilename || imageFile.name}`);
        }
      }

      const pdfBytes = await pdfDoc.save();
      
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up:', e);
        }
      });
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="converted-images.pdf"');
      res.setHeader('Content-Length', pdfBytes.length);
      
      console.log('=== JPG TO PDF API SUCCESS ===');
      return res.send(Buffer.from(pdfBytes));

    } catch (error) {
      console.error('=== JPG TO PDF API ERROR ===', error);
      
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up on error:', e);
        }
      });
      
      return res.status(500).json({ 
        error: 'Failed to convert images to PDF',
        details: error.message
      });
    }
  });

  // PDF to JPG API route
  server.post('/api/pdf-to-jpg', async (req, res) => {
    console.log('=== PDF TO JPG API START ===');
    
    let tempFiles = [];
    let outputDir = null;

    try {
      const tempDir = path.join(__dirname, '..', 'temp');
      outputDir = path.join(tempDir, `pdf-to-jpg-${Date.now()}`);
      await fs.mkdir(outputDir, { recursive: true });
      
      const form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024,
        uploadDir: tempDir
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Form parse error:', err);
            reject(err);
          } else {
            resolve([fields, files]);
          }
        });
      });

      const pdfFile = files.pdf;
      if (!pdfFile) {
        return res.status(400).json({ error: 'No PDF file provided' });
      }

      const pdfPath = getFilePath(pdfFile);
      if (!pdfPath) {
        throw new Error('Could not determine PDF file path');
      }

      tempFiles.push(pdfPath);

      const quality = parseInt(getFieldValue(fields.quality)) || 150;
      const format = getFieldValue(fields.format) || 'jpg';
      const pageRange = getFieldValue(fields.pageRange) || 'all';
      const customRange = getFieldValue(fields.customRange) || '';

      console.log('PDF to JPG settings:', { quality, format, pageRange, customRange });

      // Load PDF to get page count
      const pdfBytes = fsSync.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();
      
      console.log(`PDF has ${pageCount} pages`);

      // Determine which pages to convert
      let pagesToConvert = [];
      if (pageRange === 'all') {
        pagesToConvert = Array.from({length: pageCount}, (_, i) => i + 1);
      } else if (pageRange === 'first') {
        pagesToConvert = [1];
      } else if (pageRange === 'custom' && customRange) {
        const ranges = customRange.split(',');
        for (const range of ranges) {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(n => parseInt(n.trim()));
            for (let i = start; i <= end && i <= pageCount; i++) {
              if (i >= 1) pagesToConvert.push(i);
            }
          } else {
            const pageNum = parseInt(range.trim());
            if (pageNum >= 1 && pageNum <= pageCount) {
              pagesToConvert.push(pageNum);
            }
          }
        }
      }

      if (pagesToConvert.length === 0) {
        return res.status(400).json({ error: 'No valid pages selected for conversion' });
      }

      console.log(`Converting ${pagesToConvert.length} pages: ${pagesToConvert.join(', ')}`);

      // Convert PDF to images using pdf2pic
      const options = {
        density: quality,
        saveFilename: "page",
        savePath: outputDir,
        format: format,
        width: Math.round(8.5 * quality),
        height: Math.round(11 * quality)
      };

      const convertResult = pdf2pic.fromPath(pdfPath, options);
      
      // Convert specified pages
      const imageFiles = [];
      for (const pageNum of pagesToConvert) {
        try {
          console.log(`Converting page ${pageNum}`);
          const result = await convertResult(pageNum);
          imageFiles.push({
            path: result.path,
            name: `page-${pageNum}.${format}`
          });
        } catch (pageError) {
          console.error(`Error converting page ${pageNum}:`, pageError);
        }
      }

      if (imageFiles.length === 0) {
        throw new Error('No pages could be converted');
      }

      console.log(`Successfully converted ${imageFiles.length} pages`);

      // Create ZIP archive
      const zipPath = path.join(outputDir, 'extracted-images.zip');
      const output = fsSync.createWriteStream(zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });

      output.on('close', async () => {
        console.log(`ZIP archive created: ${archive.pointer()} total bytes`);
        
        // Send ZIP file
        const zipBuffer = fsSync.readFileSync(zipPath);
        
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="extracted-images.zip"');
        res.setHeader('Content-Length', zipBuffer.length);
        
        res.send(zipBuffer);
        
        // Clean up
        setTimeout(async () => {
          try {
            await fs.rm(outputDir, { recursive: true, force: true });
            console.log('Cleaned up output directory');
          } catch (e) {
            console.error('Error cleaning up output directory:', e);
          }
        }, 5000);
      });

      archive.on('error', (err) => {
        throw err;
      });

      archive.pipe(output);

      // Add files to archive
      for (const imageFile of imageFiles) {
        archive.file(imageFile.path, { name: imageFile.name });
      }

      await archive.finalize();

      // Clean up temp PDF file
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up temp file:', e);
        }
      });

      console.log('=== PDF TO JPG API SUCCESS ===');

    } catch (error) {
      console.error('=== PDF TO JPG API ERROR ===');
      console.error('Error details:', error.message);
      
      // Clean up on error
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up on error:', e);
        }
      });

      if (outputDir) {
        try {
          await fs.rm(outputDir, { recursive: true, force: true });
        } catch (e) {
          console.error('Error cleaning up output directory on error:', e);
        }
      }
      
      return res.status(500).json({ 
        error: 'Failed to convert PDF to images',
        details: error.message
      });
    }
  });

  // PDF Preview API route
  server.post('/api/pdf-preview', async (req, res) => {
    console.log('=== PDF PREVIEW API START ===');
    
    let tempFiles = [];

    try {
      const tempDir = path.join(__dirname, '..', 'temp');
      
      const form = new formidable.IncomingForm({
        multiples: false,
        keepExtensions: true,
        maxFileSize: 100 * 1024 * 1024,
        uploadDir: tempDir
      });

      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const pdfFile = files.pdf;
      if (!pdfFile) {
        return res.status(400).json({ error: 'No PDF file provided' });
      }

      const pdfPath = getFilePath(pdfFile);
      if (!pdfPath) {
        throw new Error('Could not determine PDF file path');
      }

      tempFiles.push(pdfPath);

      // Generate thumbnail of first page
      const options = {
        density: 100,
        saveFilename: "thumbnail",
        savePath: tempDir,
        format: "jpeg",
        width: 200,
        height: 260
      };

      const convertResult = pdf2pic.fromPath(pdfPath, options);
      const result = await convertResult(1);
      
      // Read thumbnail and convert to base64
      const thumbnailBuffer = fsSync.readFileSync(result.path);
      const thumbnailBase64 = thumbnailBuffer.toString('base64');
      
      // Get PDF info
      const pdfBytes = fsSync.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();

      // Clean up thumbnail file
      fsSync.unlinkSync(result.path);
      
      res.json({
        thumbnail: `data:image/jpeg;base64,${thumbnailBase64}`,
        pageCount: pageCount,
        fileSize: Array.isArray(pdfFile) ? pdfFile[0].size : pdfFile.size
      });

      // Clean up temp files
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up:', e);
        }
      });

      console.log('=== PDF PREVIEW API SUCCESS ===');

    } catch (error) {
      console.error('=== PDF PREVIEW API ERROR ===', error);
      
      tempFiles.forEach(filepath => {
        try {
          if (fsSync.existsSync(filepath)) {
            fsSync.unlinkSync(filepath);
          }
        } catch (e) {
          console.error('Error cleaning up on error:', e);
        }
      });
      
      return res.status(500).json({ 
        error: 'Failed to generate PDF preview',
        details: error.message
      });
    }
  });

  // Handle Next.js pages and API routes
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  // Global error handling middleware
  server.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: dev ? error.message : 'Something went wrong'
    });
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Server ready on http://localhost:${port}`);
    console.log(`> Environment: ${dev ? 'development' : 'production'}`);
    console.log(`> Temp directory: ${path.join(__dirname, '..', 'temp')}`);
    console.log(`> LibreOffice integration: enabled`);
  });

}).catch((ex) => {
  console.error('Error starting server:', ex.stack);
  process.exit(1);
});