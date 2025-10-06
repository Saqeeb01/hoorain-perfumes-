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
  // 1. Search Results View
  if (searchQuery) {
    return (
      <Section
        title="Search Results"
        subtitle={`Showing results for "${searchQuery}"`}
      >
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
    );
  }

  // 2. Single Category View
  if (category !== "all") {
    const title = category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <Section title={title} subtitle={`Explore our collection of ${title}`}>
        <ProductGrid
          products={products}
          addToCart={addToCart}
          openPage={openPage}
        />
      </Section>
    );
  }

  // 3. Default Grouped View (category is 'all' and no search)
  const orderedCategories = ["perfumes", "attar", "agarbatti"];
  const groupedProducts = products.reduce((acc, product) => {
    const productCategory = product.category || "uncategorized";
    if (!acc[productCategory]) {
      acc[productCategory] = [];
    }
    acc[productCategory].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div>
      <Section
        title="Our Collections"
        subtitle="Explore our best-sellers and limited editions."
      />
      {orderedCategories.map((cat) => {
        const categoryProducts = groupedProducts[cat] || [];
        if (categoryProducts.length === 0) return null;
        return (
          <div key={cat} className="mb-16">
            <Section title={cat.charAt(0).toUpperCase() + cat.slice(1)}>
              <ProductGrid
                products={categoryProducts}
                addToCart={addToCart}
                openPage={openPage}
              />
            </Section>
          </div>
        );
      })}
    </div>
  );
}