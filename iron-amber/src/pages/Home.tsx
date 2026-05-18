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

// Local assets (still needed for Hero & Gallery)
import heroImg from "../assets/hero.jpg";
import galleryImg from "../assets/gallery.jpg";

export default function Home() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-obsidian">
      <Navbar onBookClick={() => setBookingOpen(true)} />
      <HeroSection
        heroImage={heroImg}
        onBookClick={() => setBookingOpen(true)}
      />
      <ServicesSection />
      <GallerySection galleryImage={galleryImg} />
      <ProcessSection />
      <PostalCodeChecker />
      <GuaranteeBadge />
      <FooterSection onBookClick={() => setBookingOpen(true)} />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
      <TextToBookFAB />
    </div>
  );
}
