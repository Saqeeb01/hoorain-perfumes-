import React from "react";
import { Page } from "../types";
import { classNames } from "../utils";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer({ openPage }: { openPage: (p: Page) => void }) {
  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/hoorain_perfumes_",
    },
    {
      icon: <Facebook size={20} />,
      href: "https://www.facebook.com/share/1CEzZTygTP/",
    },
    { icon: <Youtube size={20} />, href: "https://youtube.com" },
  ];

  return (
    <footer className="bg-black border-t border-gold/20 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a
              href="#home"
              className="flex items-baseline gap-2"
              onClick={() => openPage("home")}
            >
              <span className="font-serif text-3xl font-bold text-gold">
                Hoorain
              </span>
              <span className="text-sm text-ivory/70 tracking-widest">
                PERFUMES
              </span>
            </a>
            <p className="text-ivory/70 mt-4">
              Crafting memories through the art of fragrance.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-lg hover:shadow-gold/30"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-ivory/80">
              <li>
                <button
                  onClick={() => openPage("home")}
                  className="hover:text-gold transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPage("collections")}
                  className="hover:text-gold transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPage("about")}
                  className="hover:text-gold transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPage("contact")}
                  className="hover:text-gold transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-ivory/80">
              <li>info@hoorainperfumes.com</li>
              <li>+91 83100 60176</li>
              <li>Near Ambedkar Circle, Jamkhandi, Karnataka, India</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Our Location
            </h3>
            <div className="mt-4 rounded-lg overflow-hidden border border-gold/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.893873489816!2d75.28697491486208!3d16.8527370884242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc68e7b6b405a7f%3A0x3f67b5e8e4c7d9a1!2sJamkhandi%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1678886082473!5m2!1sen!2sin"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gold/20 pt-8 text-center text-ivory/60">
          <p>
            &copy; {new Date().getFullYear()} Hoorain Perfumes. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
