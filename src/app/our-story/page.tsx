import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function OurStoryPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-12 text-center">Our Story</h1>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 text-dark-brown font-light leading-relaxed mb-24">
          <h2 className="text-3xl font-heading text-primary-brown mb-8">Born from a passion for inclusive beauty.</h2>
          <p className="text-lg">
            SeeEra Skincare was born out of a personal struggle to find high-performance, scientifically-backed skincare that catered to all skin tones and types. We noticed a gap in the market for luxury skincare that prioritized the specific needs of melanin-rich skin without compromising on powerful, clinically proven ingredients.
          </p>
          <p className="text-lg">
            Our journey began with extensive research into restorative ingredients like CICA and PDRN. We wanted to create formulas that didn't just mask issues, but actively repaired the skin barrier and promoted long-term skin health from the inside out.
          </p>
          <p className="text-lg">
            Today, SeeEra represents a new era of skincare—one where luxury, efficacy, and inclusivity go hand in hand. Every product is meticulously crafted to ensure you feel confident, radiant, and empowered in your natural skin.
          </p>
          <div className="pt-10">
            <Link href="/shop">
              <Button className="bg-dark-brown-red text-white uppercase tracking-widest text-xs px-10 py-4 rounded-full hover:bg-[#522929] transition-colors shadow-lg">
                Explore Our Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Inclusive Beauty Full Width Image */}
        <div className="w-full rounded-[20px] overflow-hidden shadow-xl mt-12 bg-white">
          <Image 
            src="/inclusive_beauty_lifestyle.png" 
            alt="SeeEra Celebrates All Shades" 
            width={1200}
            height={800}
            className="w-full h-auto"
            priority
          />
        </div>

      </div>
    </main>
  );
}
