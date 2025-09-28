import React from "react";
import { Hero } from "../Hero";
import { Section } from "../Section";
import { ProductGrid, Product } from "../ProductGrid";
import { FeaturedCategories } from "../FeaturedCategories";
import { Testimonials } from "../Testimonials";
import { AboutUs } from "../AboutUs";
import { Page } from "../../types";

export function Home({
  addToCart,
  products,
  openPage,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
  openPage: (page: Page, param?: string) => void;
}) {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Section
        title="Best Sellers"
        subtitle="Our most loved fragrances, adored by connoisseurs."
      >
        <ProductGrid
          addToCart={addToCart}
          limit={4}
          products={products.filter((p) => p.tag === "Best Seller")}
          openPage={openPage}
        />
      </Section>
      <AboutUs />
      <Testimonials />
    </div>
  );
}
