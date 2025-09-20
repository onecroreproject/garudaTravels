import './globals.css'
import { Suspense } from 'react'
import { Montserrat, Poppins } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Chennai to Tirupati Tour Packages | Tirupati Tours| Temple Tour Packages - Garuda Tours & Travels',
  description: 'Explore affordable Chennai to Tirupati tour packages with Garuda Tours & Travels. Hassle-free temple visits, VIP darshan, and customized itineraries. Book your Tirupati temple tour today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${poppins.variable} font-montserrat font-poppins`}>
        <Suspense>
        
        <main>{children}</main>
      
      
        </Suspense> 
      </body>
    </html>
  )
}

