import React, { useState } from "react";
import { Product } from "./ProductGrid";
import { classNames, goldText } from "../utils";

export function ProductManager({
  products,
  onUpdate,
}: {
  products: Product[];
  onUpdate: (products: Product[]) => void;
}) {
  const [localProducts, setLocalProducts] = useState(products);

  const handlePriceChange = (id: string, price: string) => {
    const newProducts = localProducts.map((p) => {
      if (p.id === id) {
        return { ...p, price: Number(price) };
      }
      return p;
    });
    setLocalProducts(newProducts);
  };

  const handleImageChange = (id: string, img: string) => {
    const newProducts = localProducts.map((p) => {
      if (p.id === id) {
        return { ...p, img };
      }
      return p;
    });
    setLocalProducts(newProducts);
  };

  const handleSave = () => {
    onUpdate(localProducts);
  };

  return (
    <div className="space-y-4">
      {localProducts.map((product) => (
        <div
          key={product.id}
          className="p-4 rounded-xl bg-white/5 border border-white/10"
        >
          <div className="font-serif text-lg">{product.name}</div>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Price</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-yellow-200/80">Image URL</label>
              <input
                type="text"
                value={product.img}
                onChange={(e) => handleImageChange(product.id, e.target.value)}
                className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95"
      >
        Save Changes
      </button>
    </div>
  );
}
