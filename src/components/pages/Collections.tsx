import React from "react";
import { Section } from "../Section";
import { Product } from "../ProductGrid";
import { Category, Page } from "../../types";

export function Collections({
  products,
  category,
  openPage,
  addToCart,
  searchQuery,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
  category: Category;
  openPage: (page: Page, param?: string) => void;
  searchQuery: string;
}) {
  const title = searchQuery ? "Search Results" : "Our Collections";
  const subtitle = searchQuery
    ? `Showing results for "${searchQuery}"`
    : "Explore our best-sellers and limited editions.";

  return (
    <div>
      <Section title={title} subtitle={subtitle}>
        <div className="text-center text-beige/70 py-12">
          <p className="text-2xl">Debugging Mode</p>
          <p className="mt-2 text-lg">
            Number of products received: {products.length}
          </p>
        </div>
      </Section>
    </div>
  );
}