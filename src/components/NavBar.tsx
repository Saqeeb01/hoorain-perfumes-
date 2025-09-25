import React from "react";
import { Page } from "../types";
import { classNames } from "../utils";
import { ShoppingCart, User, Search } from "lucide-react";

export function NavBar({
  page,
  openPage,
  cartCount,
  onCart,
}: {
  page: Page;
  openPage: (p: Page) => void;
  cartCount: number;
  onCart: () => void;
}) {
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
            <a href="#home" className="flex items-baseline gap-2" onClick={() => openPage("home")}>
              <span className="font-serif text-3xl font-bold text-gold">Hoorain</span>
              <span className="text-sm text-ivory/70 tracking-widest">PERFUMES</span>
            </a>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => openPage(l.key)}
                className={classNames(
                  "relative text-lg font-medium transition-colors duration-300",
                  page === l.key ? "text-gold" : "text-ivory hover:text-gold"
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
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <button className="text-ivory hover:text-gold transition-colors">
              <Search size={22} />
            </button>
            <button className="text-ivory hover:text-gold transition-colors">
              <User size={22} />
            </button>
            <button onClick={onCart} className="relative text-ivory hover:text-gold transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs font-bold text-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}