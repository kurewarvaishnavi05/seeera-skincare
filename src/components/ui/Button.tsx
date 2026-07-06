"use client";

import React, { useRef, useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

import Link from 'next/link';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as React.MutableRefObject<HTMLButtonElement>) || internalRef;
    
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!resolvedRef.current) return;
      const { clientX, clientY } = e;
      const { height, width, left, top } = resolvedRef.current.getBoundingClientRect();
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      // Magnetic pull strength (0.25 = moves 25% towards the mouse relative to center)
      setPosition({ x: middleX * 0.25, y: middleY * 0.25 }); 
    };

    const reset = () => {
      setPosition({ x: 0, y: 0 });
    };

    const baseStyles = "relative inline-flex items-center justify-center rounded-full transition-colors duration-300 font-medium tracking-wide";
    
    const variants = {
      primary: "bg-primary-brown text-cream hover:bg-dark-brown hover:shadow-lg hover:-translate-y-0.5",
      secondary: "bg-accent-brown text-white hover:bg-primary-brown hover:shadow-lg",
      outline: "border-2 border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-cream hover:shadow-lg hover:-translate-y-0.5",
      ghost: "text-primary-brown hover:bg-primary-brown/10",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
    };

    if (props.href) {
      const { href, ...rest } = props as any;
      return (
        <Link href={href} passHref legacyBehavior>
          <motion.a
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            onMouseMove={handleMouse as any}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            {...rest}
          >
            <span className="relative z-10 pointer-events-none flex items-center justify-center">{children}</span>
          </motion.a>
        </Link>
      );
    }

    return (
      <motion.button
        ref={resolvedRef}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        {...props}
      >
        <span className="relative z-10 pointer-events-none flex items-center justify-center">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
