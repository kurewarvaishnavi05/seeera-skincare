"use client";

import { motion } from 'framer-motion';

const posts = [
  { id: 1, image: "/images/ig1.jpg" },
  { id: 2, image: "/images/ig2.jpg" },
  { id: 3, image: "/images/ig3.jpg" },
  { id: 4, image: "/images/ig4.jpg" }
];

export function InstagramGallery() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-brown mb-4">
            Join the Community
          </h2>
          <a href="#" className="text-sm tracking-widest uppercase text-accent-brown hover:text-primary-brown transition-colors">
            @seeeraskincare
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, i) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`bg-beige/30 relative overflow-hidden group cursor-pointer ${
                i === 0 || i === 3 ? "aspect-square" : "aspect-[4/5]"
              }`}
            >
              <div className="absolute inset-0 flex items-center justify-center text-primary-brown/40">
                <img src={post.image} alt="IG Post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
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
