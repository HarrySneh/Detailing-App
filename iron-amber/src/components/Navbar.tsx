interface NavbarProps {
  onBookClick: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-extrabold tracking-tight text-amber-400">
          IRON<span className="text-white">&</span>AMBER
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-gray-300">
          <a
            href="#services"
            className="hover:text-amber-400 transition-colors"
          >
            Services
          </a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors">
            Gallery
          </a>
          <a href="#process" className="hover:text-amber-400 transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            Contact
          </a>
        </div>
        <button
          onClick={onBookClick}
          className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-6 py-2 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}
