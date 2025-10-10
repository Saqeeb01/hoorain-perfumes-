import React from "react";
import { motion } from "framer-motion";

const aboutImage = "/images/perfume-frame.png";

export function AboutUs() {
  return (
    <section className="relative py-24 bg-black">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${aboutImage})`, opacity: 0.2 }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="text-4xl font-serif text-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A Legacy of Fragrance
        </motion.h2>
        <motion.p
          className="text-lg text-ivory/80 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hoorain Perfumes is a family-owned business dedicated to the art of
          perfumery. We blend traditional Arabic techniques with modern
          sensibilities to create unique and captivating fragrances that tell a
          story.
        </motion.p>
        <motion.a
          href="#about"
          className="px-8 py-3 font-semibold text-black bg-gold rounded-full transition-all duration-300 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/30"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Discover Our Story
        </motion.a>
      </div>
    </section>
  );
}
