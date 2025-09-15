import React from "react";
import { Page } from "../types";
import { classNames, goldText, glass, goldBorder } from "../utils";

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
    { key: "about", label: "About" },
    { key: "collections", label: "Collections" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-30">
      <div className={classNames("mx-auto max-w-7xl px-4", "py-4")}>
        <div
          className={classNames(
            "flex items-center justify-between",
            glass,
            goldBorder,
            "rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-amber-700 shadow-inner" />
            <div>
              <div
                className={classNames(
                  "font-serif text-xl md:text-2xl tracking-wide",
                  goldText
                )}
              >
                {" "}
                Hoorain Perfumes{" "}
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-yellow-200/70">
                {" "}
                العطور · عطّار{" "}
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => openPage(l.key)}
                className={classNames(
                  "px-4 py-2 rounded-xl transition",
                  l.key === page
                    ? "bg-white/10 text-yellow-200"
                    : "hover:bg-white/5 text-yellow-50/80"
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openPage("collections")}
              className="hidden sm:inline-flex px-3 py-2 rounded-xl border border-white/15 hover:border-yellow-400/40 transition"
            >
              {" "}
              Shop{" "}
            </button>
            <button
              onClick={onCart}
              className="relative px-3 py-2 rounded-xl border border-white/15 hover:border-yellow-400/40 transition"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-400 text-black font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden mt-3 flex gap-2">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => openPage(l.key)}
              className={classNames(
                "flex-1 px-3 py-2 rounded-xl border border-white/10 text-sm",
                l.key === page
                  ? "bg-white/10 text-yellow-200"
                  : "text-yellow-50/80"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
