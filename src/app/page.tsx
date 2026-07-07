import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ShopByIngredient } from "@/components/sections/ShopByIngredient";
import { AboutSection } from "@/components/sections/AboutSection";
import { IngredientsSection } from "@/components/sections/IngredientsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { BestSellers } from "@/components/sections/BestSellers";

import { ResultsSection } from "@/components/sections/ResultsSection";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { InstagramGallery } from "@/components/sections/InstagramGallery";
import { FAQSection } from "@/components/sections/FAQSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <TrustBar />
      <FeaturedProducts />
      <ShopByIngredient />
      <WhyChooseUs />
      <AboutSection />
      <BlogPreview />
      <ResultsSection />
      <IngredientsSection />
      <BestSellers />

      <CustomerReviews />
      <FAQSection />
      <InstagramGallery />
      <Footer />
    </main>
  );
}
