interface Service {
  title: string;
  description: string;
  imageKey: "ceramic" | "correction" | "interior";
}

const services: Service[] = [
  {
    title: "Ceramic Coating",
    description:
      "Advanced ceramic protection that bonds with your paint for years of hydrophobic gloss and UV resistance.",
    imageKey: "ceramic",
  },
  {
    title: "Paint Correction",
    description:
      "Multi‑stage machine polishing to remove swirl marks, scratches, and oxidation — restoring a flawless, mirror‑like finish.",
    imageKey: "correction",
  },
  {
    title: "Interior Detailing",
    description:
      "Complete cabin rejuvenation: steam cleaning, leather conditioning, odour removal, and fabric protection.",
    imageKey: "interior",
  },
];

interface ServicesSectionProps {
  images: Record<string, string>;
  onBookClick: () => void;
}

export default function ServicesSection({
  images,
  onBookClick,
}: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-2">
          What We Offer
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Professional Detailing{" "}
          <span className="text-amber-400">Services</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s) => (
          <div
            key={s.imageKey}
            className="group bg-gray-900 rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 shadow-lg hover:shadow-amber-500/10"
          >
            <div className="overflow-hidden">
              <img
                src={images[s.imageKey]}
                alt={s.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {s.description}
              </p>
              <button
                onClick={onBookClick}
                className="text-amber-400 font-semibold hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                Book This Service
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
