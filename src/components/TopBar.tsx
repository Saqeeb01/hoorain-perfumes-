import React from "react";

export function TopBar() {
  return (
    <div className="relative z-20 text-xs md:text-sm px-4 py-2 text-yellow-100/90 flex items-center justify-center gap-2 bg-gradient-to-r from-white/5 via-white/0 to-white/5 border-b border-white/10">
      <span className="hidden sm:inline">
        {" "}
        Complimentary gift wrap on orders over ₹2,999{" "}
      </span>
      <span className="sm:hidden">Free gift wrap on ₹2,999+</span>
      <span className="opacity-50">·</span>
      <span className="uppercase tracking-widest">Jamkhandi · Karnataka</span>
    </div>
  );
}
