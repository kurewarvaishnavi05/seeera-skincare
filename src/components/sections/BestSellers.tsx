"use client";

import { Heart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';
import { products } from '@/lib/products';
import Link from 'next/link';
import { cn } from '../ui/Button';

export function BestSellers() {
  const { addItem } = useCartStore();
  const { items: wishlistItems, addItem: addWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown"
          >
            All Products
          </motion.h2>
          <a href="#" className="hidden md:block text-sm tracking-widest uppercase text-accent-brown hover:text-primary-brown transition-colors">
            Shop All
          </a>
        </div>
        
        <motion.div 
          className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {products.map((product) => {
            const inWishlist = wishlistItems.some(item => item.id === product.id);
            return (
            <motion.div 
              key={product.id}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              className="min-w-[280px] md:min-w-[320px] snap-start"
            >
              <div className="flex flex-col h-full group bg-transparent hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] rounded-2xl p-4 hover:-translate-y-2 transition-all duration-500">
                <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] bg-beige/10 rounded-2xl overflow-hidden mb-6">
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
                      "absolute top-4 right-4 z-20 transition-all p-2 rounded-full backdrop-blur-sm hover:scale-110 active:scale-95",
                      inWishlist
                        ? "bg-dark-brown-red text-white"
                        : "text-primary-brown bg-white/80 hover:bg-dark-brown-red hover:text-white"
                    )}
                  >
                    <Heart className={cn("w-4 h-4", inWishlist && "fill-current")} />
                  </button>
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700" />
                  
                  <div className="absolute inset-0 bg-primary-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Button variant="outline" className="bg-white/90 backdrop-blur border-none hover:bg-white text-xs tracking-widest px-6 shadow-sm rounded-full">
                        <Eye className="w-4 h-4 mr-2" /> Quick View
                      </Button>
                    </div>
                  </div>
                </Link>
                
                <div className="text-center flex-1 flex flex-col justify-between px-2">
                  <div>
                    <h3 className="text-lg font-heading text-primary-brown mb-1">{product.name}</h3>
                    <p className="text-xs text-dark-brown/70 font-light mb-3">{product.description || "Deeply hydrating and repairing formula."}</p>
                    <div className="flex justify-center text-accent-brown mb-3">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-primary-brown font-medium text-sm mb-6">{product.formattedPrice}</p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-auto">
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
                      className="w-full text-xs py-2 h-auto uppercase tracking-widest bg-dark-brown-red hover:bg-[#522929] text-white transition-all hover:scale-[1.02] active:scale-95 shadow-none"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )})}
        </motion.div>
      </div>
    </section>
  );
}
