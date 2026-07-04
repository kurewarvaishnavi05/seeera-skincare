"use client";

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero.mp4.mp4" type="video/mp4" />
        </video>
        {/* Removed overlay to keep video raw and natural */}
      </div>

      <div className="absolute bottom-12 left-0 right-0 z-10 container mx-auto px-6 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-dark-brown-red hover:bg-primary-brown text-white border-dark-brown-red">Shop Now</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </motion.div>
      </div>
    </section>
  );
}
