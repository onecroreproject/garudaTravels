// components/PlacesCoverage.jsx
import Image from "next/image";

const places = [



    { name: "Padmavati Temple", image: "/images/balaji-footprints.jpg" },
  { name: "Sri Varaha Swamy Temple", image: "/images/dam.jpg" },
  { name: "Sri Varasidhi Vinayaka Swamy Temple", image: "/images/varahaswami.jpg" },
  { name: "Sri Bedi Anjaneya Swamy Temple", image: "/images/jabila.jpg" },
  { name: "Balaji face rock", image: "/images/anjaneya.jpg" },
];

const additionalCoverages = [
  { name: "Silathoranam, Tirumala Hills", image: "/images/silathoranam.jpg" },
  { name: "Rock Garden", image: "/images/rock-garden.jpg" },
  { name: "Japali Teertham", image: "/images/japali-teertham.jpg" },
  { name: "Akasa Ganga", image: "/images/akasa-ganga.jpg" },
  { name: "Sri Venkateshwara Museum", image: "/images/museum.jpg" },
  { name: "Papavinasanam Theertham", image: "/images/papavinasanam.jpg" },
    { name: "Geetopadesam Park", image: "/images/geetopadesam.jpg" },
  { name: "Lord Balaji Foot Prints", image: "/images/balaji-footprints.jpg" },
  { name: "Papa Vinasanam Dam", image: "/images/dam.jpg" },
  { name: "Sri Varahaswami Temple", image: "/images/varahaswami.jpg" },
  { name: "Jabila Theertham", image: "/images/jabila.jpg" },
  { name: "Sri Bedi Anjaneya Swamy Temple", image: "/images/anjaneya.jpg" },

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
