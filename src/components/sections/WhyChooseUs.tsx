"use client";

import { motion } from 'framer-motion';

const benefits = [
  { title: "Intense Hydration", desc: "Locks in moisture for up to 72 hours, ensuring a dewy finish." },
  { title: "Glass Skin Glow", desc: "Brightens and evens tone for that coveted luminous look." },
  { title: "Barrier Repair", desc: "Fortifies the skin's natural defenses against environmental stressors." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading text-primary-brown mb-8"
            >
              Why SEEERA?
            </motion.h2>
            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-heading text-primary-brown mb-2">{benefit.title}</h3>
                  <p className="text-dark-brown font-light">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 w-full aspect-square bg-beige/40 rounded-full flex items-center justify-center p-8 relative"
          >
             <div className="absolute inset-4 border border-primary-brown/20 rounded-full overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/0935/2131/4156/files/option_1_jpg.jpg?v=1771262475" alt="Lifestyle" className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
