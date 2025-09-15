import React from "react";
import { classNames, glass, goldBorder, goldText } from "../utils";

export function USPStrip() {
  const items = [
    { t: "Free Gift Wrap", d: "on ₹2,999+" },
    { t: "Ships Pan-India", d: "3–5 business days" },
    { t: "Premium Oils", d: "IFRA-informed" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div
        className={classNames(
          "grid md:grid-cols-3 gap-3",
          glass,
          goldBorder,
          "rounded-2xl p-3"
        )}
      >
        {items.map((i) => (
          <div key={i.t} className="px-4 py-3 rounded-xl text-center">
            <div className={classNames("font-serif", goldText)}>{i.t}</div>
            <div className="text-yellow-50/70 text-sm">{i.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
