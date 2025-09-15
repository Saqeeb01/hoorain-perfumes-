import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames, goldText } from "../utils";

export function Hero({ heroImages }: { heroImages: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % heroImages.length),
      4500
    );
    return () => clearInterval(id);
  }, [heroImages.length]);
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative h-[62vh] md:h-[70vh] overflow-hidden rounded-3xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={heroImages[idx]}
              alt="Hoorain hero"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <div
              className={classNames(
                "font-serif text-3xl md:text-5xl mb-2",
                goldText
              )}
            >
              {" "}
              Elevate Your Essence{" "}
            </div>
            <p className="max-w-xl text-yellow-50/85">
              {" "}
              Fine attars and perfumes crafted with oud, rose, amber and musk —
              designed for lasting elegance in the Indian climate.{" "}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#collections"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
              >
                {" "}
                Shop Collections{" "}
              </a>
              <a
                href="#about"
                className="px-5 py-2.5 rounded-xl border border-yellow-400/40 hover:bg-white/5 transition"
              >
                {" "}
                Our Story{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
