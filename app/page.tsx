"use client"

import Image from "next/image"
import { Star, ShoppingCart, Heart, Play, Check, ChevronLeft, ChevronRight, Plus, Truck, Undo2, ShieldCheck, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"
import SplitType from "split-type"
import AnimatedPrice from "@/components/animated-price"
import ProductImageWithLens from "@/components/product-image-with-lens"
import gsap from "gsap"
import RotatingScrollText from "@/components/rotating-scroll-text"
import ScrollTrigger from "gsap/ScrollTrigger"

export default function ProductPage() {
  const animateHeading = (heading: HTMLElement) => {
    const chars = heading.querySelectorAll('.heading-char');
    if (!chars.length) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heading.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      Array.from(chars).forEach((char) => {
        const charRect = (char as HTMLElement).getBoundingClientRect();
        const charX = charRect.left + charRect.width / 2 - rect.left;
        const dist = Math.abs(mouseX - charX);
        const maxDist = 120;
        const offset = Math.max(0, maxDist - dist);
        const y = -Math.sin((offset / maxDist) * Math.PI) * 18;
        (window as any).gsap.to(char, {
          y,
          duration: 0.3,
          ease: 'power3.out',
        });
      });
    };
    const handleMouseLeave = () => {
      Array.from(chars).forEach((char) => {
        (window as any).gsap.to(char, {
          y: 0,
          duration: 1.2,
          ease: 'elastic.out(1,0.2)',
        });
      });
    };
    heading.addEventListener('mousemove', handleMouseMove);
    heading.addEventListener('mouseleave', handleMouseLeave);
  };

  const priceRef = useRef<HTMLDivElement>(null);

  const price = "$24.99";

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let observer: IntersectionObserver | null = null;
    import('gsap').then((mod) => {
      (window as any).gsap = mod.gsap;
      document.querySelectorAll('h1, h2, h3').forEach((heading) => {
        animateHeading(heading as HTMLElement);
      });
      if (priceRef.current) {
        const animatePrice = () => {
          const split = new SplitType(priceRef.current!, { types: 'chars' });
          const chars = priceRef.current!.querySelectorAll('.char');
          const mid = Math.floor(chars.length / 2);
          mod.gsap.set(chars, { opacity: 1 });
          mod.gsap.fromTo(
            chars,
            (i: number) => {
              if (i < mid / 2) return { x: -100, scale: 2, filter: 'blur(16px)', opacity: 0 };
              if (i > mid + mid / 2) return { x: 100, scale: 2, filter: 'blur(16px)', opacity: 0 };
              return { y: -100, scale: 2, filter: 'blur(16px)', opacity: 0 };
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              opacity: 1,
              duration: 1.1,
              ease: 'expo.out',
              stagger: 0.04,
            }
          );
        };
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animatePrice();
              }
            });
          },
          { threshold: 0.5 }
        );
        observer.observe(priceRef.current);
      }
    });
    return () => {
      if (observer && priceRef.current) observer.unobserve(priceRef.current);
    };
  }, [priceRef]);

  const color1 = `rgba(255, 236, 139, 0.7)`; // light golden
  const color2 = `rgba(255, 250, 205, 0.7)`; // lemon chiffon
  const bg = `radial-gradient(circle at 60% 40%, ${color1} 0%, ${color2} 100%)`;

  // Step images (DIY Setup)
  const diyImages = [
    "/pic/Large Bamboo Hanging Wall/customised/Untitled_design_12_19332669-b699-4445-9a49-9a4ca332cd15.png",
    "/pic/Large Bamboo Hanging Wall/customised/2-Photoroom_2.png",
    "/pic/Large Bamboo Hanging Wall/customised/Untitled_design_13_b305fefb-2711-4f88-a992-7308c6c0103b.png",
    "/pic/Large Bamboo Hanging Wall/customised/2_c29d7665-859f-4752-bd03-089fa2bcb6a1.png"
  ];

  // Casual Farmhouse Decor House Plants for Sale!
  const farmhouseImages = [
    "/pic/Big Bamboo Household Standing Plant Pot/big-bamboo-household-standing-plant-pot-perfect-for-home-garden-118593.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/big-bamboo-household-standing-plant-pot-perfect-for-home-garden-835078.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268445.png"
  ];

  // Product Showcase Section (Small/Big Pot)
  const potImages = [
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-deep-half-white-hint-ntural-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155922051.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-red-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268441.jpg"
  ];

  // Bathroom Art Decor Section
  const bathroomImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184227.jpg",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184226.png",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1146185126.png"
  ];

  // Enhanced Customer Reviews Section (avatars)
  const reviewAvatars = [
    "/pic/Big Bamboo Household Standing Plant Pot/customised/1_d9da831c-eaed-4578-b0c3-93fce3954a7a.png",
    "/pic/Big Bamboo Household Standing Plant Pot/customised/2_3f1f1dc6-fe56-4494-a5d7-5679a8b23f85.png",
    "/pic/Big Bamboo Household Standing Plant Pot/customised/3_2baa617f-2e80-4a33-9b18-c4e720e3a6a0.png"
  ];

  // Popular Products Section
  const popularImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184227.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1151184222.png",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-deep-half-white-hint-ntural-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155922051.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-red-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268441.jpg"
  ];

  const bannerImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184226.png",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1151184222.png"
  ];
  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Add state for product image, quantity, and size
  const productImages = [
    "/pic/Large Bamboo Hanging Wall/large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-152452.jpg",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184227.jpg",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184226.png",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1146185126.png",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1154412368.png"
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");

  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!detailsSectionRef.current) return;
    let lastY = 0;
    let observer: IntersectionObserver | null = null;
    observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const direction = entry.boundingClientRect.top < lastY ? 'up' : 'down';
            lastY = entry.boundingClientRect.top;
            gsap.fromTo(
              detailRefs.current,
              direction === 'up'
                ? { opacity: 0, x: 0, y: -80 }
                : { opacity: 0, x: 0, y: 80 },
              { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.13 }
            );
          }
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(detailsSectionRef.current);
    return () => observer && observer.disconnect();
  }, []);

  // DIY Setup Section - Corrected Layout with All Steps
  const [step1HeadingDone, setStep1HeadingDone] = useState(false);
  const [step2HeadingDone, setStep2HeadingDone] = useState(false);
  const [step3HeadingDone, setStep3HeadingDone] = useState(false);
  const [step4HeadingDone, setStep4HeadingDone] = useState(false);
  const step1ParaRef = useRef<HTMLParagraphElement>(null);
  const step2ParaRef = useRef<HTMLParagraphElement>(null);
  const step3ParaRef = useRef<HTMLParagraphElement>(null);
  const step4ParaRef = useRef<HTMLParagraphElement>(null);
  const step1ImgRef = useRef<HTMLDivElement>(null);
  const step2ImgRef = useRef<HTMLDivElement>(null);
  const step3ImgRef = useRef<HTMLDivElement>(null);
  const step4ImgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const steps = [
      { para: step1ParaRef, img: step1ImgRef },
      { para: step2ParaRef, img: step2ImgRef },
      { para: step3ParaRef, img: step3ImgRef },
      { para: step4ParaRef, img: step4ImgRef },
    ];
    steps.forEach(({ para, img }) => {
      if (para.current) {
        gsap.set(para.current, { opacity: 0, y: 80 });
        ScrollTrigger.create({
          trigger: para.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              para.current,
              { opacity: 0, y: 80 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power4.out" }
            );
          },
          onLeaveBack: () => {
            gsap.to(para.current, { opacity: 0, y: 80, duration: 0.3 });
          },
        });
      }
      if (img.current) {
        gsap.set(img.current, { opacity: 0, y: 80 });
        ScrollTrigger.create({
          trigger: img.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              img.current,
              { opacity: 0, y: 80 },
              { opacity: 1, y: 0, duration: 0.7, ease: "power4.out" }
            );
          },
          onLeaveBack: () => {
            gsap.to(img.current, { opacity: 0, y: 80, duration: 0.3 });
          },
        });
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // --- Animation refs for post-steps sections ---
  const showcaseRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const bathroomCardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const reviewRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const popularCardRefs = Array.from({length: 8}, () => useRef<HTMLDivElement>(null));
  const featureRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  useEffect(() => {
    // Product Showcase
    showcaseRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 85%",
          onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power4.out" }),
          onLeaveBack: () => gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
        });
      }
    });
    // Bathroom Art Decor
    bathroomCardRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 90%",
          onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: "power4.out" }),
          onLeaveBack: () => gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
        });
      }
    });
    // Reviews
    reviewRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 90%",
          onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.7, delay: i * 0.13, ease: "power4.out" }),
          onLeaveBack: () => gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
        });
      }
    });
    // Popular Products
    popularCardRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 95%",
          onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, duration: 0.6, delay: i * 0.07, ease: "power4.out" }),
          onLeaveBack: () => gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.2 }),
        });
      }
    });
    // Features
    featureRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 40, scale: 0.85 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 98%",
          onEnter: () => gsap.to(ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.09, ease: "expo.out" }),
          onLeaveBack: () => gsap.to(ref.current, { opacity: 0, y: 40, scale: 0.85, duration: 0.2 }),
        });
      }
    });
    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <>
      <div className="relative w-full h-[400px] bg-white flex items-center justify-center overflow-hidden border-b-2 border-[#B8860B]">
        {bannerImages.map((img, idx) => (
          <Image
            key={img}
            src={img}
            alt={`Banner ${idx+1}`}
            fill
            className={`object-cover transition-opacity duration-700 w-full h-full ${currentBanner === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{transition: 'opacity 0.7s'}}
          />
        ))}
        <button onClick={() => setCurrentBanner((currentBanner - 1 + bannerImages.length) % bannerImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-[#B8860B] text-[#B8860B] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#B8860B] hover:text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => setCurrentBanner((currentBanner + 1) % bannerImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-[#B8860B] text-[#B8860B] rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-[#B8860B] hover:text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {bannerImages.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full border border-[#B8860B] ${currentBanner === i ? 'bg-[#B8860B]' : 'bg-white'}`}></div>
          ))}
        </div>
      </div>
      <div className="min-h-screen bg-white">
        {/* Hero Product Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <ProductImageWithLens
                  src={productImages[selectedImage]}
                  alt="Large Bamboo Hanging Wall - Unique & Stylish Wall Art for Any Room"
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {productImages.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className={`relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 ${selectedImage === i+1 ? 'border-[#B8860B]' : 'border-transparent'}`}
                    onClick={() => setSelectedImage(i+1)}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${i+1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6" ref={detailsSectionRef}>
              <div ref={el => { detailRefs.current[0] = el; }}>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {"Large Bamboo Hanging Wall - Unique & Stylish Wall Art for Any Room".split("").map((char, i) => (
                    <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>
                  ))}
                </h1>
              </div>
              <div ref={el => { detailRefs.current[1] = el; }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-[#B8860B] text-[#B8860B]" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(127 reviews)</span>
                </div>
              </div>
              <div ref={el => { detailRefs.current[2] = el; }}>
                <div className="text-3xl font-bold text-gray-900"><AnimatedPrice price={price} /></div>
              </div>
              <div ref={el => { detailRefs.current[3] = el; }}>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <div className="flex gap-2">
                      {["Small", "Medium", "Large"].map((size) => (
                        <Button
                          key={size}
                          variant="outline"
                          size="sm"
                          className={
                            selectedSize === size
                              ? "bg-[#B8860B] text-white border-[#B8860B]"
                              : "bg-white text-black border-black"
                          }
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setQuantity(q => Math.max(1, q-1))}>-</Button>
                      <span className="px-4 py-2 border rounded">{quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => setQuantity(q => q+1)}>+</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={el => { detailRefs.current[4] = el; }}>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#B8860B] hover:bg-black text-white">
                    <ShoppingCart className="w-4 h-4 mr-2 text-[#B8860B]" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4 text-[#B8860B]" />
                  </Button>
                </div>
              </div>
              <div ref={el => { detailRefs.current[5] = el; }}>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B8860B]" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B8860B]" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#B8860B]" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {"How to Assemble Your Wood Art on Accent Wall - Watch Video Now!".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Assembly video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="rounded-full w-16 h-16 bg-[#B8860B] hover:bg-black text-white">
                    <Play className="w-6 h-6 ml-1 text-[#B8860B]" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIY Setup Section - Corrected Layout with All Steps */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{"Easy DIY Setup: Home Wall Art Décor".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}</h2>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {/* Step 1 */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <RotatingScrollText text="Step 1: Preparing the Materials – Bamboo and Wooden Elements" className="inline-block" />
                  </h3>
                  <p ref={step1ParaRef} className="text-gray-600 leading-relaxed">
                    Elevate your walls with eco-friendly bamboo hanging art. Perfect for homes, kitchens, bedrooms, guest
                    areas, and offices, its natural texture brings calm and rustic elegance to any setting. Ideal for
                    kitchen wall decor, home goods wall decor, and exterior wall art, it blends beautifully with every
                    theme. Handcrafted with care, it's a sustainable choice for modern interiors. Order today and
                    transform your walls with nature's charm.
                  </p>
                </div>
                <div ref={step1ImgRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <ProductImageWithLens
                    src={diyImages[0]}
                    alt="Step 1: Preparing bamboo materials"
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <RotatingScrollText text="Step 2: Assembling the Hanging Wall Decor" className="inline-block" />
                  </h3>
                  <p ref={step2ParaRef} className="text-gray-600 leading-relaxed">
                    Begin the assembly process by carefully connecting each bamboo piece according to the provided
                    instructions. Take your time to ensure each joint is secure and properly aligned. The natural
                    flexibility of bamboo allows for easy handling while maintaining structural integrity. This step is
                    crucial for creating a stable and beautiful wall art piece that will last for years to come.
                  </p>
                </div>
                <div ref={step2ImgRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={diyImages[1]}
                    alt="Step 2: Assembling the hanging wall decor"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <RotatingScrollText text="Step 3: Securing Your Wall Art" className="inline-block" />
                  </h3>
                  <p ref={step3ParaRef} className="text-gray-600 leading-relaxed">
                    Once your bamboo art piece is fully assembled, it's time to mount it securely to your chosen wall. Use
                    the provided mounting hardware and follow the installation guide carefully. Ensure the wall surface is
                    clean and level before mounting. The lightweight nature of bamboo makes installation easy while
                    providing a stunning focal point for any room in your home.
                  </p>
                </div>
                <div ref={step3ImgRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={diyImages[2]}
                    alt="Step 3: Securing your wall art"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <RotatingScrollText text="Step 4: Ready to Hang, Ready to Impress" className="inline-block" />
                  </h3>
                  <p ref={step4ParaRef} className="text-gray-600 leading-relaxed">
                    Congratulations! Your beautiful bamboo wall art is now ready to transform your space. Step back and
                    admire your handiwork – you've successfully created an eco-friendly, stylish accent that brings
                    natural beauty indoors. The warm tones and organic textures of bamboo will complement any décor style
                    while adding a touch of sustainable elegance to your home environment.
                  </p>
                </div>
                <div ref={step4ImgRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={diyImages[3]}
                    alt="Step 4: Ready to hang, ready to impress"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Casual Farmhouse Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{"Casual Farmhouse Decor House Plants for Sale!".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src={farmhouseImages[i % farmhouseImages.length]}
                      alt={`Plant decoration ${i+1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Farmhouse Plant Decor</h3>
                    <p className="text-gray-600 text-sm mb-3">Perfect for casual home styling</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900"><AnimatedPrice price="$19.99" /></span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Product Showcase Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="relative">
              <div className="absolute top-0 left-0">
                <Button className="bg-black text-white">Shop Now →</Button>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                {/* Small Pot */}
                <div ref={showcaseRefs[0]} className="flex gap-6 items-center">
                  <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={potImages[0]}
                      alt="Small bamboo pot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Small Pot</h3>
                    <p className="text-gray-600">A handcrafted small bamboo pot that ads charm to any plant display.</p>
                    <Button variant="outline" className="text-sm bg-transparent">
                      Purchase Now ⊕
                    </Button>
                  </div>
                </div>
                {/* Big Pot */}
                <div ref={showcaseRefs[1]} className="flex gap-6 items-center">
                  <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={potImages[1]}
                      alt="Big bamboo pot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">Big Pot</h3>
                    <p className="text-gray-600">Bamboo flower pot designed to elevate larger plant displays.</p>
                    <Button variant="outline" className="text-sm bg-transparent">
                      Purchase Now ⊕
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bathroom Art Decor Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">{"Bathroom Art Decor".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}</h2>
              <p className="text-gray-600 mt-2">
                Transform Your Bathroom into a Stylish Oasis with Our Curated Art Collection Designed for Tight Urban
                Spaces
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {[0,1,2].map(i => (
                <div ref={bathroomCardRefs[i]} key={i}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={bathroomImages[i % bathroomImages.length]} alt={['Wall Art','Big Fish','Big Fish'][i]} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4 text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">{['Wall Art','Big Fish','Big Fish'][i]}</h3>
                      <p className="font-bold text-gray-900"><AnimatedPrice price={["$24.99","$34.99","$29.99"][i]} /></p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Customer Reviews Section */}
        <div className="bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {[0,1,2].map(i => (
                <div ref={reviewRefs[i]} key={i} className="text-center space-y-3">
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-[#B8860B] text-[#B8860B]" />
                    ))}
                  </div>
                  <div className="relative w-16 h-16 mx-auto rounded-full overflow-hidden">
                    <Image src={reviewAvatars[i % reviewAvatars.length]} alt={["Safder Ali","Kingsley Chandler","— Adnan A."][i]} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">{["Safder Ali","Kingsley Chandler","— Adnan A."][i]}</h4>
                    <p className="text-gray-600 text-sm">{["Mechanical Engineering","Environmental Economist","Graphic Designer"][i]}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-2 mb-8">
              <Button variant="outline" size="icon" className="rounded-full bg-[#B8860B] text-white border-[#B8860B]">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full bg-[#B8860B] text-white border-[#B8860B]">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* FAQ Section */}
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{"Explore, Understand, Shop Confidently".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}</h2>

              <div className="space-y-4">
                {[
                  "Is a Rocking Chair Automatic Safe for Outdoor Use?",
                  "What Makes the Hanging Bubble Chair So Popular?",
                  "Can I Buy a Porch Swing That Fits Small Lawns?",
                  "Is the Outdoor Hammock Chair Comfortable for Long Use?",
                ].map((question, i) => (
                  <div key={i} className="border-b border-gray-200 pb-4">
                    <button className="flex items-center justify-between w-full text-left">
                      <span className="font-medium text-gray-900">{question}</span>
                      <Plus className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Products Section */}
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{"Explore Full Collection!".split("").map((char, i) => <span key={i} className="inline-block heading-char" style={{display: 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>)}</h2>
              <h3 className="text-xl font-semibold text-gray-800">All Time Popular Products</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {Array.from({length: 8}).map((_,i) => (
                <div ref={popularCardRefs[i]} key={i}>
                  <Card className="overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={popularImages[i % popularImages.length]}
                        alt={`Popular product ${i+1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-3">
                      <h4 className="font-medium text-gray-900 text-sm mb-1">Wall Art Decor</h4>
                      <p className="font-bold text-gray-900 text-sm"><AnimatedPrice price="$24.99" className="text-sm" /></p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gray-100 py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[0,1,2,3].map(i => (
                <div ref={featureRefs[i]} key={i} className="space-y-2">
                  {[<Truck className="w-12 h-12 mx-auto mb-3 text-[#B8860B]" />,<Undo2 className="w-12 h-12 mx-auto mb-3 text-[#B8860B]" />,<ShieldCheck className="w-12 h-12 mx-auto mb-3 text-[#B8860B]" />,<Headphones className="w-12 h-12 mx-auto mb-3 text-[#B8860B]" />][i]}
                  <h4 className="font-semibold text-gray-900">{["Free Shipping","Easy Returns","Secure Payment","24/7 Support"][i]}</h4>
                  <p className="text-gray-600 text-sm">{["On orders over $50","30-day return policy","100% secure checkout","Customer service"][i]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
