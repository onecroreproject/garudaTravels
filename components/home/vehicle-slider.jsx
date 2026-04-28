"use client"

import Image from "next/image"

const initialVehicleImages = [
  { id: 1, src: "/cars/swift.png?height=300&width=450", alt: "Dzire or Etios" },
  { id: 2, src: "/cars/ertiga.png?height=300&width=450", alt: "Ertiga" },
  { id: 3, src: "/cars/innova.png?height=300&width=450", alt: "Innova" },
  { id: 4, src: "/cars/crysta.png?height=300&width=450", alt: "Innova Crysta" },
  { id: 5, src: "/cars/tempo.png?height=300&width=450", alt: "Tempo Traveller" },
]

const initialWhyChooseUsItems = [
  { id: 1, icon: "fas fa-headset", title: "24/7 Support", color: "from-blue-500 to-blue-600" },
  { id: 2, icon: "fas fa-snowflake", title: "A/C Vehicles", color: "from-cyan-500 to-cyan-600" },
  { id: 3, icon: "fas fa-user-tie", title: "Experienced Drivers", color: "from-green-500 to-green-600" },
  { id: 4, icon: "fas fa-map-marker-alt", title: "Pick‑up/Drop‑off in Chennai", color: "from-red-500 to-red-600" },
  { id: 5, icon: "fas fa-dollar-sign", title: "Transparent Pricing", color: "from-purple-500 to-purple-600" },
  { id: 6, icon: "fas fa-shield-alt", title: "Safe & Secure", color: "from-orange-500 to-orange-600" },
]

export default function VehicleFeatures() {
  return (
    <section className="py-8 sm:py-12 bg-white flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Garuda's Fleet & Service Chennai to Tirupati Travel
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center justify-center">
          {/* Left Column: Vehicles Auto-Swiper */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 rounded-xl shadow-xl overflow-hidden h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] relative">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Our Premium Fleet
            </h3>

            {/* Marquee Container */}
            <div className="marquee-viewport relative h-full">
              <ul className="marquee-track-h">
                {/* 1st copy */}
                {initialVehicleImages.map((vehicle) => (
                  <li key={`vh-a-${vehicle.id}`} className="marquee-item flex-shrink-0 w-56 sm:w-64 lg:w-72 mr-3 sm:mr-4 group">
                    <div className="vehicle-card bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-200 relative overflow-hidden">
                      <div className="image-wrapper relative overflow-hidden rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-50 to-gray-50 p-2 sm:p-3 lg:p-4 mb-3 sm:mb-4">
                        <Image
                          src={vehicle.src || "/placeholder.webp"}
                          alt={vehicle.alt}
                          width={450}
                          height={300}
                          className="w-full h-24 sm:h-32 lg:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white px-2 py-1 lg:px-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          Available
                        </div>
                      </div>
                      <div className="vehicle-info text-center">
                        <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {vehicle.alt}
                        </h4>
                        <div className="features flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                          <span className="feature-tag bg-green-100 text-green-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            AC
                          </span>
                          <span className="feature-tag bg-blue-100 text-blue-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            GPS
                          </span>
                          <span className="feature-tag bg-purple-100 text-purple-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            Music
                          </span>
                        </div>
                        <button className="book-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden text-xs sm:text-sm lg:text-base">
                          <span className="relative z-10">
                            <a className="text-white" href="tel:+919840789844">Book Now</a>
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
                {/* 2nd copy */}
                {initialVehicleImages.map((vehicle) => (
                  <li key={`vh-b-${vehicle.id}`} className="marquee-item flex-shrink-0 w-56 sm:w-64 lg:w-72 mr-3 sm:mr-4 group">
                    <div className="vehicle-card bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-200 relative overflow-hidden">
                      <div className="image-wrapper relative overflow-hidden rounded-lg lg:rounded-xl bg-gradient-to-br from-blue-50 to-gray-50 p-2 sm:p-3 lg:p-4 mb-3 sm:mb-4">
                        <Image
                          src={vehicle.src || "/placeholder.webp"}
                          alt={vehicle.alt}
                          width={450}
                          height={300}
                          className="w-full h-24 sm:h-32 lg:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-blue-600 text-white px-2 py-1 lg:px-3 rounded-full text-xs sm:text-sm font-semibold shadow-lg">
                          Available
                        </div>
                      </div>
                      <div className="vehicle-info text-center">
                        <h4 className="text-sm sm:text-lg lg:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {vehicle.alt}
                        </h4>
                        <div className="features flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                          <span className="feature-tag bg-green-100 text-green-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            AC
                          </span>
                          <span className="feature-tag bg-blue-100 text-blue-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            GPS
                          </span>
                          <span className="feature-tag bg-purple-100 text-purple-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110">
                            Music
                          </span>
                        </div>
                        <button className="book-btn w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-3 sm:px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg relative overflow-hidden text-xs sm:text-sm lg:text-base">
                          <span className="relative z-10">Book Now</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Fades */}
              <div className="fade-left absolute left-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10" />
              <div className="fade-right absolute right-0 top-0 bottom-0 w-8 sm:w-12 lg:w-16 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* Right Column: Why Choose Us Auto-Swiper */}
          <div className="w-full max-w-sm lg:w-80 xl:w-96 bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl shadow-xl h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden flex flex-col relative">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
              Why Choose Garuda?
            </h3>

            {/* Vertical Marquee Container */}
            <div className="marquee-viewport-v flex items-center justify-center overflow-hidden">
              <ul className="marquee-track-v">
                {/* 1st copy */}
                {initialWhyChooseUsItems.map((item) => (
                  <li key={`wu-a-${item.id}`} className="swiper-slide-vertical flex flex-col items-center justify-center h-24 sm:h-28 lg:h-32 mb-3 sm:mb-4 group">
                    <div className="why-us-card bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full border border-gray-200">
                      <div className="icon-wrapper flex justify-center mb-2 sm:mb-3 lg:mb-4">
                        <div className={`icon-container bg-gradient-to-br ${item.color} p-2 sm:p-3 lg:p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                          <i className={`${item.icon} text-white text-sm sm:text-lg lg:text-xl`}></i>
                        </div>
                      </div>
                      <h4 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </li>
                ))}
                {/* 2nd copy */}
                {initialWhyChooseUsItems.map((item) => (
                  <li key={`wu-b-${item.id}`} className="swiper-slide-vertical flex flex-col items-center justify-center h-24 sm:h-28 lg:h-32 mb-3 sm:mb-4 group">
                    <div className="why-us-card bg-white rounded-xl lg:rounded-2xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 w-full border border-gray-200">
                      <div className="icon-wrapper flex justify-center mb-2 sm:mb-3 lg:mb-4">
                        <div className={`icon-container bg-gradient-to-br ${item.color} p-2 sm:p-3 lg:p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 relative`}>
                          <i className={`${item.icon} text-white text-sm sm:text-lg lg:text-xl`}></i>
                        </div>
                      </div>
                      <h4 className="text-xs sm:text-sm lg:text-lg font-bold text-gray-800 text-center group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Vertical Fades */}
              <div className="fade-top absolute top-0 left-0 right-0 h-8 sm:h-10 lg:h-12 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none z-10" />
              <div className="fade-bottom absolute bottom-0 left-0 right-0 h-8 sm:h-10 lg:h-12 bg-gradient-to-t from-purple-50 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Styles */}
      <style jsx>{`
        .swiper-container {
          position: relative;
          overflow: hidden;
        }
        
        .swiper-wrapper {
          width: max-content;
        }
        
        .swiper-slide {
          display: flex;
          align-items: center;
        }
        
        .vehicle-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 16px 16px 0 0;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .vehicle-card:hover::before {
          opacity: 1;
        }
        
        .image-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
          border-radius: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .vehicle-card:hover .image-wrapper::before {
          opacity: 1;
        }
        
        .book-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }
        
        .book-btn:hover::before {
          left: 100%;
        }
        
        .icon-container::after {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4, #8b5cf6, #3b82f6);
          border-radius: 50%;
          opacity: 0;
          z-index: -1;
          animation: rotate 3s linear infinite;
          transition: opacity 0.3s ease;
        }
        
        .why-us-card:hover .icon-container::after {
          opacity: 0.8;
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Marquee animations */
        .marquee-viewport {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
        }
        .marquee-track-h {
          display: inline-flex;
          gap: 1rem;
          padding: 0.5rem 0;
          animation: marquee-x var(--marquee-speed-x, 28s) linear infinite;
          will-change: transform;
        }
        @keyframes marquee-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .marquee-viewport-v {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(180deg, transparent 0, #000 10%, #000 90%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 10%, #000 90%, transparent 100%);
        }
        .marquee-track-v {
          display: inline-flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0.5rem 0;
          animation: marquee-y var(--marquee-speed-y, 32s) linear infinite;
          will-change: transform;
        }
        @keyframes marquee-y {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }

        /* Optional pause on hover */
        .marquee-viewport:hover .marquee-track-h,
        .marquee-viewport-v:hover .marquee-track-v {
          animation-play-state: paused;
        }

        /* Reduced motion: slow it down */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track-h { animation-duration: 60s; }
          .marquee-track-v { animation-duration: 70s; }
        }

        /* Mobile specific optimizations */
        @media (max-width: 640px) {
          .marquee-track-h {
            animation-duration: 35s;
          }
          
          .marquee-track-v {
            animation-duration: 40s;
          }
          
          .vehicle-card {
            min-height: 200px;
          }
          
          .why-us-card {
            min-height: 80px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1023px) {
          .marquee-item {
            width: 240px !important;
          }
        }
      `}</style>
    </section>
  )
}
