import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import BookingForm from "@/components/booking-form";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Clock,
  Users,
  Star,
  Calendar,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  MessageCircle,
  Camera,
  Route,
  Info,
  Award,
  Shield,
  Car,
  IndianRupee,
  Eye,
  Headset,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import NavagrahaMarquee from "@/components/NavagrahaMarquee";
import Image from "next/image";

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const metadata = await getRawMetadata({ params });
  
  return {
    ...metadata,
    alternates: {
      canonical: `/temple-tour-package/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

async function getRawMetadata({ params }) {
  const { slug } = await params;

  if (slug === "chennai-kanchipuram-temple-package") {
    return {
      title: "Chennai to Kanchipuram One Day Package – Comfortable & Hassle-Free Temple Tour",
      description:
        "Experience a spiritual journey with our Chennai to Kanchipuram One Day Package. Includes pickup from Chennai, AC travel, and visits to Ekambareswarar, Kamakshi Amman, and more.",
    };
  }

  if (slug === "chennai-mahabalipuram-oneday-package") {
    return {
      title: "Chennai to Mahabalipuram One Day Package – Relaxed & Scenic Coastal Tour",
      description:
        "Discover historic UNESCO sites with our Chennai to Mahabalipuram One Day Package. Visit Shore Temple, Pancha Rathas, and beautiful beaches with a comfortable AC day trip.",
    };
  }

  if (slug === "chennai-pondicherry-temple-tour-package") {
    return {
      title: "Chennai to Pondicherry One Day Package – Comfortable & Scenic Day Trip",
      description:
        "Explore French Quarters, Aurobindo Ashram, and Seaside charm with our Chennai to Pondicherry One Day Package. Relaxed itinerary with professional drivers from Chennai.",
    };
  }

  if (slug === "chennai-tiruvannamalai-temple-package") {
    return {
      title: "Chennai to Tiruvannamalai One Day Package – Spiritual & Comfortable Day Trip",
      description:
        "Peaceful pilgrimage from Chennai to Tiruvannamalai. Visit Arunachaleswarar Temple and Girivalam path with a well-organized one-day AC tour package.",
    };
  }

  if (slug === "chennai-to-kalahasti-temple-tour-package") {
    return {
      title: "Chennai to Kalahasti Temple One Day Package – Hassle-Free & Comfortable Pilgrimage",
      description:
        "Complete your Kalahasti pilgrimage in one day from Chennai. Hassle-free trip with door-step pickup, AC vehicle, and ample time for Rahu-Ketu pooja and darshan.",
    };
  }

  if (slug === "chennai-vellore-temple-package") {
    return {
      title: "Chennai to Vellore One Day Package – Comfortable & Hassle-Free Temple Tour",
      description:
        "Visit Sripuram Golden Temple and Vellore Fort with our one-day Chennai to Vellore tour package. Well-planned itinerary for families and senior citizens in AC comfort.",
    };
  }

  if (slug === "chennai-kanyakumari-temple-tour-package") {
    return {
      title: "Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package – Comprehensive & Comfortable South India Pilgrimage",
      description:
        "Comprehensive 4-5 days South India pilgrimage from Chennai. Visit Madurai Meenakshi, Trichy Ranganathaswamy, and Kanyakumari. AC travel and organized stay.",
    };
  }

  if (slug === "chennai-pondicherry-temple-package") {
    return {
      title: "Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package – Comfortable & Scenic South India Trip",
      description:
        "Scenic 2-3 days tour covering Kanchipuram heritage, Mahabalipuram UNESCO sites, and Pondicherry French charm. Perfect family getaway from Chennai in AC cars.",
    };
  }

  if (slug === "chennai-kodaikanal-palani-temple-tour-package") {
    return {
      title: "Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package – Scenic & Spiritual South India Trip",
      description:
        "A blend of spirituality and nature. 3-4 days tour from Chennai visiting Palani Murugan Temple and the beautiful hills of Kodaikanal. AC travel and relaxing itinerary.",
    };
  }

  if (slug === "chennai-madurai-temple-package") {
    return {
      title: "Chennai to Madurai Two Days Tour Package – Comfortable & Spiritual Getaway",
      description:
        "Visit the historic Madurai Meenakshi Temple with our comfortable two-day package from Chennai. Professional service, AC cars, and well-planned sightseeing.",
    };
  }

  if (slug === "chennai-malikarjuna-temple-package") {
    return {
      title: "Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days Spiritual Getaway",
      description:
        "Devotional trip from Chennai to Srisailam Mallikarjuna Temple. 2 or 3 days package with comfortable AC travel, accommodation guidance, and professional service.",
    };
  }

  if (slug === "chennai-navagraha-temple-tour-package") {
    return {
      title: "Chennai to Navagraha Three/Four Days Tour Package – Spiritual & Comfortable Pilgrimage",
      description:
        "Complete Navagraha pilgrimage from Chennai. Visit all 9 planetary temples in AC comfort over 3 or 4 days. Organized travel for families and seniors.",
    };
  }

  try {
    const docRef = doc(db, "templePackages", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const seoData = data.seoData || {};

      return {
        title:
          seoData.pageTitle ||
          data.title ||
          "Temple Tour Package | Garuda Tours and Travels",
        description:
          seoData.metaDescription ||
          data.subtitle ||
          "Book your temple tour package with Garuda Tours and Travels. Professional service, expert guides, and spiritual journey.",
        keywords:
          seoData.metaKeywords ||
          "temple tour, spiritual journey, south india temples, garuda tours, travel",
        openGraph: {
          title:
            seoData.ogTitle ||
            seoData.pageTitle ||
            data.title ||
            "Temple Tour Package | Garuda Tours and Travels",
          description:
            seoData.ogDescription ||
            seoData.metaDescription ||
            data.subtitle ||
            "Book your temple tour package with Garuda Tours and Travels",
          images: seoData.ogImage
            ? [seoData.ogImage]
            : data.images?.[0]
              ? [data.images[0]]
              : [],
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title:
            seoData.ogTitle ||
            seoData.pageTitle ||
            data.title ||
            "Temple Tour Package | Garuda Tours and Travels",
          description:
            seoData.ogDescription ||
            seoData.metaDescription ||
            data.subtitle ||
            "Book your temple tour package with Garuda Tours and Travels",
          images: seoData.ogImage
            ? [seoData.ogImage]
            : data.images?.[0]
              ? [data.images[0]]
              : [],
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  // Fallback metadata
  return {
    title: "Temple Tour Package | Garuda Tours and Travels",
    description:
      "Book your temple tour package with Garuda Tours and Travels. Professional service, expert guides, and spiritual journey.",
    keywords:
      "temple tour, spiritual journey, south india temples, garuda tours, travel",
  };
}

// SEO Content Data Mapping
const SEO_CONTENT_MAP = {
  "chennai-kanchipuram-temple-package": {
    title: "Chennai to Kanchipuram One Day Package – Comfortable & Hassle-Free Temple Tour",
    content: [
      "Experience a peaceful and well-planned spiritual journey with our <strong>Chennai to Kanchipuram One Day Package</strong>, perfect for devotees and travelers who want to explore the ancient temple city in just one day. This Chennai to Kanchipuram One Day Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and professional drivers to ensure a safe and smooth trip.",
      "With the Chennai to Kanchipuram One Day Package, you can visit famous temples like Ekambareswarar Temple, Kailasanathar Temple, and Kamakshi Amman Temple, enjoying both spiritual and cultural experiences. The package is ideal for families, senior citizens, and working professionals who want a quick yet fulfilling temple tour.",
      "Our Chennai to Kanchipuram One Day Package focuses on comfort, punctuality, and a hassle-free itinerary. With transparent pricing, reliable service, and well-coordinated travel plans, this package allows you to explore Kanchipuram without any stress. Book your Chennai to Kanchipuram One Day Package today and enjoy a memorable, divine, and culturally rich journey."
    ]
  },
  "chennai-mahabalipuram-oneday-package": {
    title: "Chennai to Mahabalipuram One Day Package – Relaxed & Scenic Coastal Tour",
    content: [
      "Discover the historic charm and scenic beauty of the UNESCO World Heritage site with our <strong>Chennai to Mahabalipuram One Day Package</strong>, perfect for travelers who want a comfortable day trip from Chennai. This Chennai to Mahabalipuram One Day Package includes convenient pickup from your location, travel in well-maintained AC vehicles, and professional drivers to ensure a smooth and safe journey.",
      "With the Chennai to Mahabalipuram One Day Package, you can explore iconic attractions like the Shore Temple, Pancha Rathas, Krishna’s Butterball, and the beautiful Mahabalipuram beaches. Ideal for families, friends, and solo travelers, this Chennai to Mahabalipuram One Day Package offers a well-planned itinerary that balances sightseeing, photography, and leisure.",
      "The Chennai to Mahabalipuram One Day Package focuses on comfort, punctuality, and hassle-free travel. Transparent pricing, reliable service, and personalized attention make this package a preferred choice for day-trippers. Book your Chennai to Mahabalipuram One Day Package today and enjoy a memorable blend of history, culture, and coastal beauty in a single day."
    ]
  },
  "chennai-pondicherry-temple-tour-package": {
    title: "Chennai to Pondicherry One Day Package – Comfortable & Scenic Day Trip",
    content: [
      "Experience the perfect blend of culture, history, and seaside charm with our <strong>Chennai to Pondicherry One Day Package</strong>, designed for travelers who want a relaxed and hassle-free day trip. This Chennai to Pondicherry One Day Package includes convenient pickup from Chennai, travel in well-maintained AC vehicles, and professional drivers to ensure a smooth and safe journey.",
      "With the Chennai to Pondicherry One Day Package, you can explore popular attractions like the French Quarters, Promenade Beach, Aurobindo Ashram, and vibrant local markets. Ideal for families, friends, and solo travelers, this Chennai to Pondicherry One Day Package provides a well-planned itinerary that balances sightseeing, relaxation, and local experiences.",
      "Our Chennai to Pondicherry One Day Package focuses on comfort, punctuality, and a stress-free journey. Transparent pricing, reliable service, and attention to detail make this package the perfect choice for a memorable day trip. Book your Chennai to Pondicherry One Day Package today and enjoy a scenic, cultural, and refreshing escape from Chennai."
    ]
  },
  "chennai-tiruvannamalai-temple-package": {
    title: "Chennai to Tiruvannamalai One Day Package – Spiritual & Comfortable Day Trip",
    content: [
      "Embark on a peaceful and spiritually enriching journey with our <strong>Chennai to Tiruvannamalai One Day Package</strong>, perfect for devotees and travelers who want to explore the sacred town in a single day. This Chennai to Tiruvannamalai One Day Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and professional drivers to ensure a safe and hassle-free journey.",
      "With the Chennai to Tiruvannamalai One Day Package, you can visit the famous Arunachaleswarar Temple, Girivalam path, and other spiritual landmarks, experiencing the divine aura of Tiruvannamalai. This package is ideal for families, senior citizens, and working professionals who want a quick yet fulfilling spiritual trip.",
      "Our Chennai to Tiruvannamalai One Day Package focuses on comfort, punctuality, and a well-organized itinerary, allowing you to enjoy the spiritual atmosphere without stress. Transparent pricing, reliable service, and attention to detail make this package a preferred choice for devotees. Book your Chennai to Tiruvannamalai One Day Package today and enjoy a memorable, peaceful, and divine pilgrimage."
    ]
  },
  "chennai-to-kalahasti-temple-tour-package": {
    title: "Chennai to Kalahasti Temple One Day Package – Hassle-Free & Comfortable Pilgrimage",
    content: [
      "Experience a serene and spiritually fulfilling journey with our <strong>Chennai to Kalahasti Temple One Day Package</strong>, designed for devotees who want a hassle-free temple visit in a single day. This Chennai to Kalahasti Temple One Day Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and experienced drivers to ensure a safe and smooth journey.",
      "With the Chennai to Kalahasti Temple One Day Package, you can visit the renowned Sri Kalahasti Temple, famous for its Vayu Linga and rich spiritual significance. Ideal for families, senior citizens, and working professionals, this package allows devotees to focus entirely on their prayers and spiritual experience without worrying about travel logistics.",
      "Our Chennai to Kalahasti Temple One Day Package emphasizes comfort, punctuality, and a well-organized itinerary. With transparent pricing, reliable service, and attention to detail, this package guarantees a memorable and peaceful pilgrimage. Book your Chennai to Kalahasti Temple One Day Package today and enjoy a divine journey filled with devotion, convenience, and spiritual bliss."
    ]
  },
  "chennai-vellore-temple-package": {
    title: "Chennai to Vellore One Day Package – Comfortable & Hassle-Free Temple Tour",
    content: [
      "Explore the historic and spiritual landmarks of Vellore with our <strong>Chennai to Vellore One Day Package</strong>, designed for travelers and devotees who wish to complete a fulfilling trip in a single day. This Chennai to Vellore One Day Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and professional drivers to ensure a safe and smooth journey.",
      "With the Chennai to Vellore One Day Package, you can visit the famous Vellore Fort, Jalakandeswarar Temple, and the renowned Sripuram Golden Temple, making the most of your day trip. Perfect for families, senior citizens, and working professionals, this package allows you to enjoy sightseeing and spiritual experiences without the stress of planning and commuting.",
      "Our Chennai to Vellore One Day Package focuses on comfort, punctuality, and a well-organized itinerary. Transparent pricing, reliable service, and personalized attention make this package ideal for a memorable day trip. Book your Chennai to Vellore One Day Package today and enjoy a hassle-free, safe, and enriching journey."
    ]
  },
  "chennai-kanyakumari-temple-tour-package": {
    title: "Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package – Comprehensive & Comfortable South India Pilgrimage",
    content: [
      "Embark on an unforgettable South India journey with our <strong>Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package</strong>, designed for travelers and devotees who want to explore historic temples, coastal beauty, and cultural landmarks in comfort. This Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package includes convenient pickup from Chennai, travel in well-maintained AC vehicles, and professional drivers to ensure a safe and hassle-free trip.",
      "With this Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package, you can visit iconic sites such as the Sri Ranganathaswamy Temple in Trichy, Meenakshi Amman Temple in Madurai, Tiruchendur Murugan Temple, and the picturesque beaches of Kanyakumari. The package is perfect for families, senior citizens, and groups seeking a blend of spirituality, culture, and leisure.",
      "Our Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package ensures comfortable accommodation, organized sightseeing, and a well-planned itinerary to make the journey enjoyable and stress-free. Transparent pricing, punctual service, and attention to every detail make this package an ideal choice for a memorable South Indian tour. Book your Chennai to Trichy-Madurai-Tiruchendur-Kanyakumari Four/Five Days Tour Package today and experience a seamless, enriching, and unforgettable journey."
    ]
  },
  "chennai-pondicherry-temple-package": {
    title: "Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package – Comfortable & Scenic South India Trip",
    content: [
      "Experience the perfect blend of spirituality, history, and coastal charm with our <strong>Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package</strong>, designed for travelers who want a relaxed and memorable journey. This Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and experienced drivers to ensure a smooth and safe trip.",
      "With this Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package, you can explore the sacred temples of Kanchipuram, the UNESCO World Heritage sites of Mahabalipuram, and the French colonial charm of Pondicherry. The package is perfect for families, senior citizens, and groups looking for a balanced itinerary combining spiritual, cultural, and leisure experiences.",
      "Our Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package focuses on comfort, well-planned sightseeing, and a stress-free journey. With transparent pricing, reliable service, and attention to detail, this package ensures a memorable and enjoyable trip. Book your Chennai to Kanchipuram, Mahabalipuram & Pondicherry Two/Three Days Tour Package today and enjoy a divine, scenic, and culturally rich experience."
    ]
  },
  "chennai-kodaikanal-palani-temple-tour-package": {
    title: "Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package – Scenic & Spiritual South India Trip",
    content: [
      "Embark on a memorable blend of spirituality and nature with our <strong>Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package</strong>, perfect for travelers and devotees seeking a relaxing yet fulfilling journey. This Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and professional drivers to ensure a safe and hassle-free trip.",
      "With this Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package, you can visit the revered Palani Murugan Temple, enjoy the scenic beauty of Kodaikanal’s hills, lakes, and waterfalls, and explore local attractions at a relaxed pace. Ideal for families, senior citizens, and groups, this package balances spiritual visits with leisure and sightseeing.",
      "Our Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package ensures comfortable accommodations, well-planned sightseeing, and a smooth itinerary, making the trip stress-free and enjoyable. Transparent pricing, reliable service, and personalized attention make this package a preferred choice for travelers. Book your Chennai to Kodaikanal & Palani Temple Three/Four Days Tour Package today and experience a rejuvenating and spiritually enriching South India journey."
    ]
  },
  "chennai-madurai-temple-package": {
    title: "Chennai to Madurai Two Days Tour Package – Comfortable & Spiritual Getaway",
    content: [
      "Experience the rich culture and spiritual heritage of Tamil Nadu with our <strong>Chennai to Madurai Two Days Tour Package</strong>, designed for travelers and devotees who want a hassle-free and memorable trip. This Chennai to Madurai Two Days Tour Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and experienced drivers to ensure a safe and smooth journey.",
      "With the Chennai to Madurai Two Days Tour Package, you can explore the iconic Meenakshi Amman Temple, Thirumalai Nayakkar Palace, and other historical and cultural landmarks in Madurai. Ideal for families, senior citizens, and group travelers, this package allows you to enjoy sightseeing, spiritual visits, and local experiences without stress.",
      "Our Chennai to Madurai Two Days Tour Package focuses on comfort, well-planned sightseeing, and a hassle-free itinerary. With transparent pricing, reliable service, and personalized attention, this package ensures a memorable and enriching trip. Book your Chennai to Madurai Two Days Tour Package today and enjoy a comfortable, spiritual, and culturally rich South India journey."
    ]
  },
  "chennai-malikarjuna-temple-package": {
    title: "Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days Spiritual Getaway",
    content: [
      "Embark on a divine journey with our <strong>Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days</strong>, designed for devotees who want a comfortable and hassle-free pilgrimage. This package includes convenient pickup from Chennai, travel in well-maintained AC vehicles, and experienced drivers to ensure a safe and smooth trip.",
      "With the Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days, you can visit the sacred Mallikarjuna Swamy Temple and nearby attractions, allowing ample time for darshan, prayers, and spiritual exploration. Ideal for families, senior citizens, and groups, this package ensures a peaceful and fulfilling pilgrimage without the stress of planning.",
      "Our Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days includes comfortable accommodations, a well-planned itinerary, and personalized service to make your journey enjoyable. Transparent pricing, punctual service, and attention to every detail make this package a preferred choice for devotees. Book your Chennai to Mallikarjuna Temple Tour Package – 2 or 3 Days today and experience a memorable, safe, and spiritually enriching trip."
    ]
  },
  "chennai-navagraha-temple-tour-package": {
    title: "Chennai to Navagraha Three/Four Days Tour Package – Spiritual & Comfortable Pilgrimage",
    content: [
      "Embark on a divine and well-planned journey with our <strong>Chennai to Navagraha Three/Four Days Tour Package</strong>, specially designed for devotees who wish to visit the nine sacred Navagraha temples comfortably. This Chennai to Navagraha Three/Four Days Tour Package includes convenient pickup from Chennai, travel in comfortable AC vehicles, and professional drivers to ensure a safe and hassle-free trip.",
      "With the Chennai to Navagraha Three/Four Days Tour Package, you can explore the temples dedicated to Surya, Chandra, Mangal, Budha, Guru, Shukra, Shani, Rahu, and Ketu, allowing ample time for darshan, prayers, and spiritual reflection. Perfect for families, senior citizens, and group travelers, this package ensures a smooth and meaningful pilgrimage experience.",
      "Our Chennai to Navagraha Three/Four Days Tour Package focuses on comfort, well-organized itineraries, and personalized service, making the journey stress-free and enjoyable. Transparent pricing, reliable support, and attention to every detail make this package a preferred choice for devotees. Book your Chennai to Navagraha Three/Four Days Tour Package today and experience a memorable, spiritually enriching South India tour."
    ]
  },
};

// This is a Server Component, so it can directly fetch data
export default async function TemplePackagePage({ params }) {
  const { slug } = await params;

  let packageData = null;
  let error = null;

  try {
    // Fetch current package data
    const docRef = doc(db, "templePackages", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const rawData = docSnap.data();
      // Convert Firebase timestamps and other complex objects to plain objects
      packageData = {
        id: docSnap.id,
        ...rawData,
        createdAt: rawData.createdAt
          ? rawData.createdAt.toDate().toISOString()
          : null,
        updatedAt: rawData.updatedAt
          ? rawData.updatedAt.toDate().toISOString()
          : null,
      };

      // 2. Check if we should override with local data for specific packages
      const localPackageSlugs = [
        "chennai-kanchipuram-temple-package",
        "chennai-mahabalipuram-oneday-package",
        "chennai-pondicherry-temple-tour-package",
        "chennai-tiruvannamalai-temple-package",
        "chennai-to-kalahasti-temple-tour-package",
        "chennai-vellore-temple-package",
        "chennai-kanyakumari-temple-tour-package",
        "chennai-pondicherry-temple-package",
        "chennai-kodaikanal-palani-temple-tour-package",
        "chennai-madurai-temple-package",
        "chennai-malikarjuna-temple-package",
        "chennai-navagraha-temple-tour-package",
      ];

      if (localPackageSlugs.includes(slug)) {
        try {
          const jsonData = await import(`@/public/data/temple-tour-package/${slug}.json`);
          const localData = jsonData.default || jsonData;

          // Merge top-level images
          if (localData.heroImage) packageData.heroImage = localData.heroImage;
          if (localData.images) packageData.images = localData.images;

          // Merge templeList images/details based on id
          if (localData.templeList && packageData.templeList) {
            packageData.templeList = packageData.templeList.map((temple) => {
              const localTemple = localData.templeList.find((lt) => lt.id === temple.id);
              if (localTemple) {
                const { id, ...localRest } = localTemple;
                return { ...temple, ...localRest };
              }
              return temple;
            });
          }

          console.log(`Merged Firestore data with local images for: ${slug}`);
        } catch (jsonError) {
          console.error("Failed to load local JSON for merge:", jsonError);
        }
      }
    } else {
      error = "Temple package not found or inactive.";
    }
  } catch (err) {
    console.error("Error fetching temple package:", err);
    error = "Failed to load temple package details. Please try again later.";
  }

  const slugsToLog = [
    "chennai-kanchipuram-temple-package",
    "chennai-kanyakumari-temple-tour-package",
    "chennai-mahabalipuram-oneday-package",
    "chennai-pondicherry-temple-package",
    "chennai-pondicherry-temple-tour-package",
    "chennai-tiruvannamalai-temple-package",
    "chennai-to-kalahasti-temple-tour-package",
    "chennai-vellore-temple-package",
    "chennai-kodaikanal-palani-temple-tour-package",
    "chennai-madurai-temple-package",
    "chennai-malikarjuna-temple-package",
    "chennai-navagraha-temple-tour-package",
  ];

  if (slugsToLog.includes(slug) && packageData) {
    console.log(`FINAL Backend Response for ${slug}:`, JSON.stringify(packageData, null, 2));
  }

  const renderIcon = (iconName) => {
    const iconMap = {
      Shield,
      Award,
      Clock,
      Phone,
      Star,
      Users,
      CheckCircle,
      Car,
      MapPin,
      Calendar,
      Mail,
      MessageCircle,
      Camera,
      Route,
      Info,
      IndianRupee,
      Eye,
      Headset,
    };
    const IconComponent = iconMap[iconName] || Shield;
    return <IconComponent className="w-8 h-8" />;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-hidden">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Package Not Found
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-lg text-gray-700">
            Loading temple package details...
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">

        {/* Breadcrumb Section */}
        {/* <section className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600 flex items-center gap-2" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/temple-tours" className="hover:text-blue-600 transition-colors">
              Temple Tours
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-800 font-medium">{packageData.title}</span>
          </nav>
        </div>
      </section> */}

        {/* Hero Section */}
        {/* <section className="bg-orange-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">{packageData.title}</h1>
            {packageData.subtitle && <p className="text-lg md:text-xl text-gray-600 mb-6">{packageData.subtitle}</p>}
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                <Clock className="w-4 h-4" />
                {packageData.days} Days
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                <MapPin className="w-4 h-4" />
                Temple Tour
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                <Users className="w-4 h-4" />
                All Group Sizes
              </Badge>
            </div>
          </div>
        </div>
      </section> */}
        <br /><br />
        <section className="bg-orange-50 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
              {/* Left Side - Text */}
              <div className="text-left max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
                  {packageData.title}
                </h1>
                {packageData.subtitle && (
                  <p className="text-lg md:text-xl text-gray-600 mb-6">
                    {packageData.subtitle}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <Clock className="w-4 h-4" />
                    {packageData.days} Days
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <MapPin className="w-4 h-4" />
                    Temple Tour
                  </Badge>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    <Users className="w-4 h-4" />
                    All Group Sizes
                  </Badge>
                </div>
              </div>

              {/* Right Side - Dynamic Hero Image */}

              <div className="w-full order-1 lg:order-2">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-500"></div>
                  <div className="relative bg-white rounded-3xl shadow-2xl p-6 transform rotate-2 group-hover:rotate-0 transition-transform duration-500 flex justify-center items-center">
                    <div className="relative w-full max-w-4xl aspect-[3/2]">
                      <Image
                        src={
                          packageData.heroImage ||
                          packageData.images?.[0] ||
                          "/images/2.webp"
                        }
                        alt={packageData.title || "Tour Package"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1000px"
                        className="rounded-lg shadow-lg object-cover"
                        priority
                        quality={95}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-center">
              <img
                src="/images/2.webp" // static image path
                alt="Tour Package"
                className="rounded-lg shadow-lg w-full max-w-md object-cover"
              />
            </div> */}
            </div>
          </div>
        </section>

        {/* SEO On-page Content Section */}
        {SEO_CONTENT_MAP[slug] && (
          <section className="py-12 bg-blue-50/50">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <article className="prose prose-blue max-w-none">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-900 leading-tight">
                    {SEO_CONTENT_MAP[slug].title}
                  </h2>
                  <div className="space-y-6">
                    {SEO_CONTENT_MAP[slug].content.map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-gray-700 leading-relaxed text-lg"
                        dangerouslySetInnerHTML={{ __html: paragraph }}
                      />
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* Image Gallery Section */}
        {packageData.images && packageData.images.length > 0 && (
          <section className="bg-white py-8">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                {/* Main Image */}
                <div className="mb-4">
                  <div className="relative w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg">
                    <Image
                      src={
                        packageData.images[0] ||
                        "/placeholder.webp?height=600&width=1200&query=temple tour"
                      }
                      alt={`${packageData.title} - Main Image`}
                      fill
                      className="object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                      priority
                    />
                  </div>
                </div>



                {/* Thumbnail Images */}
                {packageData.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {packageData.images.slice(0, 6).map((image, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 rounded-lg overflow-hidden border-2 border-transparent"
                      >
                        <img
                          src={image || "/placeholder.webp"}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-20 h-16 object-cover"
                        />
                      </div>
                    ))}
                    {packageData.images.length > 6 && (
                      <div className="flex-shrink-0 w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Eye className="w-4 h-4 mx-auto mb-1 text-gray-600" />
                          <span className="text-xs text-gray-600">
                            +{packageData.images.length - 6}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Booking Form */}
        <div id="booking">
          <BookingForm />
        </div>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Content - 2/3 width */}
              <div className="lg:col-span-2 space-y-8">
                {/* Package Overview */}
                {packageData.content && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Info className="w-6 h-6 text-blue-600" />
                      Package Overview
                    </h2>
                    <div className="space-y-4">
                      <div
                        className="text-gray-700 leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{
                          __html: packageData.content || "",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Tour Highlights */}
                {packageData.tourHighlights &&
                  packageData.tourHighlights.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        Tour Highlights
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageData.tourHighlights.map((highlight, index) => (
                          <div
                            key={highlight.id || index}
                            className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <div
                              className="text-gray-700 leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: highlight.text || "",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Temple List */}
                {packageData.templeList && packageData.templeList.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <Award className="w-6 h-6 text-orange-500" />
                      Temples to Visit
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {packageData.templeList.map((temple, index) => (
                        <div
                          key={temple.id || index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          {temple.imageUrl && (
                            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mb-3">
                              <img
                                src={temple.imageUrl || "/placeholder.webp"}
                                alt={temple.name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {temple.name}
                          </h4>
                          {temple.description && (
                            <div
                              className="text-sm text-gray-600 leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: temple.description || "",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Itinerary */}
                {packageData.itineraries &&
                  packageData.itineraries.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Route className="w-6 h-6 text-blue-600" />
                        Detailed Itinerary
                      </h2>
                      <div className="space-y-4">
                        {packageData.itineraries.map((item, index) => (
                          <div
                            key={item.id || index}
                            className="flex gap-4 p-4 bg-blue-50 rounded-lg"
                          >
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {index + 1}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div
                                className="text-gray-700 leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                  __html: item.text || "",
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Sightseeing Places */}
                {packageData.sightseeingPlaces &&
                  packageData.sightseeingPlaces.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Camera className="w-6 h-6 text-purple-600" />
                        Sightseeing Places
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packageData.sightseeingPlaces.map((place, index) => (
                          <div
                            key={place.id || index}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <h4 className="font-semibold text-gray-800 mb-2">
                              {place.name}
                            </h4>
                            {place.description && (
                              <div
                                className="text-sm text-gray-600 leading-relaxed whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                  __html: place.description || "",
                                }}
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Additional Sections */}
                {packageData.sections && packageData.sections.length > 0 && (
                  <div className="space-y-6">
                    {packageData.sections.map((section, index) => (
                      <div
                        key={section.id || index}
                        className="bg-white rounded-lg shadow-sm p-6"
                      >
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                          {section.title}
                        </h2>
                        <div className="text-gray-700 leading-relaxed">
                          <div
                            className="whitespace-pre-line"
                            dangerouslySetInnerHTML={{
                              __html: section.content || "",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inclusions */}
                  {packageData.includes && packageData.includes.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                      <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        What's Included
                      </h3>
                      <ul className="space-y-3">
                        {packageData.includes.map((item, index) => (
                          <li
                            key={item.id || index}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <div
                              className="text-sm text-gray-700 whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: item.text || "",
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Exclusions */}
                  {packageData.excludes && packageData.excludes.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
                      <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                        <XCircle className="w-5 h-5" />
                        What's Not Included
                      </h3>
                      <ul className="space-y-3">
                        {packageData.excludes.map((item, index) => (
                          <li
                            key={item.id || index}
                            className="flex items-start gap-3"
                          >
                            <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                            <div
                              className="text-sm text-gray-700 whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: item.text || "",
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Important Notes */}
                {packageData.importantNotes &&
                  packageData.importantNotes.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Important Notes
                      </h3>
                      <ul className="space-y-3">
                        {packageData.importantNotes.map((note, index) => (
                          <li
                            key={note.id || index}
                            className="flex items-start gap-3"
                          >
                            <span className="text-yellow-600 mt-1 font-bold">
                              •
                            </span>
                            <div
                              className="text-sm text-gray-700 whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: note.text || "",
                              }}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* FAQs */}
                {packageData.faqs && packageData.faqs.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                      <MessageCircle className="w-6 h-6 text-blue-600" />
                      Frequently Asked Questions
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                      {packageData.faqs.map((faq, index) => (
                        <AccordionItem
                          key={faq.id || index}
                          value={`item-${index}`}
                          className="border-b border-gray-200"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-4">
                            <div
                              className="text-base font-bold text-gray-800 whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: faq.question || "",
                              }}
                            />
                          </AccordionTrigger>
                          <AccordionContent className="pb-4">
                            <div
                              className="text-gray-600 leading-relaxed whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: faq.answer || "",
                              }}
                            />
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}
              </div>

              {/* Right Sidebar - 1/3 width */}
              <div className="space-y-6">
                {/* Quick Info */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Quick Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Duration
                        </p>
                        <p className="text-sm text-gray-600">
                          {packageData.days} Days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">Type</p>
                        <p className="text-sm text-gray-600">
                          Temple Tour Package
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Group Size
                        </p>
                        <p className="text-sm text-gray-600">Flexible</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          Availability
                        </p>
                        <p className="text-sm text-gray-600">24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Need Help?
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Have questions about this temple tour package? Our travel
                    experts are here to help!
                  </p>
                  <div className="space-y-3">
                    <a href="tel:9840789844">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-blue-50"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Us
                      </Button>
                    </a>
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=garudattd1@gmail.com&su=${encodeURIComponent(`Enquiry for ${packageData?.title || 'Temple Tour Package'}`)}&body=${encodeURIComponent(`Hi Garuda Tours Team,\n\nI would like to know more about the "${packageData?.title || 'Temple Tour Package'}".\n\nPlease provide more details.\n\nThank you.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-blue-50"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email Us
                      </Button>
                    </a>

                    <a href={`https://wa.me/919840789857?text=${encodeURIComponent(`Hi Garuda Tours Team, I'm interested in the "${packageData?.title || 'Temple Tour Package'}". Can you provide more details?`)}`} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-blue-50"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
                {/* Car Prices */}
                {packageData.carPrices && packageData.carPrices.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <Car className="w-5 h-5 text-blue-600" />
                      Car Rental Prices
                    </h3>
                    <div className="space-y-3">
                      {packageData.carPrices.map((carPrice, index) => (
                        <div
                          key={carPrice.id || index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <span className="font-medium text-gray-800 text-sm">
                            {carPrice.carType}
                          </span>
                          <span className="flex items-center gap-1 font-bold text-blue-600">
                            <IndianRupee className="w-4 h-4" />
                            {Number.parseInt(carPrice.price).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-3 text-center">
                        * Prices may vary based on season and availability
                      </p>
                      <a href="tel:9840789844" className="block w-full">
                        <Button
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          size="lg"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Book Now
                        </Button>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        {/* <section className="bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{packageData.sectionTitles?.whyChooseUsItems || "Why Choose Our Temple Tours"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe & Secure</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Experienced guides and safe transportation for your spiritual journey
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Guides</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Knowledgeable local temple guides with deep spiritual insights
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Flexible Timing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Customizable tour schedules to match your preferences
                </p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Round the clock customer support for your peace of mind
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

        {/* Why Choose Us Section */}
        {packageData.whyChooseUsItems &&
          packageData.whyChooseUsItems.length > 0 && (
            <section className="bg-orange-50 py-12">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    {packageData.sectionTitles?.whyChooseUsItems ||
                      "Why Choose Our Temple Tours"}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {packageData.whyChooseUsItems.map((item, index) => (
                      <div
                        key={index}
                        className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <div className="text-orange-600">
                            {renderIcon(item.iconName)}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.title}
                        </h3>
                        {item.description && (
                          <div
                            className="text-sm text-gray-600 leading-relaxed whitespace-pre-line"
                            dangerouslySetInnerHTML={{
                              __html: item.description || "",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

      </div>
      <Footer />
    </div>
  );
}
