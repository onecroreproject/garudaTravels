import './globals.css'
import { Suspense } from 'react'
import { Montserrat, Poppins } from 'next/font/google'
import PreloadLinks from '@/components/PreloadLinks'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  adjustFontFallback: false
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  adjustFontFallback: false
})

export const metadata = {
  title: 'Chennai to Tirupati Tour Packages | Tirupati Tours| Temple Tour Packages - Garuda Tours & Travels',
  description: 'Explore affordable Chennai to Tirupati tour packages with Garuda Tours & Travels. Hassle-free temple visits, VIP darshan, and customized itineraries. Book your Tirupati temple tour today!',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to critical third-party domains */}
        <link rel="preconnect" href="https://firestore.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        
        <PreloadLinks />
      </head>
      <body className={`${montserrat.variable} ${poppins.variable} font-montserrat font-poppins`}>
        <Suspense>
          {children}
        </Suspense> 
      </body>
    </html>
  )
}

