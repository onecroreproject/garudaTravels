"use client"

import { useState, useEffect, useRef } from "react"
import { Car, Users, CheckCircle, Handshake } from "lucide-react" // Using Lucide React for icons

const stats = [
  {
    id: 1,
    icon: Car,
    value: "30+",
    label: "Vehicles",
    endValue: 30,
    suffix: "+",
  },
  {
    id: 2,
    icon: Users,
    value: "389+",
    label: "Our Drivers",
    endValue: 389,
    suffix: "+",
  },
  {
    id: 3,
    icon: CheckCircle,
    value: "100K",
    label: "Happy Customers",
    endValue: 100, // Changed to 5 for '5K' to work with multiplication
    suffix: "K",
  },
  {
    id: 4,
    icon: Handshake,
    value: "99%",
    label: "Success Rates",
    endValue: 99,
    suffix: "%",
  },
]

export default function StatsCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0))
  const refs = useRef([]) // Array to hold refs for each stat item
  const animatedStates = useRef(stats.map(() => false)) // To track if an item has animated

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.dataset.index, 10) // Get index from data-attribute
            if (!animatedStates.current[index]) {
              let startTime
              const duration = 2000 // Animation duration in ms
              const endValue = stats[index].endValue

              const animateCount = (timestamp) => {
                if (!startTime) startTime = timestamp
                const progress = (timestamp - startTime) / duration
                const currentCount = Math.min(progress * endValue, endValue)

                setCounts((prevCounts) => {
                  const newCounts = [...prevCounts]
                  newCounts[index] = Math.floor(currentCount)
                  return newCounts
                })

                if (progress < 1) {
                  requestAnimationFrame(animateCount)
                } else {
                  setCounts((prevCounts) => {
                    const newCounts = [...prevCounts]
                    newCounts[index] = endValue // Ensure final value is exact
                    return newCounts
                  })
                  animatedStates.current[index] = true // Mark as animated
                }
              }
              requestAnimationFrame(animateCount)
            }
          }
        })
      },
      { threshold: 0.5 }, // Trigger when 50% of the element is visible
    )

    // Observe each element
    refs.current.forEach((ref) => {
      if (ref) {
        // Ensure the ref exists (element is mounted)
        observer.observe(ref)
      }
    })

    return () => {
      //Disconnect observer on unmount
      refs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref)
        }
      })
    }
  }, []) //Empty dependency array means this runs once on mount

  return (
    <section
      className="relative py-8 sm:py-12 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-56 md:w-80 h-56 md:h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const count = counts[index]

            let displayValue = count
            if (stat.suffix === "K") {
              displayValue = `${count}${stat.suffix}`
            } else if (stat.suffix === "%") {
              displayValue = `${count}${stat.suffix}`
            } else {
              displayValue = `${count}${stat.suffix}`
            }

            return (
              <div
                key={stat.id}
                data-index={index} // Add data-index to identify the element
                ref={(el) => (refs.current[index] = el)} // Assign ref directly
                className="flex flex-col items-center p-2"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-white/20 group">
                  <span className="text-white group-hover:animate-bounce">
                    <Icon className="h-8 w-8 sm:h-10 sm:w-10" />
                  </span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">{displayValue}</h3>
                <p className="text-xs sm:text-sm text-blue-100 font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
