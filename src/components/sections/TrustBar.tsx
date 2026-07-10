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
    <section className="py-6 bg-cream border-y border-primary-brown/10 w-full overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-12">
        <div className="flex flex-wrap justify-between md:justify-around gap-4 md:gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center max-w-[200px]"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center mb-5 md:mb-6 shadow-md text-dark-brown-red transition-transform hover:scale-110 duration-300">
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 stroke-[1.5]" />
              </div>
              <h4 className="font-heading font-bold text-lg md:text-xl text-primary-brown mb-1.5">{feature.title}</h4>
              <p className="text-sm md:text-base text-dark-brown/80 font-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
