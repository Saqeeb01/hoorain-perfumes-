import React from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";

const categories = [
  {
    name: "Perfumes",
    image: "/images/proimages/perfume-frame.png",
    description: "Elegant sprays for a modern, sophisticated aura.",
    href: "#collections/perfume",
  },
  {
    name: "Attar",
    image: "/images/proimages/attar-frame.png",
    description: "Concentrated perfume oils, rich and long-lasting.",
    href: "#collections/attar",
  },
  {
    name: "Agarbatti",
    image: "/images/proimages/agrabatti-frame.png",
    description: "Incense sticks to sanctify your space.",
    href: "#collections/agarbatti",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-black/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-serif text-center text-gold mb-4"
        >
          Explore Our Collections
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-beige/80 text-center max-w-3xl mx-auto mb-16"
        >
          From the deep, resonant notes of traditional Attars to the bright,
          airy essences of our modern Perfumes, discover a scent that tells your
          story.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="relative group overflow-hidden rounded-xl shadow-2xl shadow-black/30"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-96 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-center">
                <h3 className="text-3xl font-serif text-beige">
                  {category.name}
                </h3>
                <p className="text-beige/90 mt-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.description}
                </p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView="visible"
                  className="transition-all duration-300 group-hover:opacity-100"
                >
                  <Button href={category.href} size="md">
                    Shop {category.name}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
