"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Eye } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { products as fallbackProducts, Product } from '@/lib/products';
import { cn } from '@/components/ui/Button';

export default function ShopPage() {
  const { addItem } = useCartStore();
  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  const [productsList, setProductsList] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch from MongoDB API
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Map MongoDB format to frontend Product format if necessary
          const formattedData = data.data.map((p: any) => ({
            id: p._id,
            slug: p.name.toLowerCase().replace(/ /g, '-'),
            name: p.name,
            price: p.price,
            formattedPrice: `₹${p.price.toFixed(2)}`,
            category: p.category,
            image: p.image || 'https://cdn.shopify.com/s/files/1/0935/2131/4156/files/1.png',
            description: p.description,
            badges: p.stock < 10 ? ['Low Stock'] : [],
            tags: [p.category]
          }));
          setProductsList(formattedData);
        }
      } catch (error) {
        console.error("Failed to fetch products from DB, using fallback", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="pt-32 min-h-screen bg-[#F8F5F2] flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6 max-w-7xl flex-grow pb-24">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-4"
          >
            Shop All
          </motion.h1>
          <p className="text-dark-brown font-light text-lg">Discover our full range of science-backed skincare.</p>
        </div>

        {/* Responsive Grid exactly as requested: 1 col mobile, 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {productsList.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <div className="flex flex-col h-full group hover:-translate-y-2 transition-all duration-500">
                <div className="relative aspect-square mb-6">
                  <Link href={`/product/${product.slug}`} className="block w-full h-full rounded-[20px] overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                    
                    {/* Quick View Hover */}
                    <div className="absolute inset-0 bg-primary-brown/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                      <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Button variant="outline" className="bg-white/95 backdrop-blur-sm border-none text-primary-brown text-xs tracking-widest px-6 shadow-sm rounded-full h-10 pointer-events-auto">
                          <Eye className="w-4 h-4 mr-2" /> Quick View
                        </Button>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 pointer-events-none">
                      {product.badges.map(badge => (
                        <span key={badge} className="bg-primary-brown text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Wishlist Button Overlay */}
                  <button 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      e.stopPropagation();
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
                    className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-[#FAF8F5] shadow text-primary-brown hover:scale-110 transition-transform"
                  >
                    <Heart className={cn("w-4 h-4", wishlistItems.some(item => item.id === product.id) && "fill-current text-dark-brown-red")} />
                  </button>
                </div>
                
                <div className="flex-1 flex flex-col px-2">
                  <h3 className="text-xl font-heading text-primary-brown mb-2">{product.name}</h3>
                  <p className="text-sm text-dark-brown font-light mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  
                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-accent-brown border border-accent-brown/30 px-2 py-1 rounded-full tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-primary-brown font-medium text-lg">{product.formattedPrice}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex text-accent-brown">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-xs text-dark-brown font-light">4.9/5</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-dark-brown/70 font-light mb-6">High Quality • Customer Favorite</p>
                  
                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-primary-brown/10">
                    <Button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image
                        });
                      }}
                      className="w-full text-xs py-3 h-auto uppercase tracking-widest bg-dark-brown-red hover:bg-primary-brown text-white transition-colors"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
