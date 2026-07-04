import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { IngredientsSection } from '@/components/sections/IngredientsSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { CustomerReviews } from '@/components/sections/CustomerReviews';
import { StickyCartBar } from '@/components/ui/StickyCartBar';
import { ClientAddToCartButton } from './ClientAddToCartButton'; // We'll create this to handle state

// This allows Next.js to pre-render the paths at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        {/* Top Fold: Image & Info */}
        <section className="container mx-auto px-6 py-12 md:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
            {/* Image Gallery */}
            <div className="flex-1">
              <div className="aspect-[4/5] bg-white rounded-2xl flex items-center justify-center p-12 sticky top-32 border border-primary-brown/5">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="mb-8">
                <span className="text-sm tracking-[0.2em] text-accent-brown uppercase mb-4 block">{product.category}</span>
                <h1 className="text-4xl md:text-6xl font-heading text-primary-brown mb-4">{product.name}</h1>
                <p className="text-2xl text-dark-brown font-medium">{product.formattedPrice}</p>
              </div>
              
              <div className="prose prose-stone mb-10 text-dark-brown/80 leading-relaxed text-lg">
                <p>{product.description}</p>
              </div>
              
              <div className="space-y-6">
                <ClientAddToCartButton product={product} />
                <p className="text-sm text-center text-accent-brown tracking-wide">Free shipping on orders over ₹2000.</p>
              </div>
              
              <div className="mt-16 pt-8 border-t border-primary-brown/10">
                <h3 className="font-heading text-xl text-primary-brown mb-4">Why you'll love it</h3>
                <ul className="space-y-3 text-dark-brown">
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                    Clinically tested and dermatologist approved
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                    Cruelty-free and vegan formula
                  </li>
                  <li className="flex items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-brown mr-3 shrink-0"></span>
                    Suitable for all skin types, including sensitive skin
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Storytelling Sections */}
        <IngredientsSection />
        <ResultsSection />
        <CustomerReviews />
      </main>

      <Footer />
      <StickyCartBar product={product} />
    </div>
  );
}
