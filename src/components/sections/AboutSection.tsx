"use client";

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[3/4] bg-beige/30 rounded-2xl relative"
          >
            <div className="absolute inset-0 border border-primary-brown/10 m-4 rounded-xl overflow-hidden flex items-center justify-center bg-white">
              <img src="https://cdn.shopify.com/s/files/1/0935/2131/4156/files/Combo.webp?v=1771121558" alt="Our Philosophy" className="w-full h-full object-contain" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-sm tracking-[0.2em] text-accent-brown uppercase mb-6 block">Our Philosophy</span>
            <h2 className="text-4xl md:text-6xl font-heading text-primary-brown mb-8 leading-tight">
              Science meets <br/>luxury skincare.
            </h2>
            <p className="text-dark-brown font-light text-lg mb-6 leading-relaxed">
              At SEEERA, we believe that premium skincare should be accessible and effective for every shade. 
              Our formulations are deeply rooted in advanced science, utilizing potent ingredients like PDRN and CICA.
            </p>
            <p className="text-dark-brown font-light text-lg mb-10 leading-relaxed">
              Experience the new era of skin care, designed to repair your skin barrier, protect against environmental 
              stressors, and unlock your natural, radiant glow.
            </p>
            <Button variant="outline">Discover Our Story</Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
