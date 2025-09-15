import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Page, pages } from "./types";
import { classNames, goldBorder, goldText, glass } from "./utils";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { ProductGrid } from "./components/ProductGrid";
import { Section } from "./components/Section";
import data from "./data.json";
import { SiteBackdrop } from "./components/SiteBackdrop";
import { TopBar } from "./components/TopBar";
import { PageShell } from "./components/PageShell";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Collections } from "./components/pages/Collections";
import { Contact } from "./components/pages/Contact";
import { Admin } from "./components/pages/Admin";
import { CartDrawer } from "./components/CartDrawer";

import { Product } from "./components/ProductGrid";
// --------- ROOT APP ---------
export default function HoorainPerfumes() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setHeroImages(data.heroImages);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Simple hash routing (no extra deps)
  useEffect(() => {
    const applyFromHash = () => {
      const h = (location.hash.replace("#", "") || "home") as Page;
      setPage(pages.includes(h as Page) ? (h as Page) : "home");
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openPage = (p: Page) => {
    if (page !== p) location.hash = `#${p}`;
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, line) => {
      const item = products.find((p) => p.id === line.id);
      return sum + (item ? item.price * line.qty : 0);
    }, 0);
  }, [cart, products]);

  const addToCart = (id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found)
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    setCartOpen(true);
  };

  const setQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l))
    );
  };

  const removeLine = (id: string) =>
    setCart((prev) => prev.filter((l) => l.id !== id));

  return (
    <div className="min-h-screen text-white bg-[#0b0b0d] selection:bg-yellow-300/30 selection:text-yellow-50">
      <SiteBackdrop />
      <TopBar />
      <NavBar
        page={page}
        openPage={openPage}
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
      />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <PageShell key="home">
              <Home
                addToCart={addToCart}
                products={products}
                heroImages={heroImages}
              />
            </PageShell>
          )}
          {page === "about" && (
            <PageShell key="about">
              <About />
            </PageShell>
          )}
          {page === "collections" && (
            <PageShell key="collections">
              <Collections addToCart={addToCart} products={products} />
            </PageShell>
          )}
          {page === "contact" && (
            <PageShell key="contact">
              <Contact />
            </PageShell>
          )}
          {page === "admin" && (
            <PageShell key="admin">
              <Admin />
            </PageShell>
          )}
        </AnimatePresence>
      </main>
      <Footer openPage={openPage} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        setQty={setQty}
        removeLine={removeLine}
        products={products}
      />
    </div>
  );
}
