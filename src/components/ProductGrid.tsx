import React from "react";
import { motion } from "framer-motion";
import { classNames } from "../utils";
import { Plus } from "lucide-react";
import { Page } from "../types";

export type Product = {
  id: string;
  name: string;
  note: string;
  price: number;
  img: string;
  tag: string;
  category: string;
  quantity?: string;
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function ProductGrid({
  addToCart,
  limit,
  products,
  openPage,
}: {
  addToCart: (id: string, qty?: number) => void;
  limit?: number;
  products: Product[];
  openPage: (page: Page, param?: string) => void;
}) {
  const items = limit ? products.slice(0, limit) : products;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {items.map((p, i) => (
        <motion.div
          key={p.id}
          className="group relative cursor-pointer"
          onClick={() => openPage("product", p.id)}
          variants={cardVariants}
          custom={i % 8}
          initial="visible"
          animate="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
        >
          <div className="relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-xl border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gold/20 group-hover:border-gold/30">
            <div className="overflow-hidden aspect-square">
              <motion.img
                src={p.img || ""}
                alt={p.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
            </div>
            <div className="p-5 text-center">
              <h3 className="font-serif text-2xl text-beige">{p.name}</h3>
              {p.quantity && (
                <p className="text-sm text-beige/70">{p.quantity}</p>
              )}
              <p className="text-sm text-beige/60 mt-1 h-10">{p.note}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-2xl font-semibold text-gold">
                  {p.price
                    ? `₹${p.price.toLocaleString("en-IN")}`
                    : "Inquire"}
                </p>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p.id, 1);
                  }}
                  className="w-11 h-11 flex items-center justify-center bg-gold text-black rounded-full"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <Plus size={22} />
                </motion.button>
              </div>
            </div>
            {p.tag && (
              <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-black/60 text-gold rounded-full backdrop-blur-md border border-gold/30">
                {p.tag}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
