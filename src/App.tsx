import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Page, pages, Category, categories } from "./types";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { SiteBackdrop } from "./components/SiteBackdrop";
import { TopBar } from "./components/TopBar";
import { PageShell } from "./components/PageShell";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Collections } from "./components/pages/Collections";
import { Contact } from "./components/pages/Contact";
import { Admin } from "./components/pages/Admin";
import { CartDrawer } from "./components/CartDrawer";
import { StickyCTA } from "./components/StickyCTA";
import { Product } from "./components/ProductGrid";

export default function HoorainPerfumes() {
  const [page, setPage] = useState<Page>("home");
  const [category, setCategory] = useState<Category>("all");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  useEffect(() => {
    const applyFromHash = () => {
      const hash = location.hash.replace("#", "") || "home";
      const [page, category] = hash.split("/");
      setPage(pages.includes(page as Page) ? (page as Page) : "home");
      setCategory(
        categories.includes(category as Category)
          ? (category as Category)
          : "all"
      );
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openPage = (p: Page, c: Category = "all") => {
    location.hash = c ? `#${p}/${c}` : `#${p}`;
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
              <Home addToCart={addToCart} products={products} />
            </PageShell>
          )}
          {page === "about" && (
            <PageShell key="about">
              <About />
            </PageShell>
          )}
          {page === "collections" && (
            <PageShell key="collections">
              <Collections
                addToCart={addToCart}
                products={products}
                category={category}
              />
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
      <StickyCTA />
    </div>
  );
}
