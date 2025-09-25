import React from "react";
import { Hero } from "../Hero";
import { Section } from "../Section";
import { ProductGrid, Product } from "../ProductGrid";
import { FeaturedCategories } from "../FeaturedCategories";
import { Testimonials } from "../Testimonials";
import { AboutUs } from "../AboutUs";

export function Home({
  addToCart,
  products,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
}) {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Section
        title="Best Sellers"
        subtitle="Our most loved fragrances, adored by connoisseurs."
      >
        <ProductGrid addToCart={addToCart} limit={4} products={products.filter(p => p.tag === 'Best Seller')} />
      </Section>
      <AboutUs />
      <Testimonials />
    </div>
  );
}
