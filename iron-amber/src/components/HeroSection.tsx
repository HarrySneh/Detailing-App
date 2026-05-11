interface HeroSectionProps {
  heroImage: string;
  onBookClick: () => void;
}

export default function HeroSection({
  heroImage,
  onBookClick,
}: HeroSectionProps) {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <img
        src={heroImage}
        alt="Premium mobile detailing"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <p className="text-amber-400 font-semibold uppercase tracking-[.3em] mb-4 text-sm md:text-base">
          Toronto’s Premier Mobile Detailing Studio
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-6">
          The Showroom Finish,
          <br />
          <span className="text-amber-400">Delivered to Your Doorstep</span>
        </h1>
        <p className="text-lg text-gray-300 mb-10 max-w-xl mx-auto">
          Our fully equipped mobile unit comes to your home, office, or anywhere
          your vehicle lives across the Greater Toronto Area.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBookClick}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-10 py-4 rounded-lg transition-all shadow-xl hover:shadow-amber-500/30"
          >
            Secure Your Transformation
          </button>
          <button
            onClick={scrollToServices}
            className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 px-10 py-4 rounded-lg font-semibold transition-all"
          >
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}
