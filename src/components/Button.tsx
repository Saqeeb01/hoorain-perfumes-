import React from "react";
import { classNames } from "../utils";
import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  size?: "md" | "lg";
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className,
  size = "md",
  href,
  ...rest
}: ButtonProps) {
  const sizeClasses = {
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  const commonClasses = classNames(
    "font-semibold text-black bg-gradient-to-br from-gold to-gold-dark rounded-full transition-all duration-300 ease-out transform hover:shadow-lg hover:shadow-gold/40 hover:-translate-y-0.5",
    sizeClasses[size],
    className
  );

  const motionProps = {
    whileHover: { scale: 1.05, boxShadow: "0px 0px 20px rgba(212, 175, 55, 0.5)" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.a href={href} className={commonClasses} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button className={commonClasses} {...rest} {...motionProps}>
      {children}
    </motion.button>
  );
}