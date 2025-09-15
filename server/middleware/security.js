// server/middleware/enhanced-security.js
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const validator = require('validator');
const path = require('path');

// Enhanced rate limiting with different limits for different endpoints
const createRateLimiter = (windowMs, max, message) => rateLimit({
  windowMs,
  max,
  message: { error: message },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      error: message,
      retryAfter: Math.round(windowMs / 1000)
    });
  }
});

// Different rate limits for different operations
const uploadRateLimit = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  10, // 10 uploads per 15 minutes
  'Too many file uploads. Please try again in 15 minutes.'
);

const generalRateLimit = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests per 15 minutes
  'Too many requests. Please try again later.'
);

// Enhanced security middleware
const enhancedSecurity = (req, res, next) => {
  // File size validation
  const maxSize = 50 * 1024 * 1024; // 50MB
  const contentLength = parseInt(req.headers['content-length']) || 0;
  
  if (contentLength > maxSize) {
    return res.status(413).json({ 
      error: 'File too large. Maximum size is 50MB.',
      maxSize: '50MB'
    });
  }

  // Enhanced security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  next();
};

// File validation middleware
const validateFile = (allowedExtensions, maxFiles = 10) => (req, res, next) => {
  if (!req.files && !req.file) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = req.files || [req.file];
  
  // Check file count
  if (files.length > maxFiles) {
    return res.status(400).json({ 
      error: `Too many files. Maximum ${maxFiles} files allowed.` 
    });
  }

  // Validate each file
  for (const file of files) {
    if (!file || !file.originalname) {
      return res.status(400).json({ error: 'Invalid file data' });
    }

    // Sanitize filename
    const sanitizedName = validator.escape(file.originalname);
    if (sanitizedName !== file.originalname) {
      return res.status(400).json({ error: 'Invalid characters in filename' });
    }

    // Check file extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return res.status(400).json({ 
        error: `Invalid file type. Allowed: ${allowedExtensions.join(', ')}` 
      });
    }

    // Check file size
    if (file.size > 50 * 1024 * 1024) {
      return res.status(400).json({ error: 'File too large. Maximum 50MB.' });
    }
  }

  next();
};

module.exports = {
  enhancedSecurity,
  uploadRateLimit,
  generalRateLimit,
  validateFile,
  helmet: helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:"],
        scriptSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    crossOriginEmbedderPolicy: false
  }),
  compression: compression()
};