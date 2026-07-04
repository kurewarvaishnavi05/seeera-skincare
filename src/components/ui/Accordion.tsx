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

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="border-b border-primary-brown/20 pb-4"
        >
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between py-4 text-left focus:outline-none group"
          >
            <span className="text-xl font-heading text-primary-brown group-hover:text-accent-brown transition-colors">
              {item.title}
            </span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-primary-brown transition-transform duration-300",
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
                <p className="text-dark-brown font-light leading-relaxed pb-4">
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
