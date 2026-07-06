"use client";

import { motion } from 'framer-motion';
import { Droplet, Leaf, Sparkles, Shield, FlaskConical, Sun } from 'lucide-react';
import Link from 'next/link';

const ingredients = [
  { id: 1, name: "PDRN", description: "Salmon-derived DNA that accelerates skin healing and collagen production.", icon: Droplet, color: "bg-blue-50 text-blue-600" },
  { id: 2, name: "CICA", description: "Centella Asiatica soothes inflammation, redness, and repairs the skin barrier.", icon: Leaf, color: "bg-green-50 text-green-600" },
  { id: 3, name: "Niacinamide", description: "Vitamin B3 brightens skin tone, reduces pores, and improves texture.", icon: Sparkles, color: "bg-purple-50 text-purple-600" },
  { id: 4, name: "Ceramides", description: "Lipids that form the skin's barrier and help skin retain moisture.", icon: Shield, color: "bg-orange-50 text-orange-600" },
  { id: 5, name: "Vitamin E", description: "A powerful antioxidant that protects skin from environmental stressors.", icon: FlaskConical, color: "bg-yellow-50 text-yellow-600" },
  { id: 6, name: "UV Filters", description: "Next-gen filters providing broad-spectrum protection without white cast.", icon: Sun, color: "bg-red-50 text-red-600" }
];

export function ShopByIngredient() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-4 block font-semibold">Science & Nature</span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-6"
          >
            Shop By Ingredient
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {ingredients.map((ingredient, index) => {
            const Icon = ingredient.icon;
            return (
              <motion.div
                key={ingredient.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/shop?ingredient=${ingredient.name.toLowerCase()}`} className="block group h-full bg-[#F8F5F2] rounded-[24px] p-8 hover:bg-dark-brown-red transition-colors duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-500 ${ingredient.color} group-hover:bg-white/20 group-hover:text-white`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-2xl font-heading text-primary-brown mb-3 group-hover:text-white transition-colors duration-500">
                    {ingredient.name}
                  </h3>
                  
                  <p className="text-dark-brown/80 font-light mb-8 group-hover:text-white/80 transition-colors duration-500 leading-relaxed">
                    {ingredient.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold tracking-widest uppercase text-accent-brown group-hover:text-white transition-colors duration-500">
                    Learn More 
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
