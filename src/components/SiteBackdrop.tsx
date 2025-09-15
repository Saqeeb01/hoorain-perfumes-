import React from "react";

export function SiteBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.06),transparent_60%)]" />

      {/* Soft noise */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-24 -left-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-20 bg-yellow-500/30" />
      <div className="absolute -bottom-24 -right-24 w-[40rem] h-[40rem] rounded-full blur-3xl opacity-10 bg-fuchsia-500/20" />
    </div>
  );
}
