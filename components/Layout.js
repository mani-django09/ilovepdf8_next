import Link from 'next/link'
import { FileText, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    <div className="min-h-screen bg-white">
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-red-600 rounded-lg p-2">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">PDF Tools Hub</span>
                <div className="text-xs text-gray-500 -mt-1">Free Online PDF & Document Tools</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Main Navigation Links */}
              <div className="flex space-x-6">
                <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                  Contact
                </Link>
              </div>
              
              {/* Tools Dropdown */}
              <div className="relative group">
                <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors text-sm font-medium">
                  Tools
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {tools.map((tool) => (
                      <Link 
                        key={tool.name}
                        href={tool.href} 
                        className="block px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md text-sm transition-colors"
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-red-600"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {/* Main Pages */}
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="block px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium"
                onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
              
              {/* Tools Section */}
              <div className="border-t pt-2 mt-2">
                <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  PDF Tools
                </div>
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="block px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-md text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      <main>{children}</main>
      
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-red-600 rounded-lg p-2">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">PDF Tools Hub</span>
              </div>
              <p className="text-gray-400 mb-4">
                Free online PDF and document conversion tools to help you work with files. 
                Convert, merge, compress, and edit documents easily and securely.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="text-green-400">✓ 100% Free</span>
                <span className="text-blue-400">✓ No Registration</span>
                <span className="text-purple-400">✓ Secure</span>
                <span className="text-yellow-400">✓ Fast</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">PDF Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/merge-pdf" className="text-gray-400 hover:text-white transition-colors">Merge PDF</Link></li>
                <li><Link href="/compress-pdf" className="text-gray-400 hover:text-white transition-colors">Compress PDF</Link></li>
                <li><Link href="/pdf-to-jpg" className="text-gray-400 hover:text-white transition-colors">PDF to JPG</Link></li>
                <li><Link href="/pdf-to-word" className="text-gray-400 hover:text-white transition-colors">PDF to Word</Link></li>
                <li><Link href="/pdf-to-png" className="text-gray-400 hover:text-white transition-colors">PDF to PNG</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Converters</h3>
              <ul className="space-y-2">
                <li><Link href="/word-to-pdf" className="text-gray-400 hover:text-white transition-colors">Word to PDF</Link></li>
                <li><Link href="/jpg-to-pdf" className="text-gray-400 hover:text-white transition-colors">JPG to PDF</Link></li>
                <li><Link href="/png-to-pdf" className="text-gray-400 hover:text-white transition-colors">PNG to PDF</Link></li>
                <li><Link href="/jpg-to-png" className="text-gray-400 hover:text-white transition-colors">JPG to PNG</Link></li>
                <li><Link href="/png-to-jpg" className="text-gray-400 hover:text-white transition-colors">PNG to JPG</Link></li>
                <li><Link href="/png-to-webp" className="text-gray-400 hover:text-white transition-colors">PNG to WebP</Link></li>
                <li><Link href="/webp-to-png" className="text-gray-400 hover:text-white transition-colors">WebP to PNG</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left text-gray-400 mb-4 md:mb-0">
                <p>&copy; 2025 PDF Tools Hub. All rights reserved.</p>
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
  )
}