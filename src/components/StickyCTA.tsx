import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

export function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        href="tel:+911234567890"
        className="w-16 h-16 flex items-center justify-center bg-gold text-black rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Phone size={28} />
      </motion.a>
      <motion.a
        href="https://goo.gl/maps/example"
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 flex items-center justify-center bg-gold text-black rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MapPin size={28} />
      </motion.a>
    </div>
  );
}