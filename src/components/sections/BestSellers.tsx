"use client";

import { Heart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/lib/products';
import Link from 'next/link';

export function BestSellers() {
  const { addItem } = useCartStore();
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
            Best Sellers
          </motion.h2>
          <a href="#" className="hidden md:block text-sm tracking-widest uppercase text-accent-brown hover:text-primary-brown transition-colors">
            Shop All
          </a>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {products.map((product, i) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="min-w-[280px] md:min-w-[320px] snap-start"
            >
              <div className="flex flex-col h-full group bg-transparent">
                <Link href={`/product/${product.slug}`} className="block relative aspect-[4/5] bg-beige/10 rounded-2xl overflow-hidden mb-6">
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    className="absolute top-4 right-4 z-20 text-primary-brown hover:text-accent-brown transition-colors bg-white/50 p-2 rounded-full backdrop-blur-sm"
                  >
                    <Heart className="w-4 h-4" />
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
                      className="w-full text-xs py-2 h-auto uppercase tracking-widest bg-dark-brown-red hover:bg-primary-brown text-white transition-colors shadow-none"
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
    </section>
  );
}
