"use client"

import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import HeroSlider from "@/components/home/hero-slider"
import BookingForm from "@/components/booking-form"
import TourPackages from "@/components/home/tour-packages"
import Vehicle from "@/components/home/vehicle-slider"
import CustomerReviews from "@/components/customer-reviews"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ConnectionStatus from "@/components/connection-status"
import PassengerNoteBox from "@/components/PassengerNoteBox"
import Counter from "@/components/stats-counter"
import { webSocketManager, setupPageVisibilityHandling, setupBeforeUnloadHandling } from '@/lib/websocket';

export default function HomePage() {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [realTimeUpdates, setRealTimeUpdates] = useState([]);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Set up WebSocket connection
    const initWebSocket = async () => {
      try {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
        const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 
                     `${wsProtocol}${window.location.host}`;
        
        await webSocketManager.connect(wsUrl);
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };

    // Only set up WebSocket in production or if explicitly enabled in development
    if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ENABLE_WEBSOCKET === 'true') {
      initWebSocket();
    } else {
      console.log('WebSocket disabled in development. Set NEXT_PUBLIC_ENABLE_WEBSOCKET=true to enable.');
    }
    
    // Set up page visibility handling
    const cleanupVisibility = setupPageVisibilityHandling();
    const cleanupBeforeUnload = setupBeforeUnloadHandling();
    
    // Add message handler for real-time updates
    const handleRealTimeUpdate = (message) => {
      console.log('Received real-time update:', message);
      setRealTimeUpdates(prev => [
        { ...message, timestamp: new Date().toISOString() },
        ...prev.slice(0, 9) // Keep only the last 10 updates
      ]);
    };
    
    const removeHandler = webSocketManager.addMessageHandler(handleRealTimeUpdate);
    
    // Update connection status
    const updateStatus = () => {
      setConnectionStatus(webSocketManager.isConnected ? 'connected' : 'disconnected');
    };
    
    // Initial status update
    updateStatus();
    
    // Set up status change listener
    const statusCheckInterval = setInterval(updateStatus, 5000);
    
    // Cleanup function
    return () => {
      clearInterval(statusCheckInterval);
      removeHandler();
      cleanupVisibility();
      cleanupBeforeUnload();
      webSocketManager.disconnect();
    };
  }, []);


  // Function to send a message through WebSocket
  const sendMessage = (message) => {
    if (webSocketManager.isConnected) {
      webSocketManager.send({
        type: 'client_message',
        data: message,
        timestamp: new Date().toISOString()
      });
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ConnectionStatus />
      <Head>
        {/* Preload critical hero images */}
        <link 
          rel="preload" 
          href="/images/hero-slider-1.webp" 
          as="image" 
          type="image/webp"
        />
        <link 
          rel="preload" 
          href="/images/hero-slider-2.webp" 
          as="image" 
          type="image/webp"
        />
        {/* Preload about image */}
        <link 
          rel="preload" 
          href="/images/about.webp" 
          as="image" 
          type="image/webp"
        />
      </Head>

      <Header />

      {/* Spacing for fixed header */}
      <div className="pt-16 md:pt-20 lg:pt-24">
        {/* Hero Slider with high priority */}
        <HeroSlider fetchPriority="high" />
      
      {/* Enhanced Booking Section */}
      <section id="booking" className="py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Header Section */}
              <div className="text-center py-12 px-8 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5">
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold mb-6">
                  Quick Booking
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight mb-6">
                  Book Your <span className="text-blue-600">Chennai to Tirupati</span> Package
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Experience peace & devotion with our Chennai to Tirupati travel package, VIP darshan and flexible one‑day & two‑day packages.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-6"></div>
              </div>
              
              {/* Form Section */}
              <div className="p-4 sm:p-6 lg:p-8 flex justify-center">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
     
      <TourPackages />
      <Vehicle />
      
      {/* Quotes Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          {/* Quotes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dr. APJ Abdul Kalam */}
            <div className="quote-card relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-orange-400 shadow-lg">
                    <Image
                      src="/A._P._J._Abdul_Kalam.webp"
                      alt="Dr. APJ Abdul Kalam"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <div className="text-center space-y-4">
                  <blockquote className="text-lg text-gray-700 font-medium leading-relaxed italic">
                    "Dream is not that which you see while sleeping, it is something that does not let you sleep."
                  </blockquote>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-orange-600">
                      Dr. APJ Abdul Kalam
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      The People's President & Missile Man of India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vijayakanth (Captain) */}
            <div className="quote-card relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-red-400 shadow-lg">
                    <Image
                      src="/vijakannth.webp"
                      alt="Vijayakanth"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <div className="text-center space-y-4">
                  <blockquote className="text-lg text-gray-700 font-medium leading-relaxed italic">
                    "Service to people is the rent we pay for the space we occupy on this earth."
                  </blockquote>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-red-600">
                      Vijayakanth (Captain)
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      Actor, Politician & Man with Golden Heart
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Kamarajar */}
            <div className="quote-card relative md:col-span-2 lg:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
                    <Image
                      src="/kamarajar.webp"
                      alt="K. Kamaraj"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                
                {/* Quote */}
                <div className="text-center space-y-4">
                  <blockquote className="text-lg text-gray-700 font-medium leading-relaxed italic">
                    "Learn to live and live to learn, Continuously learning makes a man perfect."
                  </blockquote>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-green-600">
                      K. Kamaraj
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      The King Maker & Chief Minister of Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Float Animation */}
        <style jsx>{`
          .quote-card {
            animation: gentleFloat 4s ease-in-out infinite;
          }
          
          .quote-card:nth-child(2) {
            animation-delay: -1.3s;
          }
          
          .quote-card:nth-child(3) {
            animation-delay: -2.6s;
          }
          
          @keyframes gentleFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        `}</style>
      </section>
      
      {/* Enhanced About Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-100/30 to-purple-100/30"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-r from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold">
                  Trusted Travel Partner
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  About <span className="text-blue-600">Garuda Tours</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to <span className="font-semibold text-blue-600">Garuda Tours and Travels</span>, your trusted partner for hassle-free Chennai to Tirupati tour packages. We are specialists in providing well-organized Chennai to Tirupati one-day packages, two-day Tirupati tour packages, and VIP darshan packages from Chennai with on-time service, expert guidance, and comfortable travel.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our Tirupati darshan packages from Chennai are designed for individuals, families, and senior citizens seeking peace, devotion, and convenience. In addition to Tirupati, we offer divine temple tour packages to Rameswaram, Kanchipuram, Thiruvannamalai, and other holy destinations across South India.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Every Chennai to Tirupati travel package is backed by our commitment to punctuality and customer satisfaction. Trusted by thousands of devotees, we aim to make your Tirupati package from Chennai truly spiritual, memorable, and easy to book.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/about" className="inline-block">
                  <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <span>Learn More About Us</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </a>
                <a href="#booking" className="inline-block">
                  <button className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl shadow-lg hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
                    Book Now
                  </button>
                </a>
              </div>
            </div>
            
            {/* Right - Image */}
            <div className="w-full order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-4 transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/about.webp"
                    alt="About Garuda Tours"
                    width={800}
                    height={600}
                    className="rounded-xl w-full h-auto object-cover"
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<br />

      <PassengerNoteBox />

      {/* Enhanced One-Day Package Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-orange-200/30 to-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="w-full order-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/6.webp"
                    alt="One-Day Tirupati Package"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-sm">Same Day Return</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 order-2">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-semibold">
                  Quick & Devotional
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Chennai to Tirupati <span className="text-orange-600">One-Day Package</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Looking for a seamless <span className="font-semibold text-orange-600">Chennai to Tirupati one day package</span>? Garuda Tours and Travels offers a complete one day package from Chennai to Tirupati with doorstep pickup, AC cab, breakfast, and VIP darshan. Perfect for families and solo pilgrims alike, this Tirupati package from Chennai lets you experience the blessings of Lord Venkateswara and return home the same day—without stress or long queues.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With our expert coordination, your Chennai to Tirupati travel package becomes more than a trip—it becomes a spiritual journey. Book now and travel in comfort while we take care of your darshan timing, travel schedule, and support throughout.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Doorstep Pickup</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">VIP Darshan</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Breakfast Included</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">AC Cab</span>
                  </div>
                </div>
              </div>
              
              <a href="#booking" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <span>Book One-Day Trip</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Two-Day Package Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-teal-200/30 to-green-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                  Peaceful Pilgrimage
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Chennai to Tirupati <span className="text-green-600">Two-Day Package</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our <span className="font-semibold text-green-600">Chennai to Tirupati two day package</span> is ideal for those who prefer an unhurried, relaxed darshan experience. This two day package from Chennai to Tirupati includes comfortable accommodation, VIP darshan, and guided visits to nearby temples like Padmavathi Thayar Temple, all arranged with precision by Garuda Tours and Travels.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This Tirupati tour package from Chennai gives you the time and flexibility to truly connect spiritually without rushing. It's the perfect blend of devotion, comfort, and planning—trusted by thousands of pilgrims.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Comfortable Stay</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Flexible Timing</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Temple Visits</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Spiritual Journey</span>
                  </div>
                </div>
              </div>
              
              <a href="#booking" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <span>Reserve Two-Day Package</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
            
            {/* Right - Image */}
            <div className="w-full order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/4.webp"
                    alt="Two-Day Tirupati Package"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-sm">Peaceful Stay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Car Rental Package Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-purple-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <div className="w-full order-1">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/5.webp"
                    alt="Car Rental Package"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-sm">Private & Flexible</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-8 order-2">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full text-sm font-semibold">
                  Flexible & Private
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Chennai to Tirupati <span className="text-purple-600">Car Rental Package</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Want to travel at your own pace? Our <span className="font-semibold text-purple-600">Chennai to Tirupati car rental package</span> is the most flexible option for families or groups with their own darshan plans. Choose your preferred cab—Etios, Innova, Crysta, or Tempo Traveller—and enjoy a private, sanitized ride with experienced drivers.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This customizable Tirupati travel package from Chennai is perfect if you already have darshan tickets and want full control of your journey. Garuda's Tirupati Chennai package by car ensures safety, transparency, and peace of mind every mile of the way.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Multiple Vehicles</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Your Schedule</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Safe & Sanitized</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Expert Drivers</span>
                  </div>
                </div>
              </div>
              
              <a href="#booking" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <span>Get VIP Darshan Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Temple Tour Packages Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-l from-orange-200/30 to-amber-200/30 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-semibold">
                  South India's Spiritual Trail
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                  Temple Tour Packages from <span className="text-amber-600">Chennai</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <span className="font-semibold text-amber-600">Garuda Tours and Travels</span> curates the best temple tour packages from Chennai, covering spiritual destinations like Tirupati, Rameswaram, Kanchipuram, Madurai, and more. Whether it's a short Chennai to Tirupati travel package or a multi-day journey, we plan it all with devotion and care.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  These expertly crafted temple tour packages near Chennai are perfect for spiritual seekers, senior citizens, and families looking for a divine escape. Discover South India's sacred routes with Garuda's trusted services.
                </p>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Multiple Temples</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Sacred Routes</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Senior Friendly</span>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">Spiritual Journey</span>
                  </div>
                </div>
              </div>
              
              <a href="#booking" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  <span>Explore All Temple Tours</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </a>
            </div>
            
            {/* Right - Image */}
            <div className="w-full order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/1.webp"
                    alt="Temple Tour Packages"
                    width={800}
                    height={600}
                    className="rounded-2xl w-full h-auto object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Floating Badge */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <span className="font-bold text-sm">Spiritual Trail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CustomerReviews />
      <Counter />
      <Footer />
      </div>
    </div>
  )
}