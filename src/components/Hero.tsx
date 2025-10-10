import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { classNames } from "../utils";
import { Button } from "./Button";

const heroImages = [
  "../../public/images/hero-image-1.png",
  "../../public/images/hero-img-2.png", 
  "../../public/images/hero-img-3.png",
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % heroImages.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]);

  return (
    <div ref={heroRef} className="relative h-[90vh] w-full overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={idx}
          src={heroImages[idx]}
          alt="Luxurious perfume bottles and fragrance elements"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: yBg }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4"
        style={{ y: yText, opacity: opacityText }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-beige leading-tight"
        >
          Experience the Essence of Luxury
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-4 text-lg md:text-xl text-beige/80 max-w-2xl"
        >
          Hoorain Perfumes
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="mt-10"
        >
          <Button href="#collections" size="lg">
            Discover Our Collections
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
