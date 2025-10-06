import React from "react";
import { Section } from "../Section";
import { Product, ProductGrid } from "../ProductGrid";
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
        {products.length > 0 ? (
          <ProductGrid
            products={products}
            addToCart={addToCart}
            openPage={openPage}
          />
        ) : (
          <div className="text-center text-beige/70 py-12">
            <p className="text-2xl">No products found</p>
            <p className="mt-2 text-lg">
              Please try a different search term or browse our categories.
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}