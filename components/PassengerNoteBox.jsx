// "use client";
// import Image from "next/image";

// export default function PassengerNoteBox() {
//   return (
//     <div className="max-w-6xl mx-auto mb-5 p-4 border border-black rounded-md flex items-center bg-blue-500 gap-6">
//       {/* Left: Image */}
//       <div className="w-28 h-28 flex-shrink-0">
//         <Image
//           src="/images/feed/note.png" // 🔁 Replace this with your image
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

import Image from "next/image";

export default function PassengerNoteBox() {
  return (
    <div className="max-w-6xl mx-auto mb-8 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-6">
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="relative w-28 h-28 bg-white rounded-full shadow-lg overflow-hidden">
          <Image
            src="/images/feed/note.png"
            alt="Passenger Note Icon"
            width={112}
            height={112}
            className="object-contain w-full h-full"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-2xl font-bold text-white mb-2">
          Important: Chennai to Tirupati Package Booking Info
        </h3>
        <p className="text-white/90 mb-4 leading-relaxed">
          Package prices for Chennai to Tirupati could vary due to darshan slot
          availability. To secure your one-day package at the listed rate,
          book 45 days in advance. For Tirupati package or VIP darshan info,
          call <a href="tel:+919840789844" className="underline">+91 98407 89844</a> /
          <a href="tel:+919840789857" className="underline">+91 98407 89857</a>.
          Garuda Tours guarantees no hidden costs. Book early and travel spiritually.
        </p>
        <a href="tel:+919840789844" className="inline-block">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            Call to Confirm
          </button>
        </a>
      </div>
    </div>
  );
}
