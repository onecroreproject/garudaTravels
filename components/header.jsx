"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  MapPin,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  User,
  Calendar,
  Car,
  Crown,
  Repeat1,
  CarFront,
  Clock,
  Shield,
  Award,
  HeadphonesIcon,
  Sparkles,
  Star,
  Heart,
  TrendingUp,
  ArrowRight,
  Home,
  ChevronRight,
  Bus,
  Hotel,
  Ticket
} from 'lucide-react'
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

export function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mobileDropdowns, setMobileDropdowns] = useState({
    tirupati: true, // Set to true by default to show all data
    carRental: false,
    templeTour: false,
    more: false,
  })
  const [carRentalPackages, setCarRentalPackages] = useState([])
  const [templePackages, setTemplePackages] = useState([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState(null)

  // Helper function to check if current path is active
  const isActive = (path) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fetch dynamic packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Fetch car rental packages
        const carRentalSnapshot = await getDocs(collection(db, "carRentalPackages"))
        const carRentalData = carRentalSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setCarRentalPackages(carRentalData)

        // Fetch temple packages
        const templeSnapshot = await getDocs(collection(db, "templePackages"))
        const templeData = templeSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        // Filter active packages and sort by order field (ascending), with fallback to 999 for items without order
        const activeTempleData = templeData.filter((pkg) => pkg.isActive !== false && !pkg.isDeleted && !pkg.deletedAt)
        const sortedTempleData = activeTempleData.sort((a, b) => (a.order || 999) - (b.order || 999))
        setTemplePackages(sortedTempleData)
      } catch (error) {
        console.error("Error fetching packages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  // Ensure certain UI-only subtrees (like the mobile off-canvas menu) only render on the client
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }

  const toggleMobileDropdown = (dropdown) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }))
  }

  // Enhanced dropdown content with better organization
  const tirupatiPackages = {
    chennai: [
      { href: "/tirupati-package/chennai-tirupati-one-day-tour-package", label: "One Day Package", icon: Repeat1, desc: "Complete darshan in a day" },
      { href: "/tirupati-package/tirupati-two-days-package-from-chennai", label: "Two Days Package", icon: Calendar, desc: "Relaxed spiritual journey" },
      { href: "/tirupati-package/chennai-tirupati-car-rental-package", label: "Car Rental Package", icon: Car, desc: "Flexible travel options" },
      { href: "/tirupati-package/srivani-vip-break-darshan", label: "VIP Darshan", icon: Crown, desc: "Special VIP entry" },
    ],
    vellore: [
      { href: "/tirupati-package/vellore-tirupati-one-day-tour-package", label: "One Day Package", icon: Repeat1, desc: "Quick spiritual visit" },
      { href: "/tirupati-package/vellore-to-tirupati", label: "Two Days Package", icon: Calendar, desc: "Extended pilgrimage" },
    ],
    bangalore: [
      { href: "/tirupati-package/bangalore-tirupati-darshan-tour-package", label: "One Day Package", icon: Repeat1, desc: "From Bangalore" },
      { href: "/tirupati-package/bangalore-to-tirupati-two-day", label: "Two Day Package", icon: Calendar, desc: "Relaxed spiritual journey" },
    ],
    kanchipuram: [
      { href: "/tirupati-package/kanchipuram-tirupati-one-day-tour-package", label: "One Day Package", icon: Repeat1, desc: "Via Kanchipuram" },
      { href: "/tirupati-package/kanchipuram-tirupati-two-days-tour-package", label: "Two Days Package", icon: Calendar, desc: "With Kanchipuram visit" },
    ],
    tirumala: [
      { href: "/tirupati-package/tirumala-tirupati-darshan-one-day-package", label: "One Day Package", icon: Repeat1, desc: "Tirumala darshan" },
    ],
  }

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${scrolled
        ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-b border-blue-100/50'
        : 'bg-white shadow-md'
        }`}>
        {/* Top Alert Bar - Optional */}
        <div className="hidden sm:block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white text-xs py-1.5 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="max-w-[1470px] mx-auto px-4 sm:px-6 flex items-center justify-center space-x-4">
            <span className="flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 animate-pulse" />
              Special Tirupati Packages Available
            </span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span className="flex items-center">
              <Star className="h-3.5 w-3.5 mr-1.5 text-yellow-300" />
              24/7 Customer Support
            </span>
            <span className="w-1 h-1 bg-white/40 rounded-full"></span>
            <span className="flex items-center font-semibold">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5 text-green-300" />
              Trusted by 10,000+ Travelers
            </span>
          </div>
        </div>

        <div className="max-w-[1470px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 transition-all duration-300">
            {/* Logo - Size maintained exactly as before */}
            <div className="flex items-center space-x-2 flex-shrink-0 group">
              <a href="/" className="flex items-center relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="/header-logo.png"
                  alt="Garuda Tours Logo"
                  className="h-28 md:h-36 lg:h-40 w-auto object-contain relative transform transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Navigation - Enhanced with better hover effects */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              <a
                href="/"
                className={`font-medium py-2 px-1 transition-all duration-300 relative group/nav ${isActive('/')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                <span className="relative z-10">Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`} />
                {!isActive('/') && (
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover/nav:scale-100 transition-transform duration-300 -z-0"></span>
                )}
              </a>

              <a
                href="/about"
                className={`font-medium py-2 px-1 transition-all duration-300 relative group/nav ${isActive('/about')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}
              >
                <span className="relative z-10">About</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100'
                  }`} />
                {!isActive('/about') && (
                  <span className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover/nav:scale-100 transition-transform duration-300 -z-0"></span>
                )}
              </a>

              {/* Tirupati Packages Dropdown - Enhanced */}
              <div
                className="relative group/parent"
                onMouseEnter={() => setHoveredDropdown('tirupati')}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button className={`flex items-center font-medium py-2 px-1 transition-all duration-300 relative ${isActive('/tirupati-package')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}>
                  <span className="relative z-10">Tirupati Packages</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-all duration-300 ${hoveredDropdown === 'tirupati' ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${isActive('/tirupati-package') ? 'scale-x-100' : 'scale-x-0 group-hover/parent:scale-x-100'
                    }`} />
                </button>

                {/* Mega Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[800px] max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-blue-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-500 transform translate-y-4 group-hover/parent:translate-y-0 overflow-hidden">
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Chennai Column */}
                    <div className="space-y-3">
                      <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" /> Chennai to Tirupati
                      </h4>
                      {tirupatiPackages.chennai.map((item, idx) => (
                        <a
                          key={idx}
                          href={item.href}
                          className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group/link p-2 rounded-lg hover:bg-blue-50"
                        >
                          <item.icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover/link:scale-110 transition-transform" />
                          <div>
                            <span className="font-medium block">{item.label}</span>
                            <span className="text-xs text-gray-500">{item.desc}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-0 -ml-2 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" />
                        </a>
                      ))}
                    </div>

                    {/* Vellore & Bangalore Column */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> Vellore to Tirupati
                        </h4>
                        {tirupatiPackages.vellore.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group/link p-2 rounded-lg hover:bg-blue-50"
                          >
                            <item.icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium block">{item.label}</span>
                              <span className="text-xs text-gray-500">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> Bangalore to Tirupati
                        </h4>
                        {tirupatiPackages.bangalore.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group/link p-2 rounded-lg hover:bg-blue-50"
                          >
                            <item.icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium block">{item.label}</span>
                              <span className="text-xs text-gray-500">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Kanchipuram & Tirumala Column */}
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> Kanchipuram to Tirupati
                        </h4>
                        {tirupatiPackages.kanchipuram.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group/link p-2 rounded-lg hover:bg-blue-50"
                          >
                            <item.icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium block">{item.label}</span>
                              <span className="text-xs text-gray-500">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-blue-600 font-semibold text-sm uppercase tracking-wider border-b border-blue-100 pb-2 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> Tirumala to Tirupati
                        </h4>
                        {tirupatiPackages.tirumala.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="flex items-start space-x-3 text-gray-700 hover:text-blue-600 transition-all duration-300 group/link p-2 rounded-lg hover:bg-blue-50"
                          >
                            <item.icon className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium block">{item.label}</span>
                              <span className="text-xs text-gray-500">{item.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Car Rental Dropdown - Enhanced */}
              <div
                className="relative group/parent"
                onMouseEnter={() => setHoveredDropdown('carRental')}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button className={`flex items-center font-medium py-2 px-1 transition-all duration-300 relative ${isActive('/car-rental')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}>
                  <span className="relative z-10">Outstation Car Rental</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-all duration-300 ${hoveredDropdown === 'carRental' ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${isActive('/car-rental') ? 'scale-x-100' : 'scale-x-0 group-hover/parent:scale-x-100'
                    }`} />
                </button>

                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-blue-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-500 transform translate-y-4 group-hover/parent:translate-y-0 overflow-hidden">
                  <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                      <div className="px-4 py-8 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading packages...</p>
                      </div>
                    ) : carRentalPackages.length > 0 ? (
                      carRentalPackages.map((pkg, index) => (
                        <a
                          key={pkg.id}
                          href={`/car-rental/${pkg.id}`}
                          className="block border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-all duration-300 group"
                        >
                          <div className="px-4 py-3">
                            <div className="flex items-start space-x-3">
                              <CarFront className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                              <div className="flex-1">
                                <div className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                                  {pkg.title}
                                </div>
                                {pkg.subtitle && (
                                  <div className="text-xs text-gray-500 mt-1 line-clamp-1">{pkg.subtitle}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        <Car className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm">No packages available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Temple Tour Dropdown - Enhanced */}
              <div
                className="relative group/parent"
                onMouseEnter={() => setHoveredDropdown('templeTour')}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button className={`flex items-center font-medium py-2 px-1 transition-all duration-300 relative ${isActive('/temple-tour-package')
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}>
                  <span className="relative z-10">Temple Tour Packages</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-all duration-300 ${hoveredDropdown === 'templeTour' ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${isActive('/temple-tour-package') ? 'scale-x-100' : 'scale-x-0 group-hover/parent:scale-x-100'
                    }`} />
                </button>

                <div className="absolute top-full right-0 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-blue-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-500 transform translate-y-4 group-hover/parent:translate-y-0 overflow-hidden">
                  <div className="p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {loading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading temple packages...</p>
                      </div>
                    ) : templePackages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {templePackages.map((pkg, index) => (
                          <a
                            key={pkg.id}
                            href={`/temple-tour-package/${pkg.url || pkg.id}`}
                            className="group block p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <MapPin className="h-4 w-4 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors text-sm">
                                  {pkg.title}
                                </h4>
                                {pkg.duration && (
                                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {pkg.duration}
                                  </p>
                                )}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MapPin className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm">No temple packages available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* More Dropdown - Enhanced */}
              <div
                className="relative group/parent"
                onMouseEnter={() => setHoveredDropdown('more')}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <button className={`flex items-center font-medium py-2 px-1 transition-all duration-300 relative ${(isActive('/blog') || isActive('/contact'))
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
                  }`}>
                  <span className="relative z-10">More</span>
                  <ChevronDown className={`ml-1 h-4 w-4 transition-all duration-300 ${hoveredDropdown === 'more' ? 'rotate-180 text-blue-600' : ''
                    }`} />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transform transition-transform duration-300 origin-left ${(isActive('/blog') || isActive('/contact')) ? 'scale-x-100' : 'scale-x-0 group-hover/parent:scale-x-100'
                    }`} />
                </button>

                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-blue-100 opacity-0 invisible group-hover/parent:opacity-100 group-hover/parent:visible transition-all duration-500 transform translate-y-4 group-hover/parent:translate-y-0 overflow-hidden">
                  <div className="py-2">
                    <a
                      href="/blog"
                      className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group ${isActive('/blog') ? 'text-blue-600 bg-blue-50' : ''
                        }`}
                    >
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <Heart className="h-4 w-4 text-blue-600" />
                      </span>
                      <div>
                        <span className="font-medium block">Blog</span>
                        <span className="text-xs text-gray-500">Travel stories & tips</span>
                      </div>
                    </a>

                    <a
                      href="/contact"
                      className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group ${isActive('/contact') ? 'text-blue-600 bg-blue-50' : ''
                        }`}
                    >
                      <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <HeadphonesIcon className="h-4 w-4 text-blue-600" />
                      </span>
                      <div>
                        <span className="font-medium block">Contact Us</span>
                        <span className="text-xs text-gray-500">Get in touch</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Phone Inquiry Section - Enhanced */}
            <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
              <div className="relative group/phone">
                {/* Glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur opacity-0 group-hover/phone:opacity-30 transition-opacity duration-500"></div>

                <div className="relative flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200 px-4 py-2 rounded-xl border border-blue-200 transition-all duration-300 transform hover:scale-105">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-lg group-hover/phone:rotate-12 transition-transform">
                    <PhoneCall className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-green-500" />
                      24/7 Support
                    </span>
                    <a
                      href="tel:+919840789844"
                      className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 flex items-center"
                    >
                      +91 98407 89844
                      <span className="ml-1 text-green-500 text-xs animate-pulse">●</span>
                    </a>
                    <a
                      href="tel:+919840789857"
                      className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                    >
                      +91 98407 89857
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 flex items-center justify-center group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-blue-600 relative z-10" />
              ) : (
                <Menu className="h-5 w-5 text-blue-600 relative z-10" />
              )}
            </button>
          </div>
        </div>

        {/* Add custom scrollbar styles */}
        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
      </header>

      {/* Mobile Navigation Menu - Enhanced with all data visible */}
      {mounted && (
        <div
          className={`lg:hidden fixed inset-0 z-[60] ${isMobileMenuOpen ? "visible" : "invisible"}`}
        >
          {/* Backdrop (Solid and dark) */}
          <div
            className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={toggleMobileMenu}
          />

          {/* Panel - Full width with scrollable content */}
          <div
            className={`absolute right-0 top-0 h-full w-full bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            {/* Mobile Menu Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 shadow-lg relative z-20">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl text-white flex items-center">
                  Garuda Tours
                </span>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all transform hover:rotate-90"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-blue-50 border-b border-blue-100 p-4 relative z-10 shadow-sm">
              <div className="flex items-center justify-center space-x-4 text-blue-900">
                <PhoneCall className="h-5 w-5 text-blue-600 shrink-0" />
                <div className="flex items-center space-x-3 font-semibold text-sm">
                  <a href="tel:+919840789844" className="hover:text-blue-700 transition-colors">+91 98407 89844</a>
                  <span className="text-blue-200">|</span>
                  <a href="tel:+919840789857" className="hover:text-blue-700 transition-colors">+91 98407 89857</a>
                </div>
              </div>
            </div>

            {/* Scrollable Navigation Content - Shows all data */}
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar bg-white">

              {/* Home and About - Always visible */}
              <div className="space-y-2">
                <a
                  href="/"
                  onClick={toggleMobileMenu}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/')
                    ? 'text-blue-600 bg-blue-50 font-bold border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Home className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">Home</span>
                </a>

                <a
                  href="/about"
                  onClick={toggleMobileMenu}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${isActive('/about')
                    ? 'text-blue-600 bg-blue-50 font-bold border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="font-medium">About Us</span>
                </a>
              </div>

              {/* Tirupati Packages Section - Expanded by default */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleMobileDropdown("tirupati")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm`}
                >
                  <span className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-gray-800">Tirupati Packages</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform duration-300 ${mobileDropdowns.tirupati ? "rotate-180" : ""}`} />
                </button>

                <div className={`transition-all duration-500 overflow-hidden ${mobileDropdowns.tirupati ? "max-h-[2000px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-4">
                    {/* Chennai Section */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Chennai to Tirupati
                      </h4>
                      <div className="space-y-2">
                        {tirupatiPackages.chennai.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Vellore Section */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Vellore to Tirupati
                      </h4>
                      <div className="space-y-2">
                        {tirupatiPackages.vellore.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Bangalore Section */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Bangalore to Tirupati
                      </h4>
                      <div className="space-y-2">
                        {tirupatiPackages.bangalore.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Kanchipuram Section */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Kanchipuram to Tirupati
                      </h4>
                      <div className="space-y-2">
                        {tirupatiPackages.kanchipuram.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Tirumala Section */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                      <h4 className="text-sm font-bold text-blue-600 mb-3 flex items-center">
                        <Bus className="h-4 w-4 mr-2" />
                        Tirumala to Tirupati
                      </h4>
                      <div className="space-y-2">
                        {tirupatiPackages.tirumala.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            onClick={toggleMobileMenu}
                            className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                          >
                            <div className="flex items-center">
                              <item.icon className="h-5 w-5 text-blue-500 mr-3" />
                              <div>
                                <div className="font-medium text-gray-800">{item.label}</div>
                                <div className="text-xs text-gray-500">{item.desc}</div>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Car Rental Section */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleMobileDropdown("carRental")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-sm hover:bg-blue-50`}
                >
                  <span className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Car className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">Outstation Car Rental</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform duration-300 ${mobileDropdowns.carRental ? "rotate-180" : ""}`} />
                </button>

                <div className={`transition-all duration-500 overflow-hidden ${mobileDropdowns.carRental ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-2">
                    {loading ? (
                      <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading...</p>
                      </div>
                    ) : carRentalPackages.length > 0 ? (
                      carRentalPackages.map((pkg) => (
                        <a
                          key={pkg.id}
                          href={`/car-rental/${pkg.id}`}
                          onClick={toggleMobileMenu}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                        >
                          <div className="flex items-center">
                            <CarFront className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <div className="font-medium text-gray-800">{pkg.title}</div>
                              {pkg.subtitle && (
                                <div className="text-xs text-gray-500">{pkg.subtitle}</div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </a>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Car className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm">No packages available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Temple Tour Section */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleMobileDropdown("templeTour")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-sm hover:bg-blue-50`}
                >
                  <span className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Sparkles className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">Temple Tour Packages</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform duration-300 ${mobileDropdowns.templeTour ? "rotate-180" : ""}`} />
                </button>

                <div className={`transition-all duration-500 overflow-hidden ${mobileDropdowns.templeTour ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-2">
                    {loading ? (
                      <div className="text-center py-6">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-sm text-gray-500 mt-2">Loading...</p>
                      </div>
                    ) : templePackages.length > 0 ? (
                      templePackages.map((pkg) => (
                        <a
                          key={pkg.id}
                          href={`/temple-tour-package/${pkg.url || pkg.id}`}
                          onClick={toggleMobileMenu}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                        >
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-blue-500 mr-3" />
                            <div>
                              <div className="font-medium text-gray-800">{pkg.title}</div>
                              {pkg.duration && (
                                <div className="text-xs text-gray-500 flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {pkg.duration}
                                </div>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </a>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <MapPin className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                        <p className="text-sm">No packages available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* More Section */}
              <div className="border-t border-gray-100 pt-3">
                <button
                  onClick={() => toggleMobileDropdown("more")}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 bg-white border border-gray-200 shadow-sm hover:bg-blue-50`}
                >
                  <span className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Menu className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-800">More Links</span>
                  </span>
                  <ChevronDown className={`h-5 w-5 text-blue-600 transition-transform duration-300 ${mobileDropdowns.more ? "rotate-180" : ""}`} />
                </button>

                <div className={`transition-all duration-500 overflow-hidden ${mobileDropdowns.more ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                  <div className="space-y-2">
                    <a
                      href="/blog"
                      onClick={toggleMobileMenu}
                      className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                    >
                      <Heart className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="font-medium text-gray-800">Blog</span>
                    </a>
                    <a
                      href="/contact"
                      onClick={toggleMobileMenu}
                      className="flex items-center p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-all duration-200 border border-gray-100"
                    >
                      <HeadphonesIcon className="h-5 w-5 text-blue-500 mr-3" />
                      <span className="font-medium text-gray-800">Contact Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-around text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <span className="flex items-center"><Shield className="h-3 w-3 mr-1 text-green-500" /> SECURE</span>
                <span className="flex items-center"><Star className="h-3 w-3 mr-1 text-yellow-500" /> TRUSTED</span>
                <span className="flex items-center"><Clock className="h-3 w-3 mr-1 text-blue-500" /> 24/7</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header