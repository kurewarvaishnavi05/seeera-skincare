"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-xs text-accent-brown uppercase tracking-widest mb-4 font-medium block">Science</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-brown mb-6">
            Blog Post {params.id}
          </h1>
          <p className="text-dark-brown font-light text-lg mb-12">
            This is a placeholder for the full blog article. The content will be written soon!
          </p>
          <div className="aspect-video w-full bg-gray-100 rounded-2xl mb-12 flex items-center justify-center">
            <span className="text-gray-400">Article Image</span>
          </div>
          <div className="prose prose-lg mx-auto text-left text-dark-brown font-light">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="mt-16 text-center">
            <Link href="/blog" className="inline-flex items-center justify-center px-8 py-4 border border-primary-brown text-sm text-primary-brown uppercase tracking-widest font-medium rounded-full hover:bg-primary-brown hover:text-white transition-colors duration-300">
              &larr; Back to Journal
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
