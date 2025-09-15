import React from "react";
import { classNames, goldText } from "../utils";

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className={classNames("font-serif text-3xl md:text-4xl", goldText)}>
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-yellow-50/80">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
