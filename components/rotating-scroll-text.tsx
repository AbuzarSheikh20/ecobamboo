"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RotatingScrollText({ text, className = "", onComplete }: { text: string, className?: string, onComplete?: () => void }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const split = new SplitType(textRef.current, { types: "chars" });
    const chars = textRef.current.querySelectorAll(".char");

    gsap.set(chars, { opacity: 0, rotateY: 180, yPercent: 50, xPercent: 50 });

    gsap.to(chars, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
      opacity: 1,
      rotateY: 0,
      yPercent: 0,
      xPercent: 0,
      stagger: {
        amount: 0.7,
        from: "random",
      },
      ease: "back.out(1.7)",
      duration: 1.2,
      onComplete: () => { if (onComplete) onComplete(); },
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <span ref={textRef} className={className}>
      {text}
    </span>
  );
} 