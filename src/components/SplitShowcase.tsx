import React from "react";
import { classNames, goldText } from "../utils";

export function SplitShowcase() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1556225493-73bf0aadb061?q=80&w=1600&auto=format&fit=crop"
            alt="oud"
            className="w-full h-80 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <div className={classNames("font-serif text-2xl", goldText)}>
              {" "}
              The Oud Edit{" "}
            </div>
            <p className="text-yellow-50/80">
              {" "}
              Deep, resinous, unforgettable — curated oud-centric blends for
              connoisseurs.{" "}
            </p>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop"
            alt="rose"
            className="w-full h-80 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <div className={classNames("font-serif text-2xl", goldText)}>
              {" "}
              Rose Reverie{" "}
            </div>
            <p className="text-yellow-50/80">
              {" "}
              A modern take on timeless rose, lifted with musk and citrus
              facets.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
