// server/routes/enhanced-tools.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { 
  enhancedSecurity, 
  uploadRateLimit, 
  validateFile 
} = require('../middleware/enhanced-security');
const {
  pdfToWord,
  wordToPdf,
  imageToPdf,
  pdfToImages,
  mergePdfs,
  compressPdf,
  createZipArchive,
  cleanupFiles
} = require('../utils/enhanced-file-processors');

const router = express.Router();

// Configure multer with enhanced security
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const tempDir = path.join(process.cwd(), 'temp');
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Sanitize filename and add timestamp
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .substring(0, 50);
    cb(null, `${timestamp}-${random}-${baseName}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 10,
    fieldSize: 1024 * 1024 // 1MB field size
  }
});

// Apply security middleware to all routes
router.use(enhancedSecurity);

// PDF to Word conversion
router.post('/pdf-to-word', 
  uploadRateLimit,
  upload.single('file'),
  validateFile(['.pdf'], 1),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      filesToCleanup.push(req.file.path);
      
      console.log(`Converting PDF to Word: ${req.file.originalname}`);
      const outputPath = await pdfToWord(req.file.path);
      filesToCleanup.push(outputPath);
      
      res.download(outputPath, 'converted.docx', async (err) => {
        await cleanupFiles(filesToCleanup);
        if (err) {
          console.error('Download error:', err);
        }
      });
    } catch (error) {
      console.error('PDF to Word conversion error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Conversion failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Word to PDF conversion
router.post('/word-to-pdf',
  uploadRateLimit,
  upload.single('file'),
  validateFile(['.doc', '.docx'], 1),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No Word file uploaded' });
      }

      filesToCleanup.push(req.file.path);
      
      console.log(`Converting Word to PDF: ${req.file.originalname}`);
      const outputPath = await wordToPdf(req.file.path);
      filesToCleanup.push(outputPath);
      
      res.download(outputPath, 'converted.pdf', async (err) => {
        await cleanupFiles(filesToCleanup);
        if (err) {
          console.error('Download error:', err);
        }
      });
    } catch (error) {
      console.error('Word to PDF conversion error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Conversion failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Image to PDF conversion
router.post('/jpg-to-pdf',
  uploadRateLimit,
  upload.array('files', 10),
  validateFile(['.jpg', '.jpeg', '.png'], 10),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: 'No image files uploaded' });
      }

      const filePaths = req.files.map(file => file.path);
      filesToCleanup.push(...filePaths);
      
      console.log(`Converting ${filePaths.length} images to PDF`);
      const outputPath = await imageToPdf(filePaths);
      filesToCleanup.push(outputPath);
      
      res.download(outputPath, 'converted.pdf', async (err) => {
        await cleanupFiles(filesToCleanup);
        if (err) {
          console.error('Download error:', err);
        }
      });
    } catch (error) {
      console.error('Images to PDF conversion error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Conversion failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// PDF to Images conversion
router.post('/pdf-to-jpg',
  uploadRateLimit,
  upload.single('file'),
  validateFile(['.pdf'], 1),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      filesToCleanup.push(req.file.path);
      
      console.log(`Converting PDF to images: ${req.file.originalname}`);
      const imagePaths = await pdfToImages(req.file.path);
      filesToCleanup.push(...imagePaths);
      
      if (imagePaths.length === 1) {
        // Single image - direct download
        res.download(imagePaths[0], 'converted.jpg', async (err) => {
          await cleanupFiles(filesToCleanup);
          if (err) {
            console.error('Download error:', err);
          }
        });
      } else {
        // Multiple images - create ZIP
        const zipPath = path.join(path.dirname(imagePaths[0]), `images-${Date.now()}.zip`);
        filesToCleanup.push(zipPath);
        
        const files = imagePaths.map((imagePath, index) => ({
          path: imagePath,
          name: `page-${index + 1}.jpg`
        }));
        
        await createZipArchive(files, zipPath);
        
        res.download(zipPath, 'converted-images.zip', async (err) => {
          await cleanupFiles(filesToCleanup);
          if (err) {
            console.error('Download error:', err);
          }
        });
      }
    } catch (error) {
      console.error('PDF to images conversion error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Conversion failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// PDF merge
router.post('/merge-pdf',
  uploadRateLimit,
  upload.array('files', 10),
  validateFile(['.pdf'], 10),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.files || req.files.length < 2) {
        return res.status(400).json({ error: 'At least 2 PDF files are required for merging' });
      }

      const filePaths = req.files.map(file => file.path);
      filesToCleanup.push(...filePaths);
      
      console.log(`Merging ${filePaths.length} PDF files`);
      const outputPath = await mergePdfs(filePaths);
      filesToCleanup.push(outputPath);
      
      res.download(outputPath, 'merged.pdf', async (err) => {
        await cleanupFiles(filesToCleanup);
        if (err) {
          console.error('Download error:', err);
        }
      });
    } catch (error) {
      console.error('PDF merge error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Merge failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// PDF compression
router.post('/compress-pdf',
  uploadRateLimit,
  upload.single('file'),
  validateFile(['.pdf'], 1),
  async (req, res) => {
    const filesToCleanup = [];
    
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No PDF file uploaded' });
      }

      filesToCleanup.push(req.file.path);
      
      console.log(`Compressing PDF: ${req.file.originalname}`);
      const outputPath = await compressPdf(req.file.path);
      filesToCleanup.push(outputPath);
      
      res.download(outputPath, 'compressed.pdf', async (err) => {
        await cleanupFiles(filesToCleanup);
        if (err) {
          console.error('Download error:', err);
        }
      });
    } catch (error) {
      console.error('PDF compression error:', error);
      await cleanupFiles(filesToCleanup);
      res.status(500).json({ 
        error: 'Compression failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;