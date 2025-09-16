import Link from 'next/link'
import { FileText, Menu, X, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import Head from 'next/head'

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Simple scroll detection for styling changes only
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tools = [
    { name: 'Merge PDF', href: '/merge-pdf' },
    { name: 'Compress PDF', href: '/compress-pdf' },
    { name: 'PDF to JPG', href: '/pdf-to-jpg' },
    { name: 'JPG to PDF', href: '/jpg-to-pdf' },
    { name: 'PNG to JPG', href: '/png-to-jpg' },
    { name: 'JPG to PNG', href: '/jpg-to-png' },
    { name: 'PNG to WebP', href: '/png-to-webp' },
    { name: 'WebP to PNG', href: '/webp-to-png' },
    { name: 'PNG to PDF', href: '/png-to-pdf' },
    { name: 'PDF to PNG', href: '/pdf-to-png' },
    { name: 'Word to PDF', href: '/word-to-pdf' },
    { name: 'PDF to Word', href: '/pdf-to-word' }
  ]

  return (
    <>
      <Head>
        {/* Favicon Implementation */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#dc2626" />
      </Head>
      
      <div className="min-h-screen bg-white">
        {/* Always visible header - no hiding logic */}
        <nav className={`bg-white/95 backdrop-blur-md border-b fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo Section */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="hidden sm:block">
                  <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    iLovePDF
                  </div>
                  <div className="text-xs text-gray-500 -mt-1 font-medium">
                    Every tool you need to work with PDFs
                  </div>
                </div>
                
                {/* Mobile Logo */}
                <div className="sm:hidden flex items-center space-x-2">
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-2">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    iLovePDF
                  </span>
                </div>
              </Link>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {/* Main Navigation Links */}
                <div className="flex items-center space-x-6">
                  <Link href="/merge-pdf" className="text-gray-700 hover:text-red-600 transition-colors text-sm font-medium">
                    Merge PDF
                  </Link>
                  <Link href="/jpg-to-pdf" className="text-gray-700 hover:text-red-600 transition-colors text-sm font-medium">
                    JPG to PDF
                  </Link>
                  <Link href="/pdf-to-jpg" className="text-gray-700 hover:text-red-600 transition-colors text-sm font-medium">
                    PDF to JPG
                  </Link>
                </div>
                
                {/* Tools Dropdown */}
                <div className="relative group">
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium">
                    All PDF Tools
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="p-4">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                        Popular Tools
                      </div>
                      <div className="grid grid-cols-2 gap-1 max-h-80 overflow-y-auto">
                        {tools.map((tool) => (
                          <Link 
                            key={tool.name}
                            href={tool.href} 
                            className="flex items-center px-3 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm transition-all duration-200 group"
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-red-100 transition-colors">
                              <FileText className="w-4 h-4 text-gray-500 group-hover:text-red-600" />
                            </div>
                            <span className="font-medium">{tool.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
              <div className="px-4 py-3 space-y-1 max-h-96 overflow-y-auto">
                {/* Tools Section */}
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  PDF Tools
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="flex items-center px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </div>
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>
        
        {/* Add padding to account for fixed header */}
        <div className="pt-16">
          <main>{children}</main>
        </div>
        
        {/* Enhanced Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative">
                    <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-2">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 bg-pink-500 rounded-full p-1">
                      <Heart className="w-2 h-2 text-white fill-current" />
                    </div>
                  </div>
                  <span className="text-xl font-bold">iLovePDF</span>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Every tool you need to work with PDFs in one place. Edit, convert, compress, merge, split, and sign PDFs online for free.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">100% Free Tools</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">No Registration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Secure Processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-sm text-gray-400">Lightning Fast</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-400">PDF Tools</h3>
                <ul className="space-y-2">
                  <li><Link href="/merge-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">Merge PDF</Link></li>
                  <li><Link href="/compress-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">Compress PDF</Link></li>
                  <li><Link href="/pdf-to-jpg" className="text-gray-400 hover:text-white transition-colors text-sm">PDF to JPG</Link></li>
                  <li><Link href="/pdf-to-word" className="text-gray-400 hover:text-white transition-colors text-sm">PDF to Word</Link></li>
                  <li><Link href="/pdf-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">PDF to PNG</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4 text-red-400">Converters</h3>
                <ul className="space-y-2">
                  <li><Link href="/word-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">Word to PDF</Link></li>
                  <li><Link href="/jpg-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">JPG to PDF</Link></li>
                  <li><Link href="/png-to-pdf" className="text-gray-400 hover:text-white transition-colors text-sm">PNG to PDF</Link></li>
                  <li><Link href="/jpg-to-png" className="text-gray-400 hover:text-white transition-colors text-sm">JPG to PNG</Link></li>
                  <li><Link href="/png-to-webp" className="text-gray-400 hover:text-white transition-colors text-sm">PNG to WebP</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left text-gray-400 mb-4 md:mb-0">
                  <p>&copy; 2025 iLovePDF. All rights reserved.</p>
                </div>
                <div className="flex space-x-6">
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Terms of Service
                  </Link>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}