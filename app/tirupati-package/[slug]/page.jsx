import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Star,
  ShieldCheck,
  Users,
  Clock,
  MapPin,
  Wallet,
  BriefcaseMedical,
  UserCheck,
  Award,
  Phone,
  Mail,
  MessageCircle,
  GraduationCap,
  Flower,
  Utensils,
  Coffee,
  Ticket,
  Car,
  Fuel,
  BadgeIndianRupee,
} from "lucide-react";
import PassengerNoteBox from "@/components/PassengerNoteBox.jsx";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BookingForm from "@/components/booking-form";
import TirupatiPackageHero from "@/components/tirupati-package-hero";
import PlacesCoverage from "@/components/places-we-cover";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  "map pin": MapPin,
  graduation: GraduationCap,
  flower: Flower,
  // Add other icons here if needed in the future
};

// Generate dynamic metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Hardcoded SEO metadata for specific packages
  if (slug === "chennai-tirupati-one-day-tour-package") {
    return {
      title: "Chennai to Tirupati One Day Package – Comfortable & Hassle-Free Same Day Darshan Tour",
      description:
        "Plan a smooth and spiritually fulfilling journey with our Chennai to Tirupati One Day Package. Includes doorstep pickup, AC luxury travel, and professional darshan assistance.",
    };
  }

  if (slug === "tirupati-two-days-package-from-chennai") {
    return {
      title: "Chennai to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Tour",
      description:
        "Experience a peaceful and well-planned pilgrimage with our Chennai to Tirupati Two Day Package. Gives you ample time for darshan, temple visits, and spiritual exploration.",
    };
  }

  if (slug === "chennai-tirupati-car-rental-package") {
    return {
      title: "Chennai to Tirupati Outstation Car Rental Package – Safe, Flexible & Comfortable Travel Option",
      description:
        "Travel comfortably with our Chennai to Tirupati Outstation Car Rental Package. Offers well-maintained AC cars with professional drivers for a private and flexible pilgrimage.",
    };
  }

  if (slug === "srivani-vip-break-darshan") {
    return {
      title: "VIP Darshan – Priority Entry for a Peaceful & Divine Temple Experience",
      description:
        "Experience a divine visit with our VIP Darshan service. Provides prioritized entry to avoid long waiting hours and ensure a smooth temple visit.",
    };
  }

  if (slug === "vellore-tirupati-one-day-tour-package") {
    return {
      title: "Vellore to Tirupati One Day Package – Comfortable & Hassle-Free Pilgrimage",
      description:
        "Plan a peaceful pilgrimage with our Vellore to Tirupati One Day Package. Includes comfortable pickup from Vellore, AC travel, and experienced drivers.",
    };
  }

  if (slug === "vellore-to-tirupati") {
    return {
      title: "Vellore to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Journey",
      description:
        "Experience a relaxed trip with our Vellore to Tirupati Two Day Package. Ideal for devotees who wish to explore Tirupati at a comfortable pace.",
    };
  }

  if (slug === "bangalore-tirupati-darshan-tour-package") {
    return {
      title: "Bangalore to Tirupati One Day Package – Quick, Comfortable & Hassle-Free Darshan Trip",
      description:
        "Embark on a seamless journey with our Bangalore to Tirupati One Day Package. Includes convenient pickup from Bangalore and comfortable AC travel.",
    };
  }

  if (slug === "kanchipuram-tirupati-one-day-tour-package") {
    return {
      title: "Kanchipuram to Tirupati One Day Package – Comfortable & Hassle-Free Darshan Trip",
      description:
        "Experience a smooth journey with our Kanchipuram to Tirupati One Day Package. Perfect for a quick yet fulfilling temple visit in a single day.",
    };
  }

  if (slug === "kanchipuram-tirupati-two-days-tour-package") {
    return {
      title: "Kanchipuram to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Tour",
      description:
        "Enjoy a relaxed pilgrimage with our Kanchipuram to Tirupati Two Day Package. Includes overnight stay and ample time for temple visits.",
    };
  }

  if (slug === "tirumala-tirupati-darshan-one-day-package") {
    return {
      title: "Tirumala to Tirupati One Day Package – Hassle-Free & Comfortable Darshan Trip",
      description:
        "Experience a seamless trip with our Tirumala to Tirupati One Day Package. Perfect for a hassle-free darshan and returning comfortably the same day.",
    };
  }

  try {
    const docRef = doc(db, "tirupati-package", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const seoData = data.seoData || {};

      return {
        title:
          seoData.pageTitle ||
          data.title ||
          "Tirupati Package | Garuda Tours and Travels",
        description:
          seoData.metaDescription ||
          data.subtitle ||
          "Book your Tirupati package with Garuda Tours and Travels. Professional service, confirmed darshan tickets, and door-to-door pickup.",
        keywords:
          seoData.metaKeywords ||
          "tirupati, balaji, darshan, package, garuda tours, travel",
        openGraph: {
          title:
            seoData.ogTitle ||
            seoData.pageTitle ||
            data.title ||
            "Tirupati Package | Garuda Tours and Travels",
          description:
            seoData.ogDescription ||
            seoData.metaDescription ||
            data.subtitle ||
            "Book your Tirupati package with Garuda Tours and Travels",
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
            "Tirupati Package | Garuda Tours and Travels",
          description:
            seoData.ogDescription ||
            seoData.metaDescription ||
            data.subtitle ||
            "Book your Tirupati package with Garuda Tours and Travels",
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
    title: "Tirupati Package | Garuda Tours and Travels",
    description:
      "Book your Tirupati package with Garuda Tours and Travels. Professional service, confirmed darshan tickets, and door-to-door pickup.",
    keywords: "tirupati, balaji, darshan, package, garuda tours, travel",
  };
}

// SEO Content Data Mapping
const SEO_CONTENT_MAP = {
  "chennai-tirupati-one-day-tour-package": {
    title: "Chennai to Tirupati One Day Package – Comfortable & Hassle-Free Same Day Darshan Tour",
    content: [
      "Plan a smooth and spiritually fulfilling journey with our <strong>Chennai to Tirupati One Day Package</strong>, designed for devotees who wish to have a comfortable darshan experience in a single day. This carefully arranged Chennai to Tirupati One Day Package includes early morning pickup from your doorstep in Chennai, travel in well-maintained AC vehicles, and professional driver assistance to ensure a safe and relaxed trip.",
      "Our Chennai to Tirupati One Day Package is ideal for families, working professionals, and senior citizens who prefer a quick yet peaceful pilgrimage. With proper darshan guidance and organized travel planning, the Chennai to Tirupati One Day Package helps you avoid unnecessary delays and focus completely on seeking Lord Venkateswara’s blessings. The package is designed to provide convenience, punctuality, and transparent pricing without hidden charges.",
      "Choosing the Chennai to Tirupati One Day Package means you can travel comfortably, complete your darshan, and return to Chennai on the same day without stress. Whether it’s a family vow, special occasion, or personal spiritual trip, this Chennai to Tirupati One Day Package ensures a memorable and hassle-free temple visit filled with devotion and peace."
    ]
  },
  "tirupati-two-days-package-from-chennai": {
    title: "Chennai to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Tour",
    content: [
      "Experience a peaceful and well-planned pilgrimage with our <strong>Chennai to Tirupati Two Day Package</strong>, specially designed for devotees who wish to visit Tirumala without any rush. This thoughtfully curated Chennai to Tirupati Two Day Package gives you ample time for darshan, temple visits, and spiritual exploration while ensuring complete comfort throughout the journey. With convenient pickup from Chennai, well-maintained AC vehicles, and experienced drivers, the Chennai to Tirupati Two Day Package guarantees a safe and smooth travel experience.",
      "Unlike a same-day trip, the Chennai to Tirupati Two Day Package allows you to relax, stay overnight, and attend special darshan peacefully. You can visit Tirumala Balaji Temple, Padmavathi Temple, and other nearby sacred places at a comfortable pace. Our Chennai to Tirupati Two Day Package includes assistance with darshan tickets, accommodation arrangements, and clear travel planning, so you can focus entirely on your spiritual journey.",
      "Ideal for families, senior citizens, and group travelers, the Chennai to Tirupati Two Day Package offers flexible options, transparent pricing, and personalized service. Whether you are planning a family vow, a special pooja, or a devotional trip, this Chennai to Tirupati Two Day Package ensures a meaningful and memorable experience. Book your Chennai to Tirupati Two Day Package today and enjoy a divine journey filled with comfort, devotion, and peace of mind."
    ]
  },
  "chennai-tirupati-car-rental-package": {
    title: "Chennai to Tirupati Outstation Car Rental Package – Safe, Flexible & Comfortable Travel Option",
    content: [
      "Travel comfortably and conveniently with our <strong>Chennai to Tirupati Outstation Car Rental Package</strong>, specially designed for devotees who prefer a private and flexible pilgrimage experience. This Chennai to Tirupati Outstation Car Rental Package offers well-maintained AC cars with professional, experienced drivers to ensure a safe and smooth journey from Chennai to Tirupati and back.",
      "With the Chennai to Tirupati Outstation Car Rental Package, you can choose your preferred vehicle type, including sedan, SUV, or tempo traveller, depending on your group size and travel needs. The Chennai to Tirupati Outstation Car Rental Package gives you complete freedom to plan your schedule, stop for refreshments, and visit nearby temples like Padmavathi Temple or other sacred spots at your own pace.",
      "Our affordable and transparent pricing makes the Chennai to Tirupati Outstation Car Rental Package a trusted option for families, corporate groups, and senior citizens. There are no hidden charges, and all vehicles are clean, comfortable, and regularly serviced. By booking the Chennai to Tirupati Outstation Car Rental Package, you can enjoy a stress-free road trip focused entirely on devotion and comfort. Choose our reliable Chennai to Tirupati Outstation Car Rental Package for a safe, peaceful, and memorable spiritual journey."
    ]
  },
  "srivani-vip-break-darshan": {
    title: "VIP Darshan – Priority Entry for a Peaceful & Divine Temple Experience",
    content: [
      "Experience a divine and peaceful temple visit with our <strong>VIP Darshan</strong> service, designed to help devotees avoid long waiting hours and enjoy a smooth darshan experience. The VIP Darshan option provides prioritized entry, allowing you to have a closer and more organized visit to seek Lord Venkateswara’s blessings without unnecessary delays.",
      "With VIP Darshan, pilgrims can benefit from special entry arrangements that reduce crowd stress and ensure a comfortable temple visit. This service is especially helpful for senior citizens, families with children, and devotees traveling from long distances. Our team assists you with the required booking guidance and clear instructions so your VIP Darshan experience is hassle-free and well-planned.",
      "Choosing VIP Darshan means you can focus entirely on your prayers and spiritual connection instead of worrying about queues or time constraints. Whether you are visiting for a special occasion, vow fulfillment, or personal devotion, VIP Darshan offers a more peaceful and memorable temple experience. Book your VIP Darshan in advance to enjoy a smooth, respectful, and spiritually enriching visit."
    ]
  },
  "vellore-tirupati-one-day-tour-package": {
    title: "Vellore to Tirupati One Day Package – Comfortable & Hassle-Free Pilgrimage",
    content: [
      "Plan a peaceful and convenient pilgrimage with our <strong>Vellore to Tirupati One Day Package</strong>, specially designed for devotees who want a smooth darshan experience in a single day. This well-organized Vellore to Tirupati One Day Package includes comfortable pickup from Vellore, travel in clean and well-maintained AC vehicles, and experienced drivers who ensure a safe and timely journey.",
      "The Vellore to Tirupati One Day Package is ideal for families, working professionals, and senior citizens who prefer a quick yet spiritually fulfilling trip. With proper travel coordination and darshan assistance, the Vellore to Tirupati One Day Package helps you avoid unnecessary delays and focus entirely on seeking the blessings of Lord Venkateswara. You can complete your temple visit peacefully and return to Vellore the same day without stress.",
      "Affordable pricing, transparent billing, and personalized service make the Vellore to Tirupati One Day Package a trusted choice among devotees. Whether it is a family vow, special prayer, or devotional visit, this Vellore to Tirupati One Day Package ensures a comfortable, safe, and memorable spiritual journey. Book your Vellore to Tirupati One Day Package today and experience divine blessings with complete peace of mind."
    ]
  },
  "vellore-to-tirupati": {
    title: "Vellore to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Journey",
    content: [
      "Experience a relaxed and spiritually enriching trip with our <strong>Vellore to Tirupati Two Day Package</strong>, ideal for devotees who wish to explore Tirupati and Tirumala at a comfortable pace. This thoughtfully designed Vellore to Tirupati Two Day Package includes convenient pickup from Vellore, travel in well-maintained AC vehicles, and experienced drivers to ensure a safe and smooth journey.",
      "With the Vellore to Tirupati Two Day Package, you can enjoy ample time for darshan, temple visits, and spiritual exploration without rushing. The package includes overnight stay arrangements near the temple, allowing you to attend early morning rituals and special darshan comfortably. Families, senior citizens, and group travelers find the Vellore to Tirupati Two Day Package especially convenient, as it balances devotion with comfort and convenience.",
      "Our Vellore to Tirupati Two Day Package also provides guidance for darshan tickets, temple timings, and local sightseeing, ensuring a stress-free pilgrimage. Transparent pricing, personalized service, and focus on comfort make this Vellore to Tirupati Two Day Package a memorable experience for all devotees. Book the Vellore to Tirupati Two Day Package today to enjoy a divine, well-organized, and peaceful spiritual journey."
    ]
  },
  "bangalore-tirupati-darshan-tour-package": {
    title: "Bangalore to Tirupati One Day Package – Quick, Comfortable & Hassle-Free Darshan Trip",
    content: [
      "Embark on a seamless and spiritually fulfilling journey with our <strong>Bangalore to Tirupati One Day Package</strong>, designed for devotees who want a hassle-free darshan experience in just one day. This well-planned Bangalore to Tirupati One Day Package includes convenient pickup from Bangalore, travel in comfortable AC vehicles, and experienced drivers to ensure a safe and timely journey.",
      "The Bangalore to Tirupati One Day Package is perfect for families, working professionals, and senior citizens who wish to complete their pilgrimage without rushing. With organized travel planning and darshan assistance, this Bangalore to Tirupati One Day Package allows you to focus entirely on seeking Lord Venkateswara’s blessings. You can enjoy a smooth temple visit and return to Bangalore the same day with ease.",
      "Transparent pricing, reliable service, and a stress-free itinerary make the Bangalore to Tirupati One Day Package an ideal choice for devotees. Whether it’s a family vow, special pooja, or personal spiritual journey, this Bangalore to Tirupati One Day Package ensures a comfortable, safe, and memorable pilgrimage. Book your Bangalore to Tirupati One Day Package today and experience divine blessings with complete peace of mind."
    ]
  },
  "kanchipuram-tirupati-one-day-tour-package": {
    title: "Kanchipuram to Tirupati One Day Package – Comfortable & Hassle-Free Darshan Trip",
    content: [
      "Experience a smooth and spiritually enriching journey with our <strong>Kanchipuram to Tirupati One Day Package</strong>, designed for devotees who wish to complete their pilgrimage in a single day without any hassle. This carefully planned Kanchipuram to Tirupati One Day Package includes convenient pickup from Kanchipuram, travel in comfortable AC vehicles, and professional drivers to ensure a safe and timely journey.",
      "The Kanchipuram to Tirupati One Day Package is perfect for families, senior citizens, and working professionals who want a quick yet fulfilling temple visit. With organized travel planning and assistance for darshan, this Kanchipuram to Tirupati One Day Package allows you to focus entirely on seeking Lord Venkateswara’s blessings. Enjoy a smooth and peaceful darshan experience and return to Kanchipuram the same day with ease.",
      "With transparent pricing, reliable service, and attention to comfort, the Kanchipuram to Tirupati One Day Package is a preferred choice for devotees. Whether it’s a special pooja, family vow, or personal spiritual trip, this Kanchipuram to Tirupati One Day Package ensures a memorable and stress-free pilgrimage. Book your Kanchipuram to Tirupati One Day Package today for a divine journey filled with devotion and peace."
    ]
  },
  "kanchipuram-tirupati-two-days-tour-package": {
    title: "Kanchipuram to Tirupati Two Day Package – Relaxed & Comfortable Spiritual Tour",
    content: [
      "Enjoy a relaxed and spiritually fulfilling pilgrimage with our <strong>Kanchipuram to Tirupati Two Day Package</strong>, designed for devotees who want to explore Tirupati and Tirumala at a comfortable pace. This Kanchipuram to Tirupati Two Day Package includes convenient pickup from Kanchipuram, travel in well-maintained AC vehicles, and experienced drivers to ensure a safe and smooth journey.",
      "With the Kanchipuram to Tirupati Two Day Package, you get ample time for darshan, temple visits, and spiritual rituals without feeling rushed. The package includes comfortable overnight stay arrangements near the temple, allowing you to attend early morning prayers and special darshan with ease. Families, senior citizens, and group travelers find the Kanchipuram to Tirupati Two Day Package especially convenient as it balances devotion with comfort.",
      "The Kanchipuram to Tirupati Two Day Package also provides assistance with darshan tickets, temple guidance, and local sightseeing, ensuring a stress-free and memorable pilgrimage. Transparent pricing, personalized service, and focus on comfort make this Kanchipuram to Tirupati Two Day Package an ideal choice for all devotees. Book your Kanchipuram to Tirupati Two Day Package today and enjoy a divine, well-organized, and peaceful spiritual journey."
    ]
  },
  "tirumala-tirupati-darshan-one-day-package": {
    title: "Tirumala to Tirupati One Day Package – Hassle-Free & Comfortable Darshan Trip",
    content: [
      "Experience a seamless and spiritually fulfilling trip with our <strong>Tirumala to Tirupati One Day Package</strong>, perfect for devotees who wish to enjoy a hassle-free darshan and return comfortably the same day. This well-planned Tirumala to Tirupati One Day Package includes convenient pickup from Tirumala, travel in comfortable AC vehicles, and professional drivers to ensure a safe and timely journey.",
      "The Tirumala to Tirupati One Day Package allows devotees to complete their temple visit without any stress, making it ideal for families, senior citizens, and working professionals. With organized darshan assistance and travel planning, this Tirumala to Tirupati One Day Package ensures you can focus entirely on seeking Lord Venkateswara’s blessings. Enjoy a smooth darshan experience, explore nearby temples, and return to Tirupati on the same day with ease.",
      "With transparent pricing, reliable service, and attention to comfort, the Tirumala to Tirupati One Day Package offers a memorable and stress-free pilgrimage. Whether for a personal vow, special pooja, or family spiritual trip, this Tirumala to Tirupati One Day Package guarantees a peaceful and divine journey. Book your Tirumala to Tirupati One Day Package today for a hassle-free and spiritually enriching experience."
    ]
  }
};

// This is a Server Component, so it can directly fetch data
export default async function TirupatiPackageDetailPage({ params }) {
  const { slug } = await params;

  let packageData = null;
  let error = null;
  let otherPackages = [];

  try {
    // 1. Always fetch from Firestore first
    const docRef = doc(db, "tirupati-package", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const rawData = docSnap.data();
      console.log("Firestore Backend Data for", slug, ":", rawData);
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

      // 2. Check if we should override with local images for specific packages
      const localPackageSlugs = [
        "chennai-tirupati-one-day-tour-package",
        "tirupati-two-days-package-from-chennai",
        "chennai-tirupati-car-rental-package",
        "srivani-vip-break-darshan",
        "vellore-tirupati-one-day-tour-package",
        "vellore-to-tirupati",
        "bangalore-tirupati-darshan-tour-package",
        "kanchipuram-tirupati-one-day-tour-package",
        "kanchipuram-tirupati-two-days-tour-package",
        "tirumala-tirupati-darshan-one-day-package"
      ];

      if (localPackageSlugs.includes(slug)) {
        try {
          const jsonData = await import(`@/public/data/${slug}.json`);
          const localData = jsonData.default || jsonData;

          // Merge top-level image arrays
          if (localData.maleDressCodeImages) packageData.maleDressCodeImages = localData.maleDressCodeImages;
          if (localData.femaleDressCodeImages) packageData.femaleDressCodeImages = localData.femaleDressCodeImages;
          if (localData.images) packageData.images = localData.images;

          // Merge carPrices images based on carName or id
          if (localData.carPrices && packageData.carPrices) {
            packageData.carPrices = packageData.carPrices.map(car => {
              const localCar = localData.carPrices.find(lc => lc.id === car.id || lc.carName === car.carName);
              return localCar ? { ...car, imageUrl: localCar.imageUrl } : car;
            });
          }

          // Merge sections images based on id
          if (localData.sections && packageData.sections) {
            packageData.sections = packageData.sections.map(section => {
              const localSection = localData.sections.find(ls => ls.id === section.id);
              return localSection ? { ...section, imageUrl: localSection.imageUrl } : section;
            });
          }

          // Merge sightseeingPlaces images based on id
          if (localData.sightseeingPlaces && packageData.sightseeingPlaces) {
            packageData.sightseeingPlaces = packageData.sightseeingPlaces.map(place => {
              const localPlace = localData.sightseeingPlaces.find(lp => lp.id === place.id);
              return localPlace ? { ...place, imageUrl: localPlace.imageUrl } : place;
            });
          }

          console.log("Merged Firestore data with local images for:", slug);
          if (slug === "tirupati-two-days-package-from-chennai") {
            console.log("FINAL Backend Response for Two-Day Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "chennai-tirupati-car-rental-package") {
            console.log("FINAL Backend Response for Car Rental Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "srivani-vip-break-darshan") {
            console.log("FINAL Backend Response for VIP Darshan Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "vellore-tirupati-one-day-tour-package") {
            console.log("FINAL Backend Response for Vellore Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "vellore-to-tirupati") {
            console.log("FINAL Backend Response for Vellore Two-Day Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "bangalore-tirupati-darshan-tour-package") {
            console.log("FINAL Backend Response for Bangalore Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "kanchipuram-tirupati-one-day-tour-package") {
            console.log("FINAL Backend Response for Kanchipuram Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "kanchipuram-tirupati-two-days-tour-package") {
            console.log("FINAL Backend Response for Kanchipuram Two-Day Package:", JSON.stringify(packageData, null, 2));
          }
          if (slug === "tirumala-tirupati-darshan-one-day-package") {
            console.log("FINAL Backend Response for Tirumala Package:", JSON.stringify(packageData, null, 2));
          }
        } catch (jsonError) {
          console.error("Failed to load local JSON for merge:", jsonError);
        }
      }
    } else {
      error = "Package not found.";
    }

    if (packageData) {
      // Fetch other packages (excluding the current one)
      const q = query(
        collection(db, "tirupati-package"),
        where("url", "!=", slug)
      );
      const querySnapshot = await getDocs(q);
      otherPackages = querySnapshot.docs.map((doc) => {
        const rawData = doc.data();
        return {
          id: doc.id,
          ...rawData,
          createdAt: rawData.createdAt
            ? rawData.createdAt.toDate().toISOString()
            : null,
          updatedAt: rawData.updatedAt
            ? rawData.updatedAt.toDate().toISOString()
            : null,
        };
      });

      // 3. Check for image overrides for "Other Packages You Might Like"
      try {
        const fs = require('fs');
        const path = require('path');
        const dataDir = path.join(process.cwd(), 'public', 'data');
        const sharedOverridePath = path.join(dataDir, 'other-packages-overrides.json');

        let sharedOverrides = [];
        if (fs.existsSync(sharedOverridePath)) {
          sharedOverrides = JSON.parse(fs.readFileSync(sharedOverridePath, 'utf8'));
        }

        let overrideCount = 0;
        const updatedOtherPackages = [];

        for (const pkg of otherPackages) {
          let mergedPkg = { ...pkg };
          let foundOverride = false;

          // Priority 1: Individual local JSON for the package (e.g. public/data/slug.json)
          const normalizedPkgId = (mergedPkg.id || "").toLowerCase().replace(/[ –—,]+/g, '-').replace(/-+/g, '-').trim('-');
          const localJsonPath = path.join(dataDir, `${normalizedPkgId}.json`);
          if (fs.existsSync(localJsonPath)) {
            try {
              const localData = JSON.parse(fs.readFileSync(localJsonPath, 'utf8'));
              if (localData.images && localData.images[0]) {
                const imgPath = localData.images[0].toLowerCase().replace(/[ –—,]+/g, '-').replace(/-+/g, '-').trim('-');
                mergedPkg.images = [imgPath, ...(mergedPkg.images?.slice(1) || [])];
                foundOverride = true;
              }
            } catch (e) {
              console.warn(`Failed to parse local JSON for ${mergedPkg.id}:`, e.message);
            }
          }

          // Priority 2: Shared overrides file
          if (!foundOverride && sharedOverrides && Array.isArray(sharedOverrides)) {
            const sharedOverride = sharedOverrides.find((o) => o.id === pkg.id);
            if (sharedOverride) {
              const overrideImage = sharedOverride.imageUrl || (sharedOverride.sightseeingPlaces?.[0]?.imageUrl);
              if (overrideImage) {
                const imgPath = overrideImage.toLowerCase().replace(/[ –—,]+/g, '-').replace(/-+/g, '-').trim('-');
                mergedPkg.images = [imgPath, ...(mergedPkg.images?.slice(1) || [])];
                foundOverride = true;
              }
            }
          }

          if (foundOverride) overrideCount++;
          updatedOtherPackages.push(mergedPkg);
        }

        otherPackages = updatedOtherPackages;
        console.log(`Other Packages Overrides: Successfully applied ${overrideCount} overrides.`);
      } catch (err) {
        console.error("Critical error in Other Packages override logic:", err);
      }

      if (otherPackages.length > 0) {
        console.log("--- Other Packages You Might Like: Final Image Selection ---");
        otherPackages.forEach(pkg => {
          console.log(`Package: ${pkg.id} | Final Image: ${pkg.images?.[0] || 'default'}`);
        });
        console.log("----------------------------------------------------------");
      }

      console.log(`Other Packages for ${slug}:`, JSON.stringify(otherPackages, null, 2));
    }
  } catch (err) {
    console.error("Error fetching package or other packages:", err);
    error = "Failed to load package details. Please try again later.";
  }


  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
        <p className="text-lg text-gray-700">Loading package details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <Header />
      <div className="pt-16 md:pt-20 lg:pt-24">

        <main>
          <TirupatiPackageHero packageData={packageData || {}} />

          <div className="container mx-auto px-4 py-6">

            {/* Hardcoded SEO Content for Specific Package */}
            {SEO_CONTENT_MAP[slug] && (
              <section className="mb-12 p-4 sm:p-6 md:p-8 bg-blue-50 rounded-2xl border border-blue-100 shadow-sm transition-all hover:shadow-md">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center lg:text-left">
                  {SEO_CONTENT_MAP[slug].title}
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-base sm:text-lg prose max-w-none">
                  {SEO_CONTENT_MAP[slug].content.map((para, i) => (
                    <p key={i} dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </div>
              </section>
            )}

            {/* Booking Form and Why Choose Us Section - Always 75/25 Layout */}
            <section id="booking" className="mb-10">
              <div className="px-2">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                  {/* Left Side - Booking Form (75%) */}
                  <div className="w-full lg:w-3/4 order-1 lg:order-1 border border-gray-200 rounded-lg shadow-lg p-6 bg-white">
                    <BookingForm />
                  </div>

                  {/* Right Side - Why Choose Us (25%) */}
                  <div className="w-full lg:w-1/4 order-2 lg:order-2">
                    <div className="flex flex-col items-center lg:items-start w-full h-full">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-6 text-center lg:text-left">
                        Why Choose Us
                      </h2>
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                  {packageData.sectionTitles?.overview || "Overview"}
                </h2>
                <div
                  className="prose max-w-none text-gray-700 mx-auto mb-6"
                  dangerouslySetInnerHTML={{ __html: packageData.content || "" }}
                />
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Call to Book Now
                </Button>
              </section>
            )}

            {packageData.carPrices && packageData.carPrices.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
                  {packageData.sectionTitles?.carPrices ||
                    "Package Price Details"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {packageData.carPrices.map((car) => (
                    <div
                      key={car.id}
                      className="bg-white rounded-xl shadow-md overflow-hidden border"
                    >
                      {/* Car Image */}
                      <div className="w-full h-40 sm:h-48 relative">
                        <Image
                          src={
                            car.imageUrl ||
                            car.image ||
                            "/placeholder.svg?height=200&width=300&query=Car for " +
                            car.carName
                          }
                          alt={car.carName}
                          fill
                          priority
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                      {/* Car Name */}
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                          {car.carName}
                        </h3>
                        {/* Price Table */}
                        <div className="border border-gray-200 rounded overflow-hidden">
                          {car.prices.map((price, priceIndex) => (
                            <div
                              key={price.value}
                              className={`grid grid-cols-2 py-3 px-4 border-b border-gray-200 last:border-0 ${priceIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                                }`}
                            >
                              <div className="font-medium text-gray-800">
                                {price.label}
                              </div>
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
                                <p className="font-semibold text-gray-700">
                                  Includes:
                                </p>
                                <div
                                  className="text-sm text-gray-600 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{
                                    __html: car.includes || "",
                                  }}
                                />
                              </div>
                            )}
                            {car.excludes && (
                              <div>
                                <h4 className="font-semibold text-gray-700">
                                  Excludes:
                                </h4>
                                <div
                                  className="text-sm text-gray-600 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{
                                    __html: car.excludes || "",
                                  }}
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

            {packageData.packagesAndCars &&
              packageData.packagesAndCars.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
                    {packageData.sectionTitles?.packagesAndCars ||
                      "Packages & Cars"}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packageData.packagesAndCars.map((packageItem) => (
                      <div
                        key={packageItem.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col"
                      >
                        {/* Package Name Header */}
                        <div className="bg-blue-600 text-white text-center py-4 px-6">
                          <h3 className="text-xl font-bold">
                            {packageItem.packageName}
                          </h3>
                        </div>

                        {/* Cars Table-like Structure */}
                        {packageItem.cars && packageItem.cars.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-700">
                              <thead className="bg-gray-100 text-gray-900">
                                <tr>
                                  <th className="px-4 py-2 font-semibold">
                                    Car Name
                                  </th>
                                  <th className="px-4 py-2 font-semibold text-center">
                                    Seat
                                  </th>
                                  <th className="px-4 py-2 font-semibold text-center">
                                    Price
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {packageItem.cars.map((car) => (
                                  <tr key={car.id}>
                                    <td className="px-4 py-2">{car.carName}</td>
                                    <td className="px-4 py-2 text-center">
                                      {car.seatCapacity}
                                    </td>
                                    <td className="px-4 py-2 text-center text-blue-600 font-bold">
                                      ₹ {car.price ?? "N/A"}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="p-4 text-center text-gray-500">
                            No cars available
                          </p>
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
            {(packageData.packages ||
              packageData.cars ||
              packageData.additionalPackages ||
              packageData.carTypes) && (
                <section className="mb-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                    {packageData.sectionTitles?.packagesAndCars ||
                      "Available Packages & Cars"}
                  </h2>

                  {/* Display Packages if available */}
                  {packageData.packages && packageData.packages.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Package Options
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packageData.packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="bg-white rounded-lg shadow-md p-6 border"
                          >
                            <h4 className="text-xl font-semibold text-gray-800 mb-2">
                              {pkg.name || pkg.title}
                            </h4>
                            {pkg.description && (
                              <p className="text-gray-600 mb-3">
                                {pkg.description}
                              </p>
                            )}
                            {pkg.price && (
                              <p className="text-lg font-bold text-blue-600 mb-2">
                                ₹ {pkg.price.toLocaleString()}
                              </p>
                            )}
                            {pkg.duration && (
                              <p className="text-sm text-gray-500">
                                Duration: {pkg.duration}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Cars if available */}
                  {packageData.cars && packageData.cars.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                        Available Cars
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {packageData.cars.map((car) => (
                          <div
                            key={car.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden border"
                          >
                            {(car.imageUrl || car.image) && (
                              <div className="w-full h-40 sm:h-48 relative">
                                <Image
                                  priority
                                  src={
                                    car.image ||
                                    car.imageUrl ||
                                    "/placeholder.svg?height=200&width=300&query=Car"
                                  }
                                  alt={car.name || "Car"}
                                  fill
                                  className="object-cover rounded-t-lg"
                                />
                              </div>
                            )}
                            <div className="p-4">
                              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                                {car.name || car.type}
                              </h4>
                              {car.description && (
                                <p className="text-gray-600 mb-3 text-sm">
                                  {car.description}
                                </p>
                              )}
                              {car.capacity && (
                                <p className="text-sm text-gray-500 mb-1">
                                  Capacity: {car.capacity} persons
                                </p>
                              )}
                              {car.price && (
                                <p className="text-lg font-bold text-blue-600">
                                  ₹ {car.price.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Display Additional Packages if available */}
                  {packageData.additionalPackages &&
                    packageData.additionalPackages.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                          Additional Packages
                        </h3>
                        <div className="space-y-4">
                          {packageData.additionalPackages.map((pkg) => (
                            <div
                              key={pkg.id}
                              className="bg-gray-50 rounded-lg p-6 border"
                            >
                              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                                {pkg.name || pkg.title}
                              </h4>
                              {pkg.description && (
                                <div
                                  className="text-gray-600 mb-3"
                                  dangerouslySetInnerHTML={{
                                    __html: pkg.description || "",
                                  }}
                                />
                              )}
                              {pkg.features && pkg.features.length > 0 && (
                                <ul className="list-none space-y-1">
                                  {pkg.features.map((feature, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center text-gray-700"
                                    >
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
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                        Car Categories
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {packageData.carTypes.map((carType) => (
                          <div
                            key={carType.id}
                            className="bg-white rounded-lg shadow-md p-6 border"
                          >
                            <h4 className="text-xl font-semibold text-gray-800 mb-3">
                              {carType.name || carType.category}
                            </h4>
                            {carType.description && (
                              <p className="text-gray-600 mb-4">
                                {carType.description}
                              </p>
                            )}
                            {carType.cars && carType.cars.length > 0 && (
                              <div>
                                <p className="font-medium text-gray-700 mb-2">
                                  Available Cars:
                                </p>
                                <ul className="space-y-1">
                                  {carType.cars.map((car, index) => (
                                    <li
                                      key={index}
                                      className="text-gray-600 text-sm"
                                    >
                                      • {car}
                                    </li>
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                  Special Notes To the Pilgrim
                </h2>
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
                        <span className="font-bold text-gray-800 text-base">
                          Children Below 12:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          No darshan ticket needed. Carry valid age-proof.
                        </span>
                      </div>
                    </li>
                    <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <span className="font-bold text-gray-800 text-base">
                          ID Proof:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          Bring the same ID used for booking (Aadhaar/Passport).
                        </span>
                      </div>
                    </li>
                    <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <span className="font-bold text-gray-800 text-base">
                          Dress Code:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          Traditional is mandatory (Men: dhoti/pants with shirt;
                          Women: saree/salwar).
                        </span>
                      </div>
                    </li>
                    <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <span className="font-bold text-gray-800 text-base">
                          Prasadam:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          One laddu is included with the special entry ticket.
                          Extra laddus can be bought at{" "}
                          <span className="font-semibold text-orange-600">
                            ₹50 each
                          </span>
                          .
                        </span>
                      </div>
                    </li>
                    <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <span className="font-bold text-gray-800 text-base">
                          Tickets:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          Book your Chennai to Tirupati Package early as tickets
                          are limited.
                        </span>
                      </div>
                    </li>
                    <li className="group flex items-start p-3 bg-white/60 rounded-lg hover:bg-white/80 transition-all duration-300 hover:shadow-md">
                      <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full mt-1.5 mr-3 flex-shrink-0 shadow-sm"></div>
                      <div>
                        <span className="font-bold text-gray-800 text-base">
                          Dress Code Details:
                        </span>
                        <span className="text-gray-700 ml-2 text-sm">
                          Women must wear Saree, Half Saree, or Chudidar with
                          Dupatta. Men must wear Dhoti with Shirt, or Kurta with
                          Pyjama.
                        </span>
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
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                        What's Included
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
                      {/* Decorative Background */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -translate-y-10 translate-x-10"></div>

                      <div className="relative z-10">
                        <ul className="space-y-4">
                          {packageData.includes.map((item) => (
                            <li
                              key={item.id}
                              className="group flex items-start p-3 bg-green-50/50 rounded-xl hover:bg-green-50 transition-all duration-300"
                            >
                              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full mr-4 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                <Check className="h-5 w-5 text-white" />
                              </div>
                              <div
                                className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{
                                  __html: item.text || "",
                                }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Right Side - Passenger Notes */}
                {packageData.passengerNotes &&
                  packageData.passengerNotes.length > 0 && (
                    <div>
                      <div className="text-center mb-6">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                          Important Passenger Notes
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
                      </div>
                      <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -translate-y-10 translate-x-10"></div>

                        <div className="relative z-10">
                          <ul className="space-y-4">
                            {packageData.passengerNotes.map((item) => (
                              <li
                                key={item.id}
                                className="group flex items-start p-3 bg-blue-50/50 rounded-xl hover:bg-blue-50 transition-all duration-300"
                              >
                                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <div
                                  className="text-gray-700 font-medium leading-relaxed prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{
                                    __html: item.text || "",
                                  }}
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
            {/* {packageData.sightseeingPlaces && packageData.sightseeingPlaces.length > 0 && (
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
        )} */}

            <PlacesCoverage />
            {/* Dress Code Section */}
            {(packageData.maleDressCodeImages?.length > 0 ||
              packageData.femaleDressCodeImages?.length > 0) && (
                <section className="mb-12">
                  <div className="p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                      {packageData.sectionTitles?.dressCode || "Dress Code"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {packageData.femaleDressCodeImages?.[0] && (
                        <Card className="overflow-hidden">
                          <CardHeader className="p-4 text-center">
                            <CardTitle className="text-xl font-semibold text-gray-800">
                              Female
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-white">
                              <Image
                                priority
                                src={
                                  packageData.femaleDressCodeImages[0] ||
                                  "/placeholder.svg?height=300&width=200&query=female traditional dress" ||
                                  "/placeholder.svg"
                                }
                                alt="Female dress code example"
                                fill
                                style={{ objectFit: "contain" }}
                                className="transition-transform duration-300 hover:scale-105"
                              />
                            </div>
                          </CardContent>
                        </Card>
                      )}
                      {packageData.maleDressCodeImages?.[0] && (
                        <Card className="overflow-hidden">
                          <CardHeader className="p-4 text-center">
                            <CardTitle className="text-xl font-semibold text-gray-800">
                              Male
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0">
                            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] bg-white">
                              <Image
                                priority
                                src={
                                  packageData.maleDressCodeImages[0] ||
                                  "/placeholder.svg?height=300&width=200&query=male traditional dress" ||
                                  "/placeholder.svg"
                                }
                                alt="Male dress code example"
                                fill
                                style={{ objectFit: "contain" }}
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
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
                  {packageData.sectionTitles?.tables || "Schedule Tables"}
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {packageData.tables.map((table) => (
                    <div
                      key={table.id}
                      className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-96"
                    >
                      {table.title && (
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex-shrink-0">
                          <h3 className="text-xl font-bold text-center">
                            {table.title}
                          </h3>
                        </div>
                      )}
                      <div className="overflow-x-auto p-0 m-0 flex-1 flex flex-col">
                        <table className="w-full border-collapse border border-gray-300 m-0 p-0 flex-1">
                          <thead className="bg-blue-50 m-0 p-0">
                            <tr className="m-0 p-0">
                              {table.headers.map((header, index) => (
                                <th
                                  key={index}
                                  className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border border-gray-300 bg-blue-100 m-0 p-0"
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="m-0 p-0">
                            {table.rows.map((row, rowIndex) => (
                              <tr
                                key={row.id}
                                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                                  } hover:bg-blue-50 transition-colors m-0 p-0`}
                              >
                                {row.cells.map((cell, cellIndex) => (
                                  <td
                                    key={cellIndex}
                                    className="px-4 py-2 text-sm text-gray-700 border border-gray-300 m-0 p-0"
                                  >
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
            {console.log("Rendering Food Packages section for:", slug, "Days:", packageData)}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Food Packages
            </h2>

            {packageData.days == 1 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 px-4">
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/images/food/delcious-food.webp"
                      alt="Breakfast"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Delicious Breakfast
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/images/food/delcious-lunch.png"
                      alt="Lunch"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Delicious Lunch
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/images/food/dharsan-ticket.webp"
                      alt="Darshan Ticket"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Darshan Ticket
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/images/food/driver-and-guide.webp"
                      alt="Driver & Guide"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Driver & Guide
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 px-4">
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/fuel.png"
                      alt="Fuel Expenses"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Fuel Expenses
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/toll.png"
                      alt="Toll & Permit"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Toll & Permit
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/images/food/driver-and-guide.webp"
                      alt="Driver & Guide"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Driver & Guide
                  </p>
                </div>
                <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 w-full relative bg-gray-100">
                    <Image
                      src="/satinse.png"
                      alt="Sanitised Cab"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority
                      quality={75}
                    />
                  </div>
                  <p className="p-3 text-center text-lg font-semibold text-gray-800 bg-white">
                    Sanitised Cab
                  </p>
                </div>
              </div>
            )}

            {/* Dynamic Sections */}
            {packageData.sections && packageData.sections.length > 0 && (
              <section className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    {packageData.sectionTitles?.sections || "More Details"}
                  </h2>
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

                      {/* Enhanced Section Container with Premium Styling */}
                      <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden rounded-3xl">
                        {/* Background Elements */}
                        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-green-200/30 to-emerald-200/30 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-56 md:w-80 h-56 md:h-80 bg-gradient-to-l from-teal-200/30 to-green-200/30 rounded-full blur-3xl"></div>

                        <div className="container mx-auto relative z-10 p-2 sm:p-4">
                          <div
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                              }`}
                          >
                            {/* Content Section */}
                            <div
                              className={`space-y-8 ${index % 2 === 1
                                ? "lg:order-2"
                                : "order-2 lg:order-1"
                                }`}
                            >
                              <div className="space-y-4">
                                <div className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold">
                                  {section.badge || "Premium Experience"}
                                </div>
                                {section.contentTitle && (
                                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
                                    {section.contentTitle.replace(
                                      /(.+)(\s\w+)$/,
                                      "$1 $2"
                                    )}
                                  </h2>
                                )}
                                <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                              </div>

                              {section.contentDescription && (
                                <div className="space-y-6">
                                  <div
                                    className="text-base sm:text-lg text-gray-700 leading-relaxed prose prose-base sm:prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{
                                      __html: section.contentDescription,
                                    }}
                                  />
                                </div>
                              )}

                              {section.listInfo &&
                                section.listInfo.length > 0 && (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                                    {section.listInfo.map((item, itemIndex) => (
                                      <div
                                        key={item.id}
                                        className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border border-green-200 group hover:shadow-xl transition-all duration-300"
                                      >
                                        <div className="flex items-start gap-3">
                                          <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                                          <div
                                            className="text-gray-800 font-medium prose prose-sm max-w-none leading-relaxed"
                                            dangerouslySetInnerHTML={{
                                              __html: item.text || "",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}

                              {/* Enhanced CTA Button */}
                              <a href="#booking" className="inline-block">
                                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                  <span>Learn More</span>
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                  </svg>
                                </button>
                              </a>
                            </div>

                            {/* Enhanced Image Section */}
                            {section.imageUrl && (
                              <div
                                className={`w-full ${index % 2 === 1
                                  ? "lg:order-1"
                                  : "order-1 lg:order-2"
                                  }`}
                              >
                                <div className="relative group">
                                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl transform md:-rotate-6 group-hover:md:-rotate-12 transition-transform duration-500"></div>
                                  <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-6 transform md:rotate-2 group-hover:md:rotate-0 transition-transform duration-500">
                                    <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
                                      <Image
                                        src={
                                          section.imageUrl ||
                                          "/placeholder.svg?height=300&width=500&query=section image"
                                        }
                                        alt={
                                          section.contentTitle || "Section image"
                                        }
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="transition-transform duration-500 group-hover:scale-110"
                                        priority
                                      />
                                      {/* Image Overlay */}
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Floating Badge */}
                                    <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
                                      <span className="font-bold text-sm">
                                        {section.badge || "Premium"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </section>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Packages Section */}
            {otherPackages.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
                  Other Packages You Might Like
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPackages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="overflow-hidden flex flex-col h-full group hover:shadow-xl transition-all duration-300 border border-gray-200"
                    >
                      <CardHeader className="p-0 flex-shrink-0">
                        <div className="relative w-full h-48 sm:h-64 overflow-hidden">
                          <Image
                            src={
                              (pkg.images?.[0] || "/images/city/free.webp").toLowerCase().replace(/[ –—,]+/g, '-').replace(/-+/g, '-').trim('-')
                            }
                            alt={pkg.title}
                            fill
                            style={{ objectFit: "cover" }}
                            className="transition-transform duration-500 group-hover:scale-110 rounded-t-lg"
                            priority
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-5 flex flex-col flex-1">
                        <div className="flex-1">
                          <CardTitle className="text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {pkg.title}
                          </CardTitle>
                        </div>
                        <div className="mt-4">
                          <Button
                            asChild
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 sm:py-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                          >
                            <Link href={`/tirupati-package/${pkg.url}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
            <PassengerNoteBox />
            {/* FAQs Section */}
            {packageData.faqs && packageData.faqs.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                  {packageData.sectionTitles?.faq || "Frequently Asked Questions"}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {packageData.faqs.map((faq) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-base sm:text-lg font-semibold text-gray-800 hover:no-underline">
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
      </div>

      <Footer />
    </div>
  );
}
