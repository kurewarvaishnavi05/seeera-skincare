import React from 'react';
import { cn } from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
