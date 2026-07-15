"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Search, Menu, Heart, X } from 'lucide-react';
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { openCart, items } = useCartStore();
  const { user } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      setIsMobileMenuOpen(false);
      // For now, redirect to shop. In a real app, you'd pass ?q=searchQuery
      router.push('/shop');
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Change background when scrolled past hero
    setIsScrolled(latest > 50);

    // Smart auto-hide physics
    if (latest > 150 && latest > previous) {
      setIsHidden(true); // user is scrolling down
    } else if (latest < previous || latest < 50) {
      setIsHidden(false); // user is scrolling up or at top
    }
  });

  const textColorClass = isScrolled ? "text-white" : "text-dark-brown-red";

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-dark-brown-red py-2 shadow-md" : "bg-transparent py-4"
      )}
      variants={{
        visible: { y: "0%" },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button"
            className={cn("lg:hidden hover:text-accent-brown transition-colors", textColorClass)}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <nav className={cn("hidden lg:flex items-center space-x-8 text-base font-bold tracking-widest uppercase lg:-ml-12", textColorClass)}>
            <Link href="/shop" className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110">Shop</Link>
            <Link href="/about" className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110">About</Link>
            <Link href="/contact" className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110">Contact</Link>
          </nav>
        </div>

        <Link href="/" className={cn("text-2xl md:text-3xl font-heading font-bold tracking-widest uppercase text-center flex-1 lg:flex-none transition-colors", isScrolled ? "text-white" : "text-dark-brown-red")}>
          SEEERA
        </Link>

        <div className={cn("flex items-center justify-end gap-4 sm:gap-6 lg:-mr-40", textColorClass)}>
          <Link href={user ? "/profile" : "/login"} className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110 hidden sm:block text-base font-bold tracking-widest uppercase">
            {user ? "Profile" : "Login"}
          </Link>
          <button type="button" onClick={() => setIsSearchOpen(true)} className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110 hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/wishlist" className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110 relative">
            <Heart className="w-5 h-5" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-brown text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <button type="button" onClick={openCart} className="hover:text-accent-brown transition-all duration-300 transform hover:scale-110 relative">
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-brown text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
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
            className="fixed inset-0 z-50 bg-cream/95 backdrop-blur-md flex flex-col justify-center items-center h-[100dvh] w-full overflow-y-auto py-10"
          >
            <button 
              className="absolute top-6 left-6 text-primary-brown hover:text-accent-brown transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center space-y-6 md:space-y-8 text-lg md:text-xl font-medium tracking-widest text-primary-brown uppercase mt-8">
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Shop</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">About</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Contact</Link>
              <Link href="/ingredients" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Ingredients</Link>
              <Link href="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Reviews</Link>
              <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">FAQ</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">Blog</Link>
              <Link href={user ? "/profile" : "/login"} onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors">
                {user ? "Profile" : "Login"}
              </Link>
            </nav>
            <div className="flex space-x-8 mt-12 text-primary-brown">
              <button type="button" onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} className="hover:text-accent-brown transition-colors"><Search className="w-6 h-6" /></button>
              <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-accent-brown transition-colors relative">
                <Heart className="w-6 h-6" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-brown text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-cream/95 backdrop-blur-md flex flex-col justify-start items-center pt-32 px-6 h-screen w-full"
          >
            <button 
              className="absolute top-6 right-6 text-primary-brown hover:text-accent-brown transition-colors"
              onClick={() => setIsSearchOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <div className="w-full max-w-3xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text" 
                  autoFocus
                  placeholder="SEARCH FOR PRODUCTS..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-primary-brown pb-4 text-2xl md:text-4xl text-primary-brown placeholder:text-primary-brown/50 focus:outline-none focus:border-dark-brown-red transition-colors"
                />
                <button type="submit" className="absolute right-0 bottom-4 text-primary-brown hover:text-dark-brown-red">
                  <Search className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </form>
              <div className="mt-12">
                <p className="text-sm tracking-widest uppercase text-primary-brown/60 mb-6 font-medium">Popular Searches</p>
                <div className="flex flex-wrap gap-4">
                  {['Vitamin C', 'Anti-Aging', 'Moisturizer', 'Cleanser', 'Sunscreen'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => { setSearchQuery(term); router.push('/shop'); setIsSearchOpen(false); }}
                      className="px-6 py-2 border border-primary-brown/30 rounded-full text-primary-brown hover:bg-primary-brown hover:text-cream transition-colors text-sm uppercase tracking-wider"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
