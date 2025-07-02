"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const MARQUEE_ITEMS = [
  "!Off – Limited Time Only 15%",
  "Shop Unique Wall Pieces Today",
  "!Discounted Home Art – Hurry",
  "!Nationwide Free Delivery",
  "Order Now – Deal Ends Soon!",
  "Free Shipping on Home Artwork",
];

export default function ScrollingMarquee({
  items = MARQUEE_ITEMS,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef(false);

  // Duplicate items for seamless loop
  const displayItems = [...items, ...items];

  useEffect(() => {
    // Split all items into characters
    splitRefs.current.forEach((el) => {
      if (el) new SplitType(el, { types: "chars" });
    });
    return () => {
      splitRefs.current.forEach((el) => {
        if (el && (el as any).splitType) (el as any).splitType.revert();
      });
    };
  }, [items]);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const marquee = marqueeRef.current;
    const marqueeWidth = marquee.scrollWidth / 2;
    let animId: number;
    let pos = 0;
    let speed = 1.2; // px per frame

    function animate() {
      if (!hoverRef.current) {
        pos -= speed;
        if (Math.abs(pos) >= marqueeWidth) pos = 0;
        marquee.style.transform = `translateX(${pos}px)`;
      }
      animId = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animId);
  }, [items]);

  return (
    <div
      className={`w-full mx-auto py-3 overflow-x-hidden ${className}`}
      style={{ position: "relative" }}
    >
      <div
        ref={marqueeRef}
        className="flex gap-0 whitespace-nowrap select-none cursor-pointer w-max items-center"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
        style={{ willChange: "transform" }}
      >
        {displayItems.map((item, i) => (
          <React.Fragment key={i}>
            <div
              ref={el => (splitRefs.current[i] = el)}
              className="marquee-item px-4 font-semibold text-lg transition-transform duration-75"
              style={{ display: "inline-block", background: "none" }}
            >
              {item}
            </div>
            {i !== displayItems.length - 1 && (
              <span className="mx-2 text-gray-400 text-xl select-none">&bull;</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
} 