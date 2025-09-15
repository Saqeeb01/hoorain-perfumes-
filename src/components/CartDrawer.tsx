import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { classNames, glass, goldBorder, goldText } from "../utils";
import { Product } from "./ProductGrid";

export function CartDrawer({
  open,
  onClose,
  cart,
  cartTotal,
  setQty,
  removeLine,
  products,
}: {
  open: boolean;
  onClose: () => void;
  cart: { id: string; qty: number }[];
  cartTotal: number;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  products: Product[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            className={classNames(
              "fixed right-0 top-0 h-full w-full sm:w-[28rem] z-50",
              glass,
              goldBorder,
              "shadow-2xl"
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className={classNames("font-serif text-xl", goldText)}>
                {" "}
                Your Cart{" "}
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5"
              >
                {" "}
                Close{" "}
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-10rem)] space-y-3">
              {cart.length === 0 && (
                <div className="text-yellow-50/70">
                  {" "}
                  Your cart is empty. Explore our collections to add items.{" "}
                </div>
              )}
              {cart.map((line) => {
                const p = products.find((x) => x.id === line.id)!;
                return (
                  <div
                    key={line.id}
                    className={classNames("p-3 rounded-xl", glass, goldBorder)}
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={p.img}
                        className="w-16 h-16 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1">
                        <div className="font-serif">{p.name}</div>
                        <div className="text-xs text-yellow-50/70">
                          {" "}
                          ₹{p.price.toLocaleString("en-IN")}{" "}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => setQty(line.id, line.qty - 1)}
                            className="px-2 rounded-lg border border-white/15"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <span className="min-w-[2ch] text-center">
                            {" "}
                            {line.qty}{" "}
                          </span>
                          <button
                            onClick={() => setQty(line.id, line.qty + 1)}
                            className="px-2 rounded-lg border border-white/15"
                          >
                            {" "}
                            +{" "}
                          </button>
                          <button
                            onClick={() => removeLine(line.id)}
                            className="ml-3 text-xs text-red-300/90 hover:underline"
                          >
                            {" "}
                            Remove{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-50/80">Subtotal</span>
                <span className={classNames("font-semibold", goldText)}>
                  {" "}
                  ₹{cartTotal.toLocaleString("en-IN")}{" "}
                </span>
              </div>
              <button
                className="w-full px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 disabled:opacity-60"
                disabled={cart.length === 0}
              >
                {" "}
                Checkout (Demo){" "}
              </button>
              <div className="text-[11px] text-yellow-50/60 mt-2">
                {" "}
                * Checkout is a demo in this preview. Connect Razorpay/Stripe
                for live payments.{" "}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
