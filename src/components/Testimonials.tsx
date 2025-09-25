import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aisha Khan",
    location: "Mumbai, India",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    testimonial:
      "The Oud Royale is simply divine. It's my signature scent now. I get compliments everywhere I go. The luxury and quality are unmatched.",
  },
  {
    name: "Rohan Sharma",
    location: "Delhi, India",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    testimonial:
      "I've been a long-time customer of Hoorain Perfumes. Their attars are authentic and long-lasting. The new website is as premium as their products.",
  },
  {
    name: "Priya Singh",
    location: "Bangalore, India",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    testimonial:
      "The Rose Velour perfume is a masterpiece. It's so elegant and feminine. I'm in love with the new packaging and the overall brand experience.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-serif text-center text-gold mb-4">
          What Our Customers Say
        </h2>
        <p className="text-lg text-ivory/80 text-center max-w-2xl mx-auto mb-12">
          We are proud to have touched the lives of so many with our fragrances.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-white/5 p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <p className="text-ivory/90 mb-6">"{testimonial.testimonial}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gold">{testimonial.name}</p>
                  <p className="text-sm text-ivory/70">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}