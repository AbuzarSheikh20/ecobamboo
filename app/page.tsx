"use client";

import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Heart,
  Play,
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Truck,
  Undo2,
  ShieldCheck,
  Headphones,
  Lock,
  Share2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import SplitType from "split-type";
import AnimatedPrice from "@/components/animated-price";
import ProductImageWithLens from "@/components/product-image-with-lens";
import gsap from "gsap";
import RotatingScrollText from "@/components/rotating-scroll-text";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerTitle,
} from "../components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// 1. ReviewsCarousel component (place before export default):
const reviews = [
  {
    text: `"I bought bamboo wall décor in small size from EcoBambo, and it looks amazing! It adds a natural touch to my kitchen and blends perfectly with my coastal farmhouse décor. The quality is great, and it's an affordable cheap wall décor option. Highly recommend for anyone looking to upgrade their room wall design!" Try Eco Bamboo for home decor.`,
    name: "Safder Ali",
    profession: "Mechanical Engineering",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/1_d9da831c-eaed-4578-b0c3-93fce3954a7a.png",
  },
  {
    text: `I bought a bamboo flower pot with pots from EcoBambo and it's absolutely stunning It fits with my indoor succulents and looks amazing as an outdoor flower planter. The craftsmanship is far better than other flower pots for sale, and the natural bamboo touch gives it a unique charm. Eco-friendly and makes my space feel more refreshing.`,
    name: "Kingsley Chandler",
    profession: "Environmental Economist",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/2_3f1f1dc6-fe56-4494-a5d7-5679a8b23f85.png",
  },
  {
    text: `"I bought a bamboo hanging wall décor (big size) from EcoBambo, and it's stunning! It blends beautifully with my lounge wall art and home wall art décor. The quality is far better than Wayfair and Amazon wall décor—natural, stylish, and eco-friendly!" It's elegant, eco-friendly, and far better than any regular indoor plant UK décor!"`,
    name: "Adnan A.",
    profession: "Graphic Designer",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/3_2baa617f-2e80-4a33-9b18-c4e720e3a6a0.png",
  },
  {
    text: `I bought a large bamboo flower pot from EcoBambo and it has completely transformed my space. It looks perfect in my flower pots garden and also stands beautifully as a standing plant pot. Whether indoors or as part of my flower pots for outside, this piece is an absolute showstopper.Truly this Eco Bambo Duarble for my house. "Thanks!`,
    name: "Abid Hussain",
    profession: "Travel Tourism",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/4_acd518b5-bb47-4046-94ff-7d6d0f7b372d.png",
  },
  {
    text: `EcoBamboo has transformed my space with its stunning collection The Bamboo Bed is elegant the Sofa is stylish and the Baby Chair and Bamboo Baby Bed are perfect for my little one. The Bamboo Chair is sturdy and beautiful while the Bamboo Sofa Tray Table adds convenience. Every piece is eco-friendly durable and crafted to perfection.`,
    name: "John Doe",
    profession: "Tech Leader",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/2_3f1f1dc6-fe56-4494-a5d7-5679a8b23f85.png",
  },
  {
    text: `I had a Bamboo Canopy and a Bamboo Roof on my Pergola built by EcoBamboo and it looks amazing They also constructed a Bamboo House which is not only eco-friendly but also beautifully designed. My Bamboo Gazebo has become the perfect spot for BBQ gatherings in my home. EcoBamboo's work is truly impressive!`,
    name: "David K",
    profession: "Project Creater",
    avatar:
      "/pic/Big Bamboo Household Standing Plant Pot/customised/1_d9da831c-eaed-4578-b0c3-93fce3954a7a.png",
  },
];

// AnimatedReview component for animated text
function AnimatedReview({ text }: { text: string }) {
  const reviewRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!reviewRef.current) return;
    const split = new SplitType(reviewRef.current, { types: "chars" });
    const chars = (
      reviewRef.current as HTMLElement
    ).querySelectorAll<HTMLElement>(".char");

    // Set initial state
    gsap.set(chars, { opacity: 0 });

    // Intersection Observer
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in: fly from different directions
            chars.forEach((char: HTMLElement, i: number) => {
              const from = [
                { x: -100, y: 0 },
                { x: 100, y: 0 },
                { x: 0, y: -100 },
                { x: 0, y: 100 },
              ][i % 4];
              gsap.fromTo(
                char,
                { opacity: 0, ...from },
                {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  duration: 0.1,
                  delay: i * 0.02,
                  ease: "back.out(0.6)",
                }
              );
            });
          } else {
            // Animate out: fly to different directions
            chars.forEach((char: HTMLElement, i: number) => {
              const to = [
                { x: -100, y: 0 },
                { x: 100, y: 0 },
                { x: 0, y: -100 },
                { x: 0, y: 100 },
              ][i % 4];
              gsap.to(char, {
                opacity: 0,
                ...to,
                duration: 0.4,
                delay: i * 0.01,
                ease: "power1.in",
              });
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(reviewRef.current);

    return () => {
      observer.disconnect();
      split.revert();
    };
  }, []);

  return (
    <p
      ref={reviewRef}
      className="font-albert-sans text-[18px] font-semibold leading-[1.25em] review-text"
    >
      {text}
    </p>
  );
}

// AnimatedReviewerName component for animating the reviewer's name with smooth transition on change
function AnimatedReviewerName({
  name,
  profession,
  uniqueKey,
}: {
  name: string;
  profession: string;
  uniqueKey: string;
}) {
  const nameRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState({ name, profession });

  useEffect(() => {
    if (!nameRef.current) return;
    // Animate out
    gsap.to(nameRef.current, {
      x: 80,
      opacity: 0,
      duration: 0.2,
      ease: "power3.in",
      onComplete: () => {
        setDisplayed({ name, profession });
        // Animate in
        gsap.fromTo(
          nameRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uniqueKey]);

  return (
    <div ref={nameRef} className="flex flex-col items-center mt-2">
      <div className="font-albert-sans text-[18px] font-semibold leading-[1.25em] italic text-gray-900">
        {displayed.name}
      </div>
      <div className="text-gray-600 text-sm font-medium">
        {displayed.profession}
      </div>
    </div>
  );
}

function ReviewsCarousel() {
  const [start, setStart] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visible = isMobile ? 1 : 3;
  const canPrev = start > 0;
  const canNext = start + visible < reviews.length;

  const handlePrev = () => {
    if (canPrev) setStart(start - 1);
  };
  const handleNext = () => {
    if (canNext) setStart(start + 1);
  };

  return (
    <div className="relative">
      <div
        className="flex gap-4 overflow-x-auto scrollbar-none pb-4 md:justify-center flex-nowrap"
        style={{ scrollbarWidth: "none" }}
      >
        {isMobile
          ? reviews.map((review, i) => (
              <div
                key={i}
                className="min-w-full max-w-full bg-white p-4 flex-shrink-0 flex flex-col justify-between items-center text-center mx-auto"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="mb-4">
                  <span className="text-3xl text-gray-400 mb-2 block">
                    &#8220;&#8221;
                  </span>
                  <AnimatedReview key={`mobile-${i}`} text={review.text} />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-[#B8860B] text-[#B8860B]"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center mt-2">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-[#B8860B]">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <AnimatedReviewerName
                    key={`mobile-${i}`}
                    uniqueKey={`mobile-${i}`}
                    name={review.name}
                    profession={review.profession}
                  />
                </div>
              </div>
            ))
          : reviews.slice(start, start + visible).map((review, i) => (
              <div
                key={i}
                className="min-w-[350px] max-w-sm bg-white p-4 flex-shrink-0 flex flex-col justify-between items-center text-center mx-auto"
              >
                <div className="mb-4">
                  <span className="text-3xl text-gray-400 mb-2 block">
                    &#8220;&#8221;
                  </span>
                  <AnimatedReview key={`${start}-${i}`} text={review.text} />
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-5 h-5 fill-[#B8860B] text-[#B8860B]"
                    />
                  ))}
                </div>
                <div className="flex flex-col items-center mt-2">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-[#B8860B]">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <AnimatedReviewerName
                    key={`${start}-${i}`}
                    uniqueKey={`${start}-${i}`}
                    name={review.name}
                    profession={review.profession}
                  />
                </div>
              </div>
            ))}
      </div>
      {/* Hide arrows on mobile, show on sm+ */}
      {!isMobile && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full bg-[#B8860B] text-white border-[#B8860B] ${
              !canPrev ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
            disabled={!canPrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full bg-[#B8860B] text-white border-[#B8860B] ${
              !canNext ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleNext}
            disabled={!canNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
      <style jsx global>{`
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default function ProductPage() {
  const animateHeading = (heading: HTMLElement) => {
    // Split the text into characters using SplitType
    const split = new SplitType(heading, { types: "chars" });
    const chars = heading.querySelectorAll(".char");
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
          ease: "power3.out",
        });
      });
    };
    const handleMouseLeave = () => {
      Array.from(chars).forEach((char) => {
        (window as any).gsap.to(char, {
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1,0.2)",
        });
      });
    };
    heading.addEventListener("mousemove", handleMouseMove);
    heading.addEventListener("mouseleave", handleMouseLeave);

    // Return cleanup function
    return () => {
      split.revert();
      heading.removeEventListener("mousemove", handleMouseMove);
      heading.removeEventListener("mouseleave", handleMouseLeave);
    };
  };

  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let observer: IntersectionObserver | null = null;
    const cleanupFunctions: (() => void)[] = [];

    import("gsap").then((mod) => {
      (window as any).gsap = mod.gsap;
      document.querySelectorAll("h1, h2, h3").forEach((heading) => {
        const cleanup = animateHeading(heading as HTMLElement);
        if (cleanup) cleanupFunctions.push(cleanup);
      });
      if (priceRef.current) {
        const animatePrice = () => {
          const split = new SplitType(priceRef.current!, { types: "chars" });
          const chars = priceRef.current!.querySelectorAll(".char");
          const mid = Math.floor(chars.length / 2);
          mod.gsap.set(chars, { opacity: 1 });
          mod.gsap.fromTo(
            chars,
            (i: number) => {
              if (i < mid / 2)
                return { x: -100, scale: 2, filter: "blur(16px)", opacity: 0 };
              if (i > mid + mid / 2)
                return { x: 100, scale: 2, filter: "blur(16px)", opacity: 0 };
              return { y: -100, scale: 2, filter: "blur(16px)", opacity: 0 };
            },
            {
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              opacity: 1,
              duration: 1.1,
              ease: "expo.out",
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
      cleanupFunctions.forEach((cleanup) => cleanup());
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
    "/pic/Large Bamboo Hanging Wall/customised/2_c29d7665-859f-4752-bd03-089fa2bcb6a1.png",
  ];

  // Product Showcase Section (Small/Big Pot)
  const potImages = [
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-deep-half-white-hint-ntural-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155922051.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-red-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268441.jpg",
  ];

  // Bathroom Art Decor Section
  const bathroomImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184227.jpg",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184226.png",
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1146185126.png",
  ];

  // Enhanced Customer Reviews Section (avatars)
  const reviewAvatars = [
    "/pic/Big Bamboo Household Standing Plant Pot/customised/1_d9da831c-eaed-4578-b0c3-93fce3954a7a.png",
    "/pic/Big Bamboo Household Standing Plant Pot/customised/2_3f1f1dc6-fe56-4494-a5d7-5679a8b23f85.png",
    "/pic/Big Bamboo Household Standing Plant Pot/customised/3_2baa617f-2e80-4a33-9b18-c4e720e3a6a0.png",
  ];

  // Popular Products Section
  const popularImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184227.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1151184222.png",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-deep-half-white-hint-ntural-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155922051.jpg",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-red-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268441.jpg",
  ];

  const bannerImages = [
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-green-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1151184226.png",
    "/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1151184222.png",
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
    "/pic/Large Bamboo Hanging Wall/eco-bambo-big-bamboo-hanging-wall-large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-1154412368.png",
  ];
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0); // 0: Green, 1: Bamboo Natural
  const [quantity, setQuantity] = useState(1);
  const [quantityAnim, setQuantityAnim] = useState(false);
  const [selectedSize, setSelectedSize] = useState("Medium");
  const [showReturnsModal, setShowReturnsModal] = useState(false);

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
            const direction =
              entry.boundingClientRect.top < lastY ? "up" : "down";
            lastY = entry.boundingClientRect.top;
            gsap.fromTo(
              detailRefs.current,
              direction === "up"
                ? { opacity: 0, x: 0, y: -80 }
                : { opacity: 0, x: 0, y: 80 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.9,
                ease: "back.out(1.7)",
                stagger: 0.13,
              }
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

  // 1. Add refs for heading and RotatingScrollText for each step:
  const step1HeadingRef = useRef(null);
  const step2HeadingRef = useRef(null);
  const step3HeadingRef = useRef(null);
  const step4HeadingRef = useRef(null);
  const step1ScrollTextRef = useRef(null);
  const step2ScrollTextRef = useRef(null);
  const step3ScrollTextRef = useRef(null);
  const step4ScrollTextRef = useRef(null);

  useEffect(() => {
    const steps = [
      {
        img: document.getElementById("step-img-1"),
        heading: step1HeadingRef.current,
        para: step1ParaRef.current,
        scrollText: step1ScrollTextRef.current,
        circle: document.getElementById("step-circle-1"),
        stepNum: document.getElementById("step-num-1"),
      },
      {
        img: document.getElementById("step-img-2"),
        heading: step2HeadingRef.current,
        para: step2ParaRef.current,
        scrollText: step2ScrollTextRef.current,
        circle: document.getElementById("step-circle-2"),
        stepNum: document.getElementById("step-num-2"),
      },
      {
        img: document.getElementById("step-img-3"),
        heading: step3HeadingRef.current,
        para: step3ParaRef.current,
        scrollText: step3ScrollTextRef.current,
        circle: document.getElementById("step-circle-3"),
        stepNum: document.getElementById("step-num-3"),
      },
      {
        img: document.getElementById("step-img-4"),
        heading: step4HeadingRef.current,
        para: step4ParaRef.current,
        scrollText: step4ScrollTextRef.current,
        circle: document.getElementById("step-circle-4"),
        stepNum: document.getElementById("step-num-4"),
      },
    ];
    steps.forEach((step, idx) => {
      // Animate image
      if (step.img) {
        gsap.set(step.img, {
          opacity: 0,
          x: -80,
        });
        gsap.to(step.img, {
          scrollTrigger: {
            trigger: step.img,
            start: "top 75%",
          },
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "expo.out",
        });
      }
      // Animate heading
      if (step.heading) {
        gsap.set(step.heading, { opacity: 0, y: 40 });
        gsap.to(step.heading, {
          scrollTrigger: {
            trigger: step.heading,
            start: "top 60%",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
        });
      }
      // Animate paragraph
      if (step.para) {
        gsap.set(step.para, { opacity: 0, y: 40 });
        gsap.to(step.para, {
          scrollTrigger: {
            trigger: step.para,
            start: "top 60%",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
        });
      }
      // Animate rotating/scrolling text
      if (step.scrollText) {
        gsap.set(step.scrollText, { opacity: 0, y: 40 });
        gsap.to(step.scrollText, {
          scrollTrigger: {
            trigger: step.scrollText,
            start: "top 60%",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
        });
      }
      // Animate circle and stepNum (existing logic)
      if (step.circle && step.stepNum) {
        gsap.set(step.circle, {
          opacity: 0,
          scale: 1,
          filter: "blur(8px)",
          borderColor: "#000",
          background: "#000",
        });
        gsap.set(step.stepNum, { opacity: 0, color: "transparent" });
        ScrollTrigger.create({
          trigger: step.circle,
          start: "top 70%",
          onEnter: () => {
            gsap.to(step.circle, {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              borderColor: "#FFD700",
              background: "linear-gradient(135deg,#FFD700 60%,#FFDF80 100%)",
              duration: 0.7,
              ease: "expo.out",
            });
            gsap.to(step.stepNum, {
              opacity: 1,
              color: "#B8860B",
              duration: 0.5,
              ease: "expo.out",
              onStart: () => {
                if (step.stepNum)
                  step.stepNum.classList.remove("text-transparent");
              },
            });
          },
          onLeaveBack: () => {
            gsap.to(step.circle, {
              opacity: 0,
              scale: 1,
              filter: "blur(8px)",
              borderColor: "#000",
              background: "#000",
              duration: 0.5,
              ease: "expo.in",
            });
            gsap.to(step.stepNum, {
              opacity: 0,
              color: "transparent",
              duration: 0.3,
              ease: "expo.in",
            });
          },
          toggleActions: "play none none reverse",
        });
      }
    });
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // --- Animation refs for post-steps sections ---
  const showcaseRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const bathroomCardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const reviewRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const popularCardRefs = Array.from({ length: 8 }, () =>
    useRef<HTMLDivElement>(null)
  );
  const featureRefs = Array.from({ length: 4 }, () =>
    useRef<HTMLDivElement>(null)
  );

  useEffect(() => {
    // Product Showcase
    showcaseRefs.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { opacity: 0, y: 60 });
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 85%",
          onEnter: () =>
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power4.out",
            }),
          onLeaveBack: () =>
            gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
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
          onEnter: () =>
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.12,
              ease: "power4.out",
            }),
          onLeaveBack: () =>
            gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
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
          onEnter: () =>
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              delay: i * 0.13,
              ease: "power4.out",
            }),
          onLeaveBack: () =>
            gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.3 }),
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
          onEnter: () =>
            gsap.to(ref.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: i * 0.07,
              ease: "power4.out",
            }),
          onLeaveBack: () =>
            gsap.to(ref.current, { opacity: 0, y: 60, duration: 0.2 }),
        });
      }
    });
    // Features (only animate on md and up)
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      featureRefs.forEach((ref, i) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, y: 40, scale: 0.85 });
          ScrollTrigger.create({
            trigger: ref.current,
            start: "top 98%",
            onEnter: () =>
              gsap.to(ref.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.7,
                delay: i * 0.09,
                ease: "expo.out",
              }),
            onLeaveBack: () =>
              gsap.to(ref.current, {
                opacity: 0,
                y: 40,
                scale: 0.85,
                duration: 0.2,
              }),
          });
        }
      });
    }
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const steps = [1, 2, 3, 4];
    // Animate golden timeline overlay
    const goldenLine = document.getElementById("golden-timeline");
    if (goldenLine) {
      gsap.set(goldenLine, { height: "0%" });
      gsap.to(goldenLine, {
        scrollTrigger: {
          trigger: goldenLine.parentElement,
          start: "top 40%",
          end: "bottom center",
          scrub: true,
        },
        height: "100%",
        ease: "none",
      });
    }
    steps.forEach((step, idx) => {
      const circle = document.getElementById(`step-circle-${step}`);
      const stepNum = document.getElementById(`step-num-${step}`);
      if (circle && stepNum) {
        gsap.set(circle, {
          opacity: 0,
          scale: 0.5,
          filter: "blur(8px)",
          borderColor: "#000",
          background: "#000",
        });
        gsap.set(stepNum, { opacity: 0, color: "transparent" });
        ScrollTrigger.create({
          trigger: circle,
          start: "top 70%",
          onEnter: () => {
            gsap.to(circle, {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              borderColor: "#000",
              background: "#000",
              duration: 0.7,
              ease: "expo.out",
            });
            gsap.to(stepNum, {
              opacity: 1,
              color: "#B8860B",
              duration: 0.5,
              ease: "expo.out",
              onStart: () => {
                stepNum.classList.remove("text-transparent");
              },
            });
          },
          onLeaveBack: () => {
            gsap.to(circle, {
              opacity: 0,
              scale: 1,
              filter: "blur(8px)",
              borderColor: "#000",
              background: "#000",
              duration: 0.5,
              ease: "expo.in",
            });
            gsap.to(stepNum, {
              opacity: 0,
              color: "transparent",
              duration: 0.3,
              ease: "expo.in",
            });
          },
          toggleActions: "play none none reverse",
        });
      }
      const img = document.getElementById(`step-img-${step}`);
      if (img) {
        gsap.set(img, {
          opacity: 0,
          scaleY: 0.2,
          transformOrigin: idx % 2 === 0 ? "top center" : "bottom center",
        });
        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: "top 60%",
          },
          opacity: 1,
          scaleY: 1,
          duration: 0.9,
          ease: "expo.out",
        });
      }
    });
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (drawerOpen) {
      const el = document.getElementById("store-info-animate");
      if (el) {
        gsap.fromTo(
          el.children,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" }
        );
      }
    }
  }, [drawerOpen]);

  // Add this in the ProductPage component after refs:
  const popularSectionRef = useRef(null);
  const popularRowRef = useRef<HTMLDivElement>(null);
  const popularHeadingRef = useRef(null);
  const popularImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const popularNameRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const popularProducts = [
    { name: "BAMBOO CANOPY", img: popularImages[0] },
    { name: "BAMBOO BED", img: popularImages[1] },
    { name: "BAMBOO PLANTER", img: popularImages[2] },
    { name: "BAMBOO BEDROOM", img: popularImages[3] },
    { name: "BAMBOO LAMP", img: popularImages[0] },
    { name: "BAMBOO TABLE", img: popularImages[1] },
  ];

  // State for mobile tap to show Add to Cart
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024); // 1024px is Tailwind's 'lg'
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useLayoutEffect(() => {
    if (!isLargeScreen) return; // Only run GSAP for large screens
    if (!popularSectionRef.current || !popularRowRef.current) return;
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const section = popularSectionRef.current as HTMLDivElement | null;
        const row = popularRowRef.current as HTMLDivElement | null;
        const heading = popularHeadingRef.current;
        const images = popularImageRefs.current;
        const names = popularNameRefs.current;
        if (!section || !row) return;
        const scrollWidth = row.scrollWidth - section.offsetWidth;
        // Pin and horizontal scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => "+=" + row.scrollWidth,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(row, {
              x: -progress * scrollWidth,
              duration: 0.3,
              overwrite: "auto",
            });
          },
        });
        // Animate heading (bottom to up)
        gsap.fromTo(
          heading,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 80%",
            },
          }
        );
        // Animate images (right to left) and names (left to right)
        images.forEach((img, i) => {
          gsap.fromTo(
            img,
            { x: 40 },
            {
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollWidth}`,
                scrub: 1,
              },
            }
          );
        });
        names.forEach((name, i) => {
          gsap.fromTo(
            name,
            { x: -80 },
            {
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollWidth}`,
                scrub: 1,
              },
            }
          );
        });
      });
    });
  }, [isLargeScreen]);

  // Add refs for FAQ questions
  const faqSectionRef = useRef(null);
  const faqQuestionRefs = useRef([]);
  const [openFaq, setOpenFaq] = useState(-1);
  const faqData = [
    {
      q: "Is a Rocking Chair Automatic Safe for Outdoor Use?",
      a: "Yes, automatic rocking chairs are crafted with high-quality weather-resistant materials that make them perfect for outdoor use. These chairs are not just functional but also elevate the look of your outdoor setting—whether it's a bamboo canopy in your lawn, a stylish gazebo, or a relaxing setup near flower pots and hanging bamboo décor. They're a great match for bamboo furniture and provide comfort and motion for your garden seating area.",
    },
    {
      q: "What Makes the Hanging Bubble Chair So Popular?",
      a: "The hanging bubble chair stands out for its futuristic design and floating comfort. It adds a luxurious touch to both indoor and outdoor spaces. Especially when combined with bamboo swings, porch setups, or decorative items like bamboo wall hangings and artificial flower pots, it becomes a centerpiece. This chair blends perfectly with bamboo house styles and enhances the visual appeal of eco-friendly interiors.",
    },
    {
      q: "Can I Buy a Porch Swing That Fits Small Lawns?",
      a: "Yes, compact porch swings are now widely available and are perfect for small patios, balconies, and limited garden areas. You can create a complete bamboo-inspired corner by pairing these swings with baby furniture sets, bamboo chairs and tables, or even lightweight outdoor flower pots. This not only saves space but also turns any corner into a peaceful, natural retreat using Eco Bamboo Company's elegant products.",
    },
    {
      q: "Is the Outdoor Hammock Chair Comfortable for Long Use?",
      a: "Definitely! Outdoor hammock chairs are built with ergonomic support and breathable materials, offering long-lasting comfort. Ideal for lounging under bamboo canopies or pergolas, they can be beautifully matched with bamboo carports, swings, and relaxing setups in your garden. Whether placed in a lawn or on a porch, this chair enhances both the comfort and the organic feel of your bamboo-themed outdoor living.",
    },
  ];

  // Animate FAQ questions on scroll (bottom to up, staggered, no opacity)
  useLayoutEffect(() => {
    if (!faqSectionRef.current || !faqQuestionRefs.current.length) return;
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          faqQuestionRefs.current,
          { y: 32 },
          {
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.13,
            scrollTrigger: {
              trigger: faqSectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, []);

  // Animate all headings (h1, h2, h3, h4, .heading-animate) from bottom to up on enter
  useLayoutEffect(() => {
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        const headings = document.querySelectorAll(
          "h1, h2, h3, h4, .heading-animate"
        );
        headings.forEach((heading) => {
          gsap.fromTo(
            heading,
            { y: 32 },
            {
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 75%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    });
  }, []);

  // Add refs for horizontal FAQ block
  const horizontalFaqRef = useRef<HTMLDivElement>(null);
  const horizontalFaqCardRefs = useRef([]);

  // Animate horizontal FAQ heading and cards from bottom to up on enter
  useLayoutEffect(() => {
    if (!horizontalFaqCardRefs.current.length || !horizontalFaqRef.current)
      return;
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        // Animate heading
        const heading = horizontalFaqRef.current?.querySelector(
          ".horizontal-faq-heading"
        );
        if (heading) {
          gsap.fromTo(
            heading,
            { y: 32 },
            {
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        }
        // Animate cards
        horizontalFaqCardRefs.current.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 32 },
            {
              y: 0,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      });
    });
  }, []);

  const [showPosterModal, setShowPosterModal] = useState(false);

  useEffect(() => {
    if (showPosterModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showPosterModal]);

  // Animate features (bottom to up, staggered)
  useLayoutEffect(() => {
    if (!featureRefs.length) return;
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(
          featureRefs.map((ref) => ref.current),
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: featureRefs[0].current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });
  }, []);

  // Add before the return in ProductPage
  const [videoInView, setVideoInView] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVideoInView(true);
        });
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  // Add state for share popover
  const [showSharePopover, setShowSharePopover] = useState(false);
  const shareBtnRef = useRef(null);

  // Collage refs for animation
  const collageLeftRef = useRef(null);
  const collageTopRightRef = useRef(null);
  const collageBottomRightRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = [collageLeftRef, collageTopRightRef, collageBottomRightRef];
    items.forEach((ref) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <>
      {/* Poster Modal */}
      {showPosterModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => setShowPosterModal(false)}
        >
          <div
            className="relative max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow text-black hover:bg-gray-200"
              onClick={() => setShowPosterModal(false)}
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <img
              src="/poster.jpg"
              alt="اردو پوسٹر"
              className="w-full max-h-[90vh] object-contain rounded shadow-lg"
            />
          </div>
        </div>
      )}
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-white flex items-center justify-center overflow-hidden border-b-2 border-[#B8860B]">
        {bannerImages.map((img, idx) => (
          <Image
            key={img}
            src={img}
            alt={`Banner ${idx + 1}`}
            fill
            className={`object-cover transition-opacity duration-700 w-full h-full ${
              currentBanner === idx ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            style={{ transition: "opacity 0.7s" }}
          />
        ))}
        <button
          onClick={() =>
            setCurrentBanner(
              (currentBanner - 1 + bannerImages.length) % bannerImages.length
            )
          }
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white border border-[#B8860B] text-[#B8860B] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow hover:bg-[#B8860B] hover:text-white transition-colors font-albert-sans text-[14px] font-semibold leading-[1.25em]"
        >
          <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={() =>
            setCurrentBanner((currentBanner + 1) % bannerImages.length)
          }
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white border border-[#B8860B] text-[#B8860B] rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shadow hover:bg-[#B8860B] hover:text-white transition-colors font-albert-sans text-[14px] font-semibold leading-[1.25em]"
        >
          <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
          {bannerImages.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-[#B8860B] ${
                currentBanner === i ? "bg-[#B8860B]" : "bg-white"
              }`}
            ></div>
          ))}
        </div>
      </div>
      {/* <h1 className="font-dm-sans text-[40px] font-semibold leading-[1.25em] tracking-[-0.02em] text-center mt-8">Welcome to EcoBamboo</h1> */}
      <div className="min-h-screen bg-white">
        {/* Hero Product Section */}
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Product Image */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden w-full max-w-xs sm:max-w-full mx-auto">
                <ProductImageWithLens
                  src={productImages[selectedImage]}
                  alt="Large Bamboo Hanging Wall - Unique & Stylish Wall Art for Any Room"
                  className="w-full h-full"
                />
              </div>
              <div className="flex gap-1 sm:gap-2 overflow-x-auto">
                {productImages.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 ${
                      selectedImage === i + 1
                        ? "border-[#B8860B]"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(i + 1)}
                  >
                    <Image
                      src={img}
                      alt={`Product view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4 sm:space-y-6" ref={detailsSectionRef}>
              <div
                ref={(el) => {
                  detailRefs.current[0] = el;
                }}
              >
                <h1 className="font-albert-sans text-[28px] font-bold leading-[1.25em] text-gray-900 mb-2">
                  Large Bamboo Hanging Wall – Unique & Affordable Wall Art for Home
                </h1>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[1] = el;
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-black text-black"
                      />
                    ))}
                  </div>
                  <span className="font-albert-sans text-[14px] font-semibold leading-[32px]">
                    (66+ ratings)
                  </span>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[2] = el;
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg sm:text-xl text-red-600 font-bold">
                    ⚡
                  </span>
                  <span className="font-albert-sans text-[24px] font-semibold leading-[32px] tracking-[0.6px]">
                    Selling fast! 10 people have this in their carts.
                  </span>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[3] = el;
                }}
              >
                <div className="flex items-center gap-2 sm:gap-4 mb-2 flex-wrap">
                  <span className="font-albert-sans leading-[1.25em] text-xl sm:text-[28px] ">
                    Rs.1,600.00 PKR
                  </span>
                  <span className="font-albert-sans leading-[1.25em] text-lg sm:text-[20px] line-through text-gray-400">
                    Rs.2,000.00 PKR
                  </span>
                  <span className="bg-blue-500 text-white text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full">
                    20% OFF
                  </span>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[4] = el;
                }}
              >
                <div className="mb-2">
                  <span className="font-albert-sans text-[14px] font-semibold leading-[1.25em] tracking-wide text-sm sm:text-base">
                    Color:
                  </span>{" "}
                  <span className="font-albert-sans text-[14px] font-semibold leading-[1.25em] font-medium text-sm sm:text-base">
                    {selectedColor === 0 ? "Green" : "Bamboo Natural"}
                  </span>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setSelectedColor(0);
                        setSelectedImage(0);
                      }}
                      className={`w-8 h-8 sm:w-[40px] sm:h-[40px] rounded-full border-2 flex items-center justify-center overflow-hidden ${
                        selectedColor === 0
                          ? "border-black ring-0.2 ring-black"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={productImages[0]}
                        alt="Green"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedColor(1);
                        setSelectedImage(1);
                      }}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center overflow-hidden ${
                        selectedColor === 1
                          ? "border-black ring-0.1 ring-black"
                          : "border-gray-300"
                      }`}
                    >
                      <Image
                        src={productImages[1]}
                        alt="Bamboo Natural"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[5] = el;
                }}
              >
                <div className="mb-2">
                  <span className="font-albert-sans text-[14px] font-semibold leading-[1.25em]">
                    Quantity
                  </span>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuantity((q) => {
                          setQuantityAnim(true);
                          return Math.max(1, q - 1);
                        });
                        setTimeout(() => setQuantityAnim(false), 200);
                      }}
                    >
                      -
                    </Button>
                    <span
                      className={`px-4 sm:px-6 py-2 border rounded text-base sm:text-lg font-bold bg-gray-50 transition-transform duration-200 ${
                        quantityAnim ? "scale-125" : ""
                      }`}
                    >
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setQuantity((q) => {
                          setQuantityAnim(true);
                          return q + 1;
                        });
                        setTimeout(() => setQuantityAnim(false), 200);
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[6] = el;
                }}
              >
                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button className="flex-1 bg-black hover:bg-[#B8860B] text-[#B8860B] text-base sm:text-lg font-bold py-2 sm:py-3 flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-[#B8860B]" />{" "}
                    Add to Cart
                  </Button>
                  <Button className="flex-1 bg-[#B8860B] hover:bg-black text-white hover:text-[#B8860B] text-base sm:text-lg font-bold py-2 sm:py-3 flex items-center justify-center border border-black">
                    <span className="mr-2">
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="sm:w-5 sm:h-5"
                      >
                        <path
                          d="M6 6h15l-1.5 9h-13z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                        <circle cx="9" cy="21" r="1" fill="currentColor" />
                        <circle cx="18" cy="21" r="1" fill="currentColor" />
                      </svg>
                    </span>{" "}
                    Order Now
                  </Button>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[7] = el;
                }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg sm:text-xl">✔</span>
                  <span className="text-sm sm:text-[16px] tracking-[0.6px]">
                    Pickup available at{" "}
                    <span className="font-bold">Eco Bamboo</span>. Usually ready
                    in 24 hours
                  </span>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[8] = el;
                }}
              >
                <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                  <DrawerTrigger asChild>
                    <a
                      href="#"
                      className="text-xs hover:text-red-500 underline text-gray-600 cursor-pointer"
                    >
                      View store information
                    </a>
                  </DrawerTrigger>
                  <DrawerContent className="left-0 top-0 h-screen bottom-0 fixed w-full max-w-md md:max-w-[450px] rounded-none shadow-lg p-4 sm:p-8 flex flex-col justify-start items-start bg-white" style={{ fontFamily: 'Jost, sans-serif', fontSize: '16px', letterSpacing: '0.6px', lineHeight: '28.8px', textAlign: 'left', background: '#fff', maxWidth: '450px', padding: '50px' }}>
                    <DrawerTitle>
                      <VisuallyHidden>Store Information</VisuallyHidden>
                    </DrawerTitle>
                    <DrawerClose className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-transparent border-none p-0 m-0">
                      <X className="w-6 h-6 sm:w-7 sm:h-7" />
                    </DrawerClose>
                    <div id="store-info-animate" className="w-full">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-2" style={{ fontFamily: 'dm-sans, sans-serif', fontSize: '25px', letterSpacing: '0.6px' }}>
                        Large Bamboo Hanging Wall – Unique & Affordable Wall Art for Home
                      </h2>
                      <div className="mb-2 text-[14px] py-2" style={{ fontFamily: 'Jost, sans-serif' }}>
                        Color: <span className="font-semibold">Bamboo Natural</span>
                      </div>
                      <div className="mb-2 text-[20px] pb-2" style={{ fontFamily: 'dm-sans, sans-serif' }}>
                        Eco Bamboo
                      </div>
                      <div className="flex items-center gap-2 mb-2 text-green-700 font-semibold text-[14px] tracking-[0.6px]" style={{ fontFamily: 'Jost, sans-serif' }}>
                        <Check className="w-6 h-6 text-green-700" /> Pickup available, usually ready in 24 hours
                      </div>
                      <div className="mb-2 text-[14px] tracking-[0.6px]" style={{ fontFamily: 'Jost, sans-serif' }}>
                        Eco Bambo<br />Karkhane wali abadi,Near pso pump petrol, Nazd Ali Niaz Sweet, Chakian,Phularwan<br />Bhalwal 40410<br />Pakistan
                      </div>
                      <div className="mb-2 font-semibold text-[14px] tracking-[0.6px]" style={{ fontFamily: 'Jost, sans-serif' }}>
                        +923478237147
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[9] = el;
                }}
              >
                <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-6 flex-wrap">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setShowReturnsModal(true)}
                  >
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-[14px] tracking-[0.6px] font-bold">
                      Delivery & Return
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      ref={shareBtnRef}
                      className="relative flex items-center gap-2 cursor-pointer group"
                      onClick={() => setShowSharePopover((v) => !v)}
                      onMouseEnter={() => setShowSharePopover(true)}
                      onMouseLeave={() => setShowSharePopover(false)}
                      tabIndex={0}
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-[16px] leading-[0.6px]">
                        Share
                      </span>
                      {showSharePopover && (
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bottom-full z-50"
                          style={{ minWidth: "150px" }}
                        >
                          <div className="bg-black text-white rounded-full flex flex-col items-center text-center gap-0 px-2 py-2 shadow-lg">
                            <div className="flex items-center gap-2">
                              {/* Instagram */}
                              <a
                                href="https://www.instagram.com/ecobambo0?igsh=MWZ3Nmhzc3c2M29mZw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="hover:text-[#B8860B]"
                              >
                                <svg
                                  className="w-[14px] h-[14px] hover:text-[#B8860B] transition-colors duration-200"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21 8.306a5.985 5.985 0 0 1-3.293-1.003V15.5A5.5 5.5 0 1 1 12 10v2.25a3.25 3.25 0 1 0 3.25 3.25V2.5h2.25a3.25 3.25 0 0 0 3.25 3.25v2.556z" />
                                </svg>
                              </a>
                              {/* Facebook */}
                              <a
                                href="https://www.facebook.com/Kashifartist01?rdid=xduZdkkjBrak3vd5&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A4QUuQDso%2F#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="hover:text-[#B8860B]"
                              >
                                <svg
                                  className="w-[14px] h-[14px]"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M17 2.1h-3.2C9.6 2.1 8 3.7 8 6.2v2.1H5.5a.5.5 0 0 0-.5.5v3.1c0 .3.2.5.5.5H8v8.1c0 .3.2.5.5.5h3.2c.3 0 .5-.2.5-.5v-8.1h2.2c.3 0 .5-.2.5-.5l.1-3.1a.5.5 0 0 0-.5-.5h-2.3V6.2c0-.5.1-.7.7-.7h1.6c.3 0 .5-.2.5-.5V2.6c0-.3-.2-.5-.5-.5z" />
                                </svg>
                              </a>
                              {/* TikTok */}
                              <a
                                href="https://www.tiktok.com/@ecobambo0?_t=ZS-8vPdrvheMRW&_r=1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                              >
                                <svg
                                  className="w-[14px] h-[14px] hover:text-[#B8860B] transition-colors duration-200"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21 8.306a5.985 5.985 0 0 1-3.293-1.003V15.5A5.5 5.5 0 1 1 12 10v2.25a3.25 3.25 0 1 0 3.25 3.25V2.5h2.25a3.25 3.25 0 0 0 3.25 3.25v2.556z" />
                                </svg>
                              </a>
                              {/* WhatsApp */}
                              <a
                                href="https://wa.me/+923416995870"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="hover:text-[#B8860B]"
                              >
                                <svg
                                  className="w-[14px] h-[14px]"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 2A10 10 0 0 0 2 12c0 1.7.4 3.3 1.2 4.7L2 22l5.4-1.2A10 10 0 1 0 12 2zm5.2 14.8c-.2.5-1.1 1-1.5 1.1-.4.1-.8.2-2.7-.6-2.3-.9-3.7-3.2-3.8-3.3-.1-.1-.9-1.2-.9-2.3 0-1.1.6-1.6.8-1.8.2-.2.4-.2.5-.2.1 0 .2 0 .3.2.1.2.4.7.5.9.1.2.1.3 0 .5-.1.1-.2.3-.3.4-.1.1-.2.2-.1.4.1.2.3.6.7 1 .5.6 1.1 1.1 1.7 1.3.2.1.3.1.4 0 .1-.1.4-.5.5-.7.1-.2.2-.2.4-.1.2.1 1.2.6 1.4.7.2.1.3.1.3.2.1.1.1.2.1.3z" />
                                </svg>
                              </a>
                              {/* YouTube */}
                              <a
                                href="https://www.youtube.com/@EcoBambo"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="YouTube"
                                className="hover:text-[#B8860B]"
                              >
                                <svg
                                  className="w-[14px] h-[14px] hover:text-[#B8860B] transition-colors duration-200"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.94C18.2 6 12 6 12 6s-6.2 0-7.86.06a2.75 2.75 0 0 0-1.94 1.94A28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.94C5.8 18 12 18 12 18s6.2 0 7.86-.06a2.75 2.75 0 0 0 1.94-1.94A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
                                </svg>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                ref={(el) => {
                  detailRefs.current[10] = el;
                }}
              >
                <div className="flex items-center gap-2 mt-4 sm:mt-6 flex-wrap">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-semibold text-sm sm:text-[14px] tracking-[0.6px]">
                    Guarantee Safe Checkout
                  </span>
                  <span className="flex gap-1 sm:gap-2 ml-2">
                    <span
                      className="bg-white rounded shadow p-1 flex items-center justify-center"
                      style={{ width: 32, height: 22 }}
                    >
                      <Image
                        src="/visa.png"
                        alt="Visa"
                        width={28}
                        height={16}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span
                      className="bg-white rounded shadow p-1 flex items-center justify-center"
                      style={{ width: 32, height: 22 }}
                    >
                      <Image
                        src="/paypal.png"
                        alt="PayPal"
                        width={28}
                        height={16}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span
                      className="bg-white rounded shadow p-1 flex items-center justify-center"
                      style={{ width: 32, height: 22 }}
                    >
                      <Image
                        src="/mastercard.png"
                        alt="Mastercard"
                        width={28}
                        height={16}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span
                      className="bg-white rounded shadow p-1 flex items-center justify-center"
                      style={{ width: 32, height: 22 }}
                    >
                      <Image
                        src="/amex.png"
                        alt="Amex"
                        width={28}
                        height={16}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    <span
                      className="bg-white rounded shadow p-1 flex items-center justify-center"
                      style={{ width: 32, height: 22 }}
                    >
                      <Image
                        src="/discover.png"
                        alt="Discover"
                        width={28}
                        height={16}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling Marquee */}
        <div className="w-full overflow-hidden whitespace-nowrap bg-white border-t border-[#B8860B] py-6">
          <div
            className="flex w-max animate-marquee"
            style={{
              animation: "marquee 25s linear infinite",
            }}
          >
            {[
              "Today",
              "!Discounted Home Art – Hurry",
              "!Nationwide Free Delivery",
              "Order Now – Deal Ends Soon!",
              "Free Shipping",
            ]
              .concat([
                "Today",
                "!Discounted Home Art – Hurry",
                "!Nationwide Free Delivery",
                "Order Now – Deal Ends Soon!",
                "Free Shipping",
              ])
              .map((item, i) => (
                <span
                  key={i}
                  className="inline-block mx-4 text-[20px] italic font-medium text-black font-dm-sans"
                >
                  {item}
                  <span className="mx-4 text-[18px]">✨</span>
                </span>
              ))}
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-gray-50 py-8 sm:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="font-dm-sans text-[30px] font-bold leading-[1.25em] tracking-[-0.02em] text-gray-900 mb-4">
                How to Assemble Your Wood Art on Accent Wall - Watch Video Now!
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div
                ref={videoRef}
                className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden"
              >
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/tN9AVjaAXrg?si=T6rvzSMBvgJur8b_&mute=1${
                    videoInView ? "&autoplay=1" : "&autoplay=0"
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {/* Optionally keep the play button overlay for style, but make it non-interactive */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DIY Setup Section - Corrected Layout with All Steps */}
        <div className="py-8 sm:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="font-dm-sans text-[30px] font-bold leading-[1.25em] tracking-[-0.02em] text-gray-900 mb-4">
                Easy DIY Setup: Home Wall Art Décor
              </h2>
              {/* Urdu/Download Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
                <button
                  type="button"
                  className="px-4 sm:px-6 py-2 bg-[#B8860B] text-white rounded font-albert-sans text-[14px] font-semibold leading-[1.25em] shadow hover:bg-black transition text-sm sm:text-base"
                  onClick={() => setShowPosterModal(true)}
                >
                  اردو میں پڑھیں
                </button>
                <a
                  href="/poster.jpg"
                  download
                  className="px-4 sm:px-6 py-2 bg-black text-[#FFD700] rounded font-albert-sans text-[14px] font-semibold leading-[1.25em] shadow hover:bg-[#B8860B] hover:text-white transition text-center text-sm sm:text-base"
                >
                  ڈاؤن لوڈ کریں
                </a>
              </div>
            </div>

            <div className="relative max-w-6xl mx-auto py-8 sm:py-16">
              {/* Vertical timeline line */}
              <div
                className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 h-full w-[3px] bg-gray-300 z-0"
                style={{ minHeight: "100%" }}
              />
              {/* Golden overlay line */}
              <div
                id="golden-timeline"
                className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-[3px] bg-black z-10"
                style={{ height: "0%" }}
              />
              <div className="space-y-10 sm:space-y-16 lg:space-y-20 relative z-20">
                {/* Step 1 */}
                <div className="grid lg:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center relative justify-items-center">
                  {/* Animated circle */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div
                      id="step-circle-1"
                      className="w-8 h-8 bg-black border-4 border-black rounded-full shadow-md flex items-center justify-center text-lg font-bold text-[black] transition-all relative overflow-hidden"
                    >
                      <span
                        id="step-num-1"
                        className="absolute inset-0 flex items-center justify-center opacity-0 text-[black]"
                      >
                        1
                      </span>
                    </div>
                  </div>
                  {/* Image left, text right */}
                  <div
                    ref={step1ImgRef}
                    className="flex justify-center w-full max-w-lg pr-4 sm:pr-8"
                  >
                    <div
                      id="step-img-1"
                      className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <ProductImageWithLens
                        src={diyImages[0]}
                        alt="Step 1: Preparing bamboo materials"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] mx-auto text-center lg:text-left lg:mx-0 pl-4 sm:pl-8">
                    <h3
                      ref={step1HeadingRef}
                      className="font-dm-sans text-[24px] font-semibold leading-[38px] tracking-[0.63px] text-gray-900 mb-3 sm:mb-4"
                    >
                      <span ref={step1ScrollTextRef}>
                        <RotatingScrollText
                          text="Step 1: Preparing the Materials – Bamboo and Wooden Elements"
                          className="inline-block"
                        />
                      </span>
                    </h3>
                    <p
                      ref={step1ParaRef}
                      className="font-jost text-[16px] font-semibold leading-[1.25em] tracking-[0.6px] text-gray-600 leading-relaxed"
                    >
                      Elevate your walls with eco-friendly bamboo hanging art.
                      Perfect for homes, kitchens, bedrooms, guest areas, and
                      offices, its natural texture brings calm and rustic
                      elegance to any setting. Ideal for kitchen wall decor,
                      home goods wall decor, and exterior wall art, it blends
                      beautifully with every theme. Handcrafted with care, it's
                      a sustainable choice for modern interiors. Order today and
                      transform your walls with nature's charm.
                    </p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="grid lg:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center relative justify-items-center">
                  {/* Animated circle */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div
                      id="step-circle-1"
                      className="w-8 h-8 bg-black border-4 border-black rounded-full shadow-md flex items-center justify-center text-lg font-bold text-[black] transition-all relative overflow-hidden"
                    >
                      <span
                        id="step-num-2"
                        className="absolute inset-0 flex items-center justify-center opacity-0 text-transparent"
                      >
                        2
                      </span>
                    </div>
                  </div>
                  {/* Text left, image right */}
                  <div className="space-y-3 sm:space-y-4 order-2 lg:order-1 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg">
                    <h3
                      ref={step2HeadingRef}
                      className="font-dm-sans text-[24px] font-semibold leading-[38px] tracking-[0.63px] text-gray-900 mb-3 sm:mb-4"
                    >
                      <span ref={step2ScrollTextRef}>
                        <RotatingScrollText
                          text="Step 2: Assembling the Hanging Wall Decor"
                          className="inline-block"
                        />
                      </span>
                    </h3>
                    <p
                      ref={step2ParaRef}
                      className="font-jost text-[16px] font-semibold leading-[1.25em] text-gray-600 tracking-[0.6px] leading-relaxed"
                    >
                      Begin the assembly process by carefully connecting each
                      bamboo piece according to the provided instructions. Take
                      your time to ensure each joint is secure and properly
                      aligned. The natural flexibility of bamboo allows for easy
                      handling while maintaining structural integrity. This step
                      is crucial for creating a stable and beautiful wall art
                      piece that will last for years to come.
                    </p>
                  </div>
                  <div
                    ref={step2ImgRef}
                    className="flex justify-center order-1 lg:order-2 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg"
                  >
                    <div
                      id="step-img-2"
                      className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={diyImages[1]}
                        alt="Step 2: Assembling the hanging wall decor"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="grid lg:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center relative justify-items-center">
                  {/* Animated circle */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div
                      id="step-circle-1"
                      className="w-8 h-8 bg-black border-4 border-black rounded-full shadow-md flex items-center justify-center text-lg font-bold text-[black] transition-all relative overflow-hidden"
                    >
                      <span
                        id="step-num-3"
                        className="absolute inset-0 flex items-center justify-center opacity-0 text-transparent"
                      >
                        3
                      </span>
                    </div>
                  </div>
                  {/* Image left, text right */}
                  <div
                    ref={step3ImgRef}
                    className="flex justify-center w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg"
                  >
                    <div
                      id="step-img-3"
                      className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={diyImages[2]}
                        alt="Step 3: Securing your wall art"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] mx-auto text-center lg:text-left lg:mx-0">
                    <h3
                      ref={step3HeadingRef}
                      className="font-dm-sans text-[24px] font-semibold leading-[38px] tracking-[0.63px] text-gray-900 mb-3 sm:mb-4"
                    >
                      <span ref={step3ScrollTextRef}>
                        <RotatingScrollText
                          text="Step 3: Securing Your Wall Art"
                          className="inline-block"
                        />
                      </span>
                    </h3>
                    <p
                      ref={step3ParaRef}
                      className="font-jost text-[16px] font-semibold leading-[1.25em] tracking-[0.6px] text-gray-600 leading-relaxed"
                    >
                      Once your bamboo art piece is fully assembled, it's time
                      to mount it securely to your chosen wall. Use the provided
                      mounting hardware and follow the installation guide
                      carefully. Ensure the wall surface is clean and level
                      before mounting. The lightweight nature of bamboo makes
                      installation easy while providing a stunning focal point
                      for any room in your home.
                    </p>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="grid lg:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-20 gap-y-4 sm:gap-y-6 lg:gap-y-8 items-center relative justify-items-center">
                  {/* Animated circle */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                    <div
                      id="step-circle-1"
                      className="w-8 h-8 bg-black border-4 border-black rounded-full shadow-md flex items-center justify-center text-lg font-bold text-[black] transition-all relative overflow-hidden"
                    >
                      <span
                        id="step-num-4"
                        className="absolute inset-0 flex items-center justify-center opacity-0 text-transparent"
                      >
                        4
                      </span>
                    </div>
                  </div>
                  {/* Text left, image right */}
                  <div className="space-y-3 sm:space-y-4 order-2 lg:order-1 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg">
                    <h3
                      ref={step4HeadingRef}
                      className="font-dm-sans text-[24px] font-semibold leading-[38px] tracking-[0.63px] text-gray-900 mb-3 sm:mb-4"
                    >
                      <span ref={step4ScrollTextRef}>
                        <RotatingScrollText
                          text="Step 4: Ready to Hang, Ready to Impress"
                          className="inline-block"
                        />
                      </span>
                    </h3>
                    <p
                      ref={step4ParaRef}
                      className="font-jost text-[16px] font-semibold leading-[1.25em] tracking-[0.6px] text-gray-600 leading-relaxed"
                    >
                      Congratulations! Your beautiful bamboo wall art is now
                      ready to transform your space. Step back and admire your
                      handiwork – you've successfully created an eco-friendly,
                      stylish accent that brings natural beauty indoors. The
                      warm tones and organic textures of bamboo will complement
                      any décor style while adding a touch of sustainable
                      elegance to your home environment.
                    </p>
                  </div>
                  <div
                    ref={step4ImgRef}
                    className="flex justify-center order-1 lg:order-2 w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-lg"
                  >
                    <div
                      id="step-img-4"
                      className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[540px] aspect-square bg-gray-100 rounded-lg overflow-hidden"
                    >
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
          </div>
        </div>

        <h2 className="font-dm-sans text-[30px] font-bold leading-[1.25em] tracking-[-0.02em] text-gray-900 mb-4 text-center">
          Coastal Farmhouse Decor House Plants for Sale!{" "}
        </h2>
        {/* Bathroom Art Decor Section */}
        <section className="w-full bg-gray-50 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-4 sm:space-y-6 md:pr-4 lg:pr-8">
              <h2 className="font-dm-sans text-[30px] text-center sm:text-left sm:text-[40px] font-semibold leading-[1.25em] tracking-[-0.02em] text-gray-900 mb-2 text-left">
                Bathroom Art Decor
              </h2>
              <h3 className="font-dm-sans text-[20px] text-center sm:text-left sm:text-[30px] font-semibold leading-[38px] text-gray-800 mb-3 sm:mb-4 text-left">
                Compact Vertical Display Crafted for Tight Urban Spaces
              </h3>
              <p className="font-dm-sans text-[12px] sm:text-[20px] font-semibold leading-[1.25em] text-gray-700 mb-3 sm:mb-4 text-left">
                A compact bamboo hanging wall that blends natural warmth with
                modern simplicity.
              </p>
              <p className="font-dm-sans text-[20px] font-semibold leading-[1.25em] text-gray-600 mb-6 sm:mb-8 text-left">
                "Compact Bamboo Wall Display"*
              </p>
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-black text-[#FFD700] rounded shadow font-semibold text-base sm:text-lg flex items-center gap-2 w-fit hover:bg-[#B8860B] hover:text-white transition">
                Shop Now
                <span>
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="sm:w-6 sm:h-6"
                  >
                    <path
                      d="M5 12h14m0 0l-6-6m6 6l-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
            {/* Right: Image */}
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-xl aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={bathroomImages[0]}
                  alt="Bathroom Art Decor"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <div className="py-8 sm:py-12">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-7xl mx-auto mt-0">
                <div ref={collageLeftRef} className="relative rounded-2xl overflow-hidden min-h-[400px] md:min-h-[500px] bg-[#f5f0e6] group flex flex-col justify-end">
                  <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-145">
                    <Image
                      src="/pic/Large Bamboo Hanging Wall/large-bamboo-hanging-wall-unique-affordable-wall-art-for-home-152452.jpg"
                      alt="Large Wall Art"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button className="absolute left-6 bottom-6 bg-white text-black font-bold rounded-full px-6 py-2 shadow-lg text-lg hover:bg-black hover:text-[#FFD700] transition">
                    Shop Now
                  </button>
                </div>
                <div className="flex flex-col gap-6 h-full">
                  <div ref={collageTopRightRef} className="relative rounded-2xl overflow-hidden min-h-[195px] flex-1 bg-[#f5f0e6] group flex flex-col justify-end">
                    <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-145">
                      <Image
                        src="/pic/Big Bamboo Household Standing Plant Pot/eco-bambo-bamboo-big-flower-pot-red-big-bamboo-household-standing-plant-pot-perfect-for-home-garden-1155268441.jpg"
                        alt="Red Bamboo Pot"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button className="absolute left-6 bottom-6 bg-white text-black font-bold rounded-full px-6 py-2 shadow-lg text-lg hover:bg-black hover:text-[#FFD700] transition">
                      Shop Now
                    </button>
                  </div>
                  <div ref={collageBottomRightRef} className="relative rounded-2xl overflow-hidden min-h-[195px] flex-1 bg-[#f5f0e6] group flex flex-col justify-end">
                    <div className="w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-145">
                      <Image
                        src="/pic/Big Bamboo Household Standing Plant Pot/big-bamboo-household-standing-plant-pot-perfect-for-home-garden-118593.jpg"
                        alt="Standing Plant Pot"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button className="absolute left-6 bottom-6 bg-white text-black font-bold rounded-full px-6 py-2 shadow-lg text-lg hover:bg-black hover:text-[#FFD700] transition">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section before Popular Products */}
        <section className="w-full py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4">
            <h2 className="font-dm-sans text-[24px] font-semibold leading-[1.25em] tracking-[0.63px] text-gray-900 mb-8 sm:mb-12 text-left heading-animate">
              Explore, Understand, Shop Confidently
            </h2>
            <div className="space-y-2">
              {faqData.map((faq, idx) => (
                <div key={idx} className="bg-white border rounded">
                  <button
                    className="w-full text-left flex items-center justify-between px-4 py-2 focus:outline-none"
                    onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  >
                    <span className="font-dm-sans text-[16px] font-semibold tracking-[0.6px] leading-[38px] text-gray-900">
                      {faq.q}
                    </span>
                    <span className="font-dm-sans text-[14px] text-gray-400 ml-4">
                      {openFaq === idx ? "–" : "+"}
                    </span>
                  </button>
                  <div
                    className="transition-all duration-500 ease-in-out overflow-hidden px-6"
                    style={{
                      maxHeight: openFaq === idx ? "500px" : "0px",
                      opacity: openFaq === idx ? 1 : 0,
                      paddingTop: openFaq === idx ? "16px" : "0px",
                      paddingBottom: openFaq === idx ? "24px" : "0px",
                    }}
                  >
                    <p className="font-dm-sans text-[14px] leading-[1.25em] text-gray-700">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section
          ref={popularSectionRef}
          className={`w-full bg-white py-12 sm:py-20 overflow-x-hidden ${
            isLargeScreen ? "min-h-[400px] sm:min-h-[600px]" : ""
          }`}
        >
          <h1 className="font-dm-sans text-[30px] font-semibold leading-[1.25em] tracking-[0.63px] text-gray-900 mb-4 text-center">
            Explore Full Collection
          </h1>
          <h2
            ref={popularHeadingRef}
            className="font-dm-sans font-bold text-[16px] sm:text-[48px] leading-[23px] tracking-[0.63px] text-center mb-8 sm:mb-12 px-3 sm:px-4"
          >
            All Time <span className="text-[#B8860B]">Popular</span> Products
          </h2>
          <div className="relative">
            <div
              ref={popularRowRef}
              className={`flex gap-4 sm:gap-8 ${
                isLargeScreen
                  ? "w-max"
                  : "w-full overflow-x-auto flex-nowrap scrollbar-none"
              } px-4 sm:px-10`}
              style={isLargeScreen ? {} : { WebkitOverflowScrolling: "touch" }}
            >
              {popularProducts.map((item, i) => (
                <div
                  key={i}
                  className="w-[200px] sm:w-[300px] flex-shrink-0 text-center group relative"
                  ref={(el) => {
                    popularImageRefs.current[i] = el;
                  }}
                  onTouchStart={() => {
                    if (!isLargeScreen) setActiveProduct(i);
                  }}
                  onMouseLeave={() => {
                    if (!isLargeScreen) setActiveProduct(null);
                  }}
                >
                  <div className="relative">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="rounded-lg mx-auto w-full h-auto"
                    />
                    {/* Add to Cart Button Overlay */}
                    <button
                      className={`absolute inset-0 flex items-end justify-center transition-opacity duration-300 z-10
                        ${
                          isLargeScreen
                            ? "opacity-0 group-hover:opacity-100"
                            : activeProduct === i
                            ? "opacity-100"
                            : "opacity-0"
                        }
                        bg-black/50`}
                      style={{
                        pointerEvents:
                          isLargeScreen || activeProduct === i
                            ? "auto"
                            : "none",
                      }}
                    >
                      <span className="bg-[#B8860B] text-white font-bold px-4 py-2 mb-5 hover:bg-[#000] hover:text-white rounded-md shadow-lg text-base sm:text-[14px] flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                      </span>
                    </button>
                  </div>
                  <h3
                    ref={(el) => {
                      popularNameRefs.current[i] = el;
                    }}
                    className="font-albert-sans text-[18px] font-semibold leading-[1.25em] mt-3 sm:mt-4 text-gray-800"
                  >
                    {item.name.replace(/&/g, "and")}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <div className="py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-8 sm:gap-y-10 gap-x-4 sm:gap-x-6 text-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  ref={featureRefs[i]}
                  className="flex flex-col items-center justify-center space-y-2 opacity-0"
                >
                  <div className="text-[#B8860B]">
                    {
                      [
                        <Truck className="w-8 h-8 sm:w-12 sm:h-12" />,
                        <Undo2 className="w-8 h-8 sm:w-12 sm:h-12" />,
                        <ShieldCheck className="w-8 h-8 sm:w-12 sm:h-12" />,
                        <Headphones className="w-8 h-8 sm:w-12 sm:h-12" />,
                      ][i]
                    }
                  </div>
                  <div className="font-albert-sans text-[18px] font-semibold leading-[1.25em] text-gray-900">
                    {
                      [
                        "Free Shipping",
                        "Easy Returns",
                        "Secure Payment",
                        "24/7 Support",
                      ][i]
                    }
                  </div>
                  <div className="font-albert-sans text-[14px] font-semibold leading-[1.25em] text-gray-600">
                    {
                      [
                        "On orders over Rs.8,000 PKR",
                        "30-day return policy",
                        "100% secure checkout",
                        "Customer service",
                      ][i]
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Returns & Exchanges Policy Modal */}
      {showReturnsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="relative w-full max-w-4xl max-h-[90vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-700 ease-out"
            style={{
              animation: "modalSlideIn 0.7s ease-out",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowReturnsModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              <h2 className="font-albert-sans text-[20px] font-bold text-gray-900 mb-6 text-center">
                Returns & Exchanges Policy
              </h2>

              <div className="font-albert-sans text-[14px] leading-relaxed text-gray-700 space-y-4">
                <p>
                  At Eco Bamboo, we are committed to providing high-quality,
                  eco-friendly products. If you are not satisfied with your
                  purchase, you can request a return or refund based on the
                  conditions outlined below.
                </p>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    1. Return Policy
                  </h3>
                  <p className="mb-2">
                    We offer a flexible return policy for both domestic and
                    international orders:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <strong>Pakistan Orders:</strong> Returns must be
                      requested within 7 to 14 days of receiving the product.
                    </li>
                    <li>
                      <strong>International Orders:</strong> Returns must be
                      requested within 15 to 30 days of receiving the product.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    Return Request Deadline:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      You must initiate your return request within 2 to 3 days
                      of receiving the order.
                    </li>
                    <li>
                      Requests submitted after 3 days will not be accepted.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    Eligibility for Returns
                  </h3>
                  <p className="mb-2">
                    To be eligible for a return, your item must:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Be unused, unworn, and in its original packaging</li>
                    <li>
                      Include tags, accessories, and proof of purchase (receipt
                      or order confirmation)
                    </li>
                    <li>Be returned for one of the following valid reasons:</li>
                    <ul className="list-disc list-inside space-y-1 ml-8 mt-1">
                      <li>Damaged product received</li>
                      <li>Color difference from what was ordered</li>
                      <li>Size issue</li>
                      <li>Other solid reasons approved by our team</li>
                    </ul>
                  </ul>
                  <p className="mt-2">
                    <strong>Return Proof Requirement:</strong> Customers must
                    provide photo or video evidence of the issue before the
                    return is approved.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    How to Request a Return:
                  </h3>
                  <p>
                    Email us at{" "}
                    <a
                      href="mailto:ecobambooarts@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      ecobambooarts@gmail.com
                    </a>{" "}
                    with your order number and proof of the issue.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    Return Address:
                  </h3>
                  <p className="bg-gray-50 p-3 rounded-lg">
                    Bamboohandicrafts, Near PSO Petrol Pump Chakian, Shop Number
                    35, Karkhane Wali Abadi, Near Ali Niaz Sweet, Chakian,
                    Karkhane Wali Abadi, Dakkhana Khas, Dhori, Tehsil Bhalwal,
                    District Sargodha, Postal Code 40100, Phularwa 40410,
                    Pakistan.
                  </p>
                  <p className="mt-2 text-sm text-red-600">
                    <strong>Important:</strong> Items sent back without prior
                    approval will not be accepted.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    2. Damages & Issues
                  </h3>
                  <p>
                    Please inspect your order upon delivery. If your item is
                    damaged, defective, or incorrect, contact us immediately at{" "}
                    <a
                      href="mailto:ecobambooarts@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      ecobambooarts@gmail.com
                    </a>{" "}
                    or call us at{" "}
                    <a
                      href="tel:+923416995870"
                      className="text-blue-600 hover:underline"
                    >
                      +92 341 6995870
                    </a>{" "}
                    so we can resolve the issue.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    3. Non-Returnable Items
                  </h3>
                  <p className="mb-2">
                    Certain items cannot be returned, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Used or washed items</li>
                  </ul>
                  <p className="mt-2">
                    If you have any questions about the return eligibility of
                    your item, please contact us before initiating a return.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    4. Exchange Policy
                  </h3>
                  <p className="mb-2">
                    If you need a different size or color, the fastest way to
                    get the right product is to:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 ml-4">
                    <li>Request a return for your current item</li>
                    <li>
                      Once approved, place a new order for the correct product
                    </li>
                  </ol>
                  <p className="mt-2">
                    Exchanges will be processed only after we receive and
                    inspect the returned item.
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    5. Refund Process
                  </h3>
                  <p className="mb-2">
                    Once we receive and inspect your returned item, we will
                    notify you about the refund approval status.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <strong>Approved Refunds:</strong> The amount will be
                      refunded to your original payment method within 10
                      business days.
                    </li>
                    <li>
                      <strong>Processing Time:</strong> Some banks or credit
                      card companies may take additional time to process the
                      refund.
                    </li>
                  </ul>
                  <p className="mt-2">
                    If 15 business days have passed since your refund was
                    approved and you haven't received it, please contact us at{" "}
                    <a
                      href="mailto:ecobambooarts@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      ecobambooarts@gmail.com
                    </a>{" "}
                    or call us at{" "}
                    <a
                      href="tel:+923416995870"
                      className="text-blue-600 hover:underline"
                    >
                      +92 341 6995870
                    </a>
                    .
                  </p>
                </div>

                <div>
                  <h3 className="font-albert-sans text-[16px] font-bold text-gray-900 mb-2">
                    Need Help?
                  </h3>
                  <p className="mb-2">
                    For any return or refund-related queries, feel free to
                    contact us:
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      <strong>Email:</strong>{" "}
                      <a
                        href="mailto:ecobambooarts@gmail.com"
                        className="text-blue-600 hover:underline"
                      >
                        ecobambooarts@gmail.com
                      </a>
                    </li>
                    <li>
                      <strong>Phone:</strong>{" "}
                      <a
                        href="tel:+923416995870"
                        className="text-blue-600 hover:underline"
                      >
                        +92 341 6995870
                      </a>
                    </li>
                  </ul>
                  <p className="mt-2">
                    <strong>Return Address:</strong>
                  </p>
                  <p className="bg-gray-50 p-3 rounded-lg">
                    Bamboohandicrafts, Near PSO Petrol Pump Chakian, Shop Number
                    35, Karkhane Wali Abadi, Near Ali Niaz Sweet, Chakian,
                    Karkhane Wali Abadi, Dakkhana Khas, Dhori, Tehsil Bhalwal,
                    District Sargodha, Postal Code 40100, Phularwa 40410,
                    Pakistan.
                  </p>
                  <p className="mt-4 text-center font-semibold text-gray-900">
                    We are happy to assist you!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes modalSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateY(0deg);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.9) rotateY(180deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateY(360deg);
          }
        }
      `}</style>
    </>
  );
}
