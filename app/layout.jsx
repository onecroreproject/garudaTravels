import './globals.css'
import { Montserrat, Poppins } from 'next/font/google'
import Script from 'next/script'
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
  description:
    'Explore affordable Chennai to Tirupati tour packages with Garuda Tours & Travels. Hassle-free temple visits, VIP darshan, and customized itineraries. Book your Tirupati package from chennai today!',
  verification: {
    google: 'Nfags19ti-cL6zIaPs3sbTnY2XNHjkQ-igEgEz8XafI',
  },
  icons: {
    icon: '/app/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/icon.png" sizes="any" />

        {/* Preload hero image for better LCP */}
        <link
          rel="preload"
          href="/images/slider3.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />



        {/* Optional: Preload links */}
        {/* <PreloadLinks /> */}
      </head>

      <body
        className={`${montserrat.variable} ${poppins.variable}`}
        suppressHydrationWarning
      >
        {children}

        {/* ================= GOOGLE TRACKING ================= */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0JSPK1NDNK"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-0JSPK1NDNK');
            gtag('config', 'AW-11108388784');
          `}
        </Script>
      </body>
    </html>
  )
}

