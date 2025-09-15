// pages/privacy.js
import Head from 'next/head'
import Layout from '../components/Layout'
import { Shield, Eye, Trash2, Lock } from 'lucide-react'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - PDF Tools Hub</title>
        <meta name="description" content="Our privacy policy explains how we protect your data and documents. We never store, share, or access your files." />
        <meta name="keywords" content="privacy policy, data protection, document security, PDF tools" />
      </Head>
      
      <Layout>
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your privacy is our priority. This policy explains how we handle your data and protect your documents.
              </p>
              <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
              <h2 className="text-xl font-semibold text-green-900 mb-4">Privacy in Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Eye className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-900">We Don't Look</h3>
                    <p className="text-green-700 text-sm">We never view, access, or analyze the content of your documents.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Trash2 className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-900">Auto-Delete</h3>
                    <p className="text-green-700 text-sm">All files are automatically deleted within minutes of processing.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Lock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-900">Secure Processing</h3>
                    <p className="text-green-700 text-sm">All conversions happen on secure servers with encrypted connections.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-900">No Registration</h3>
                    <p className="text-green-700 text-sm">Use our tools without creating accounts or providing personal information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Policy */}
        <div className="py-0 pb-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Information We Collect</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Documents and Files</h3>
              <p className="text-gray-700 mb-4">
                When you use our conversion tools, you upload documents to our servers for processing. 
                These files are temporarily stored only for the duration needed to perform the conversion 
                and are automatically deleted immediately after processing is complete.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
              <p className="text-gray-700 mb-6">
                We may collect basic technical information such as your IP address, browser type, 
                and operating system for security purposes and to improve our services. This information 
                cannot be used to identify you personally.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. How We Use Your Information</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Document Processing</h3>
              <p className="text-gray-700 mb-4">
                Your uploaded documents are used solely for the purpose of performing the requested 
                conversion. We do not access, view, or analyze the content of your documents in any way.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Improvement</h3>
              <p className="text-gray-700 mb-6">
                We may use aggregated, anonymous usage statistics to improve our services and fix bugs. 
                This data cannot be traced back to individual users or specific documents.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Data Security</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Encryption</h3>
              <p className="text-gray-700 mb-4">
                All data transmission between your device and our servers is encrypted using industry-standard 
                SSL/TLS protocols. Your documents are processed on secure servers with restricted access.
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatic Deletion</h3>
              <p className="text-gray-700 mb-6">
                All uploaded files and converted documents are automatically deleted from our servers 
                within 60 minutes of upload, regardless of whether the conversion was successful or not.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Data Sharing</h2>
              <p className="text-gray-700 mb-6">
                We do not sell, trade, or share your documents or personal information with third parties. 
                Your files remain private and are never accessed by human operators or automated analysis systems.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-6">
                We use minimal, essential cookies to ensure our website functions properly. We do not use 
                tracking cookies, advertising cookies, or third-party analytics that could identify you personally.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Your Rights</h2>
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                <li>Use our services without providing personal information</li>
                <li>Know that your documents are not stored or accessed</li>
                <li>Request information about our data handling practices</li>
                <li>Contact us with privacy concerns or questions</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Children's Privacy</h2>
              <p className="text-gray-700 mb-6">
                Our services are not directed to children under 13. We do not knowingly collect personal 
                information from children under 13. If you believe a child has provided personal information 
                to us, please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. Any changes will be posted on this page 
                with an updated revision date. We encourage you to review this policy periodically.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@pdftoolshub.com<br/>
                  <strong>Response Time:</strong> Within 48 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}