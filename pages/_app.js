// pages/_app.js
import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'
import { MergeProvider } from '../contexts/MergeContext'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'

const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-28SMXQ6JDC', {
      page_path: url,
    })
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration)
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError)
        })
    }
  }, [])

  return (
    <>
      {/* Google Analytics */}
      <Script 
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-28SMXQ6JDC"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-28SMXQ6JDC');
        `}
      </Script>

      <ErrorBoundary>
        <MergeProvider>
          <Component {...pageProps} />
        </MergeProvider>
      </ErrorBoundary>
    </>
  )
}