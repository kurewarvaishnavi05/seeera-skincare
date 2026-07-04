"use client";

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export function Newsletter() {
  return (
    <section className="py-32 bg-primary-brown text-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center max-w-2xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.2em] uppercase mb-4 block text-accent-brown"
        >
          Join the Glow Club
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-heading mb-8"
        >
          Exclusive access to launches, offers, and skincare tips.
        </motion.h2>
        
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="bg-transparent border-b border-cream/30 px-4 py-3 focus:outline-none focus:border-cream text-cream placeholder:text-cream/50 w-full sm:w-72 transition-colors"
          />
          <Button variant="secondary" type="button" className="shrink-0">Subscribe</Button>
        </motion.form>
      </div>
    </section>
  );
}
