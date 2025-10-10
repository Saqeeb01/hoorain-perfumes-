import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingIndicator = ({ loading }: { loading: boolean }) => (
  <AnimatePresence>
    {loading && (
      <motion.div
        className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-t-4 border-gold border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            loop: Infinity,
            ease: "linear",
            duration: 1,
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);