"use client"

import { Car } from 'lucide-react'

export default function BookNowButton({ className = "", children = "Book Now" }) {
  const handleClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button 
      className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mt-auto ${className}`}
      onClick={handleClick}
    >
      <Car className="w-5 h-5" />
      {children}
    </button>
  )
}
