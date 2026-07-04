"use client";

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/lib/products';

interface StickyCartBarProps {
  product: Product;
}

export function StickyCartBar({ product }: StickyCartBarProps) {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const { addItem } = useCartStore();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show the bar when user scrolls past 600px (approx past the main add to cart button)
    setIsVisible(latest > 600);
  });

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isVisible ? "0%" : "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-primary-brown/10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-cream rounded-md flex items-center justify-center overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
          <div className="hidden md:block">
            <h3 className="font-heading text-primary-brown leading-tight">{product.name}</h3>
            <p className="text-dark-brown font-medium text-sm">{product.formattedPrice}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <p className="text-dark-brown font-medium md:hidden">{product.formattedPrice}</p>
          <Button 
            onClick={() => addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image
            })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
