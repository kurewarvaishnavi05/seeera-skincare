import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full transition-all duration-300 font-medium tracking-wide";
    
    const variants = {
      primary: "bg-primary-brown text-cream hover:bg-dark-brown hover:shadow-lg hover:-translate-y-0.5",
      secondary: "bg-accent-brown text-white hover:bg-primary-brown hover:shadow-lg",
      outline: "border-2 border-primary-brown text-primary-brown hover:bg-primary-brown hover:text-cream",
      ghost: "text-primary-brown hover:bg-primary-brown/10",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-8 py-3 text-base",
      lg: "px-10 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
