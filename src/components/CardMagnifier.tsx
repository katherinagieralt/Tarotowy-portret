'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface CardMagnifierProps {
  src: string;
  alt: string;
}

export default function CardMagnifier({ src, alt }: CardMagnifierProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to container
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Calculate percentage for background position (where exactly to zoom)
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    setPosition({ x: xPercent, y: yPercent });
    setCursorPosition({ x, y });
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[180/305] w-full max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-[#050308] cursor-zoom-in group"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      <Image 
        src={src} 
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        sizes="(max-width: 768px) 100vw, 33vw"
        priority
      />
      
      {/* Magnifying Glass (Lupka) */}
      <div 
        className={`absolute pointer-events-none rounded-full border border-amber-500/50 shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-opacity duration-200 ${showMagnifier ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: '240px',
          height: '240px',
          left: `${cursorPosition.x - 120}px`, // center the loupe exactly on the cursor
          top: `${cursorPosition.y - 120}px`,
          backgroundImage: `url(${src})`,
          backgroundPosition: `${position.x}% ${position.y}%`,
          backgroundSize: '450%', // Increased zoom level
          backgroundRepeat: 'no-repeat',
          zIndex: 50,
          backgroundColor: '#050308',
        }}
      />
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0710]/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </div>
  );
}
