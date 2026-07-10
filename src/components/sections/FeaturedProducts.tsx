"use client";

import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { products } from '@/lib/products';
import Link from 'next/link';
import { cn } from '../ui/Button';

export function FeaturedProducts() {
  const { addItem } = useCartStore();
  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  const featuredProducts = products.slice(0, 3);
  
  return (
    <section className="pt-12 pb-4 bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-6"
          >
            Our Best Sellers
          </motion.h2>
          <p className="text-dark-brown font-light text-lg">Science-backed skincare designed for every skin shade.</p>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {featuredProducts.map((product) => {
            const inWishlist = wishlistItems.some(item => item.id === product.id);
            return (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
              }}
            >
              <div className="flex flex-col h-full group bg-white rounded-[16px] md:rounded-[20px] p-2 md:p-4 lg:p-6 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-500">
                <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-cream/30 rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-8">
                  {/* Badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20 flex flex-col gap-1 md:gap-2">
                      {product.badges.map(badge => (
                        <span key={badge} className="bg-primary-brown text-white text-[8px] md:text-[10px] font-semibold tracking-wider uppercase px-2 md:px-3 py-0.5 md:py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Image */}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700" />
                  
                  {/* Quick View Hover */}
                  <div className="absolute inset-0 bg-primary-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Button variant="outline" className="bg-white/95 backdrop-blur-sm border-none hover:bg-white text-primary-brown text-xs tracking-widest px-6 shadow-sm rounded-full h-10">
                        <Eye className="w-4 h-4 mr-2" /> Quick View
                      </Button>
                    </div>
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col px-1 md:px-2">
                  <h3 className="text-[13px] md:text-xl font-heading text-primary-brown mb-1 md:mb-2 leading-tight">{product.name}</h3>
                  <p className="text-[10px] md:text-sm text-dark-brown font-light mb-2 md:mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  
                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-[8px] md:text-[10px] text-accent-brown border border-accent-brown/30 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-2 md:mb-4">
                    <p className="text-primary-brown font-medium text-xs md:text-lg">{product.formattedPrice}</p>
                    <div className="flex items-center gap-1 md:gap-2">
                      <div className="flex text-accent-brown">
                        <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" />
                      </div>
                      <span className="text-[9px] md:text-xs text-dark-brown font-light">4.9/5</span>
                    </div>
                  </div>
                  
                  <p className="text-[9px] md:text-xs text-dark-brown/70 font-light mb-3 md:mb-6">1000+ Sold</p>
                  
                  {/* Actions */}
                  <div className="flex flex-row items-center justify-between gap-1 md:gap-3 mt-auto pt-3 md:pt-4 border-t border-primary-brown/10">
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
                      className="flex-1 text-[9px] md:text-xs py-2 md:py-3 h-auto uppercase tracking-widest bg-dark-brown-red hover:bg-[#522929] text-white transition-all hover:scale-[1.02] active:scale-95 px-0.5 md:px-4"
                    >
                      Add to Cart
                    </Button>
                    <button 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation();
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
                        "w-8 h-8 md:w-12 md:h-12 shrink-0 flex items-center justify-center rounded-full border transition-all hover:scale-110 active:scale-95",
                        inWishlist
                          ? "bg-dark-brown-red text-white border-dark-brown-red"
                          : "border-primary-brown/20 text-primary-brown hover:bg-dark-brown-red hover:text-white hover:border-dark-brown-red"
                      )}
                    >
                      <Heart className={cn("w-3 h-3 md:w-4 md:h-4", inWishlist && "fill-current")} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
        
        <div className="text-center mt-6 px-6 sm:px-0">
          <Button href="/shop" variant="outline" className="w-full sm:w-auto px-10 py-4 h-auto text-sm tracking-widest uppercase border-primary-brown/30 hover:bg-primary-brown hover:text-white transition-all duration-300">
            Explore All Products &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
