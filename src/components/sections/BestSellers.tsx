"use client";

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { products } from '@/lib/products';
import Link from 'next/link';

export function BestSellers() {
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
              <Link href={`/product/${product.slug}`} className="block h-full">
                <Card className="h-full flex flex-col cursor-pointer bg-cream group">
                  <div className="aspect-[4/5] bg-beige/20 relative overflow-hidden flex items-center justify-center p-6">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading text-primary-brown mb-2">{product.name}</h3>
                    </div>
                    <p className="text-dark-brown font-medium mt-2">{product.formattedPrice}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
