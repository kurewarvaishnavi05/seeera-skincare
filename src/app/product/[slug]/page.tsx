"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, ShieldCheck, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { products as fallbackProducts, getProductBySlug, Product } from '@/lib/products';
import Link from 'next/link';
import { AllProducts } from '@/components/sections/AllProducts';
import { cn } from '@/components/ui/Button';

// Simple Accordion Component for PDP
function ProductAccordion({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary-brown/10 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <h3 className="text-lg font-heading text-primary-brown">{title}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary-brown" /> : <ChevronDown className="w-5 h-5 text-primary-brown" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-dark-brown font-light leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCartStore();
  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const local = getProductBySlug(params.slug);
        if (local) setProduct(local);

        const res = await fetch(`/api/products`);
        const data = await res.json();
        if (data.success && data.data) {
          const dbProduct = data.data.find((p: any) => p.name.toLowerCase().replace(/ /g, '-') === params.slug);
          if (dbProduct) {
            setProduct({
              id: dbProduct._id,
              slug: dbProduct.name.toLowerCase().replace(/ /g, '-'),
              name: dbProduct.name,
              price: dbProduct.price,
              formattedPrice: `₹${dbProduct.price.toFixed(2)}`,
              category: dbProduct.category,
              image: dbProduct.image || 'https://cdn.shopify.com/s/files/1/0935/2131/4156/files/1.png',
              description: dbProduct.description,
              badges: dbProduct.stock < 10 ? ['Low Stock'] : [],
              tags: [dbProduct.category]
            });
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.slug]);

  if (loading && !product) return <div className="pt-32 pb-24 min-h-screen text-center">Loading...</div>;
  if (!product) return <div className="pt-32 pb-24 min-h-screen text-center">Product not found.</div>;

  // Mock gallery images (in a real app, these would come from the product object)
  const galleryImages = [
    product.image,
    product.image, // Placeholder duplicates for gallery
    product.image
  ];

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-dark-brown/70 mb-8 font-light">
          <Link href="/" className="hover:text-primary-brown transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-primary-brown transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary-brown">{product.name}</span>
        </div>

        {/* Product Split Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-32">
          
          {/* Left: Sticky Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="lg:sticky lg:top-32 flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible w-full md:w-24 shrink-0">
                {galleryImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-primary-brown' : 'border-transparent hover:border-primary-brown/30'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              
              {/* Main Image with Zoom */}
              <div className="flex-1 relative aspect-square md:aspect-[4/5] bg-white rounded-[24px] md:rounded-3xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group">
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                    {product.badges.map(badge => (
                      <span key={badge} className="bg-primary-brown text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
                <img 
                  src={galleryImages[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-[0.25,0.46,0.45,0.94] cursor-zoom-in" 
                />
              </div>
            </div>
          </div>

          {/* Right: Product Details & Accordions */}
          <div className="w-full lg:w-1/2 flex flex-col">
            {product.tags && product.tags.length > 0 && (
              <div className="flex gap-2 mb-4">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs text-accent-brown uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-5xl font-heading text-primary-brown mb-4 leading-[1.1]">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-accent-brown">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-dark-brown/70 font-light underline cursor-pointer">128 Reviews</span>
            </div>

            <p className="text-3xl font-medium text-primary-brown mb-8">{product.formattedPrice}</p>
            
            <p className="text-dark-brown font-light leading-relaxed mb-10 text-lg">{product.description}</p>
            
            {/* Quantity and Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 pb-10 border-b border-primary-brown/10">
              <div className="flex items-center border border-primary-brown/20 rounded-full bg-white h-14 w-full sm:w-32 shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex justify-center text-dark-brown hover:text-primary-brown transition-colors">-</button>
                <span className="w-8 text-center text-primary-brown font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex justify-center text-dark-brown hover:text-primary-brown transition-colors">+</button>
              </div>
              
              <Button 
                onClick={() => {
                  for(let i=0; i<quantity; i++) {
                    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
                  }
                }}
                className="w-full sm:flex-1 h-14 bg-dark-brown-red hover:bg-[#522929] text-white tracking-widest uppercase text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                Add to Cart
              </Button>
              
              <button 
                onClick={(e) => { 
                  e.preventDefault(); 
                  const inWishlist = wishlistItems.some(item => item.id === product.id);
                  if (inWishlist) {
                    removeWishlistItem(product.id);
                  } else {
                    addWishlistItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      slug: product.slug
                    });
                  }
                }}
                className={cn(
                  "w-full sm:w-14 h-14 flex items-center justify-center rounded-full border transition-all hover:scale-110 active:scale-95",
                  wishlistItems.some(item => item.id === product.id)
                    ? "bg-dark-brown-red text-white border-dark-brown-red"
                    : "border-primary-brown/20 text-primary-brown bg-white hover:bg-dark-brown-red hover:text-white hover:border-dark-brown-red"
                )}
              >
                <Heart className={cn("w-5 h-5", wishlistItems.some(item => item.id === product.id) && "fill-current")} />
              </button>
            </div>

            {/* Features list */}
            <div className="space-y-4 mb-10">
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <div className="w-8 h-8 rounded-full bg-accent-brown/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-accent-brown" />
                </div>
                <span>Dermatologically tested & approved</span>
              </div>
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <div className="w-8 h-8 rounded-full bg-accent-brown/10 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-accent-brown" />
                </div>
                <span>Free shipping on orders over ₹1000</span>
              </div>
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <div className="w-8 h-8 rounded-full bg-accent-brown/10 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-4 h-4 text-accent-brown" />
                </div>
                <span>30-day money-back guarantee</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col">
              <ProductAccordion title="Key Ingredients">
                <p className="mb-4">Our products are formulated with the highest quality clinical and natural ingredients:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>PDRN:</strong> Salmon-derived DNA that accelerates skin healing and collagen production.</li>
                  <li><strong>CICA (Centella Asiatica):</strong> Soothes inflammation, redness, and repairs the skin barrier.</li>
                  <li><strong>Niacinamide:</strong> Brightens skin tone and minimizes pores.</li>
                </ul>
              </ProductAccordion>
              <ProductAccordion title="How To Use">
                <p>Apply generously and evenly as the last step in your skincare routine, before makeup and 15 minutes before sun exposure. Reapply at least every 2 hours or after 40 minutes of swimming or sweating.</p>
              </ProductAccordion>
              <ProductAccordion title="Benefits">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Deeply hydrates and locks in moisture</li>
                  <li>Repairs damaged skin barrier</li>
                  <li>Protects against environmental stressors</li>
                  <li>Leaves a dewy, glowing finish without white cast</li>
                </ul>
              </ProductAccordion>
            </div>

          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <div className="border-t border-primary-brown/10 pt-20 mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-brown mb-8">Customer Reviews</h2>
          <div className="max-w-xl mx-auto flex flex-col items-center">
            <div className="text-5xl font-heading text-primary-brown mb-4">4.9</div>
            <div className="flex text-accent-brown mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-dark-brown font-light mb-8">Based on 128 verified reviews</p>
            <Button variant="outline" className="px-8 border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-white">Write a Review</Button>
          </div>
        </div>

      </div>
      
      {/* Related Products */}
      <div className="bg-white border-t border-primary-brown/10">
        <div className="container mx-auto px-6 max-w-7xl py-20">
           <h2 className="text-3xl md:text-4xl font-heading text-primary-brown mb-12 text-center">You May Also Like</h2>
           <AllProducts />
        </div>
      </div>
    </main>
  );
}
