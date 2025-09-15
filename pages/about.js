// pages/about.js
import Head from 'next/head'
import Layout from '../components/Layout'
import { Shield, Zap, Globe, Users, Award, Heart } from 'lucide-react'

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Free PDF Tools & Document Converters</title>
        <meta name="description" content="Learn about our mission to provide free, secure, and easy-to-use PDF tools and document conversion services for everyone." />
        <meta name="keywords" content="about us, PDF tools, document conversion, free online tools" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About PDF Tools Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              We're dedicated to making document conversion and PDF manipulation accessible, 
              secure, and completely free for everyone around the world.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                To democratize access to professional document tools by providing free, 
                high-quality PDF and document conversion services without compromising on security or ease of use.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Security First</h3>
                <p className="text-gray-600">
                  All files are processed securely and automatically deleted after conversion. 
                  Your privacy and data security are our top priorities.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                <p className="text-gray-600">
                  Optimized algorithms ensure your documents are converted quickly and efficiently, 
                  saving you valuable time.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Universal Access</h3>
                <p className="text-gray-600">
                  Works on any device with a web browser. No software installation, 
                  no subscriptions, no hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  PDF Tools Hub was born from a simple frustration: why should basic document 
                  conversion require expensive software or risky online services that compromise your privacy?
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  We believe that essential productivity tools should be accessible to everyone, 
                  whether you're a student working on assignments, a professional preparing presentations, 
                  or anyone who needs to convert documents quickly and securely.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  That's why we've built a comprehensive suite of PDF and document conversion tools 
                  that are completely free, secure, and designed with user experience in mind.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-indigo-600 mb-2">1M+</div>
                    <div className="text-gray-600">Documents Converted</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                    <div className="text-gray-600">Free to Use</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                    <div className="text-gray-600">Conversion Tools</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                    <div className="text-gray-600">Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-lg text-gray-600">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-lg p-3 flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Centric Design</h3>
                  <p className="text-gray-600">
                    Every feature is designed with the user in mind. We prioritize simplicity, 
                    clarity, and efficiency in all our tools.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-lg p-3 flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Protection</h3>
                  <p className="text-gray-600">
                    We never store, share, or access your documents. All processing happens 
                    securely and files are automatically deleted.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-lg p-3 flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Excellence</h3>
                  <p className="text-gray-600">
                    We use the best available algorithms and technologies to ensure 
                    high-quality conversions that preserve your document integrity.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-lg p-3 flex-shrink-0">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Focus</h3>
                  <p className="text-gray-600">
                    We're committed to serving our global community by keeping our tools 
                    free and continuously improving based on user feedback.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Convert Your Documents?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of users who trust our free, secure, and fast conversion tools.
            </p>
            <a 
              href="/"
              className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Converting Now
            </a>
          </div>
        </div>
      </Layout>
    </>
  )
}