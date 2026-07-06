import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AboutSection } from '@/components/sections/AboutSection';
import { IngredientsSection } from '@/components/sections/IngredientsSection';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-cream selection:bg-accent-brown/30 flex flex-col">
      <Navbar />
      
      <div className="pt-40 pb-24 bg-[#522929] text-white text-center">
        <h1 className="text-5xl md:text-7xl font-heading mb-6 tracking-wide text-white">Our Story</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-light text-white/80 px-6">
          Discover the science, passion, and philosophy behind SEEERA Skincare.
        </p>
      </div>

      <AboutSection />
      
      <div className="py-20 bg-white">
        <IngredientsSection />
      </div>
      
      <Footer />
    </main>
  );
}
