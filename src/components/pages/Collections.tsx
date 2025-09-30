import React, { useState, useEffect, useRef } from "react";
import { Section } from "../Section";
import { ProductGrid, Product } from "../ProductGrid";
import { Category, Page } from "../../types";

const BATCH_SIZE = 8;

export function Collections({
  addToCart,
  products,
  category,
  openPage,
}: {
  addToCart: (id: string, qty?: number) => void;
  products: Product[];
  category: Category;
  openPage: (page: Page, param?: string) => void;
}) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const loader = useRef(null);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  const handleObserver = (entities: IntersectionObserverEntry[]) => {
    const target = entities[0];
    if (target.isIntersecting) {
      setVisibleCount((prev) =>
        Math.min(prev + BATCH_SIZE, filteredProducts.length)
      );
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader.current, filteredProducts.length]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [category]);

  return (
    <div>
      <Section
        title="Collections"
        subtitle="Explore our best-sellers and limited editions."
      >
        <ProductGrid
          addToCart={addToCart}
          products={filteredProducts.slice(0, visibleCount)}
          openPage={openPage}
        />
        <div
          ref={loader}
          data-testid="infinite-scroll-loader"
          className={
            visibleCount >= filteredProducts.length ? "h-0" : "h-20"
          }
        />
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
