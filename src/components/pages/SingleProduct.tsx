import React from "react";
import { Product } from "../ProductGrid";
import { Section } from "../Section";
import { Button } from "../Button";

export function SingleProduct({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (id: string, qty?: number) => void;
}) {
  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.img || ""}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-serif text-ivory">{product.name}</h1>
          {product.quantity && (
            <p className="text-ivory/80">{product.quantity}</p>
          )}
          <p className="text-ivory/80">{product.note}</p>
          <p className="text-3xl font-semibold text-gold">
            {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "Price not available"}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={() => addToCart(product.id, 1)}
              className="w-full"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}