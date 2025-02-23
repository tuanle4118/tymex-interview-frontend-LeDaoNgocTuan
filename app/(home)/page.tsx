import Image from "next/image";
import ProductList from "@/app/ui/product-list";
import ProductFilterPanel from "@/app/ui/product-filter-panel";
import HeroSection from "@/app/ui/hero-section";
import BottomImg from "@/public/bottom-image.svg";
import Footer from "@/app/ui/footer";
import { FilterDataProvider } from "../contexts/FilterProductContext";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <main className="relative">
        <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center"></div>
        <div className="relative z-10">
          <FilterDataProvider>
            <div className="flex flex-col gap-10 px-10 py-20 xl:flex-row xl:gap-5 2xl:px-20">
              <section className="w-full xl:w-1/4">
                <ProductFilterPanel />
              </section>
              <section className="w-full xl:w-3/4">
                <ProductList />
              </section>
            </div>
          </FilterDataProvider>
          <Image src={BottomImg} alt="bottom-img" />
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
