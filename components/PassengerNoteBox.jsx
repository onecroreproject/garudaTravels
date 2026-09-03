// "use client";
// import Image from "next/image";

// export default function PassengerNoteBox() {
//   return (
//     <div className="max-w-6xl mx-auto mb-5 p-4 border border-black rounded-md flex items-center bg-blue-500 gap-6">
//       {/* Left: Image */}
//       <div className="w-28 h-28 flex-shrink-0">
//         <Image
//           src="/images/feed/note.webp" // 🔁 Replace this with your image
//           alt="Passenger Note Icon"
//           width={112}
//           height={112}
//           className="object-contain w-full h-full"
//         />
//       </div>

//       {/* Right: Text and Button (Stacked) */}
//       <div className="flex flex-col justify-center gap-2">
//         <h3 className="text-xl font-semibold text-white">Important: Chennai to Tirupati Package Booking Info</h3>
//         <p className="text-m text-white">
//            Package prices for Chennai to Tirupati could vary due to darshan slot availability. To secure your Chennai to Tirupati oneday package at the listed rate, book 45 days in advance. For Tirupati package from Chennai, or VIP Tirupati darshan package information, call us at +91 98407 89844 / +91 98407 89857. Garuda Tours and Travels guarantees no hidden costs. Book early and travel spiritually.

//         </p>
//         <a href="tel:+919840789844">
//           <button className="mt-2 px-4 py-2 border border-blue-500 text-white rounded bg-black w-fit">
//           Call to Confirm Your Tirupati Package
//         </button>
//         </a>

//       </div>
//     </div>
//   );
// }
"use client";

import { Megaphone, CalendarCheck, Phone, ArrowRight, ShieldCheck, Bell, User, Briefcase } from "lucide-react";

export default function PassengerNoteBox() {
  return (
    <div className="max-w-6xl mx-auto mb-8 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 rounded-2xl shadow-[0_20px_50px_rgba(67,56,202,0.3)] relative overflow-hidden text-white font-sans border border-indigo-500/30">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      
      {/* Sparkles / Stars */}
      <div className="absolute top-6 right-[20%] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff] animate-pulse"></div>
      <div className="absolute top-12 right-[25%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff] animate-pulse delay-75"></div>
      <div className="absolute top-20 right-[15%] w-1 h-1 bg-white rounded-full shadow-[0_0_5px_#fff] animate-pulse delay-150"></div>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 sm:p-8 lg:p-10 gap-6 lg:gap-10 relative z-10">
        
        {/* Left Side: Concentric Circular Icon */}
        <div className="hidden lg:flex flex-shrink-0 relative items-center justify-center w-36 h-36 mt-2">
           {/* Outer thin border */}
           <div className="absolute inset-0 rounded-full border-[1.5px] border-indigo-300/40 border-dashed"></div>
           {/* Inner thick border */}
           <div className="w-28 h-28 rounded-full border-4 border-white flex items-center justify-center relative bg-white/10 backdrop-blur-sm">
             {/* Icons for Traveler */}
             <div className="relative flex items-center justify-center">
                <User className="w-12 h-12 text-white fill-white" />
                <Briefcase className="w-6 h-6 text-indigo-100 fill-indigo-900/40 absolute -bottom-1 -left-3" strokeWidth={2} />
             </div>
           </div>
           
           {/* Notification Bell Badge */}
           <div className="absolute top-1 right-1 w-10 h-10 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-4 border-indigo-700 animate-bounce">
             <Bell className="w-5 h-5 text-white fill-white" />
           </div>
        </div>

        {/* Center: Text Content */}
        <div className="flex-1 w-full flex flex-col text-center lg:text-left items-center lg:items-start">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md mb-4 border border-orange-400/50">
            <Megaphone className="w-4 h-4 text-white fill-white" />
            <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-white drop-shadow-sm">Important Booking Update</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold mb-4 leading-tight tracking-tight drop-shadow-md">
            65-Day <span className="text-yellow-400">Advance Booking</span>
          </h2>

          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/30">
              <CalendarCheck className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base sm:text-lg text-white tracking-wide drop-shadow-sm">Darshan Booking</span>
          </div>

          {/* Paragraph */}
          <p className="text-blue-50 leading-relaxed text-sm sm:text-base max-w-[95%] lg:max-w-2xl mb-8">
            The amount shown on the website is applicable when booking in advance. 
            Please note that <span className="text-yellow-400 font-bold bg-black/10 px-1 py-0.5 rounded">pricing and amounts will change</span> depending on your specific booking period.
          </p>

          {/* CTA & Trust Badge */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center lg:justify-start">
            
            {/* CTA Button */}
            <a href="tel:+919840789844" className="w-full sm:w-auto flex justify-center">
              <button className="w-full sm:w-auto p-1.5 pr-5 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl flex items-center justify-between sm:justify-start gap-4 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_20px_rgba(249,115,22,0.4)] group border-b-[4px] border-orange-700/50">
                <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm ml-0.5 flex-shrink-0">
                  <Phone className="w-5 h-5 text-orange-500 fill-orange-500 group-hover:animate-pulse" />
                </div>
                <span className="font-bold text-base sm:text-lg text-white tracking-wide whitespace-nowrap">Call to Confirm Price</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" strokeWidth={2.5} />
              </button>
            </a>
            
            {/* Trust Badge */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-center lg:justify-start bg-white/10 px-4 py-2 rounded-2xl border border-white/20 backdrop-blur-sm">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-inner border border-blue-400/50 flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white text-[15px] leading-tight">Garuda Tours</span>
                <span className="text-blue-100 text-[12px] leading-tight font-medium">guarantees no hidden costs.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: CSS Calendar */}
        <div className="hidden xl:flex flex-shrink-0 relative w-[200px] h-[230px] transform rotate-[6deg] hover:rotate-0 transition-transform duration-500 z-20 mt-4">
           {/* Drop shadows behind calendar */}
           <div className="absolute -inset-2 bg-indigo-900/40 blur-xl rounded-3xl -z-10 translate-y-4"></div>

           {/* Calendar Base */}
           <div className="absolute inset-0 bg-[#f8f9fa] rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-gray-200">
              {/* Calendar Header */}
              <div className="h-[60px] bg-gradient-to-r from-blue-700 to-indigo-700 flex items-center justify-center relative border-b border-black/10">
                 <span className="text-white font-black text-sm tracking-[0.2em] relative z-10 drop-shadow-sm mt-3">NOVEMBER</span>
              </div>
              
              {/* Calendar Body */}
              <div className="flex-1 flex flex-col items-center justify-center p-4 relative bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]">
                 
                 {/* The Date Pill inside calendar */}
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-full py-3.5 rounded-xl flex items-center justify-center shadow-lg relative z-10 border border-white/10 transform hover:scale-105 transition-transform cursor-pointer">
                    <span className="text-white font-bold text-[15px] flex items-center gap-1.5 drop-shadow-md">
                       ★ Nov 1–30
                    </span>
                 </div>
              </div>
              
              {/* Page fold effect */}
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-tl from-gray-200 to-white rounded-tl-xl rounded-br-2xl shadow-[-2px_-2px_5px_rgba(0,0,0,0.05)] border-t border-l border-white"></div>
           </div>
           
           {/* Calendar Ring Bindings (Realistic styling) */}
           <div className="absolute -top-3 left-6 w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-30 border border-gray-600"></div>
           <div className="absolute -top-3 left-14 w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-30 border border-gray-600"></div>
           <div className="absolute -top-3 right-14 w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-30 border border-gray-600"></div>
           <div className="absolute -top-3 right-6 w-3 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-30 border border-gray-600"></div>
        </div>

      </div>
    </div>
  );
}
