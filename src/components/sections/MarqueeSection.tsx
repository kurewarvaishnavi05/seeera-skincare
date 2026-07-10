"use client";

import { motion } from "framer-motion";

export function MarqueeSection() {
  const text = "SAFE & CRUELTY FREE | CICA + PDRN TECHNOLOGY | FREE SHIPPING ABOVE ₹999 | ";
  
  return (
    <div className="w-full bg-dark-brown-red py-4 md:py-5 overflow-hidden flex items-center relative z-10">
      <motion.div
        className="flex whitespace-nowrap text-cream text-xs md:text-base font-medium tracking-[0.3em] uppercase"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
      >
        <span className="pr-4">{text.repeat(4)}</span>
        <span className="pr-4">{text.repeat(4)}</span>
      </motion.div>
    </div>
  );
}
