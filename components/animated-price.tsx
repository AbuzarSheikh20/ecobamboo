"use client"
import { useEffect, useRef } from "react"
import SplitType from "split-type"

export default function AnimatedPrice({ price, className = "" }: { price: string, className?: string }) {
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let observer: IntersectionObserver | null = null;
    let split: any = null;
    import('gsap').then((mod) => {
      const animatePrice = () => {
        if (split) split.revert && split.revert();
        split = new SplitType(priceRef.current!, { types: 'chars' });
        const chars = priceRef.current!.querySelectorAll('.char');
        mod.gsap.set(chars, { opacity: 1 });
        mod.gsap.fromTo(
          chars,
          {
            scale: 7,
            filter: 'blur(32px)',
            opacity: 0,
            color: '#000',
          },
          {
            scale: 1,
            filter: 'blur(0px)',
            opacity: 1,
            color: '#B8860B',
            duration: 1.4,
            ease: 'power4.out',
            stagger: 0.12,
          }
        );
      };
      if (priceRef.current) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                animatePrice();
              }
            });
          },
          { threshold: 0.6 }
        );
        observer.observe(priceRef.current);
      }
    });
    return () => {
      if (observer && priceRef.current) observer.unobserve(priceRef.current);
      if (split && split.revert) split.revert();
    };
  }, []);

  return (
    <span ref={priceRef} className={className + " inline-block font-bold text-[#B8860B]"}>
      {price}
    </span>
  );
} 