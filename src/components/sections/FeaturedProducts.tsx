"use client";

import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/lib/products';
import Link from 'next/link';

export function FeaturedProducts() {
  const { addItem } = useCartStore();
  // Get the first 3 products for the featured section
  const featuredProducts = products.slice(0, 3);
  
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-4"
          >
            The Essentials
          </motion.h2>
          <p className="text-dark-brown tracking-wide uppercase text-sm">Curated for your daily ritual</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <Link href={`/product/${product.slug}`} className="block h-full">
                <Card className="h-full flex flex-col cursor-pointer bg-white group">
                  <div className="aspect-[4/5] bg-beige/20 relative overflow-hidden flex items-center justify-center p-8">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    
                    <div className="absolute inset-0 bg-primary-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-6 left-0 right-0 px-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
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
                        className="w-full shadow-lg" size="sm"
                      >
                        Quick Add - {product.formattedPrice}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 text-center flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-xs tracking-widest uppercase text-accent-brown mb-2 block">{product.category}</span>
                      <h3 className="text-xl font-heading text-primary-brown mb-2">{product.name}</h3>
                    </div>
                    <p className="text-dark-brown font-medium mt-4">{product.formattedPrice}</p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button variant="outline">Shop All Products</Button>
        </div>
      </div>
    </section>
  );
}
