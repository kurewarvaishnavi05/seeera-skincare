"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';

export function SpotlightSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  // Image shifts slightly as you scroll past the section
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="py-10 md:py-16 bg-dark-brown-red overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center flex-col-reverse lg:flex-row">
          
          {/* Left Side: Floating Typography Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:-mr-24 lg:mt-8 bg-white/95 backdrop-blur-sm p-6 md:p-8 lg:p-10 relative z-10 shadow-2xl order-2 lg:order-1"
          >
            <span className="text-xs tracking-[0.2em] text-accent-brown uppercase mb-3 block">
              Sensory Care
            </span>
            
            <motion.h2 
              className="text-3xl md:text-5xl font-heading text-primary-brown mb-5 leading-tight flex flex-col overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}>
                The Velvet Roozh
              </motion.span>
              <motion.span variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] } } }}>
                Experience.
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <p className="text-dark-brown font-light text-sm md:text-base mb-3 leading-relaxed">
                A rich, decadent melting balm powered by CICA and PDRN. 
                Infused with natural fruit extracts and an icy gloss finish.
              </p>
              <p className="text-dark-brown font-light text-sm md:text-base mb-6 leading-relaxed">
                Experience the new era of lip care, designed to protect, repair, 
                and reveal your natural glow with every swipe.
              </p>
              <Button 
                href="/product/velvet-roozh-lip-balm"
                className="bg-dark-brown-red hover:bg-[#522929] text-white uppercase tracking-widest text-[10px] px-6 shadow-none border-none"
              >
                Shop Velvet Roozh
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side: Image with Parallax */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full h-[300px] lg:h-[450px] relative overflow-hidden bg-[#522929] order-1 lg:order-2"
          >
            <motion.img 
              style={{ y }} 
              src="/images/velvet-roozh-texture.jpg" 
              alt="Velvet Roozh Lip Balm Texture" 
              className="absolute w-full h-[130%] object-cover -top-[15%]" 
            />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
