import React, { useState, useRef, useEffect } from "react";
import { Page, Category, categories } from "../types";
import { classNames } from "../utils";
import { ShoppingCart, User, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar({
  page,
  openPage,
  cartCount,
  onCart,
  searchOpen,
  setSearchOpen,
  searchQuery,
  setSearchQuery,
}: {
  page: Page;
  openPage: (p: Page, category?: Category) => void;
  cartCount: number;
  onCart: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  const [showCollections, setShowCollections] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const links: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "collections", label: "Collections" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];
  const searchInputRef = useRef<HTMLInputElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionsRef.current &&
        !collectionsRef.current.contains(event.target as Node)
      ) {
        setShowCollections(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="flex items-baseline gap-2"
              onClick={() => openPage("home")}
            >
              <span className="font-serif text-3xl font-bold text-gold">
                Hoorain
              </span>
              <span className="text-sm text-beige/70 tracking-widest">
                PERFUMES
              </span>
            </a>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="search"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "100%" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative w-full max-w-md"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for perfumes, attars..."
                    className="w-full bg-white/5 border border-gold/30 rounded-full px-6 py-2 text-beige placeholder-beige/50 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all"
                  />
                  <motion.button
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-beige/70 hover:text-gold"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.nav
                  key="nav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex items-center gap-8"
                >
                  {links.map((l) =>
                    l.key === "collections" ? (
                      <div key={l.key} className="relative" ref={collectionsRef}>
                        <button
                          onClick={() => {
                            setShowCollections((prev) => !prev);
                          }}
                          className={classNames(
                            "relative group text-lg font-medium transition-colors duration-300",
                            page === l.key || showCollections
                              ? "text-gold"
                              : "text-beige hover:text-gold"
                          )}
                        >
                          {l.label}
                          <span
                            className={classNames(
                              "absolute left-0 -bottom-1 h-0.5 bg-gold transition-all duration-300",
                              page === l.key
                                ? "w-full"
                                : "w-0 group-hover:w-full"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {showCollections && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-full -left-1/2 mt-4 w-64 transform translate-x-1/4 bg-black/70 backdrop-blur-xl rounded-lg shadow-2xl ring-1 ring-white/10"
                            >
                              <div className="p-4">
                                <a
                                  href="#collections/all"
                                  onClick={() => {
                                    openPage("collections", "all");
                                    setShowCollections(false);
                                  }}
                                  className="block px-4 py-3 text-md text-beige rounded-md hover:bg-gold/10 hover:text-gold transition-all duration-200 capitalize"
                                >
                                  All Collections
                                </a>
                                {categories
                                  .filter((c) => c !== "all")
                                  .map((c) => (
                                    <a
                                      key={c}
                                      href={`#collections/${c}`}
                                      onClick={() => {
                                        openPage("collections", c);
                                        setShowCollections(false);
                                      }}
                                      className="block px-4 py-3 text-md text-beige rounded-md hover:bg-gold/10 hover:text-gold transition-all duration-200 capitalize"
                                    >
                                      {c}
                                    </a>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <button
                        key={l.key}
                        onClick={() => openPage(l.key)}
                        className={classNames(
                          "relative group text-lg font-medium transition-colors duration-300",
                          page === l.key
                            ? "text-gold"
                            : "text-beige hover:text-gold"
                        )}
                      >
                        {l.label}
                        <span
                          className={classNames(
                            "absolute left-0 -bottom-1 h-0.5 bg-gold transition-all duration-300",
                            page === l.key
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          )}
                        />
                      </button>
                    )
                  )}
                </motion.nav>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-6">
            <motion.button
              onClick={() => setSearchOpen(!searchOpen)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-beige hover:text-gold transition-colors"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={searchOpen ? "close" : "search"}
                  initial={{ opacity: 0, rotate: -90, scale: 0 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {searchOpen ? <X size={22} /> : <Search size={22} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
            <div className="relative" ref={userMenuRef}>
              <motion.button
                onClick={() => setShowUserMenu((prev) => !prev)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-beige hover:text-gold transition-colors"
              >
                <User size={22} />
              </motion.button>
              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-4 w-48 bg-black/70 backdrop-blur-xl rounded-lg shadow-2xl ring-1 ring-white/10"
                  >
                    <div className="p-2">
                      <a
                        href="#admin"
                        onClick={() => {
                          openPage("admin");
                          setShowUserMenu(false);
                        }}
                        className="block px-4 py-3 text-md text-beige rounded-md hover:bg-gold/10 hover:text-gold transition-all duration-200"
                      >
                        Admin Panel
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.button
              onClick={onCart}
              aria-label="Open cart"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="relative text-beige hover:text-gold transition-colors"
            >
              <ShoppingCart size={22} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}