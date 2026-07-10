"use client";

import { motion } from 'framer-motion';

const benefits = [
  { title: "Cellular-Level Rejuvenation", desc: "Powered by PDRN, our advanced formulations work deep within the dermis to repair damaged tissue, stimulate collagen production, and dramatically improve skin elasticity." },
  { title: "Unrivaled Hydration & Glow", desc: "Our potent active complexes lock in moisture for 72+ hours while evening out your skin tone, leaving you with that coveted, luminous glass-skin radiance." },
  { title: "Ultimate Barrier Defense", desc: "Infused with CICA and premium botanicals, SEEERA fortifies your skin's natural defenses, instantly soothing inflammation and shielding against harsh environmental stressors." },
];

export function WhyChooseUs() {
  return (
    <section className="py-2 lg:py-4 bg-cream overflow-hidden">

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="w-full lg:w-5/12">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary-brown mb-8 overflow-hidden flex"
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
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-primary-brown mb-2">{benefit.title}</h3>
                  <p className="text-dark-brown font-light leading-relaxed text-base lg:text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 grid grid-cols-2 gap-4 md:gap-6 mt-10 lg:mt-0 h-[300px] sm:h-[400px] lg:h-[450px] relative">
            {/* Decorative Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#F8F5F2] rounded-full blur-[100px] -z-10 opacity-70" />

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl scale-[1.3] lg:scale-[1.6] origin-right"
            >
              {/* Image 1 */}
              <img src="/images/why-seeera-1.jpg" alt="Seeera Key Ingredients" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl scale-[1.3] lg:scale-[1.6] origin-left"
            >
              {/* Image 2 */}
              <img src="/images/why-seeera-2.jpg" alt="Seeera Velvet Roozh" className="w-full h-full object-cover hover:scale-[1.05] transition-transform duration-700" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
