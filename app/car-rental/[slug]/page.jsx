import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import BookingForm from "@/components/booking-form"
import PermitFeeSection from "@/components/permit-fee"
import VehiclePricing from "@/components/vehicle-price"
import Link from "next/link"
import { ChevronRight, BadgeCheck, Users, Fuel, Settings, Clock, Shield, Star, Thermometer, MapPin, IndianRupee, Car, Zap } from 'lucide-react'
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import FAQAccordion from "@/components/faq-accordion"
import BookNowButton from "@/components/book-now-button"

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = params
  
  try {
    const docRef = doc(db, "carRentalPackages", slug)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      const seoData = data.seoData || {}
      
      return {
        title: seoData.pageTitle || data.title || "Car Rental Service | Garuda Tours and Travels",
        description: seoData.metaDescription || data.subtitle || "Book your car rental service with Garuda Tours and Travels. Professional drivers, well-maintained vehicles, and reliable service.",
        keywords: seoData.metaKeywords || "car rental, vehicle hire, transport service, garuda tours, travel",
        openGraph: {
          title: seoData.ogTitle || seoData.pageTitle || data.title || "Car Rental Service | Garuda Tours and Travels",
          description: seoData.ogDescription || seoData.metaDescription || data.subtitle || "Book your car rental service with Garuda Tours and Travels",
          images: seoData.ogImage ? [seoData.ogImage] : (data.images?.[0] ? [data.images[0]] : []),
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: seoData.ogTitle || seoData.pageTitle || data.title || "Car Rental Service | Garuda Tours and Travels",
          description: seoData.ogDescription || seoData.metaDescription || data.subtitle || "Book your car rental service with Garuda Tours and Travels",
          images: seoData.ogImage ? [seoData.ogImage] : (data.images?.[0] ? [data.images[0]] : []),
        },
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
  }
  
  // Fallback metadata
  return {
    title: "Car Rental Service | Garuda Tours and Travels",
    description: "Book your car rental service with Garuda Tours and Travels. Professional drivers, well-maintained vehicles, and reliable service.",
    keywords: "car rental, vehicle hire, transport service, garuda tours, travel",
  }
}

// This is a Server Component, so it can directly fetch data
export default async function CarRentalPage({ params }) {
  const { slug } = params

  let packageData = null
  let error = null

  try {
    // Fetch current package data
    const docRef = doc(db, "carRentalPackages", slug)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const rawData = docSnap.data()
      // Convert Firebase timestamps and other complex objects to plain objects
      packageData = {
        id: docSnap.id,
        ...rawData,
        createdAt: rawData.createdAt ? rawData.createdAt.toDate().toISOString() : null,
        updatedAt: rawData.updatedAt ? rawData.updatedAt.toDate().toISOString() : null,
      }
    } else {
      error = "Car rental package not found."
    }
  } catch (err) {
    console.error("Error fetching car rental package:", err)
    error = "Failed to load car rental package details. Please try again later."
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white overflow-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Package Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all">
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-white overflow-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-gray-700">Loading car rental package details...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">
      
      {/* Hero Section */}
      <section className="bg-red-100 py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            {packageData.title || "Car Rental Service"}
          </h1>
          <nav className="text-sm text-gray-600 flex justify-center items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline text-gray-700 font-medium">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/car-rental" className="hover:underline text-gray-700 font-medium">
              Car Rental
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700 font-medium">{packageData.title}</span>
          </nav>
        </div>
      </section>
       
      {/* Main Content Section */}
     <section className="py-12 px-4 bg-white">
  <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    
    {/* Left - Image */}
    <div className="w-full order-1 md:order-1">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
        <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
          <img
            src={packageData.images?.[0] || "/placeholder.webp?height=400&width=600&query=car rental service"}
            alt={packageData.title}
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>

    {/* Right - Content */}
    <div className="space-y-4 bg-gray-50 order-2 md:order-2">
      <h2 className="text-3xl font-bold text-gray-800">{packageData.title}</h2>
      {packageData.subtitle && (
        <p className="text-xl text-gray-700 font-medium">{packageData.subtitle}</p>
      )}
      <div className="text-gray-600 space-y-3">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: packageData.content || "" }}
        />
      </div>
      <a href="#booking">
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all">
          Book Now
        </button>
      </a>
    </div>
  </div>
</section>


   

      <div id="booking">
        <BookingForm />
      </div>


      {/* Car Types Section */}
      {packageData.carTypes && packageData.carTypes.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{packageData.sectionTitles?.carTypes || "Available Vehicles"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.carTypes.map((car, index) => (
                <Card key={car.id || index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white border border-gray-200 flex flex-col h-full">
                  {/* Image Section */}
                  <div className="relative">
                    {car.imageUrl ? (
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={car.imageUrl}
                          alt={car.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"/>
                        {/* Rating Badge */}
                        {car.rating && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                            <Star className="w-4 h-4 text-white fill-current" />
                            <span className="text-sm font-bold text-white">{car.rating}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <Car className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Section - Flex to fill remaining space */}
                  <CardContent className="p-6 flex flex-col flex-grow">
                    {/* Car Name */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 text-center">{car.name}</h3>
                    </div>
                    
                    {/* Car Specifications Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4 flex-grow">
                      {/* A/C Status - Always show */}
                      <div className="flex items-center gap-2 text-sm bg-blue-50 rounded-lg p-3">
                        <div className="p-1.5 bg-blue-100 rounded-full flex-shrink-0">
                          <Thermometer className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <span className="text-gray-700 font-medium">A/C</span>
                      </div>
                      
                      {/* Seating */}
                      <div className="flex items-center gap-2 text-sm bg-green-50 rounded-lg p-3">
                        <div className="p-1.5 bg-green-100 rounded-full flex-shrink-0">
                          <Users className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{car.seating || "N/A"} Seater</span>
                      </div>
                      
                      {/* Fuel Type */}
                      <div className="flex items-center gap-2 text-sm bg-orange-50 rounded-lg p-3">
                        <div className="p-1.5 bg-orange-100 rounded-full flex-shrink-0">
                          <Fuel className="w-3.5 h-3.5 text-orange-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{car.fuelType || "N/A"}</span>
                      </div>
                      
                      {/* Transmission */}
                      <div className="flex items-center gap-2 text-sm bg-purple-50 rounded-lg p-3">
                        <div className="p-1.5 bg-purple-100 rounded-full flex-shrink-0">
                          <Settings className="w-3.5 h-3.5 text-purple-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{car.transmission || "N/A"}</span>
                      </div>
                    </div>

                    {/* Pricing Information - Only show if data exists */}
                    {(car.minKm || car.pricePerKm || car.driverBeta) && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="space-y-3">
                          {/* Minimum KM */}
                          {car.minKm && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-indigo-100 rounded-full">
                                  <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                                </div>
                                <span className="text-gray-600 text-sm">Min KM</span>
                              </div>
                              <span className="font-semibold text-gray-800">{car.minKm} KM</span>
                            </div>
                          )}
                          
                          {/* Price per KM */}
                          {car.pricePerKm && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-emerald-100 rounded-full">
                                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <span className="text-gray-600 text-sm">Per KM</span>
                              </div>
                              <span className="font-semibold text-gray-800">₹{car.pricePerKm}</span>
                            </div>
                          )}
                          
                          {/* Driver Beta */}
                          {car.driverBeta && (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-amber-100 rounded-full">
                                  <Users className="w-3.5 h-3.5 text-amber-600" />
                                </div>
                                <span className="text-gray-600 text-sm">Driver Beta</span>
                              </div>
                              <span className="font-semibold text-gray-800">₹{car.driverBeta}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Book Now Button - Always at bottom */}
                    <BookNowButton />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Features Section */}
      {packageData.serviceFeatures && packageData.serviceFeatures.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{packageData.sectionTitles?.serviceFeatures || "Service Features"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.serviceFeatures.map((feature, index) => (
                <div key={feature.id || index} className="text-center p-6 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BadgeCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  <div 
                    className="text-lg font-semibold text-gray-800 mb-2 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: feature.text || "" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Plans Section */}
      {/* {packageData.pricingPlans && packageData.pricingPlans.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.pricingPlans.map((plan, index) => (
                <Card key={plan.id || index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.duration}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-4">{plan.price}</div>
                    
                    {plan.features && plan.features.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={feature.id || featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )} */}

         {/* Dynamic Sections */}
      {packageData.sections && packageData.sections.length > 0 && (
        <div className="space-y-12">
          {packageData.sections.map((section, index) => (
            <section key={section.id || index} className="py-12 px-4 bg-white">
              <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Content */}
                  <div className="space-y-4">
                    {section.contentTitle && (
                      <h2 className="text-3xl font-bold text-gray-800">{section.contentTitle}</h2>
                    )}
                    {section.contentDescription && (
                      <div 
                        className="text-gray-600 space-y-3 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: section.contentDescription || "" }}
                      />
                    )}
                    {section.listInfo && section.listInfo.length > 0 && (
                      <ul className="space-y-2">
                        {section.listInfo.map((item, itemIndex) => (
                          <li key={item.id || itemIndex} className="flex items-start gap-2 text-gray-700">
                            <span className="text-green-500 mt-1">✓</span>
                            <div 
                              className="prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: item.text || "" }}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Image */}
                  {section.imageUrl && (
                    <div className="w-full">
                      <img
                        src={section.imageUrl || "/placeholder.webp"}
                        alt={section.contentTitle || `Section ${index + 1}`}
                        className="rounded-lg shadow-lg w-full h-auto object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* Package Includes and Passenger Notes - Redesigned Card Layout */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Package Includes */}
          {packageData.includes && packageData.includes.length > 0 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{packageData.sectionTitles?.includes || "What's Included"}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                {packageData.includes.map((item) => (
                  <div key={item.id} className="bg-green-50 rounded-xl shadow-md border border-green-100 p-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex-shrink-0 shadow-sm">
                        <BadgeCheck className="h-4 w-4 text-white" />
                      </div>
                      <div 
                        className="text-gray-700 font-medium leading-relaxed whitespace-pre-line flex-1"
                        dangerouslySetInnerHTML={{ __html: item.text || "" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Side - Passenger Notes */}
          {packageData.passengerNotes && packageData.passengerNotes.length > 0 && (
            <div>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{packageData.sectionTitles?.passengerNotes || "Important Passenger Notes"}</h2>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="space-y-4">
                {packageData.passengerNotes.map((item) => (
                  <div key={item.id} className="bg-blue-50 rounded-xl shadow-md border border-blue-100 p-4 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex-shrink-0 shadow-sm">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <div 
                        className="text-gray-700 font-medium leading-relaxed whitespace-pre-line flex-1"
                        dangerouslySetInnerHTML={{ __html: item.text || "" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* Terms and Conditions Section */}
      {packageData.termsAndConditions && packageData.termsAndConditions.length > 0 && (
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{packageData.sectionTitles?.termsAndConditions || "Terms and Conditions"}</h2>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {packageData.termsAndConditions.map((term, index) => (
                    <li key={term.id || index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-blue-500 mt-1">•</span>
                      <div 
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: term.text || "" }}
                      />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      {/* {packageData.faqs && packageData.faqs.length > 0 && (
        <section className="py-12 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{packageData.sectionTitles?.frequentlyAskedQuestions || "Frequently Asked Questions"}</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {packageData.faqs.map((faq, index) => (
                <Card key={faq.id || index}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )} */}

      <FAQAccordion 
        faqs={packageData.faqs} 
        sectionTitle={packageData.sectionTitles?.frequentlyAskedQuestions}
      />


      {/* Vehicle Features Component */}
      {/* <VehicleFeatures /> */}
      
  
     
      
      {/* Permit Fee Section */}
      {/* <PermitFeeSection /> */}
      
      </div>
      <Footer />
    </div>
  )
}

