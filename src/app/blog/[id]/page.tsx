"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';

export default function BlogPost({ params }: { params: { id: string } }) {
  const post = blogPosts.find(p => p.id === parseInt(params.id));

  if (!post) {
    return (
      <div className="pt-40 pb-24 min-h-screen bg-cream text-center">
        <h1 className="text-4xl font-heading text-primary-brown mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-accent-brown hover:underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-cream">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="text-xs text-accent-brown uppercase tracking-widest mb-4 font-medium block">
            {post.category || "General"} &bull; {post.date}
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-primary-brown mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-dark-brown font-light text-base md:text-lg mb-12 max-w-2xl mx-auto">
            {post.excerpt}
          </p>
          
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] overflow-hidden mb-12 md:mb-16 shadow-lg bg-gray-50 flex items-center justify-center">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="prose prose-sm md:prose-lg prose-brown mx-auto text-left text-dark-brown font-light leading-relaxed">
            <p>
              When it comes to building a skincare routine that actually delivers results, understanding the ingredients is half the battle. 
              Our approach has always been rooted in science, focusing on what your skin inherently needs to repair its barrier and thrive.
            </p>
            <h3 className="text-2xl font-heading text-primary-brown mt-10 mb-4">The Science of Efficacy</h3>
            <p>
              In our latest clinical studies, we observed that active ingredients like PDRN and Centella Asiatica (CICA) don't just sit on the surface of the skin. 
              Instead, they work synergistically at a cellular level. By supporting the skin's natural regeneration process, they help reduce inflammation and restore elasticity.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-6 mb-8 text-accent-brown">
              <li><span className="text-dark-brown">Accelerated cell turnover and repair</span></li>
              <li><span className="text-dark-brown">Deep hydration that lasts up to 72 hours</span></li>
              <li><span className="text-dark-brown">Significant reduction in visible redness</span></li>
            </ul>
            <p>
              Ultimately, the best routine is one that you can stick to consistently. Less is often more. Focus on a gentle cleanser, a deeply reparative treatment step, and robust sun protection during the day.
            </p>
          </div>
          
          <div className="mt-20 pt-10 border-t border-primary-brown/20 text-center">
            <Link href="/blog" className="inline-flex items-center justify-center px-8 py-4 border border-primary-brown text-xs md:text-sm text-primary-brown uppercase tracking-widest font-medium rounded-full hover:bg-primary-brown hover:text-white transition-colors duration-300">
              &larr; Back to Journal
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
