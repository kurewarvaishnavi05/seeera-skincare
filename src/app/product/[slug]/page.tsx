"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { products as fallbackProducts, getProductBySlug, Product } from '@/lib/products';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { addItem } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Attempt DB fetch, fallback to local data
    const fetchProduct = async () => {
      try {
        // Find local first for immediate render if it exists
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
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="aspect-square bg-white rounded-3xl p-8 lg:p-12 shadow-sm relative flex items-center justify-center">
              {product.badges && product.badges.length > 0 && (
                <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                  {product.badges.map(badge => (
                    <span key={badge} className="bg-primary-brown text-white text-[10px] font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
                      {badge}
                    </span>
                  ))}
                </div>
              )}
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
            </div>
          </motion.div>

          {/* Right: Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {product.tags && product.tags.length > 0 && (
              <div className="flex gap-2 mb-4">
                {product.tags.map(tag => (
                  <span key={tag} className="text-xs text-accent-brown uppercase tracking-widest">{tag}</span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading text-primary-brown mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-accent-brown">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-sm text-dark-brown/70 font-light">128 Reviews</span>
            </div>

            <p className="text-2xl font-medium text-primary-brown mb-8">{product.formattedPrice}</p>
            
            <p className="text-dark-brown font-light leading-relaxed mb-8">{product.description}</p>
            
            {/* Quantity and Cart */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <div className="flex items-center border border-primary-brown/20 rounded-full bg-white h-14 w-full sm:w-32">
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
                className="w-full sm:flex-1 h-14 bg-dark-brown-red hover:bg-primary-brown text-white tracking-widest uppercase text-sm shadow-md"
              >
                Add to Cart
              </Button>
              
              <button className="w-full sm:w-14 h-14 flex items-center justify-center rounded-full border border-primary-brown/20 text-primary-brown bg-white hover:bg-cream transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Features list */}
            <div className="space-y-4 pt-8 border-t border-primary-brown/10">
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <ShieldCheck className="w-5 h-5 text-accent-brown" />
                <span>Dermatologically tested & approved</span>
              </div>
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <Truck className="w-5 h-5 text-accent-brown" />
                <span>Free shipping on orders over ₹1000</span>
              </div>
              <div className="flex items-center gap-3 text-dark-brown font-light">
                <RotateCcw className="w-5 h-5 text-accent-brown" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
