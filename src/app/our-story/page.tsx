import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function OurStoryPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-12 text-center">Our Story</h1>
        
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[20px] overflow-hidden shadow-xl">
              <Image 
                src="/inclusive_beauty_lifestyle.png" 
                alt="SeeEra Inclusive Beauty" 
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 space-y-6 text-dark-brown font-light leading-relaxed">
            <h2 className="text-2xl font-heading text-primary-brown mb-6">Born from a passion for inclusive beauty.</h2>
            <p>
              SeeEra Skincare was born out of a personal struggle to find high-performance, scientifically-backed skincare that catered to all skin tones and types. We noticed a gap in the market for luxury skincare that prioritized the specific needs of melanin-rich skin without compromising on powerful, clinically proven ingredients.
            </p>
            <p>
              Our journey began with extensive research into restorative ingredients like CICA and PDRN. We wanted to create formulas that didn't just mask issues, but actively repaired the skin barrier and promoted long-term skin health from the inside out.
            </p>
            <p>
              Today, SeeEra represents a new era of skincare—one where luxury, efficacy, and inclusivity go hand in hand. Every product is meticulously crafted to ensure you feel confident, radiant, and empowered in your natural skin.
            </p>
            <div className="pt-8">
              <Link href="/shop">
                <Button className="bg-dark-brown-red text-white uppercase tracking-widest text-xs px-8 py-3 rounded-full">
                  Explore Our Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  );
}
