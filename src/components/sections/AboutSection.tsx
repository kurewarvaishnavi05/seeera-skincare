"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';

export function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Image shifts slightly as you scroll past the section
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="py-32 bg-dark-brown-red overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[4/5] relative overflow-hidden bg-[#522929]"
          >
            <motion.img 
              style={{ y }} 
              src="/science_meets_luxury.jpg" 
              alt="Science Meets Luxury" 
              className="absolute w-full h-[130%] object-cover -top-[15%]" 
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:-ml-24 lg:mt-32 bg-white/95 backdrop-blur-sm p-8 md:p-16 relative z-10 shadow-2xl"
          >
            <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-4 block">Our Philosophy</span>
            
            <motion.h2 
              className="text-4xl md:text-6xl font-heading text-primary-brown mb-8 leading-tight flex flex-col overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}>Science meets</motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}>luxury skincare.</motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <p className="text-dark-brown font-light text-lg mb-6 leading-relaxed">
                At SEEERA, we believe that premium skincare should be accessible and effective for every shade. 
                Our formulations are deeply rooted in advanced science, utilizing potent ingredients like PDRN and CICA.
              </p>
              <p className="text-dark-brown font-light text-lg mb-10 leading-relaxed">
                Experience the new era of skin care, designed to repair your skin barrier, protect against environmental 
                stressors, and unlock your natural, radiant glow.
              </p>
              <Button className="bg-dark-brown-red hover:bg-[#522929] text-white uppercase tracking-widest text-xs px-8 shadow-none border-none">Discover Our Story</Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
