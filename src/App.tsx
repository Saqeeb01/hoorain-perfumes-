import React, { useMemo, useState, useEffect } from "react";
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
import { SingleProduct } from "./components/pages/SingleProduct";
import { CartDrawer } from "./components/CartDrawer";
import { StickyCTA } from "./components/StickyCTA";
import { Product } from "./components/ProductGrid";
import productData from "./data.json";

export default function HoorainPerfumes() {
  const [page, setPage] = useState<Page>("home");
  const [category, setCategory] = useState<Category>("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>(
    [...productData.products].reverse()
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      location.hash = "#collections";
    }
  };

  useEffect(() => {
    const applyFromHash = () => {
      const hash = location.hash.replace("#", "") || "home";
      const [page, param] = hash.split("/");
      if (page === "product" && param) {
        setPage("product");
        setSelectedProductId(param);
        setSearchQuery(""); // Clear search when viewing a product
      } else {
        setPage(pages.includes(page as Page) ? (page as Page) : "home");
        setCategory(
          categories.includes(param as Category) ? (param as Category) : "all"
        );
        // If navigating to a category, clear the search
        if (param && categories.includes(param as Category)) {
          setSearchQuery("");
        }
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openPage = (p: Page, param?: Category | string) => {
    location.hash = param ? `#${p}/${param}` : `#${p}`;
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, line) => {
      const item = products.find((p) => p.id === line.id);
      return sum + (item ? item.price * line.qty : 0);
    }, 0);
  }, [cart, products]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery) {
      return products;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return products.filter((p) => {
      const nameMatch = p.name && p.name.toLowerCase().includes(lowerCaseQuery);
      const noteMatch = p.note && p.note.toLowerCase().includes(lowerCaseQuery);
      const categoryMatch =
        p.category && p.category.toLowerCase().includes(lowerCaseQuery);
      return nameMatch || noteMatch || categoryMatch;
    });
  }, [searchQuery, products]);

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
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={handleSearch}
      />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <PageShell key="home">
              <Home
                addToCart={addToCart}
                products={products}
                openPage={openPage}
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
              <Collections
                addToCart={addToCart}
                products={filteredProducts}
                category={category}
                openPage={openPage}
                searchQuery={searchQuery}
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
          {page === "product" && selectedProductId && (
            <PageShell key="product">
              <SingleProduct
                addToCart={addToCart}
                product={products.find((p) => p.id === selectedProductId)!}
              />
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
