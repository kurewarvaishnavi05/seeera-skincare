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
    <section ref={ref} className="py-24 bg-dark-brown-red overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          
          {/* Image (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-[55%] aspect-[4/3] lg:aspect-[6/5] relative z-10 mt-8 lg:mt-0 overflow-hidden shadow-xl"
          >
            <img 
              src="/science_meets_luxury.jpg" 
              alt="Science Meets Luxury" 
              className="absolute inset-0 w-full h-full object-cover object-top" 
            />
          </motion.div>

          {/* Text Box (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white p-10 md:p-16 relative z-20 shadow-2xl w-full lg:w-[45%] lg:-ml-16 mt-12 lg:mt-0"
          >
            <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-4 block">Our Philosophy</span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-brown mb-8 leading-tight">
              Science meets <br className="hidden lg:block"/> luxury skincare.
            </h2>

            <p className="text-dark-brown font-light text-[15px] md:text-base mb-6 leading-relaxed">
              At SEEERA, we believe that premium skincare should be accessible and effective for every shade. 
              Our formulations are deeply rooted in advanced science, utilizing potent ingredients like PDRN and CICA.
            </p>
            <p className="text-dark-brown font-light text-[15px] md:text-base mb-10 leading-relaxed">
              Experience the new era of skin care, designed to repair your skin barrier, protect against environmental 
              stressors, and unlock your natural, radiant glow.
            </p>
            <Button className="bg-dark-brown-red hover:bg-[#522929] text-white uppercase tracking-widest text-xs px-8 py-3 rounded-full shadow-md border-none transition-transform hover:scale-105">
              Discover Our Story
            </Button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
