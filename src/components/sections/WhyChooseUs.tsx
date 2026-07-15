"use client";

import { motion } from 'framer-motion';

const benefits = [
  { title: "Cellular-Level Rejuvenation", desc: "Powered by PDRN, our advanced formulations work deep within the dermis to repair damaged tissue, stimulate collagen production, and dramatically improve skin elasticity." },
  { title: "Unrivaled Hydration & Glow", desc: "Our potent active complexes lock in moisture for 72+ hours while evening out your skin tone, leaving you with that coveted, luminous glass-skin radiance." },
  { title: "Ultimate Barrier Defense", desc: "Infused with CICA and premium botanicals, SEEERA fortifies your skin's natural defenses, instantly soothing inflammation and shielding against harsh environmental stressors." },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-cream overflow-hidden">

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
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
            <div className="space-y-8 lg:space-y-10">
              {benefits.map((benefit, i) => (
                <motion.div 
                  key={benefit.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                >
                  <h3 className="text-xl lg:text-2xl font-heading font-bold text-primary-brown mb-3 lg:mb-4">{benefit.title}</h3>
                  <p className="text-dark-brown font-light leading-loose text-base lg:text-lg">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-7/12 flex justify-center items-center gap-4 sm:gap-8 mt-10 lg:mt-0 relative">
            {/* Decorative Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#F8F5F2] rounded-full blur-[100px] -z-10 opacity-70" />

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="w-1/2 aspect-square rounded-full overflow-hidden shadow-2xl relative z-10 hover:z-30 hover:scale-[1.05] transition-all duration-700 border-4 border-white/50"
            >
              {/* Image 1 */}
              <img src="/images/why-seeera-1.jpg" alt="Seeera Key Ingredients" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-1/2 aspect-square rounded-full overflow-hidden shadow-2xl relative z-20 mt-16 sm:mt-24 lg:mt-32 hover:z-30 hover:scale-[1.05] transition-all duration-700 border-4 border-white/50"
            >
              {/* Image 2 */}
              <img src="/images/why-seeera-2.jpg" alt="Seeera Velvet Roozh" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
