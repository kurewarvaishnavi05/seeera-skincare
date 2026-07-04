"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Button } from './Button';

const FREE_SHIPPING_THRESHOLD = 2000;

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-primary-brown/10 flex items-center justify-between">
              <h2 className="font-heading text-2xl text-primary-brown">Your Cart</h2>
              <button onClick={closeCart} className="text-primary-brown hover:text-accent-brown transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="p-6 bg-white/50 border-b border-primary-brown/10">
              <p className="text-sm text-center mb-3 text-dark-brown font-medium">
                {remaining > 0 ? (
                  <>You&apos;re <span className="text-primary-brown font-bold">₹{remaining}</span> away from Free Shipping!</>
                ) : (
                  <span className="text-primary-brown font-bold">You&apos;ve unlocked Free Shipping!</span>
                )}
              </p>
              <div className="w-full h-2 bg-beige/50 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-accent-brown"
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-primary-brown/50 space-y-4">
                  <ShoppingBag className="w-12 h-12" />
                  <p className="font-heading text-lg">Your cart is empty.</p>
                  <Button onClick={closeCart} variant="outline" className="mt-4">Continue Shopping</Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-primary-brown/10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-heading text-primary-brown leading-tight pr-4">{item.name}</h3>
                            <button onClick={() => removeItem(item.id)} className="text-dark-brown hover:text-accent-brown">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-dark-brown font-medium mt-1">₹{item.price}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-primary-brown/20 rounded-full px-2 py-1 space-x-3">
                            <button 
                              onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                              className="text-primary-brown hover:text-accent-brown"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center text-primary-brown">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-primary-brown hover:text-accent-brown"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-primary-brown/10 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-dark-brown text-lg font-heading">Subtotal</span>
                  <span className="text-xl font-bold text-primary-brown font-heading">₹{subtotal}</span>
                </div>
                <Button className="w-full py-4 text-lg" size="lg">Checkout</Button>
                <p className="text-center text-xs text-dark-brown mt-4 tracking-widest uppercase">
                  Shipping & taxes calculated at checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
