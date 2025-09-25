import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames } from "../utils";

const heroImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?fm=jpg&q=80&w=1920&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1523293182086-7651a899d37f?fm=jpg&q=80&w=1920&ixlib=rb-4.1.0",
  "https://images.unsplash.com/photo-1622162227449-6551637402a7?q=80&w=1920&auto=format&fit=crop",
];

export function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={idx}
          src={heroImages[idx]}
          alt="Hoorain hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl text-ivory"
        >
          Hoorain Perfumes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-4 text-lg md:text-xl text-ivory/80"
        >
          Where Fragrance Meets Elegance
        </motion.p>
        <motion.a
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          href="#collections"
          className="mt-8 px-8 py-3 font-semibold text-black bg-gold rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
        >
          Shop Now
        </motion.a>
      </div>
    </div>
  );
}