"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useScroll, useMotionValueEvent, motion } from 'framer-motion';
import { cn } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, items } = useCartStore();
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-cream/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="lg:hidden text-primary-brown">
            <Menu className="w-6 h-6" />
          </button>
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider text-primary-brown uppercase">
            <Link href="/shop" className="hover:text-accent-brown transition-colors">Shop</Link>
            <Link href="/ingredients" className="hover:text-accent-brown transition-colors">Ingredients</Link>
            <Link href="/about" className="hover:text-accent-brown transition-colors">About</Link>
          </nav>
        </div>

        <Link href="/" className="text-2xl md:text-3xl font-heading font-bold text-primary-brown tracking-widest uppercase text-center flex-1 lg:flex-none">
          SEEERA
        </Link>

        <div className="flex items-center justify-end space-x-6 text-primary-brown">
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium tracking-wider uppercase mr-6">
            <Link href="/reviews" className="hover:text-accent-brown transition-colors">Reviews</Link>
            <Link href="/contact" className="hover:text-accent-brown transition-colors">Contact</Link>
          </nav>
          <button className="hover:text-accent-brown transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button onClick={openCart} className="hover:text-accent-brown transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-brown text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
