interface Tier {
  name: string;
  subtitle: string;
  sedan: number;
  midSuv: number;
  largeSuv: number;
}

const tiers: Tier[] = [
  {
    name: "Amber Express",
    subtitle: "Maintenance Wash & Vac",
    sedan: 69,
    midSuv: 79,
    largeSuv: 89,
  },
  {
    name: "Iron Core",
    subtitle: "Deep Interior OR Deep Exterior",
    sedan: 139,
    midSuv: 159,
    largeSuv: 179,
  },
  {
    name: "The Iron & Amber Reset",
    subtitle: "The Ultimate Full Detail",
    sedan: 219,
    midSuv: 249,
    largeSuv: 279,
  },
];

const vehicleColumns = [
  { key: "sedan", label: "Sedan / Coupe" },
  { key: "midSuv", label: "Mid-Size SUV / Crossover" },
  { key: "largeSuv", label: "Large SUV / Minivan / Truck" },
] as const;

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-amber-400 uppercase tracking-widest text-sm font-medium mb-2">
          Transparent Pricing
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Our <span className="text-amber-400">Services</span>
        </h2>
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm">
        <table className="w-full text-left text-sm md:text-base">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider text-xs md:text-sm">
              <th className="py-4 px-4 md:px-6">Service Tier</th>
              {vehicleColumns.map((col) => (
                <th key={col.key} className="py-4 px-4 md:px-6 text-center">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr
                key={tier.name}
                className="border-b border-white/5 last:border-none hover:bg-white/5 transition-colors"
              >
                <td className="py-5 px-4 md:px-6">
                  <div className="font-semibold text-white text-lg md:text-xl">
                    {tier.name}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm mt-1">
                    {tier.subtitle}
                  </div>
                </td>
                {vehicleColumns.map((col) => (
                  <td
                    key={col.key}
                    className="py-5 px-4 md:px-6 text-center font-bold text-amber-400 text-lg"
                  >
                    ${tier[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add‑ons */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            GTA Winter Salt Extraction
          </h3>
          <p className="text-gray-400 text-sm mb-1">
            Protects your undercarriage and paint from corrosive road salt.
          </p>
          <p className="text-amber-400 font-semibold">+$30 to $50</p>
          <p className="text-xs text-gray-500">Depending on severity</p>
        </div>
        <div className="bg-gray-900 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-2">
            Pet Hair Removal
          </h3>
          <p className="text-gray-400 text-sm mb-1">
            Specialised tools to lift stubborn pet hair from carpets and seats.
          </p>
          <p className="text-amber-400 font-semibold">+$35</p>
        </div>
      </div>
      <p className="text-center text-gray-500 text-xs mt-8">
        Essential "GTA Proof" Add‑ons — keep your vehicle showroom‑ready, no
        matter the season.
      </p>
    </section>
  );
}
