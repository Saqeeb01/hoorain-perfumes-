import React from "react";
import { motion } from "framer-motion";
import { classNames, goldBorder, glass, goldText } from "../utils";

export type Product = {
  id: string;
  name: string;
  note: string;
  price: number;
  img: string;
  tag: string;
  category: string;
};

export function ProductGrid({
  addToCart,
  limit,
  products,
}: {
  addToCart: (id: string, qty?: number) => void;
  limit?: number;
  products: Product[];
}) {
  const items = limit ? products.slice(0, limit) : products;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ y: -4 }}
          className={classNames(
            "rounded-2xl overflow-hidden",
            goldBorder,
            glass
          )}
        >
          <div className="relative h-64">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-3 top-3 px-2 py-1 rounded-lg text-[10px] uppercase tracking-wider bg-white/10 border border-white/20">
              {p.tag}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-serif text-lg">{p.name}</div>
                <div className="text-xs text-yellow-50/70">{p.note}</div>
              </div>
              <div className="text-right">
                <div className={classNames("font-semibold", goldText)}>
                  {" "}
                  ₹{p.price.toLocaleString("en-IN")}{" "}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => addToCart(p.id, 1)}
                className="flex-1 px-3 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95"
              >
                {" "}
                Add to Cart{" "}
              </button>
              <a
                href="#contact"
                className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/5"
              >
                {" "}
                Enquire{" "}
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
