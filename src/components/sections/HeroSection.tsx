"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../ui/Button';

export function HeroSection() {
  const { scrollY } = useScroll();
  // Move the video down smoothly as the user scrolls down
  const y = useTransform(scrollY, [0, 1000], ["0%", "25%"]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 
        We make the container taller (120%) and scale it slightly so when it shifts via parallax, 
        it doesn't reveal the background underneath.
      */}
      <motion.div style={{ y }} className="absolute inset-0 z-0 overflow-hidden bg-black scale-110">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/hero.mp4.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute bottom-12 left-0 right-0 z-10 container mx-auto px-6 flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex w-full px-4 flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-dark-brown-red hover:bg-primary-brown text-white border-dark-brown-red"
            href="/shop"
          >
            Shop Now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto"
            href="/about"
          >
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
