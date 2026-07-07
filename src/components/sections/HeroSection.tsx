"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';
import Image from 'next/image';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], ["0%", "20%"]);
  
  // Floating animations for products
  const floatAnimation1 = {
    y: ["-12px", "12px", "-12px"],
    rotate: [-3, 3, -3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
  
  const floatAnimation2 = {
    y: ["15px", "-15px", "15px"],
    rotate: [4, -2, 4],
    transition: {
      duration: 7.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 scale-105">
        <Image 
          src="/images/hero-woman.jpg" 
          alt="Seeera Skincare Model" 
          fill
          priority
          unoptimized
          quality={100}
          className="object-cover object-[60%_30%] md:object-center opacity-90"
        />
      </motion.div>





      {/* Text Content & CTAs */}
      <div className="absolute inset-0 z-30 container mx-auto px-6 flex flex-col justify-end items-start pb-24 md:pb-32 pointer-events-none">
        <motion.div 
          className="max-w-3xl pointer-events-auto -ml-2 md:-ml-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.25em] uppercase text-dark-brown-red mb-6 border border-dark-brown-red/30 rounded-full px-4 py-1.5 backdrop-blur-sm">
              The New Era of Skincare
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-dark-brown-red leading-[1.05] mb-6 tracking-wide"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            Protect. <br />
            Repairs. Glow.
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-xl text-dark-brown-red/80 font-light leading-relaxed mb-10 max-w-lg md:max-w-xl"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            Advanced skincare powered by PDRN + CICA to protect, repair and reveal your natural glow.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
          >
            <Button size="lg" className="bg-dark-brown-red text-white hover:bg-primary-brown border-none px-12 rounded-none w-full sm:w-auto uppercase tracking-widest text-sm font-bold h-14 shadow-xl shadow-dark-brown-red/30 transition-all duration-300 hover:scale-105" href="/shop">
              Shop Now
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/60">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-white/80"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
