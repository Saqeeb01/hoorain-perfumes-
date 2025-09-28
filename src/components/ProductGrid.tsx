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
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {items.map((p, i) => (
        <motion.div
          key={p.id}
          className="group relative cursor-pointer"
          onClick={() => openPage("product", p.id)}
          variants={cardVariants}
          custom={i}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="relative overflow-hidden rounded-lg bg-white/5 border border-white/10 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-gold/20 group-hover:border-gold/50">
            <div className="overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="font-serif text-2xl text-ivory">{p.name}</h3>
              <p className="text-sm text-ivory/70 mt-1">{p.note}</p>
              <div className="flex justify-between items-center mt-4">
                <p className="text-xl font-semibold text-gold">
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
                <button
                  onClick={() => addToCart(p.id, 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gold text-black rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 hover:bg-gold-light"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            {p.tag && (
              <div className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-black/50 text-gold rounded-full backdrop-blur-sm">
                {p.tag}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
