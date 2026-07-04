"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from './Button';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

export function Accordion({ items, variant = 'dark' }: { items: AccordionItem[], variant?: 'dark' | 'light' }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const isLight = variant === 'light';
  
  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`border-b pb-4 ${isLight ? 'border-white/20' : 'border-primary-brown/20'}`}
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
          >
            <span className={`text-xl font-heading transition-colors ${isLight ? 'text-white group-hover:text-cream/80' : 'text-primary-brown group-hover:text-accent-brown'}`}>
              {item.title}
            </span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 transition-transform duration-300",
                isLight ? 'text-white' : 'text-primary-brown',
                openId === item.id ? "rotate-180" : ""
              )}
            />
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className={`font-light leading-relaxed pb-4 ${isLight ? 'text-cream/90' : 'text-dark-brown'}`}>
                  {item.content}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
