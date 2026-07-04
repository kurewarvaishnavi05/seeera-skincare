"use client";

import { motion } from 'framer-motion';

const posts = [
  { id: 1, image: "/images/community-1.jpg" },
  { id: 2, image: "/images/community-2.jpg" },
  { id: 3, image: "/images/community-3.jpg" },
  { id: 4, image: "/images/community-4.jpg" }
];

export function InstagramGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading text-dark-brown-red mb-4">
            Join the Community
          </h2>
          <a href="#" className="text-sm tracking-widest uppercase text-accent-brown hover:text-dark-brown-red transition-colors">
            @seeeraskincare
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer flex flex-col items-center justify-center bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src={post.image} 
                alt="Community Post" 
                className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-primary-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase text-sm">View Post</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
