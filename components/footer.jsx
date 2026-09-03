"use client"
import Image from "next/image"
import { Phone, Mail, MapPin, ChevronRight, Facebook, Instagram, MessageCircleMore, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 relative">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img src="/footer-logo.webp" alt="Logo" className="h-6 md:h-8 lg:h-10 w-auto" />
          <p className="mb-6 text-sm leading-relaxed mt-4">
            Garuda Tours and Travels offers trusted Chennai to Tirupati packages, VIP darshan trips, and temple tour packages with comfort, care, and devotion.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/garudatoursandtravelschennai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="border border-[#1877F2] bg-[#1877F2] p-2 rounded-md hover:bg-opacity-80 transition-all group"
            >
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.instagram.com/garudatoursandtravels/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="border border-[#E4405F] bg-[#E4405F] p-2 rounded-md hover:bg-opacity-80 transition-all group"
            >
              <Instagram className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://www.youtube.com/@garudatoursandtravels"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="border border-[#FF0000] bg-[#FF0000] p-2 rounded-md hover:bg-opacity-80 transition-all group"
            >
              <Youtube className="h-5 w-5 text-white" />
            </a>
            <a
              href="https://wa.me/919840789844"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="border border-[#25D366] bg-[#25D366] p-2 rounded-md hover:bg-opacity-80 transition-all group"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118a3.136 3.136 0 0 0 2.059-1.446 3.13 3.13 0 0 0 .22-1.446c-.099-.149-.371-.248-.669-.398z" />
                <path d="M12 2C6.486 2 2 6.486 2 12c0 1.768.455 3.432 1.262 4.908L2 22l5.247-1.237A9.957 9.957 0 0 0 12 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18.25c-1.579 0-3.125-.405-4.475-1.171l-.321-.182-3.322.784.796-3.138-.2-.303A8.257 8.257 0 0 1 3.75 12c0-4.549 3.701-8.25 8.25-8.25s8.25 3.701 8.25 8.25-3.701 8.25-8.25 8.25z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Our Services</h3>
          <ul className="space-y-3">
            <li>
              <a href="/tirupati-package/srivani-vip-break-darshan" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> VIP Break Darshan
              </a>
            </li>
            <li>
              <a href="/tirupati-package/chennai-tirupati-one-day-tour-package" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> One Day Tirupati Tour
              </a>
            </li>
            <li>
              <a href="/tirupati-package/tirupati-two-days-package-from-chennai" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> Chennai to Tirupati Tour
              </a>
            </li>
            <li>
              <a href="/tirupati-package/vellore-tirupati-one-day-tour-package" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> Vellore to Tirupati Tour
              </a>
            </li>
            <li>
              <a href="/tirupati-package/bangalore-tirupati-darshan-tour-package" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> Bangalore to Tirupati Tour
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Useful Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="tel:9840789844" className="flex items-center hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 mr-2 text-blue-400" /> 9840789844
              </a>
            </li>
            <li>
              <a href="tel:9840789857" className="flex items-center hover:text-blue-400 transition-colors">
                <Phone className="h-4 w-4 mr-2 text-blue-400" /> 9840789857
              </a>
            </li>
            <li>
              <a href="mailto:garudattd1@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4 mr-2 text-blue-400" /> garudattd1@gmail.com
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> Privacy Policy
              </a>
            </li>
            <li>
              <a href="/contact" className="flex items-center hover:text-blue-400 transition-colors">
                <ChevronRight className="h-4 w-4 mr-2 text-blue-400" /> Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6">Locations</h3>
          <ul className="space-y-3">
            <li>
              <a href="https://maps.google.com/?q=No.83,+Nehru+Nagar,+1st+Street,+13th+Main+Road,+Anna+Nagar+West,+Chennai" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-blue-400 transition-colors">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>No.83, Nehru Nagar, 1st Street, 13th Main Road, Anna Nagar West, Chennai</span>
              </a>
            </li>
            <li>
              <a href="https://maps.google.com/?q=No.9,+Netaji+Nagar,+RV+Nagar,+Last+main+road,+Near+R+V+Nagar+water+tank,+Kodungaiyur+Chennai+118" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-blue-400 transition-colors">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-blue-400 flex-shrink-0" />
                <span>
                  No.9, Netaji Nagar, RV Nagar, Last main road Near R V Nagar water tank Kodungaiyur Chennai 118
                </span>
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="  text-gray-500 text-sm py-6 mt-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright section */}
          <p className="text-center md:text-left order-2 md:order-1">
            Copyright © 2026 <span className="font-medium text-white">Garuda Tours & Travels</span>
            <span className="hidden sm:inline"> | </span>
            <br className="sm:hidden" />
            All rights reserved.
          </p>

          {/* Developer credit section */}
          <div className="flex items-center gap-2 order-1 md:order-2">
            <span className="text-gray-500">Developed by:</span>
            <a
              href="https://digitalmarketing.dlktech.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-white rounded-lg  p-1 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-200"
            >
              <Image
                src="/dlk.png"
                alt="DLK Technologies Logo"
                width={40}
                height={40}
                className="object-contain w-auto h-4 group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </div>
      </div>
      {/* Floating Action Buttons with Enhanced UI */}
      <div className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-2 sm:left-4 md:left-6 right-2 sm:right-4 md:right-6 flex justify-between items-end pointer-events-none z-50">

        {/* Call Button - Left Side */}
        <a
          href="tel:9840789844"
          aria-label="Call Us"
          className="group relative pointer-events-auto flex flex-col items-center"
        >
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            Call Us Now
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
          </span>

          {/* Button with Ripple Effect */}
          <div className="relative">
            {/* Ripple Animation */}
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>

            {/* Main Button - Transparent container for 3D logo */}
            <div className="relative transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer">
              {/* Real Phone Icon Image (3D & Transparent) */}
              <div className="relative h-14 w-14 sm:h-14 sm:w-14 md:h-16 md:w-16 drop-shadow-[0_8px_15px_rgba(59,130,246,0.4)]">
                <Image
                  src="/images/phone-icon-3d.png"
                  alt="Call"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Pulse Dot */}
            <div className="absolute top-1 right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>

        </a>

        {/* WhatsApp Button - Right Side */}
        <a
          href="https://wa.me/919840789844?text=Hi%20Team,%20I'm%20interested%20in%20your%20services"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Chat"
          className="group relative pointer-events-auto flex flex-col items-center"
        >
          {/* Tooltip */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-lg">
            Chat on WhatsApp
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-green-600 rotate-45"></span>
          </span>

          {/* Button with Ripple Effect */}
          <div className="relative">
            {/* Ripple Animation */}
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>

            {/* Main Button - Transparant container for 3D logo */}
            <div className="relative transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer">
              {/* Real WhatsApp Icon Image (Transparent) */}
              <div className="relative h-14 w-14 sm:h-14 sm:w-14 md:h-16 md:w-16 drop-shadow-[0_8px_15px_rgba(34,197,94,0.4)]">
                <Image
                  src="/images/whatsapp-icon.png"
                  alt="WhatsApp"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </a>
      </div>

      <style jsx>{`
  @keyframes pulse-ring {
    0% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.2;
    }
    100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
  }
  
  .animate-ping-slow {
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`}</style>

    </footer >
  )
}