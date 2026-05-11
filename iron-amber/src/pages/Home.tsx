import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import GallerySection from "../components/GallerySection";
import ProcessSection from "../components/ProcessSection";
import PostalCodeChecker from "../components/PostalCodeChecker";
import GuaranteeBadge from "../components/GuaranteeBadge";
import FooterSection from "../components/FooterSection";
import BookingModal from "../components/BookingModal";
import TextToBookFAB from "../components/TextToBookFAB";

// Local asset imports
import heroImg from "../assets/hero.jpg";
import galleryImg from "../assets/gallery.jpg";
import ceramicImg from "../assets/ceramic.jpg";
import correctionImg from "../assets/correction.jpg";
import interiorImg from "../assets/interior.jpg";

const HERO_IMAGE = heroImg;
const GALLERY_IMAGE = galleryImg;
const SERVICE_IMAGES = {
  ceramic: ceramicImg,
  correction: correctionImg,
  interior: interiorImg,
};

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar onBookClick={() => setBookingOpen(true)} />
      <HeroSection
        heroImage={HERO_IMAGE}
        onBookClick={() => setBookingOpen(true)}
      />
      <ServicesSection
        images={SERVICE_IMAGES}
        onBookClick={() => setBookingOpen(true)}
      />
      <GallerySection galleryImage={GALLERY_IMAGE} />
      <ProcessSection />
      <PostalCodeChecker />
      <GuaranteeBadge />
      <FooterSection onBookClick={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <TextToBookFAB />
    </div>
  );
}
