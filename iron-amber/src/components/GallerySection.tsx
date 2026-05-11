interface GallerySectionProps {
  galleryImage: string;
}

export default function GallerySection({ galleryImage }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-20 bg-gray-950 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-amber-400">Work</span>
      </h2>
      <div className="max-w-5xl mx-auto">
        <img
          src={galleryImage}
          alt="Before and after detailing"
          className="rounded-lg shadow-2xl w-full"
        />
        <p className="text-center text-gray-500 mt-4 italic">
          Tap to see more transformations
        </p>
      </div>
    </section>
  );
}
