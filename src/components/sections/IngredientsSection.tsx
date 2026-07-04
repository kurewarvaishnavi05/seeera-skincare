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
    <section className="py-24 bg-beige">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading text-primary-brown mb-4"
          >
            The Science of Glow
          </motion.h2>
          <p className="text-dark-brown tracking-wide uppercase text-sm">Premium Ingredients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ingredients.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-cream p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-500 shadow-sm"
            >
              <h3 className="text-2xl font-heading text-primary-brown mb-4">{item.name}</h3>
              <p className="text-dark-brown font-light leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
