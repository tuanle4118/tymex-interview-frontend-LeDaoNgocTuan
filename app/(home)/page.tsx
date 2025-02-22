import Image from "next/image";
import CharacterList from "@/app/ui/character-list";
import FilterPanel from "@/app/ui/filter-panel";
import HeroSection from "@/app/ui/hero-section";
import BottomImg from "@/public/bottom-image.svg";
import Footer from "@/app/ui/footer";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <main className="relative">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <div className="flex flex-col gap-10 px-10 py-20 xl:flex-row xl:gap-5 2xl:px-20">
            <section className="w-full xl:w-1/4">
              <FilterPanel />
            </section>
            <section className="w-full xl:w-3/4">
              <CharacterList />
            </section>
          </div>
          <Image src={BottomImg} alt="bottom-img" />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
