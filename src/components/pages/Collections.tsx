import React from "react";
import { Section } from "../Section";
import { ProductGrid, Product } from "../ProductGrid";

export function Collections({
  addToCart,
  products,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
}) {
  return (
    <div>
      <Section
        title="Collections"
        subtitle="Explore our best-sellers and limited editions."
      >
        <ProductGrid addToCart={addToCart} products={products} />
      </Section>
      <Section
        title="Gifting"
        subtitle="Make it unforgettable with bespoke notes and gift wrap."
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1600962815717-d909b6289095?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-72 object-cover rounded-2xl border border-white/10"
          />
          <div className="space-y-3 text-yellow-50/80">
            <p>
              {" "}
              Add a handwritten card, choose ribbon color, and ship directly to
              your loved one.{" "}
            </p>
            <p>
              {" "}
              Corporate gifting? We offer customized sleeves and bulk rates.{" "}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
