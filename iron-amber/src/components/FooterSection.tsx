interface FooterProps {
  onBookClick: () => void;
}

export default function FooterSection({ onBookClick }: FooterProps) {
  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-black/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto py-12 px-6 grid md:grid-cols-3 gap-8 items-center">
        <div>
          <div className="text-2xl font-extrabold text-amber-400 mb-2">
            IRON<span className="text-white">&</span>AMBER
          </div>
          <p className="text-gray-400 text-sm">
            Toronto’s mobile detailing studio
          </p>
        </div>
        <div className="text-center">
          <button
            onClick={onBookClick}
            className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-lg transition-colors shadow-lg shadow-amber-500/20"
          >
            Book Your Detail
          </button>
        </div>
        <div className="text-right text-gray-400 text-sm space-y-1">
          <p>hello@ironandamber.com</p>
          <p>(416) 555-0168</p>
          <p>© {new Date().getFullYear()} Iron & Amber</p>
          <a
            href="/terms"
            className="text-amber-400 hover:text-amber-300 underline transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
}
