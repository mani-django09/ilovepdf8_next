// pages/terms.js
import Head from 'next/head'
import Layout from '../components/Layout'
import { FileText, AlertCircle, Scale, Users } from 'lucide-react'

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - PDF Tools Hub</title>
        <meta name="description" content="Terms of service for PDF Tools Hub. Learn about usage guidelines, limitations, and user responsibilities." />
        <meta name="keywords" content="terms of service, usage terms, PDF tools, document conversion" />
      </Head>
      
      <Layout>
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Scale className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Please read these terms carefully before using our services. By using PDF Tools Hub, you agree to these terms.
              </p>
              <p className="text-sm text-gray-500 mt-4">Last updated: January 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">Terms in Summary</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900">Free to Use</h3>
                    <p className="text-blue-700 text-sm">Our services are completely free for personal and commercial use.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900">Use Responsibly</h3>
                    <p className="text-blue-700 text-sm">Don't abuse our services or use them for illegal activities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Scale className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900">No Warranties</h3>
                    <p className="text-blue-700 text-sm">Services are provided "as is" without guarantees.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-blue-900">Respect Others</h3>
                    <p className="text-blue-700 text-sm">Don't interfere with other users' ability to use our services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="py-0 pb-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using PDF Tools Hub ("the Service"), you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                PDF Tools Hub provides free online document conversion and PDF manipulation tools. 
                Our services include but are not limited to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                <li>Converting documents between various formats (PDF, Word, JPG, PNG, WebP, etc.)</li>
                <li>Merging and splitting PDF documents</li>
                <li>Compressing PDF files</li>
                <li>Extracting images from PDFs</li>
                <li>Other document manipulation tools</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Responsibilities</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Acceptable Use</h3>
              <p className="text-gray-700 mb-4">You agree to use our services only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Upload or process copyrighted material without proper authorization</li>
                <li>Use our services to process illegal, harmful, or offensive content</li>
                <li>Attempt to reverse engineer, hack, or compromise our systems</li>
                <li>Use automated tools to overwhelm our servers or disrupt service for others</li>
                <li>Upload files containing viruses, malware, or other harmful code</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Responsibility</h3>
              <p className="text-gray-700 mb-6">
                You are solely responsible for the files you upload and process. Ensure you have the 
                right to use and convert any documents you submit to our service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Service Limitations</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">File Size and Type Restrictions</h3>
              <p className="text-gray-700 mb-4">We impose reasonable limits on file sizes and types to ensure service quality:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>Maximum file size: 100MB per file</li>
                <li>Supported formats are clearly indicated for each tool</li>
                <li>We reserve the right to modify these limits as needed</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Availability</h3>
              <p className="text-gray-700 mb-6">
                While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. 
                We may temporarily suspend service for maintenance, updates, or technical issues.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Intellectual Property</h2>
              <p className="text-gray-700 mb-4">
                The PDF Tools Hub website, including its design, features, and underlying technology, 
                is protected by copyright and other intellectual property laws. You may not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
                <li>Copy, modify, or distribute our website code or design</li>
                <li>Use our trademarks or branding without permission</li>
                <li>Create derivative works based on our services</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Privacy and Data Handling</h2>
              <p className="text-gray-700 mb-6">
                Your privacy is important to us. Please review our Privacy Policy to understand how we 
                handle your data. By using our services, you agree to our data handling practices as 
                outlined in our Privacy Policy.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Disclaimers and Warranties</h2>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">"As Is" Service</h3>
              <p className="text-gray-700 mb-4">
                Our services are provided "as is" without warranties of any kind, either express or implied. 
                We do not warrant that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
                <li>The service will be uninterrupted or error-free</li>
                <li>All file conversions will be perfect or meet your specific needs</li>
                <li>The service will be free from viruses or other harmful components</li>
                <li>Any particular results will be achieved</li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitation of Liability</h3>
              <p className="text-gray-700 mb-6">
                In no event shall PDF Tools Hub be liable for any direct, indirect, incidental, special, 
                or consequential damages resulting from your use of our services, including but not limited 
                to data loss, business interruption, or loss of profits.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Indemnification</h2>
              <p className="text-gray-700 mb-6">
                You agree to indemnify and hold harmless PDF Tools Hub from any claims, damages, or 
                expenses arising from your use of our services, your violation of these terms, or 
                your infringement of any third-party rights.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Termination</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to terminate or suspend access to our services immediately, 
                without prior notice, for conduct that violates these Terms of Service or is harmful 
                to other users, us, or third parties.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Changes to Terms</h2>
              <p className="text-gray-700 mb-6">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the service after changes constitutes 
                acceptance of the new terms.
              </p>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These Terms of Service shall be interpreted and governed by the laws of [Your Jurisdiction], 
                without regard to conflict of law provisions. Any disputes arising from these terms or 
                your use of our services shall be subject to the exclusive jurisdiction of the courts 
                in [Your Jurisdiction].
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Severability</h2>
              <p className="text-gray-700 mb-6">
                If any provision of these Terms of Service is found to be unenforceable or invalid, 
                that provision will be limited or eliminated to the minimum extent necessary so that 
                the remaining terms will remain in full force and effect.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@pdftoolshub.com<br/>
                  <strong>Response Time:</strong> Within 72 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}