import React from "react";
import { Hero } from "../Hero";
import { USPStrip } from "../USPStrip";
import { Section } from "../Section";
import { ProductGrid, Product } from "../ProductGrid";
import { SplitShowcase } from "../SplitShowcase";
import { classNames, glass, goldBorder, goldText } from "../../utils";

export function Home({
  addToCart,
  products,
  heroImages,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
  heroImages: string[];
}) {
  return (
    <div>
      <Hero heroImages={heroImages} />
      <USPStrip />
      <Section
        title="Signature Blends"
        subtitle="Modern luxury, crafted in Karnataka."
      >
        <ProductGrid addToCart={addToCart} limit={4} products={products} />
      </Section>
      <SplitShowcase />
      <Section
        title="Why Hoorain"
        subtitle="We obsess over quality so you can wear it with confidence."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Long-Lasting Oils",
              d: "Premium concentration for projection that lingers all day.",
            },
            {
              t: "Authentic Sourcing",
              d: "Notes sourced from trusted houses — oud, rose, amber & more.",
            },
            {
              t: "Gift-Ready",
              d: "Gold-foiled boxes & complimentary gift wrap on ₹2,999+.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={classNames("p-6 rounded-2xl", glass, goldBorder)}
            >
              <div className={classNames("font-serif text-xl mb-2", goldText)}>
                {f.t}
              </div>
              <p className="text-yellow-50/80">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
