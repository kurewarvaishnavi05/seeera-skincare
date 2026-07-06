"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const concerns = [
  { id: 1, name: "Acne & Blemishes", image: "/images/hero-woman.jpg", link: "/shop?concern=acne" },
  { id: 2, name: "Pigmentation", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1974&auto=format&fit=crop", link: "/shop?concern=pigmentation" },
  { id: 3, name: "Dry Skin", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=1974&auto=format&fit=crop", link: "/shop?concern=dry-skin" },
  { id: 4, name: "Sensitive Skin", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop", link: "/shop?concern=sensitive" },
  { id: 5, name: "Daily Sun Protection", image: "https://images.unsplash.com/photo-1576402187878-974f70c890a5?q=80&w=2070&auto=format&fit=crop", link: "/shop?concern=sun-protection" },
  { id: 6, name: "Dull Skin", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop", link: "/shop?concern=dull-skin" }
];

export function ShopByConcern() {
  return (
    <section className="py-24 bg-[#F8F5F2] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-4 block font-semibold">Targeted Solutions</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-6"
          >
            Shop By Concern
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {concerns.map((concern, index) => (
            <motion.div
              key={concern.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={concern.link} className="block group relative h-[300px] md:h-[400px] w-full rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-500">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 bg-cream">
                  <img 
                    src={concern.image} 
                    alt={concern.name} 
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-1000 ease-[0.25,0.46,0.45,0.94]"
                  />
                </div>
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Glass Label */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 flex items-center justify-between group-hover:bg-white/20 transition-colors duration-500">
                    <h3 className="text-white font-heading text-xl md:text-2xl drop-shadow-md">
                      {concern.name}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <svg className="w-4 h-4 text-white group-hover:text-primary-brown transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
