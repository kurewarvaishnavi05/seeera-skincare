"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, Heart, X } from 'lucide-react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openCart, items } = useCartStore();
  const { user } = useAuthStore();
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const textColorClass = isScrolled ? "text-cream" : "text-primary-brown";

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-dark-brown-red py-4 shadow-md" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            type="button"
            className={cn("lg:hidden hover:text-accent-brown transition-colors", textColorClass)}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <nav className={cn("hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase", textColorClass)}>
            <Link href="/shop" className="hover:text-accent-brown transition-colors">Shop</Link>
            <Link href="/about" className="hover:text-accent-brown transition-colors">About</Link>
            <Link href="/contact" className="hover:text-accent-brown transition-colors">Contact</Link>
          </nav>
        </div>

        <Link href="/" className={cn("text-2xl md:text-3xl font-heading font-bold tracking-widest uppercase text-center flex-1 lg:flex-none", textColorClass)}>
          SEEERA
        </Link>

        <div className={cn("flex items-center justify-end space-x-6", textColorClass)}>
          <Link href={user ? "/profile" : "/login"} className="hover:text-accent-brown transition-colors hidden sm:block text-sm font-medium tracking-wider uppercase">
            {user ? "Profile" : "Login"}
          </Link>
          <button type="button" className="hover:text-accent-brown transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button type="button" className="hover:text-accent-brown transition-colors relative">
            <Heart className="w-5 h-5" />
          </button>
          <button type="button" onClick={openCart} className="hover:text-accent-brown transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-brown text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-md flex flex-col justify-center items-center h-screen w-full"
          >
            <button 
              className="absolute top-6 left-6 text-primary-brown hover:text-accent-brown transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center space-y-8 text-xl font-medium tracking-widest text-primary-brown uppercase">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Products</Link>
              <Link href="/ingredients" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Ingredients</Link>
              <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Reviews</Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">FAQ</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Blog</Link>
              <Link href={user ? "/profile" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">
                {user ? "Profile" : "Login"}
              </Link>
            </nav>
            <div className="flex space-x-8 mt-12 text-primary-brown">
              <button type="button" className="hover:text-accent-brown transition-colors"><Search className="w-6 h-6" /></button>
              <button type="button" className="hover:text-accent-brown transition-colors"><Heart className="w-6 h-6" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
