import React, { useState } from "react";
import { Page, Category, categories } from "../types";
import { classNames } from "../utils";
import { ShoppingCart, User, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NavBar({
  page,
  openPage,
  cartCount,
  onCart,
}: {
  page: Page;
  openPage: (p: Page, category?: Category) => void;
  cartCount: number;
  onCart: () => void;
}) {
  const [showCollections, setShowCollections] = useState(false);
  const links: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "collections", label: "Collections" },
    { key: "about", label: "About" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
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
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) =>
              l.key === "collections" ? (
                <div
                  key={l.key}
                  className="relative"
                  onMouseEnter={() => setShowCollections(true)}
                  onMouseLeave={() => setShowCollections(false)}
                >
                  <button
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
                        page === l.key ? "w-full" : "w-0 group-hover:w-full"
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
                          {categories.map((c) => (
                            <a
                              key={c}
                              href={`#collections/${c}`}
                              onClick={() => openPage("collections", c)}
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
                      page === l.key ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </button>
              )
            )}
          </nav>
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-beige hover:text-gold transition-colors"
            >
              <Search size={22} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="text-beige hover:text-gold transition-colors"
            >
              <User size={22} />
            </motion.button>
            <motion.button
              onClick={onCart}
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