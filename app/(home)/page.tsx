import HeroSection from "../ui/hero-section";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <div className="relative">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
        <div className="relative z-10">CONTENT</div>
      </div>
    </div>
  );
}
