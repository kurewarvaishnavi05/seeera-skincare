"use client";

import { motion } from 'framer-motion';

export function AnnouncementBar() {
  const text = "CICA + PDRN Technology | Free Shipping Above ₹999 | Safe & Cruelty Free | ";
  
  return (
    <div className="w-full bg-dark-brown-red text-cream py-1 overflow-hidden flex whitespace-nowrap z-40 relative">
      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase pr-4">{text.repeat(10)}</span>
      </motion.div>
    </div>
  );
}
