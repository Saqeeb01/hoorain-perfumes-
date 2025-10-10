import React from "react";
import { motion } from "framer-motion";

export function PageShell({
  children,
  onAnimationComplete,
}: {
  children: React.ReactNode;
  onAnimationComplete?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative"
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
}
