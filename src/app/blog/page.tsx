"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "What is PDRN? The Science Behind Our Star Ingredient",
    excerpt: "Discover how Salmon DNA is revolutionizing skincare and barrier repair.",
    date: "March 15, 2024",
    image: "/images/journal-1.jpg",
    category: "Science",
  },
  {
    id: 2,
    title: "Skincare Myths and Facts: Dermatologist Approved",
    excerpt: "We bust the most common skincare myths to help you build a routine that actually works.",
    date: "April 02, 2024",
    image: "/images/journal-2.jpg",
    category: "Education",
  },
  {
    id: 3,
    title: "Why Do Men Need Skincare? A Simple Guide",
    excerpt: "Skincare isn't gendered. Here's why everyone needs to protect their skin barrier daily.",
    date: "May 10, 2024",
    image: "/images/journal-3.jpg",
    category: "Guides",
  }
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-brown mb-6"
          >
            The Seeera Journal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-dark-brown font-light max-w-2xl mx-auto"
          >
            Your ultimate destination for skincare science, dermatologist-approved tips, and in-depth guides for a glowing complexion.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {['All', 'Science', 'Education', 'Guides', 'Ingredients'].map((cat, i) => (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              key={cat} 
              className={`px-6 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-colors ${i === 0 ? 'bg-primary-brown text-white' : 'bg-transparent border border-primary-brown/20 text-primary-brown hover:bg-primary-brown hover:text-white'}`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
              className="group cursor-pointer flex flex-col h-full bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative bg-gray-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary-brown/10 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <span className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-primary-brown text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                    {post.category}
                  </span>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 p-2"
                  />
                </div>
                <div className="flex flex-col flex-1 px-2">
                  <span className="text-xs text-accent-brown uppercase tracking-widest mb-3 font-medium">{post.date}</span>
                  <h3 className="text-2xl font-heading text-primary-brown mb-3 group-hover:text-dark-brown-red transition-colors leading-tight">{post.title}</h3>
                  <p className="text-dark-brown font-light line-clamp-2 mb-6 flex-1 text-sm">{post.excerpt}</p>
                  <div className="mt-auto inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 border border-dark-brown-red text-xs sm:text-sm text-dark-brown-red uppercase tracking-widest font-medium rounded-full group-hover:bg-dark-brown-red group-hover:text-white transition-colors duration-300">
                    Read Article
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
