"use client"
import { useEffect, useRef } from "react"

export default function GradientOverlay() {
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsap: any;
    import('gsap').then((mod) => {
      gsap = mod.gsap;
      const circle = circleRef.current;
      if (!circle) return;
      const handleMouseMove = (e: MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        // Generate two light golden pastel colors based on mouse position
        const color1 = `rgba(255, 236, 139, 0.7)`; // light golden
        const color2 = `rgba(255, 250, 205, 0.7)`; // lemon chiffon
        const bg = `radial-gradient(circle at 60% 40%, ${color1} 0%, ${color2} 100%)`;
        gsap.to(circle, {
          x: x - 75, // center the circle on cursor
          y: y - 75,
          background: bg,
          duration: 0.3,
          overwrite: 'auto',
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    });
  }, []);
  return (
    <div
      ref={circleRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 150,
        height: 150,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 50,
        filter: 'blur(32px)',
        opacity: 0.7,
        background: 'radial-gradient(circle at 60% 40%, #e0f7fa 0%, #fffde4 100%)',
        transition: 'background 0.3s',
        mixBlendMode: 'lighten',
      }}
    />
  );
} 