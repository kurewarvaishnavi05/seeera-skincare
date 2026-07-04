"use client";

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { 
    id: 1, 
    text: "New to skincare but this sunscreen has become my daily routine. It absorbs quickly and doesn't feel sticky at all.", 
    author: "ABHISHEK", 
    tag: "" 
  },
  { 
    id: 2, 
    text: "Never thought I would be writing a skincare review but the PDRN sunscreen is actually really good.", 
    author: "KARAN", 
    tag: "Photographer" 
  },
  { 
    id: 3, 
    text: "Really happy with the PDRN sunscreen. Great results so far! 💖", 
    author: "ISHIKA", 
    tag: "" 
  },
  { 
    id: 4, 
    text: "I spend a lot of time outdoors and this sunscreen has been a game changer. No white cast and no greasy finish.", 
    author: "RIYA VERMA", 
    tag: "" 
  },
  { 
    id: 5, 
    text: "HydraShield keeps my skin moisturized without needing an extra layer of heavy cream. Perfect for daily wear.", 
    author: "SNEHA IYER", 
    tag: "" 
  },
  { 
    id: 6, 
    text: "Feels weightless while still providing strong sun protection. My skin looks healthier since I started using it.", 
    author: "KAVYA NAIR", 
    tag: "" 
  },
];

export function CustomerReviews() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-dark-brown-red text-center mb-16"
        >
          Real Results
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex mb-6 text-[#FFD700]">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 fill-current border-none" />
                ))}
              </div>
              <p className="text-dark-brown font-light text-sm mb-12 leading-relaxed flex-1 text-left">
                {review.text}
              </p>
              <div className="text-left mt-auto">
                <p className="text-xs font-semibold tracking-widest text-primary-brown">{review.author}</p>
                {review.tag && (
                  <p className="text-xs text-dark-brown/50 mt-1">{review.tag}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
