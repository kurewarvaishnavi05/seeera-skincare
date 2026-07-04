"use client";

import { motion } from 'framer-motion';

const ingredients = [
  { name: "PDRN", desc: "Salmon-derived DNA that repairs tissue, boosts elasticity, and accelerates cell turnover." },
  { name: "CICA", desc: "Centella Asiatica extract soothes inflammation and strengthens the skin barrier." },
  { name: "Niacinamide", desc: "Vitamin B3 minimizes pores, evens skin tone, and restores radiance." },
  { name: "Advanced UV Filters", desc: "Next-generation protection against UVA/UVB rays without the white cast." },
];

export function IngredientsSection() {
  return (
    <section className="py-32 bg-cream">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-dark-brown-red mb-4"
          >
            The Science of Glow
          </motion.h2>
          <p className="text-dark-brown tracking-wide uppercase text-xs">Premium Ingredients</p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] overflow-hidden shadow-2xl shadow-primary-brown/20 mx-auto w-full max-w-sm bg-white"
          >
            <img 
              src="/science-of-glow-1.jpg" 
              alt="PDRN + CICA Lip Balm - Enhance natural lip glow, deep lip repair, soft nourished lip" 
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-[32px] overflow-hidden shadow-2xl shadow-primary-brown/20 mx-auto w-full max-w-sm bg-white"
          >
            <img 
              src="/science-of-glow-2.jpg" 
              alt="PDRN, CICA, Niacinamide, Advanced UV Filters" 
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-1000"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-dark-brown-red backdrop-blur-sm p-10 rounded-2xl hover:-translate-y-4 hover:shadow-2xl hover:shadow-dark-brown-red/20 transition-all duration-700 border border-dark-brown-red/50 group"
            >
              <h3 className="text-2xl font-heading text-white mb-4 group-hover:text-cream/80 transition-colors duration-500">{item.name}</h3>
              <p className="text-cream/90 font-light leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
