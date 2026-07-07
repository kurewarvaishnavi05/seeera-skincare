"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "What is PDRN? The Science Behind Our Star Ingredient",
    excerpt: "Discover how Salmon DNA is revolutionizing skincare and barrier repair.",
    date: "March 15, 2024",
    image: "/images/journal-1.jpg"
  },
  {
    id: 2,
    title: "Skincare Myths and Facts: Dermatologist Approved",
    excerpt: "We bust the most common skincare myths to help you build a routine that actually works.",
    date: "April 02, 2024",
    image: "/images/journal-2.jpg"
  },
  {
    id: 3,
    title: "Why Do Men Need Skincare? A Simple Guide",
    excerpt: "Skincare isn't gendered. Here's why everyone needs to protect their skin barrier daily.",
    date: "May 10, 2024",
    image: "/images/journal-3.jpg"
  }
];

export function BlogPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-16 gap-4 sm:gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading text-dark-brown-red mb-2 md:mb-4"
            >
              The Seeera Journal
            </motion.h2>
            <p className="text-dark-brown font-light text-base md:text-lg">Skincare education, tips, and science.</p>
          </div>
          <Link href="/blog" className="text-xs md:text-sm tracking-widest uppercase text-accent-brown hover:text-dark-brown-red transition-colors flex items-center gap-2 group">
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group cursor-pointer flex flex-col h-full"
            >
              <div className="aspect-[4/3] rounded-[20px] overflow-hidden mb-6 relative bg-gray-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-brown/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs text-accent-brown uppercase tracking-widest mb-3 font-medium">{post.date}</span>
                <h3 className="text-2xl font-heading text-primary-brown mb-3 group-hover:text-dark-brown-red transition-colors">{post.title}</h3>
                <p className="text-dark-brown font-light line-clamp-2 mb-6 flex-1">{post.excerpt}</p>
                <div className="mt-auto inline-flex items-center gap-2 text-sm text-dark-brown-red font-medium group-hover:underline underline-offset-4 decoration-1">
                  Read Article
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
