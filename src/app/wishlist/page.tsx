"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useWishlistStore } from '@/store/useWishlistStore';
import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  return (
    <main className="pt-32 pb-24 min-h-screen bg-[#F8F5F2]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <span className="text-sm tracking-[0.2em] text-accent-brown uppercase mb-4 block">Your Favorites</span>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-brown">Wishlist</h1>
          </div>
          {items.length > 0 && (
            <button 
              onClick={clearWishlist}
              className="text-sm text-dark-brown hover:text-accent-brown underline mt-4 md:mt-0 transition-colors"
            >
              Clear Wishlist
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
            <Heart className="w-16 h-16 text-primary-brown/20 mb-6" />
            <h2 className="text-2xl font-heading text-primary-brown mb-4">Your wishlist is currently empty.</h2>
            <p className="text-dark-brown font-light mb-8 max-w-md">Browse our collection and add your favorite products to your wishlist to save them for later.</p>
            <Link href="/shop">
              <Button size="lg" className="bg-dark-brown-red hover:bg-primary-brown text-white tracking-widest uppercase">
                Explore Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-[#F8F5F2] overflow-hidden">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-dark-brown hover:text-red-500 hover:bg-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link href={`/product/${item.slug}`}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                  </Link>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <Link href={`/product/${item.slug}`} className="flex-1">
                    <h3 className="text-lg font-heading text-primary-brown mb-2 group-hover:text-accent-brown transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-primary-brown font-medium mb-6">₹{item.price}</p>
                  
                  <Button 
                    onClick={() => {
                      addItem({ id: item.id, name: item.name, price: Number(item.price), image: item.image });
                    }}
                    className="w-full bg-transparent border border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Move to Cart
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
