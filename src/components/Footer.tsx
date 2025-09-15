import React from "react";
import { Page } from "../types";
import { classNames, goldText } from "../utils";

export function Footer({ openPage }: { openPage: (p: Page) => void }) {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-10 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className={classNames("font-serif text-2xl", goldText)}>
            {" "}
            Hoorain Perfumes{" "}
          </div>
          <p className="mt-2 text-yellow-50/70 max-w-xs">
            {" "}
            Modern luxurious attars, perfumes & agarbatti from Jamkhandi.{" "}
          </p>
        </div>
        <div>
          <div className="text-yellow-200/80 mb-2">Navigate</div>
          <ul className="space-y-1">
            <li>
              {" "}
              <button
                onClick={() => openPage("home")}
                className="hover:underline"
              >
                {" "}
                Home{" "}
              </button>{" "}
            </li>
            <li>
              {" "}
              <button
                onClick={() => openPage("about")}
                className="hover:underline"
              >
                {" "}
                About{" "}
              </button>{" "}
            </li>
            <li>
              {" "}
              <button
                onClick={() => openPage("collections")}
                className="hover:underline"
              >
                {" "}
                Collections{" "}
              </button>{" "}
            </li>
            <li>
              {" "}
              <button
                onClick={() => openPage("contact")}
                className="hover:underline"
              >
                {" "}
                Contact{" "}
              </button>{" "}
            </li>
            <li>
              {" "}
              <button
                onClick={() => openPage("admin")}
                className="hover:underline"
              >
                {" "}
                Admin{" "}
              </button>{" "}
            </li>
          </ul>
        </div>
        <div>
          <div className="text-yellow-200/80 mb-2">Policies</div>
          <ul className="space-y-1 text-yellow-50/70">
            <li>Shipping & Returns</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <div className="text-yellow-200/80 mb-2">Follow</div>
          <div className="flex gap-3 text-yellow-50/80">
            <a
              href="https://instagram.com/hoorain_perfumes_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              {" "}
              Instagram{" "}
            </a>
            <a
              href="https://www.facebook.com/share/1CEzZTygTP/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              {" "}
              Facebook{" "}
            </a>
            <a
              href="https://wa.me/918310061076"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              {" "}
              WhatsApp{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-[12px] text-yellow-50/60 pb-8">
        {" "}
        © {new Date().getFullYear()} Hoorain Perfumes · All rights reserved.{" "}
      </div>
    </footer>
  );
}
