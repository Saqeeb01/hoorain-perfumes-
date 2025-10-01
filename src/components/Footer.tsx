import React from "react";
import { Page } from "../types";
import { classNames } from "../utils";
import { Instagram, Facebook, Youtube, Send } from "lucide-react";

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
    <footer className="bg-black/90 backdrop-blur-lg border-t border-gold/20 pt-20 pb-8 bg-[url('/smoke.png')] bg-cover bg-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <a
              href="#home"
              className="flex items-baseline gap-2"
              onClick={() => openPage("home")}
            >
              <span className="font-serif text-3xl font-bold text-gold">
                Hoorain
              </span>
              <span className="text-sm text-beige/70 tracking-widest">
                PERFUMES
              </span>
            </a>
            <p className="text-beige/70 mt-4">
              Crafting memories through the art of fragrance. Experience luxury in every scent.
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-gold transition-all duration-300 hover:bg-gold hover:text-black hover:scale-110 transform"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Shop
            </h3>
            <ul className="mt-4 space-y-3 text-beige/80">
              <li><button onClick={() => openPage("home")} className="hover:text-gold transition-colors">Home</button></li>
              <li><button onClick={() => openPage("collections")} className="hover:text-gold transition-colors">Collections</button></li>
              <li><button onClick={() => openPage("about")} className="hover:text-gold transition-colors">About Us</button></li>
              <li><button onClick={() => openPage("contact")} className="hover:text-gold transition-colors">Contact</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-beige/80">
              <li><a href="mailto:hoorainperfumes@gmail.com" className="hover:text-gold transition-colors">hoorainperfumes@gmail.com</a></li>
              <li><a href="tel:+918310060176" className="hover:text-gold transition-colors">+91 83100 60176</a></li>
              <li className="max-w-xs">Near Ambedkar Circle, Jamkhandi, Karnataka, India</li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-gold tracking-wider">
              Join Our World
            </h3>
            <p className="text-beige/70 mt-4">Subscribe for exclusive offers and new arrivals.</p>
            <form className="mt-4 flex gap-2">
              <input type="email" placeholder="Your Email" className="flex-grow bg-white/5 border border-gold/30 rounded-md px-4 py-2 text-beige placeholder-beige/50 focus:ring-2 focus:ring-gold focus:border-gold outline-none transition-all" />
              <button type="submit" className="bg-gold text-black p-2 rounded-md hover:bg-gold-dark transition-colors flex items-center justify-center">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-gold/20 pt-8 text-center text-beige/60">
          <p>
            &copy; {new Date().getFullYear()} Hoorain Perfumes. All Rights
            Reserved. Designed with passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
