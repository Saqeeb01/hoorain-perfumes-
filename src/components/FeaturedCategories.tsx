import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Attar",
    image: "../../public/images/attar-frame.png",
    description: "Concentrated perfume oils, rich and long-lasting.",
  },
  {
    name: "Perfumes",
    image: "../../public/images/perfume-frame.png",
    description: "Elegant sprays for a modern, sophisticated aura.",
  },
  {
    name: "Agarbatti",
    image: "../../public/images/agrabatti-frame.png",
    description: "Incense sticks to sanctify your space.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center text-gold mb-4">
          Our Collections
        </h2>
        <p className="text-lg text-ivory/80 text-center max-w-2xl mx-auto mb-12">
          Discover our curated selections of fine fragrances, each with a unique
          story.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              className="relative group overflow-hidden rounded-lg shadow-lg"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-3xl font-serif text-ivory">
                  {category.name}
                </h3>
                <p className="text-ivory/90 mt-2">{category.description}</p>
                <a
                  href="#collections"
                  className="mt-4 inline-block text-gold font-semibold tracking-wider uppercase text-sm"
                >
                  Shop Now &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
