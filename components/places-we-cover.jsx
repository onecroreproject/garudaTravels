// components/PlacesCoverage.jsx
import Image from "next/image";

const places = [



  { name: "Padmavati Temple", image: "/places/Padmavathii.webp" },
  { name: "Sri Varaha Swamy Temple", image: "/places/varaha_temple.webp" },
  { name: "Sri Varasidhi Vinayaka Swamy Temple", image: "/places/Sri_Varasidhi_Vinayaka_Swamy_Temple.webp" },
  { name: "Sri Bedi Anjaneya Swamy Temple", image: "/places/sri_beda_temple.avif" },
  { name: "Balaji face rock", image: "/places/Balaji_face_rock.webp" },
];

const additionalCoverages = [
  { name: "Silathoranam, Tirumala Hills", image: "/places/thirumala.webp" },
  { name: "Rock Garden", image: "/places/rock_hgarden.jfif" },
  { name: "Japali Teertham", image: "/places/Jabila_Theertham.webp" },
  { name: "Akasa Ganga", image: "/places/akasa_ganga.webp" },
  { name: "Sri Venkateshwara Museum", image: "/places/sri_venkateshvara_museum.webp" },
  { name: "Papavinasanam Theertham", image: "/places/papavinsanam-theertham.webp" },
  { name: "Geetopadesam Park", image: "/places/geetopadesam-park.webp" },
  { name: "Lord Balaji Foot Prints", image: "/places/lord-baalaji-foot-prints.webp" },
  { name: "Papa Vinasanam Dam", image: "/places/papavinsanam-dam.webp" },
  { name: "Sri Varahaswami Temple", image: "/places/sri-varahaswami-temple.webp" },
  { name: "Jabila Theertham", image: "/places/Jabila_Theertham.avif" },
  { name: "Sri Bedi Anjaneya Swamy Temple", image: "/places/sri_bedi_anjaneya.webp" },

];

function Card({ name, image, extra }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
      <Image
        src={image}
        alt={name}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
        priority
      />
      {extra && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
          Additional Charges
        </span>
      )}
      <div className="p-3 text-center">
        <h3 className="text-sm font-medium text-gray-800">{name}</h3>
      </div>
    </div>
  );
}

export default function PlacesCoverage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Places Covered */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Places We Cover in Our Packages
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places.map((p, i) => (
          <Card key={i} {...p} />
        ))}
      </div>

      {/* Additional Coverages */}
      <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 text-center">
        Additional Coverages
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {additionalCoverages.map((p, i) => (
          <Card key={i} {...p} extra />
        ))}
      </div>
    </section>
  );
}
