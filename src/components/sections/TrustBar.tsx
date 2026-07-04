"use client";

import { motion } from 'framer-motion';
import { ShieldCheck, Droplets, Leaf, Truck, HeartHandshake } from 'lucide-react';

const trustFeatures = [
  { icon: Leaf, title: 'Cruelty Free & Vegan', description: 'Ethically sourced' },
  { icon: Droplets, title: 'Hydrating Formula', description: 'Deeply moisturizing' },
  { icon: ShieldCheck, title: 'Barrier Support', description: 'For everyday protection' },
  { icon: HeartHandshake, title: 'Skin Expert Approved', description: 'Dermatologist tested' },
  { icon: Truck, title: 'Free Shipping', description: 'On orders over ₹999' },
];

export function TrustBar() {
  return (
    <section className="py-12 bg-cream border-y border-primary-brown/10">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {trustFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-[140px]"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-dark-brown-red">
                <feature.icon className="w-6 h-6 stroke-[1.5]" />
              </div>
              <h4 className="font-heading font-medium text-primary-brown mb-1">{feature.title}</h4>
              <p className="text-xs text-dark-brown/70 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
