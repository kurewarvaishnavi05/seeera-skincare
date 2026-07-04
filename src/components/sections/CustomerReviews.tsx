"use client";

import { motion } from 'framer-motion';

const reviews = [
  { id: 1, text: "The PDRN serum completely transformed my skin texture. It feels like silk.", author: "Sarah M.", tag: "Verified Buyer" },
  { id: 2, text: "Finally, a sunscreen that leaves absolutely no white cast and gives a dewy finish.", author: "Elena R.", tag: "Verified Buyer" },
  { id: 3, text: "My compromised barrier was healed in less than a week using the CICA cream.", author: "Jessica T.", tag: "Verified Buyer" },
];

export function CustomerReviews() {
  return (
    <section className="py-24 bg-beige/50">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-heading text-primary-brown text-center mb-16"
        >
          Real Results
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-sm text-center flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6 space-x-1 text-accent-brown">
                {[...Array(5)].map((_, idx) => (
                  <span key={idx}>★</span>
                ))}
              </div>
              <p className="text-dark-brown font-light italic mb-8 leading-relaxed">
                &quot;{review.text}&quot;
              </p>
              <div>
                <p className="font-heading text-lg text-primary-brown">{review.author}</p>
                <p className="text-xs tracking-widest uppercase text-accent-brown mt-1">{review.tag}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
