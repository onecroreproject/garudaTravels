import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BookingForm from "@/components/booking-form"
import ConnectionStatus from "@/components/connection-status"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata = {
  title: "NRI Darshan Tirumala | Special Darshan for NRIs - Garuda Travels",
  description:
    "Experience a seamless spiritual journey with our exclusive NRI Darshan packages. Dedicated Supadam entry, transport, and expert guidance for overseas devotees.",
  alternates: {
    canonical: "/nri-darshan",
  },
}

export default function NRIDarshanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <ConnectionStatus />
      <Header />

      <main className="pt-20 md:pt-24 lg:pt-28 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-12 md:mb-16 mt-4 md:mt-8">
          <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-white">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="p-8 md:p-12 lg:w-1/2">
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6">
                  Exclusive Overseas Packages
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                  NRI Darshan Tirumala
                  <span className="block text-blue-600 mt-2 text-2xl sm:text-3xl md:text-4xl">Special Supadam Entry</span>
                </h1>
                <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed text-justify sm:text-left">
                  Our exclusive NRI Darshan packages are carefully tailored to meet the specific needs of Non-Resident Indians seeking a profound spiritual connection with their heritage. We recognize the importance of your pilgrimage and provide a streamlined, hassle-free temple visit so you can focus entirely on your devotion.
                </p>
                <a
                  href="#booking"
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Book Your Darshan
                </a>
              </div>
              <div className="lg:w-1/2 p-4">
                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/nri-hero.jpg"
                    alt="NRI Darshan Tirumala"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mandatory Requirements Section */}
        <section className="container mx-auto px-4 mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Mandatory Requirements for NRIs</h2>
            <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto px-4">
              Please ensure you have these essential documents ready before your visit to facilitate a smooth entry process.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden">
                <Image src="/images/nri-passport.jpg" alt="Valid Passport Requirement" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Valid Passport</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                A current, valid passport is absolutely mandatory for all NRI citizens looking to utilize the special darshan privileges. Please verify that your passport remains valid throughout your entire trip to India.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border-t-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden">
                <Image src="/images/nri-ocr.jpg" alt="NRI Status Proof" fill className="object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">Proof of NRI Status</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                You will be required to present official documentation validating your NRI or foreign national status. Ensure you carry your valid overseas visa, OCI (Overseas Citizen of India), or PIO card during the registration and entry process.
              </p>
            </div>
          </div>
        </section>

        {/* Dress Code Section */}
        <section className="bg-white/80 py-12 md:py-16 mb-12 md:mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Traditional Dress Code</h2>
              <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto px-4">
                To preserve the sanctity and traditions of the Tirumala temple, TTD strictly enforces a traditional dress code for all devotees, including NRIs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
                <div className="relative h-48 w-48 mb-4 rounded-full overflow-hidden shadow-inner border-4 border-white">
                  <Image src="/images/nri-male.jpg" alt="Male Dress Code" fill className="object-contain bg-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">Gentlemen</h3>
                <p className="text-blue-800 font-medium">Dhoti, Kurta-Pajama, or Formal Shirt with Pancha.</p>
                <p className="text-sm text-blue-600 mt-2">No jeans, shorts, or t-shirts permitted.</p>
              </div>

              <div className="bg-pink-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-md">
                <div className="relative h-48 w-48 mb-4 rounded-full overflow-hidden shadow-inner border-4 border-white">
                  <Image src="/images/nri-female.jpg" alt="Female Dress Code" fill className="object-contain bg-white" />
                </div>
                <h3 className="text-xl font-bold text-pink-900 mb-2">Ladies</h3>
                <p className="text-pink-800 font-medium">Saree, Half-Saree, or Chudidar/Salwar Kameez with Dupatta.</p>
                <p className="text-sm text-pink-600 mt-2">Western wear is strictly prohibited.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Privileges Section */}
        <section className="container mx-auto px-4 mb-12 md:mb-16">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Special Privileges for Overseas Devotees</h2>
            <p className="text-base sm:text-lg text-gray-600 text-center max-w-3xl mx-auto px-4">
              Discover the dedicated arrangements made to ensure your spiritual journey is peaceful and accommodating.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Priority Entry Queue",
                desc: "Bypass the general crowds through a specifically designated entry point (Supadam) reserved for NRIs and special ticket holders, dramatically reducing wait times.",
                icon: "🚪",
              },
              {
                title: "Dedicated Time Slots",
                desc: "Specific, optimized darshan timings are allocated for NRI visitors, offering a more serene and unhurried experience with the deity.",
                icon: "⏱️",
              },
              {
                title: "Seva Opportunities",
                desc: "Gain exclusive access to participate in unique temple rituals and sacred sevas, deepening your spiritual connection during your pilgrimage.",
                icon: "🙏",
              },
              {
                title: "Multilingual Support",
                desc: "Overcome language barriers with assistance desks strategically placed to help you understand the rich history and traditions of the temple.",
                icon: "🗣️",
              },
              {
                title: "Guidance Kiosks",
                desc: "Dedicated help desks are available to quickly resolve inquiries regarding accommodations, seva bookings, and darshan procedures.",
                icon: "ℹ️",
              },
              {
                title: "Accessible Facilities",
                desc: "The temple infrastructure includes ramps, elevators, and battery cars to ensure a comfortable visit for elderly devotees and those with mobility challenges.",
                icon: "♿",
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-gradient-to-r from-blue-900 to-indigo-900 py-12 md:py-16 text-white mb-12 md:mb-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Why Book With Garuda Travels?</h2>
              <p className="text-base sm:text-lg text-blue-200 text-center max-w-3xl mx-auto px-4">
                We take the stress out of your pilgrimage so you can focus entirely on your devotion.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Decades of Expertise", desc: "We possess an in-depth understanding of the unique logistical needs of overseas travelers visiting Tirupati." },
                { title: "Premium Vehicle Fleet", desc: "Travel safely in our well-maintained selection of comfortable sedans, premium SUVs, and spacious travelers." },
                { title: "Professional Chauffeurs", desc: "Our courteous, highly experienced drivers are intimately familiar with the best routes and local customs." },
                { title: "Tailored Itineraries", desc: "From customized pickups to curated sightseeing add-ons, we build packages that fit your exact schedule." },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/20">
                  <h3 className="text-xl font-bold mb-3 text-blue-100">{item.title}</h3>
                  <p className="text-blue-200/80 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking Form Integration */}
        <div id="booking" className="scroll-mt-24">
          <BookingForm />
        </div>

        {/* FAQ Section */}
        <section className="container mx-auto px-4 pb-12 md:pb-16 pt-8 max-w-4xl">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline text-left">What exactly is the NRI Darshan facility?</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                The NRI Darshan is a special, expedited entry system created by the Tirumala Tirupati Devasthanams (TTD) specifically for Non-Resident Indians and foreign nationals. It utilizes the Supadam entry, which is significantly faster than the general free darshan queues, providing a more comfortable experience for those traveling from abroad.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline text-left">Who qualifies for this special darshan?</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                Any individual holding a foreign passport, an Overseas Citizen of India (OCI) card, or a Person of Indian Origin (PIO) card qualifies. Indian passport holders living abroad with a valid work or resident visa can also utilize this facility by presenting their credentials.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline text-left">Can my resident Indian family members accompany me?</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                Unfortunately, the NRI Darshan privilege is strictly reserved for those holding valid overseas status documentation. Accompanying family members who reside in India and do not hold NRI status will need to book standard Special Entry Darshan tickets or utilize the general queues.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline text-left">Are mobile phones or cameras allowed inside?</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                No. To maintain the strict security and sanctity of the temple, all electronic devices, including mobile phones, cameras, smartwatches, and large bags, are strictly prohibited. You must deposit these items at the designated free locker facilities before entering the queue.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline text-left">How does Garuda Travels assist with the NRI Darshan?</AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                We provide end-to-end travel solutions. While we do not issue the TTD darshan tickets (which must be verified by TTD authorities in person), we provide premium transportation from Chennai, Bangalore, or local airports, guide you to the exact entry points, assist with luggage storage, and ensure your entire itinerary is perfectly timed and stress-free.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

      </main>
      <Footer />
    </div>
  )
}
