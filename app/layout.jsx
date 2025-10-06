import './globals.css'
import { Montserrat, Poppins } from 'next/font/google'
import PreloadLinks from '@/components/PreloadLinks'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: 'Chennai to Tirupati Packages | Tirupati Packages | Temple Tour Packages - Garuda Tours & Travels',
  description: 'Explore affordable Chennai to Tirupati tour packages with Garuda Tours & Travels. Hassle-free temple visits, VIP darshan, and customized itineraries. Book your Tirupati package from chennai today!',
  verification: {
    google: "K7ewXgKXvbit-3awn54q3G0xI8ESfogL5ljIuwXoJDQ"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero image for better LCP */}
        <link
          rel="preload"
          href="/images/slider3.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Preconnect to CDN (faster FA load) */}
        {/* <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" /> */}

        {/* Load PreloadLinks */}
        {/* <PreloadLinks /> */}
      </head>
      <body className={`${montserrat.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  )
}
