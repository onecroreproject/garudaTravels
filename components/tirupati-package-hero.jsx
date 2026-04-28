"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function TirupatiPackageHero({ packageData }) {
  const images = [
    "/images/trupathi/hero-carousel-1.jpg",
    "/images/trupathi/hero-carousel-2.jpg",
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const handleBookNow = () => {
    const bookingElement = document.getElementById('booking')
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-[400px] sm:h-[450px] md:h-[500px] overflow-hidden mb-8 sm:mb-12">
      {/* Image Carousel Background */}
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url("${img}")`
          }}
        />
      ))}

      <div className="relative w-full h-full">
        <br />
        {/* Enhanced Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/80" />

        {/* Spiritual Light Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent animate-pulse" />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-200/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-300/25 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-yellow-200/35 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }} />
        </div>

        {/* Content with Enhanced Styling */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-5xl">
            {/* Decorative Elements */}
            <div className="flex justify-center items-center mb-6">
              <div className="mx-4 text-yellow-400 text-2xl"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>

            {/* Main Title with Glow Effect */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight text-shadow-lg">
              <span className="bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                {packageData.title}
              </span>
            </h1>

            {/* Subtitle with Enhanced Styling */}
            <div className="mb-8">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed opacity-95 font-medium">
                <span className="bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent">
                  {packageData.subtitle || "Tirupati Package"}
                </span>
              </p>

            </div>

            {/* Enhanced CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white px-6 py-3 sm:px-10 sm:py-4 text-base sm:text-lg font-semibold rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-yellow-400/30"
                onClick={handleBookNow}
              >
                <span className="flex items-center gap-2">
                  {/* <span>🕉️</span> */}
                  Book Sacred Journey
                  {/* <span>🕉️</span> */}
                </span>
              </Button>


            </div>

            {/* Bottom Decorative Line */}
            <div className="mt-8 flex justify-center">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            </div>
          </div>
        </div>

        {/* Corner Spiritual Symbols */}
        {/* <div className="absolute top-8 left-8 text-yellow-400/20 text-4xl">🕉️</div>
        <div className="absolute top-8 right-8 text-yellow-400/20 text-4xl">🕉️</div>
        <div className="absolute bottom-8 left-8 text-yellow-400/20 text-4xl">🕉️</div>
        <div className="absolute bottom-8 right-8 text-yellow-400/20 text-4xl">🕉️</div> */}
      </div>
    </section>
  )
}