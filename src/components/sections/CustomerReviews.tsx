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
    <section className="pt-8 pb-8 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-dark-brown-red text-center mb-16"
        >
          Real Results
        </motion.h2>
        
        <div className="relative overflow-hidden w-full pb-8 pt-4">
          <motion.div 
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            whileHover={{ animationPlayState: "paused" }} // Optional: pause on hover but Framer Motion handles this differently. Let's just keep it simple.
          >
            {[...reviews, ...reviews].map((review, i) => (
              <div 
                key={`${review.id}-${i}`}
                className="w-[260px] md:w-[280px] lg:w-[320px] shrink-0 bg-white p-6 rounded-2xl hover:-translate-y-2 hover:shadow-lg transition-all duration-500 border border-gray-100 flex flex-col"
              >
                <div className="flex mb-4 text-[#FFD700]">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-current border-none" />
                  ))}
                </div>
                <p className="text-dark-brown font-light text-sm mb-6 leading-relaxed flex-1 text-left">
                  {review.text}
                </p>
                <div className="text-left mt-auto">
                  <p className="text-xs font-semibold tracking-widest text-primary-brown">{review.author}</p>
                  {review.tag && (
                    <p className="text-xs text-dark-brown/50 mt-1">{review.tag}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
