"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../ui/Button';

const posts = [
  { id: 1, image: "/images/community-1-new.jpg" },
  { id: 2, image: "/images/community-2.jpg" },
  { id: 3, image: "/images/community-3.jpg" },
  { id: 4, image: "/images/community-4.jpg" }
];

export function InstagramGallery() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'An error occurred.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="pt-12 pb-8 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading text-dark-brown-red mb-4">
            Join the Community
          </h2>
          <a href="https://www.instagram.com/seeeraskincare/" target="_blank" rel="noopener noreferrer" className="text-sm tracking-widest uppercase text-accent-brown hover:text-dark-brown-red transition-colors block mb-8">
            @seeeraskincare
          </a>

          {/* Newsletter Form */}
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-md mx-auto"
          >
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              required
              className="w-full sm:w-auto flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent-brown/30 focus:border-accent-brown transition-all disabled:opacity-50"
            />
            <Button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full sm:w-auto shrink-0"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </Button>
          </motion.form>
          
          {/* Status Message */}
          {message && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-sm font-medium ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}
            >
              {message}
            </motion.p>
          )}
        </div>
        
        {/* Instagram Grid */}
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
              <a href="https://www.instagram.com/seeeraskincare/" target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-primary-brown/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-widest uppercase text-sm">View Post</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
