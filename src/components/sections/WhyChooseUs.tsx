"use client";

import { motion } from 'framer-motion';

const benefits = [
  { title: "Cellular-Level Rejuvenation", desc: "Powered by PDRN, our advanced formulations work deep within the dermis to repair damaged tissue, stimulate collagen production, and dramatically improve skin elasticity." },
  { title: "Unrivaled Hydration & Glow", desc: "Our potent active complexes lock in moisture for 72+ hours while evening out your skin tone, leaving you with that coveted, luminous glass-skin radiance." },
  { title: "Ultimate Barrier Defense", desc: "Infused with CICA and premium botanicals, SEEERA fortifies your skin's natural defenses, instantly soothing inflammation and shielding against harsh environmental stressors." },
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-cream overflow-hidden">
      {/* Banner image added above the section as requested */}
      <div className="w-full mb-24">
        <img src="/images/why-seeera-wide-banner.jpg" alt="Seeera Skincare Products" className="w-full h-auto object-cover" />
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-brown mb-10 overflow-hidden flex"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {"Why SEEERA?".split(" ").map((word, i) => (
                <motion.span 
                  key={i} 
                  className="mr-3 block"
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <div className="space-y-10">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-2xl font-heading text-primary-brown mb-3">{benefit.title}</h3>
                  <p className="text-dark-brown font-light leading-relaxed text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex-1 w-full aspect-square bg-dark-brown-red rounded-full flex items-center justify-center p-2 md:p-4 relative"
          >
             <div className="absolute inset-2 md:inset-4 rounded-full overflow-hidden bg-white">
                {/* Updated the circle image to the newly uploaded image */}
                <img src="/images/why-seeera.jpg" alt="Seeera Key Ingredients" className="w-full h-full object-cover" />
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
