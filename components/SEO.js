// components/SEO.js
import Head from 'next/head'
import { useRouter } from 'next/router'

const SEO = ({
  title,
  description,
  keywords,
  image,
  noindex = false,
  canonical
}) => {
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yoursite.com'
  const fullUrl = canonical || `${baseUrl}${router.asPath}`
  
  const defaultTitle = 'PDF Tools - Free Online PDF Converter & Editor'
  const defaultDescription = 'Free online PDF tools to convert, merge, compress, and edit PDF files. Fast, secure, and easy to use PDF converter with support for Word, JPG, PNG, WebP formats.'
  
  const finalTitle = title ? `${title} | PDF Tools` : defaultTitle
  const finalDescription = description || defaultDescription
  const finalImage = image || `${baseUrl}/og-image.png`

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {keywords && <meta name="keywords" content={keywords} />}
      
      <link rel="canonical" href={fullUrl} />
      
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="PDF Tools" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional SEO tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#dc2626" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'PDF Tools',
            description: finalDescription,
            url: fullUrl,
            applicationCategory: 'Utility',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            featureList: [
              'PDF to Word conversion',
              'Word to PDF conversion',
              'Image to PDF conversion',
              'PDF to Image conversion',
              'PDF merging',
              'PDF compression'
            ]
          })
        }}
      />
    </Head>
  )
}

export default SEO