import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Check, Shirt, Star, ShieldCheck, Users, Clock, MapPin, Wallet, BriefcaseMedical, UserCheck, Award, Phone, Mail, MessageCircle, XCircle, GraduationCap, Flower } from 'lucide-react' // Added new icons for Why Choose Us
import Header from "@/components/header"
import Footer from "@/components/footer"
import BookingForm from "@/components/booking-form"
import TirupatiPackageHero from "@/components/tirupati-package-hero"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Map icon names from CMS to Lucide React components
const IconMap = {
  Star: Star,
  ShieldCheck: ShieldCheck,
  Users: Users,
  Clock: Clock,
  MapPin: MapPin,
  Wallet: Wallet,
  BriefcaseMedical: BriefcaseMedical,
  UserCheck: UserCheck,
  Award: Award,
  Phone: Phone,
  Mail: Mail,
  MessageCircle: MessageCircle,
  // CMS icon name mappings
  'map pin': MapPin,
  'graduation': GraduationCap,
  'flower': Flower,
  // Add other icons here if needed in the future
}

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = params
  
  try {
    const docRef = doc(db, "tirupati-package", slug)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      const seoData = data.seoData || {}
      
      return {
        title: seoData.pageTitle || data.title || "Tirupati Package | Garuda Tours and Travels",
        description: seoData.metaDescription || data.subtitle || "Book your Tirupati package with Garuda Tours and Travels. Professional service, confirmed darshan tickets, and door-to-door pickup.",
        keywords: seoData.metaKeywords || "tirupati, balaji, darshan, package, garuda tours, travel",
        openGraph: {
          title: seoData.ogTitle || seoData.pageTitle || data.title || "Tirupati Package | Garuda Tours and Travels",
          description: seoData.ogDescription || seoData.metaDescription || data.subtitle || "Book your Tirupati package with Garuda Tours and Travels",
          images: seoData.ogImage ? [seoData.ogImage] : (data.images?.[0] ? [data.images[0]] : []),
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: seoData.ogTitle || seoData.pageTitle || data.title || "Tirupati Package | Garuda Tours and Travels",
          description: seoData.ogDescription || seoData.metaDescription || data.subtitle || "Book your Tirupati package with Garuda Tours and Travels",
          images: seoData.ogImage ? [seoData.ogImage] : (data.images?.[0] ? [data.images[0]] : []),
        },
      }
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
  }
  
  // Fallback metadata
  return {
    title: "Tirupati Package | Garuda Tours and Travels",
    description: "Book your Tirupati package with Garuda Tours and Travels. Professional service, confirmed darshan tickets, and door-to-door pickup.",
    keywords: "tirupati, balaji, darshan, package, garuda tours, travel",
  }
}

// This is a Server Component, so it can directly fetch data
export default async function TirupatiPackageDetailPage({ params }) {
  const { slug } = params

  let packageData = null
  let error = null
  let otherPackages = []

  try {
    // Fetch current package data
    const docRef = doc(db, "tirupati-package", slug)
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

      // Fetch other packages (excluding the current one)
      const q = query(collection(db, "tirupati-package"), where("url", "!=", slug))
      const querySnapshot = await getDocs(q)
      otherPackages = querySnapshot.docs.map((doc) => {
        const rawData = doc.data()
        return {
          id: doc.id,
          ...rawData,
          createdAt: rawData.createdAt ? rawData.createdAt.toDate().toISOString() : null,
          updatedAt: rawData.updatedAt ? rawData.updatedAt.toDate().toISOString() : null,
        }
      })
    } else {
      error = "Package not found."
    }
  } catch (err) {
    console.error("Error fetching package or other packages:", err)
    error = "Failed to load package details. Please try again later."
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-700">{error}</p>
        </div>
      </div>
    )
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <p className="text-lg text-gray-700">Loading package details...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <TirupatiPackageHero packageData={packageData || {}} />
        
        <div className="container mx-auto px-4 py-6">

         {/* Booking Form and Why Choose Us Section - Always 75/25 Layout */}
         <section id="booking" className="mb-10">
           <div className="px-2">
             <div className="flex flex-col lg:flex-row gap-8 items-stretch">
               {/* Left Side - Booking Form (75%) */}
               <div className="w-full lg:w-3/4 order-2 lg:order-1">
              <BookingForm />
            </div>

               {/* Right Side - Why Choose Us (25%) */}
               <div className="w-full lg:w-1/4 order-1 lg:order-2">
                 <div className="flex flex-col items-center lg:items-start w-full h-full">
                   <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">Why Choose Us</h2>
                   <div className="grid grid-cols-1 gap-4 w-full flex-1">
                     <div className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 h-20 flex items-center">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="relative p-4 w-full">
                         <div className="flex items-center">
                           <div className="mr-4 flex-shrink-0">
                             <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                               <ShieldCheck className="h-5 w-5 text-white" />
                             </div>
                           </div>
                           <div className="flex-1">
                             <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                               Trusted Tirupati Travel Experts
                             </h3>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 h-20 flex items-center">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="relative p-4 w-full">
                         <div className="flex items-center">
                           <div className="mr-4 flex-shrink-0">
                             <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                               <MapPin className="h-5 w-5 text-white" />
                             </div>
                           </div>
                           <div className="flex-1">
                             <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                               Door-to-Door Pickup & Drop
                             </h3>
                           </div>
                         </div>
                       </div>
                     </div>
                     
                     <div className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 h-20 flex items-center">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="relative p-4 w-full">
                         <div className="flex items-center">
                           <div className="mr-4 flex-shrink-0">
                             <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                               <Check className="h-5 w-5 text-white" />
                             </div>
                           </div>
                           <div className="flex-1">
                             <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                               Confirmed Darshan Tickets
                             </h3>
                           </div>
                         </div>
                       </div>
          </div>
                     
                     <div className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-300 h-20 flex items-center">
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                       <div className="relative p-4 w-full">
                         <div className="flex items-center">
                           <div className="mr-4 flex-shrink-0">
                             <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                               <Wallet className="h-5 w-5 text-white" />
                             </div>
                           </div>
                           <div className="flex-1">
                             <h3 className="text-sm lg:text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                               Affordable & Transparent Pricing
                             </h3>
                           </div>
                         </div>
                       </div>
                     </div>
                   </div>
                        </div>
                      </div>
                </div>
              </div>
         </section>

        {/* Overview Section */}
        {packageData.content && (
          <section className="mb-12 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{packageData.sectionTitles?.overview || "Overview"}</h2>
            <div
              className="prose max-w-none text-gray-700 mx-auto mb-6"
              dangerouslySetInnerHTML={{ __html: packageData.content || "" }}
            />
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Call to Book Now
            </Button>
          </section>
        )}

      

        {packageData.carPrices && packageData.carPrices.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {packageData.sectionTitles?.carPrices || "Package Price Details"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packageData.carPrices.map((car) => (
                <div key={car.id} className="bg-white rounded-xl shadow-md overflow-hidden border">
                  {/* Car Image */}
                  <div className="w-full h-48 relative">
                    <Image
                      src={car.imageUrl || "/placeholder.svg?height=200&width=300&query=Car for " + car.carName}
                      alt={car.carName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {/* Car Name */}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">{car.carName}</h3>
                    {/* Price Table */}
                    <div className="border border-gray-200 rounded overflow-hidden">
                      {car.prices.map((price, priceIndex) => (
                        <div
                          key={price.value}
                          className={`grid grid-cols-2 py-3 px-4 border-b border-gray-200 last:border-0 ${priceIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                            }`}
                        >
                          <div className="font-medium text-gray-800">{price.label}</div>
                          <div className="text-lg font-bold text-blue-600 text-right">
                            ₹ {price.value.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Inclusions/Exclusions for this specific car */}
                    {(car.includes || car.excludes) && (
                      <div className="mt-4 space-y-2">
                        {car.includes && (
                          <div>
                            <p className="font-semibold text-gray-700">Includes:</p>
                            <div 
                              className="text-sm text-gray-600 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: car.includes || "" }}
                            />
                          </div>
                        )}
                        {car.excludes && (
                          <div>
                            <h4 className="font-semibold text-gray-700">Excludes:</h4>
                            <div 
                              className="text-sm text-gray-600 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: car.excludes || "" }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-center mb-3">
                    <a
                      href="#booking"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full transition"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

     {packageData.packagesAndCars && packageData.packagesAndCars.length > 0 && (
  <section className="mb-12">
    <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{packageData.sectionTitles?.packagesAndCars || "Packages & Cars"}</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packageData.packagesAndCars.map((packageItem) => (
        <div
          key={packageItem.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
        >
          {/* Package Name Header */}
          <div className="bg-blue-600 text-white text-center py-4 px-6">
            <h3 className="text-xl font-bold">{packageItem.packageName}</h3>
          </div>

          {/* Cars Table-like Structure */}
          {packageItem.cars && packageItem.cars.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-900">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Car Name</th>
                    <th className="px-4 py-2 font-semibold text-center">Seat</th>
                    <th className="px-4 py-2 font-semibold text-center">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {packageItem.cars.map((car) => (
                    <tr key={car.id}>
                      <td className="px-4 py-2">{car.carName}</td>
                      <td className="px-4 py-2 text-center">{car.seatCapacity}</td>
                      <td className="px-4 py-2 text-center text-blue-600 font-bold">
                        ₹ {car.price ?? 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="p-4 text-center text-gray-500">No cars available</p>
          )}

          {/* Book Now Button */}
          <div className="p-4 mt-auto">
            <a
              href="#booking"
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Book Now
            </a>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

          {/* Additional Packages and Cars Section */}
          {(packageData.packages || packageData.cars || packageData.additionalPackages || packageData.carTypes) && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{packageData.sectionTitles?.packagesAndCars || "Available Packages & Cars"}</h2>
              
              {/* Display Packages if available */}
              {packageData.packages && packageData.packages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Package Options</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.packages.map((pkg) => (
                      <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6 border">
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{pkg.name || pkg.title}</h4>
                        {pkg.description && <p className="text-gray-600 mb-3">{pkg.description}</p>}
                        {pkg.price && (
                          <p className="text-lg font-bold text-blue-600 mb-2">₹ {pkg.price.toLocaleString()}</p>
                        )}
                        {pkg.duration && <p className="text-sm text-gray-500">Duration: {pkg.duration}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Cars if available */}
              {packageData.cars && packageData.cars.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Available Cars</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.cars.map((car) => (
                      <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden border">
                        {car.image && (
                          <div className="w-full h-48 relative">
                            <Image
                              src={car.image || "/placeholder.svg?height=200&width=300&query=Car"}
                              alt={car.name || "Car"}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h4 className="text-xl font-semibold text-gray-800 mb-2">{car.name || car.type}</h4>
                          {car.description && <p className="text-gray-600 mb-3 text-sm">{car.description}</p>}
                          {car.capacity && <p className="text-sm text-gray-500 mb-1">Capacity: {car.capacity} persons</p>}
                          {car.price && (
                            <p className="text-lg font-bold text-blue-600">₹ {car.price.toLocaleString()}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Additional Packages if available */}
              {packageData.additionalPackages && packageData.additionalPackages.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Additional Packages</h3>
                  <div className="space-y-4">
                    {packageData.additionalPackages.map((pkg) => (
                      <div key={pkg.id} className="bg-gray-50 rounded-lg p-6 border">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{pkg.name || pkg.title}</h4>
                        {pkg.description && (
                          <div 
                            className="text-gray-600 mb-3"
                            dangerouslySetInnerHTML={{ __html: pkg.description || "" }}
                          />
                        )}
                        {pkg.features && pkg.features.length > 0 && (
                          <ul className="list-none space-y-1">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Display Car Types if available */}
              {packageData.carTypes && packageData.carTypes.length > 0 && (
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Car Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {packageData.carTypes.map((carType) => (
                      <div key={carType.id} className="bg-white rounded-lg shadow-md p-6 border">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">{carType.name || carType.category}</h4>
                        {carType.description && <p className="text-gray-600 mb-4">{carType.description}</p>}
                        {carType.cars && carType.cars.length > 0 && (
                          <div>
                            <p className="font-medium text-gray-700 mb-2">Available Cars:</p>
                            <ul className="space-y-1">
                              {carType.cars.map((car, index) => (
                                <li key={index} className="text-gray-600 text-sm">• {car}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {carType.priceRange && (
                          <p className="text-lg font-bold text-blue-600 mt-3">
                            Price Range: ₹ {carType.priceRange}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}



        {/* Special Notes To the Pilgrim Section */}
        <section className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Special Notes To the Pilgrim</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-xl border-l-4 border-orange-500 p-5 shadow-lg">
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-full -translate-y-10 translate-x-10 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-100 rounded-full translate-y-8 -translate-x-8 opacity-40"></div>
            
            <div className="relative z-10">
              <ul className="space-y-3">
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">Children Below 12:</span>
                    <span className="text-gray-700 ml-2 text-sm">No darshan ticket needed. Carry valid age-proof.</span>
                  </div>
                </li>
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">ID Proof:</span>
                    <span className="text-gray-700 ml-2 text-sm">Bring the same ID used for booking (Aadhaar/Passport).</span>
                  </div>
                </li>
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">Dress Code:</span>
                    <span className="text-gray-700 ml-2 text-sm">Traditional is mandatory (Men: dhoti/pants with shirt; Women: saree/salwar).</span>
                  </div>
                </li>
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">Prasadam:</span>
                    <span className="text-gray-700 ml-2 text-sm">One laddu is included with the special entry ticket. Extra laddus can be bought at <span className="font-semibold text-orange-600">₹50 each</span>.</span>
                  </div>
                </li>
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">Tickets:</span>
                    <span className="text-gray-700 ml-2 text-sm">Book your Chennai to Tirupati Package early as tickets are limited.</span>
                  </div>
                </li>
                <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                  <div>
                    <span className="font-bold text-gray-800 text-base">Dress Code Details:</span>
                    <span className="text-gray-700 ml-2 text-sm">Women must wear Saree, Half Saree, or Chudidar with Dupatta. Men must wear Dhoti with Shirt, or Kurta with Pyjama.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Package Includes and Passenger Notes - Enhanced Side by Side Layout */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Package Includes */}
        {packageData.includes && packageData.includes.length > 0 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">What's Included</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
                </div>
                <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <ul className="space-y-4">
              {packageData.includes.map((item) => (
                        <li key={item.id} className="group flex items-start p-3 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all duration-300">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <Check className="h-5 w-5 text-white" />
                          </div>
                          <div 
                            className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.text || "" }}
                          />
                </li>
              ))}
            </ul>
                  </div>
                </div>
              </div>
        )}

            {/* Right Side - Passenger Notes */}
        {packageData.passengerNotes && packageData.passengerNotes.length > 0 && (
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Important Passenger Notes</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
                </div>
                <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10">
                    <ul className="space-y-4">
              {packageData.passengerNotes.map((item) => (
                        <li key={item.id} className="group flex items-start p-3 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all duration-300">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <div 
                            className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: item.text || "" }}
                          />
                        </li>
              ))}
            </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          </section>

        {/* Places We Cover Section */}
        {packageData.sightseeingPlaces && packageData.sightseeingPlaces.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{packageData.sectionTitles?.sightseeingPlaces || "Places We Cover in the Package"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData.sightseeingPlaces.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative w-full h-48">
                    <Image
                      src={item.imageUrl || "/placeholder.svg?height=200&width=300&query=sightseeing place"}
                      alt={item.text}
                      fill
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div 
                      className="text-xl font-semibold text-gray-800 prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.text || "" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dress Code Section */}
        {(packageData.maleDressCodeImages?.length > 0 || packageData.femaleDressCodeImages?.length > 0) && (
          <section className="mb-12">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{packageData.sectionTitles?.dressCode || "Dress Code"}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {packageData.femaleDressCodeImages?.[0] && (
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 text-center">
                      <CardTitle className="text-xl font-semibold text-gray-800">Female</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative w-full h-64">
                        <Image
                          src={
                            packageData.femaleDressCodeImages[0] ||
                            "/placeholder.svg?height=300&width=200&query=female traditional dress"
                           || "/placeholder.svg"}
                          alt="Female dress code example"
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {packageData.maleDressCodeImages?.[0] && (
                  <Card className="overflow-hidden">
                    <CardHeader className="p-4 text-center">
                      <CardTitle className="text-xl font-semibold text-gray-800">Male</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="relative w-full h-64">
                        <Image
                          src={
                            packageData.maleDressCodeImages[0] ||
                            "/placeholder.svg?height=300&width=200&query=male traditional dress"
                           || "/placeholder.svg"}
                          alt="Male dress code example"
                          fill
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Tables Section */}
        {packageData.tables && packageData.tables.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {packageData.sectionTitles?.tables || "Schedule Tables"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {packageData.tables.map((table) => (
                <div key={table.id} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-96">
                  {table.title && (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex-shrink-0">
                      <h3 className="text-xl font-bold text-center">{table.title}</h3>
                    </div>
                  )}
                  <div className="overflow-x-auto p-0 m-0 flex-1 flex flex-col">
                    <table className="w-full border-collapse border border-gray-300 m-0 p-0 flex-1">
                      <thead className="bg-blue-50 m-0 p-0">
                        <tr className="m-0 p-0">
                          {table.headers.map((header, index) => (
                            <th key={index} className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300 bg-blue-100 m-0 p-0">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="m-0 p-0">
                        {table.rows.map((row, rowIndex) => (
                          <tr key={row.id} className={`${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors m-0 p-0`}>
                            {row.cells.map((cell, cellIndex) => (
                              <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 m-0 p-0">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Sections */}
        {packageData.sections && packageData.sections.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{packageData.sectionTitles?.sections || "More Details"}</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full"></div>
            </div>
            
            <div className="space-y-20">
              {packageData.sections.map((section, index) => (
                <div key={section.id} className="relative">
                  {/* Section Separator */}
                  {index > 0 && (
                    <div className="flex items-center justify-center mb-16">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      <div className="mx-6 p-3 bg-white rounded-full shadow-lg border border-gray-200">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
                      </div>
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>
                  )}
                  
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Content Section */}
                    <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <div className="relative">
                        {/* Content Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white rounded-2xl -m-4"></div>
                        <div className="relative p-8">
                          {section.contentTitle && (
                            <div className="mb-6">
                              <h3 className="text-3xl font-bold text-gray-800 mb-3">{section.contentTitle}</h3>
                              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
                            </div>
                          )}
                          {section.contentDescription && (
                            <div
                              className="prose prose-lg max-w-none text-gray-700 mb-6 leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: section.contentDescription || "" }}
                            />
                          )}
                          {section.listInfo && section.listInfo.length > 0 && (
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-100">
                              <ul className="space-y-4 text-gray-700">
                                {section.listInfo.map((item) => (
                                  <li key={item.id} className="flex items-start group">
                                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mt-2 mr-4 flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-300"></div>
                                    <div 
                                      className="prose prose-sm max-w-none leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: item.text || "" }}
                                    />
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Image Section */}
                    {section.imageUrl && (
                      <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl group">
                          <Image
                            src={section.imageUrl || "/placeholder.svg?height=300&width=500&query=section image"}
                            alt={section.contentTitle || "Section image"}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-500 group-hover:scale-110"
                          />
                          {/* Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          {/* Decorative Border */}
                          <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Additional Packages Section */}
        {otherPackages.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Other Packages You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPackages.map((pkg) => (
                <Card key={pkg.id} className="overflow-hidden flex flex-col h-96">
                  <CardHeader className="p-0 flex-shrink-0">
                    <div className="relative w-full h-48">
                      <Image
                        src={pkg.images?.[0] || "/images/city/free.png?height=200&width=300&query=other package image"}
                        alt={pkg.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{pkg.title}</CardTitle>
                      {/* {pkg.subtitle && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pkg.subtitle}</p>}
                       {pkg.carPrices?.[0]?.prices?.[0]?.value && (
                          <p className="text-lg font-bold text-blue-600 mb-4">
                            Starting from {pkg.carPrices[0].prices[0].value}
                          </p>
                       )}  */}
                    </div>
                    <div className="mt-auto pt-4">
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Link href={`/tirupati-package/${pkg.url}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {packageData.faqs && packageData.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">{packageData.sectionTitles?.faq || "Frequently Asked Questions"}</h2>
            <Accordion type="single" collapsible className="w-full">
              {packageData.faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.question || "" }}
                    />
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: faq.answer || "" }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
