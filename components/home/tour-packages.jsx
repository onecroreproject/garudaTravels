"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"
import tourPackagesCards from "@/public/data/tour-packages-cards.json"

const packagesData = {
  "Tirupati Package": tourPackagesCards.map((pkg, index) => ({
    ...pkg,
    // Provide default descriptions if not in JSON
    include: pkg.include || (
      index === 0 ? "Home Pickup & Drop, Breakfast & Lunch, Special Entry Darshan Ticket, SriVari Laddu per person." :
        index === 1 ? "Home Pickup & Drop, Breakfast & Lunch, Special Entry Darshan Ticket, SriVari Laddu per person" :
          "Home Pickup & Drop, Breakfast & Lunch, Special Entry Darshan Ticket, SriVari Laddu per person."
    ),
    exclude: pkg.exclude || (
      index === 0 ? "Accommodation not provided, Multiple pickups, Guide fees excluded, Extra Laddus." :
        index === 1 ? "Accommodation not provided, Multiple pickups, Guide fees excluded, Extra Laddu" :
          "Accommodation not provided, Multiple pickups, Guide fees excluded, Extra Laddu"
    ),
  })),
}

export default function TourPackages() {
  const [activeCategory, setActiveCategory] = useState("Tirupati Package")
  const [backendData, setBackendData] = useState({})

  const categoryMap = {
    "Tirupati Package": "tirupati-package",
    "Temple Tour Package": "templePackages",
    "Car Rental Package": "carRentalPackages",
  }

  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const collections = Object.values(categoryMap)
        const results = {}

        for (const colName of collections) {
          const querySnapshot = await getDocs(collection(db, colName))
          results[colName] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        }
        setBackendData(results)
      } catch (error) {
        console.error("Error fetching backend data:", error)
      }
    }
    fetchBackendData()
  }, [])

  const currentPackages = packagesData[activeCategory] || []

  return (
    <section className="py-12 sm:py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-l from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-56 md:w-80 h-56 md:h-80 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto relative z-10 text-center">
        <div className="space-y-4 mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold">
            Choose Your Destination
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
            Our <span className="text-blue-600">Tour Packages</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(packagesData).map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 text-lg rounded-full transition-all duration-200 ${activeCategory === category
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
              <div className="relative w-full h-64">
                <Image
                  src={pkg.image}
                  alt={pkg.name}
                  width={400}
                  height={300}
                  quality={75}
                  className="w-full h-full object-cover rounded-lg"
                  priority={true}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{pkg.name}</h3>
                <div className="flex-grow">
                  <small className="text-green-600 mb-2 block">*Include: {pkg.include}</small>
                  <small className="text-red-600 mb-4 block">*Exclude: {pkg.exclude}</small>
                </div>
                <div className="mt-auto pt-4">
                  <a href="#booking">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg">
                      Book Now
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}



