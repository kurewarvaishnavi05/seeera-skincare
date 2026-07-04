"use client";

import { Heart, Star, Eye, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/lib/products';
import Link from 'next/link';
import { cn } from '../ui/Button';

export function FeaturedProducts() {
  const { addItem } = useCartStore();
  const featuredProducts = products.slice(0, 3);
  
  return (
    <section className="py-32 bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-20">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8 }}
            >
              <div className="flex flex-col h-full group bg-white rounded-[20px] p-4 lg:p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-cream/30 rounded-2xl overflow-hidden mb-8">
                  {/* Badges */}
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                      {product.badges.map(badge => (
                        <span key={badge} className="bg-primary-brown text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Image */}
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8 group-hover:scale-[1.05] transition-transform duration-700" />
                  
                  {/* Quick View Hover */}
                  <div className="absolute inset-0 bg-primary-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <Button variant="outline" className="bg-white/95 backdrop-blur-sm border-none hover:bg-white text-primary-brown text-xs tracking-widest px-6 shadow-sm rounded-full h-10">
                        <Eye className="w-4 h-4 mr-2" /> Quick View
                      </Button>
                    </div>
                  </div>
                </Link>
                
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
                  
                  <p className="text-xs text-dark-brown/70 font-light mb-6">1000+ Sold • Customer Favorite</p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-primary-brown/10">
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
                      className="flex-1 text-xs py-3 h-auto uppercase tracking-widest bg-dark-brown-red hover:bg-primary-brown text-white transition-colors"
                    >
                      Add to Cart
                    </Button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="w-12 h-12 flex items-center justify-center rounded-full border border-primary-brown/20 text-primary-brown hover:bg-cream transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-20">
          <Button variant="outline" className="px-10 py-4 h-auto text-sm tracking-widest uppercase border-primary-brown/30 hover:bg-primary-brown hover:text-white transition-all duration-300">
            Explore All Products &rarr;
          </Button>
        </div>
      </div>
    </section>
  );
}
