"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function TiltWrapper({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    // Disable on mobile to prevent weird touch scrolling behavior
    if (window.innerWidth < 768) return; 
    
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth, subtle 10-degree tilt
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, transformPerspective: 800 }}
      transition={{ type: "spring", stiffness: 200, damping: 25, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div 
        style={{ transform: "translateZ(40px)" }} 
        className="w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
