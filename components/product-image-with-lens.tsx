"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ProductImageWithLens({ src, alt, className = "" }: { src: string, alt: string, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [lens, setLens] = useState<{x: number, y: number, visible: boolean}>({x: 0, y: 0, visible: false});
  const [animating, setAnimating] = useState(false);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  // Animate image: fast zoom in, then slow move up and settle (on src change)
  useEffect(() => {
    if (!imgRef.current || !containerRef.current) return;
    setAnimating(true);
    containerRef.current.style.overflow = 'visible';
    gsap.fromTo(imgRef.current,
      { scale: 2.5, y: 100, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
        onComplete: () => {
          if (containerRef.current) containerRef.current.style.overflow = 'hidden';
          setAnimating(false);
        }
      }
    );
  }, [src]);

  // Animate container from bottom to up when 60% in viewport (first time only)
  useEffect(() => {
    if (!containerRef.current || hasAnimatedIn) return;
    let observer: IntersectionObserver | null = null;
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            gsap.fromTo(containerRef.current,
              { y: 100, opacity: 0 },
              { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
            );
            setHasAnimatedIn(true);
            observer && observer.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(containerRef.current);
    return () => observer && observer.disconnect();
  }, [hasAnimatedIn]);

  // Mouse lens logic
  const lensSize = 120;
  const zoom = 2.2;
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setLens({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true
    });
  };
  const handleMouseLeave = () => setLens(lens => ({...lens, visible: false}));

  return (
    <div
      ref={containerRef}
      className={"relative w-full h-full " + className}
      style={{overflow: animating ? 'visible' : 'hidden'}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className="object-cover w-full h-full transition-all duration-300 rounded-lg"
        draggable={false}
        style={{display: 'block'}}
      />
      {lens.visible && (
        <div
          style={{
            position: 'absolute',
            left: lens.x - lensSize/2,
            top: lens.y - lensSize/2,
            width: lensSize,
            height: lensSize,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid #B8860B',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            pointerEvents: 'none',
            zIndex: 10,
            background: `url(${src})`,
            backgroundSize: `${zoom*100}% ${zoom*100}%`,
            backgroundPosition: `${100 * lens.x / (containerRef.current?.offsetWidth || 1)}% ${100 * lens.y / (containerRef.current?.offsetHeight || 1)}%`,
            transition: 'background-position 0.1s',
          }}
        />
      )}
    </div>
  );
} 