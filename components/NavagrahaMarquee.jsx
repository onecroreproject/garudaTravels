"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const images = [
  "/images/navagraha1.webp",
  "/images/navagraha2.webp",
  "/images/navagraha3.webp",
  "/images/navagraha4.webp",
]

export default function NavagrahaMarquee() {
  // Duplicate images for seamless infinite loop
  const duplicatedImages = [...images, ...images]

  return (
    <div className="relative mt-4 overflow-hidden">
      {/* Fade overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 lg:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 lg:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-5 lg:gap-6"
          animate={{
            x: ["0%", "-50%"], // Move by 50% (half the duplicated array for seamless loop)
          }}
          transition={{
            repeat: Infinity,
            duration: 12, // Medium speed: 12 seconds for full loop
            ease: "linear",
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`marquee-${index}`}
              className="flex-shrink-0 relative group"
            >
              <div className="relative w-[240px] h-[300px] md:w-[280px] md:h-[320px] lg:w-[320px] lg:h-[350px] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <Image
                  src={src}
                  alt={`Navagraha temple ${(index % images.length) + 1}`}
                  fill
                  sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  quality={85}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

