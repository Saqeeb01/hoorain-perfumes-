import React from "react";
import { classNames } from "../utils";

export function Button({
  children,
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(
        "px-6 py-3 bg-gold text-black font-semibold rounded-lg transition-all duration-300 hover:bg-gold-light",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}