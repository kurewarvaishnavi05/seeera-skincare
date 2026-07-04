"use client";

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-cream">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
        >
          {/* User's custom uploaded video */}
          <source src="/videos/hero.mp4.mp4" type="video/mp4" />
        </video>
        {/* Soft overlay using standard Tailwind opacity to ensure it works */}
        <div className="absolute inset-0 bg-cream opacity-50 z-10" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="block text-sm md:text-base tracking-[0.2em] text-primary-brown uppercase mb-4"
        >
          The New Era of Skin Care
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading text-primary-brown mb-6"
        >
          Skincare for<br className="hidden md:block"/> Every Shade
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-dark-brown max-w-2xl mx-auto mb-10 font-light"
        >
          Powered by PDRN + CICA to repair, protect and glow.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg">Shop Now</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </motion.div>
      </div>
    </section>
  );
}
