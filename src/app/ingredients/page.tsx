import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function IngredientsPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading text-primary-brown mb-6">Our Ingredients</h1>
          <p className="text-lg text-dark-brown font-light max-w-2xl mx-auto">
            We believe in transparency. Our formulations combine the best of nature and science to deliver visible results without compromising your skin's barrier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-heading text-primary-brown mb-4">PDRN (Polydeoxyribonucleotide)</h2>
            <p className="text-dark-brown font-light mb-4">
              Extracted from salmon DNA, PDRN is a powerful regenerative ingredient that accelerates skin healing, boosts collagen production, and improves overall skin elasticity.
            </p>
            <span className="text-xs uppercase tracking-widest text-accent-brown font-medium">Key Benefit: Cellular Repair</span>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-heading text-primary-brown mb-4">CICA (Centella Asiatica)</h2>
            <p className="text-dark-brown font-light mb-4">
              A staple in K-beauty, Cica is known for its incredible soothing properties. It reduces inflammation, redness, and strengthens the skin barrier.
            </p>
            <span className="text-xs uppercase tracking-widest text-accent-brown font-medium">Key Benefit: Soothing & Calming</span>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-heading text-primary-brown mb-4">Niacinamide (Vitamin B3)</h2>
            <p className="text-dark-brown font-light mb-4">
              A versatile antioxidant that visibly minimizes enlarged pores, tightens lax pores, improves uneven skin tone, and softens fine lines and wrinkles.
            </p>
            <span className="text-xs uppercase tracking-widest text-accent-brown font-medium">Key Benefit: Brightening & Refining</span>
          </div>
          
          <div className="bg-white p-8 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-heading text-primary-brown mb-4">Hyaluronic Acid Complex</h2>
            <p className="text-dark-brown font-light mb-4">
              Our multi-molecular weight complex penetrates different layers of the skin for deep, long-lasting hydration, plumping the skin from within.
            </p>
            <span className="text-xs uppercase tracking-widest text-accent-brown font-medium">Key Benefit: Deep Hydration</span>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-heading text-primary-brown mb-6">Experience the Difference</h3>
          <Button href="/shop" size="lg" className="bg-dark-brown-red text-white hover:bg-primary-brown px-12 h-14">
            Shop Products
          </Button>
        </div>
      </div>
    </div>
  );
}
