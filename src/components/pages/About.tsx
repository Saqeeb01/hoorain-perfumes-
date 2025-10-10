import React from "react";
import { Section } from "../Section";
import { classNames, goldText, glass, goldBorder } from "../../utils";

export function About() {
  return (
    <div>
      <Section
        title="Our Story"
        subtitle="A boutique perfume house from Jamkhandi, blending tradition with modern luxury."
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="../../../public/images/proimages/cropped.png"
            alt="atelier"
            className="w-full h-72 object-cover rounded-2xl border border-white/10"
          />
          <div className="space-y-4 text-yellow-50/80">
            <p>
              {" "}
              At <span className={goldText}>Hoorain Perfumes</span>, we handpick
              oils and aroma molecules from renowned sources and blend them
              meticulously for the subcontinent’s climate. Our palette includes
              rare oud, rose, amber, and musk — composed for balance,
              projection, and elegance.{" "}
            </p>
            <p>
              {" "}
              We believe luxury should feel warm and welcoming. Every bottle
              arrives in a gift-ready box with gold-foil detailing and a
              personal touch from our studio.{" "}
            </p>
          </div>
        </div>
      </Section>
      <Section
        title="Craft & Quality"
        subtitle="Small batches · Strict QC · Honest pricing"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {["Small-Batch Blending", "IFRA-Informed", "Cruelty-Free"].map(
            (t, i) => (
              <div
                key={i}
                className={classNames(
                  "p-6 rounded-2xl h-full",
                  glass,
                  goldBorder
                )}
              >
                <div className={classNames("font-serif text-lg", goldText)}>
                  {t}
                </div>
                <p className="mt-2 text-sm text-yellow-50/80">
                  {" "}
                  Our commitment to quality ensures you get a dependable
                  signature scent every time.{" "}
                </p>
              </div>
            )
          )}
        </div>
      </Section>
    </div>
  );
}
