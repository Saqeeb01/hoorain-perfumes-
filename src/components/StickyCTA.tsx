import React from "react";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";

export function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <motion.a
        href="tel:+91 8310060176"
        className="w-16 h-16 flex items-center justify-center bg-gold text-black rounded-full shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Phone size={28} />
      </motion.a>
      <motion.a
        href="https://www.google.com/maps/dir//Near,+Ambeadkar+Circle,+Jamkhandi,+Karnataka+587301/@16.5076867,75.2104868,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bc73d3ea70f3253:0x945d27aa86f89a29!2m2!1d75.2928886!2d16.5077028?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
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
