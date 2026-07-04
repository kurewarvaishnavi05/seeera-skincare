"use client";

import { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

export function BeforeAfterSlider({ beforeImage, afterImage }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
    
    // Calculate percentage, constrain between 0 and 100
    const position = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-2xl mx-auto aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden select-none touch-none cursor-ew-resize shadow-md"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background - Right Half) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 max-w-none h-full object-cover" 
        style={{ width: '200%', objectPosition: 'right' }}
        draggable={false} 
      />
      
      {/* Before Image (Clipped - Left Half) */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 max-w-none h-full object-cover"
        style={{ width: '200%', objectPosition: 'left', clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        draggable={false} 
      />

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white flex items-center justify-center pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-primary-brown/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#613B2B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l6-6-6-6" />
            <path d="M9 18l-6-6 6-6" />
          </svg>
        </div>
      </div>
      
      {/* Labels are removed since they are baked into the image */}
    </div>
  );
}
