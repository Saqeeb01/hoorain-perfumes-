import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --------- UTILITIES ---------
const pages = ["home", "about", "collections", "contact"] as const;
type Page = (typeof pages)[number];

function classNames(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

// Gold gradient and luxury helpers
const goldText =
  "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent";
const goldBorder = "border border-yellow-400/40";
const glass =
  "backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/2.5";

// --------- DATA ---------
const products = [
  {
    id: "hp-oud-royale",
    name: "Oud Royale",
    note: "Smoky oud • Amber • Saffron",
    price: 3499,
    img: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=1200&auto=format&fit=crop",
    tag: "Best Seller",
  },
  {
    id: "hp-rose-velour",
    name: "Rose Velour",
    note: "Damask rose • Patchouli • Musk",
    price: 2999,
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
    tag: "New",
  },
  {
    id: "hp-amber-noir",
    name: "Amber Noir",
    note: "Amber • Vanilla • Tonka",
    price: 2799,
    img: "https://images.unsplash.com/photo-1557170338-03b7e033980d?q=80&w=1200&auto=format&fit=crop",
    tag: "Limited",
  },
  {
    id: "hp-musk-silk",
    name: "Musk Silk",
    note: "White musk • Iris • Cashmere",
    price: 2299,
    img: "https://images.unsplash.com/photo-1571923370890-4f2bb0b0f0c6?q=80&w=1200&auto=format&fit=crop",
    tag: "Classic",
  },
];
const heroImages = [
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608571424402-0a3c9e4c0b56?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1920&auto=format&fit=crop",
];

// --------- ROOT APP ---------
export default function HoorainPerfumes() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Simple hash routing (no extra deps)
  useEffect(() => {
    const applyFromHash = () => {
      const h = (location.hash.replace("#", "") || "home") as Page;
      setPage(pages.includes(h as Page) ? (h as Page) : "home");
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const openPage = (p: Page) => {
    if (page !== p) location.hash = `#${p}`;
  };

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);
  const cartTotal = useMemo(() => {
    return cart.reduce((sum, line) => {
      const item = products.find((p) => p.id === line.id);
      return sum + (item ? item.price * line.qty : 0);
    }, 0);
  }, [cart]);

  const addToCart = (id: string, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found)
        return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    setCartOpen(true);
  };

  const setQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) => (l.id === id ? { ...l, qty: Math.max(1, qty) } : l))
    );
  };

  const removeLine = (id: string) =>
    setCart((prev) => prev.filter((l) => l.id !== id));

  return (
    <div className="min-h-screen text-white bg-[#0b0b0d] selection:bg-yellow-300/30 selection:text-yellow-50">
      <SiteBackdrop />
      <TopBar />
      <NavBar
        page={page}
        openPage={openPage}
        cartCount={cartCount}
        onCart={() => setCartOpen(true)}
      />
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {page === "home" && (
            <PageShell key="home">
              <Home addToCart={addToCart} />
            </PageShell>
          )}
          {page === "about" && (
            <PageShell key="about">
              <About />
            </PageShell>
          )}
          {page === "collections" && (
            <PageShell key="collections">
              <Collections addToCart={addToCart} />
            </PageShell>
          )}
          {page === "contact" && (
            <PageShell key="contact">
              <Contact />
            </PageShell>
          )}
        </AnimatePresence>
      </main>
      <Footer openPage={openPage} />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        setQty={setQty}
        removeLine={removeLine}
      />
    </div>
  );
}

// --------- LAYOUT ---------
function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}

function SiteBackdrop() {
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

function TopBar() {
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

function NavBar({
  page,
  openPage,
  cartCount,
  onCart,
}: {
  page: Page;
  openPage: (p: Page) => void;
  cartCount: number;
  onCart: () => void;
}) {
  const links: { key: Page; label: string }[] = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "collections", label: "Collections" },
    { key: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-30">
      <div className={classNames("mx-auto max-w-7xl px-4", "py-4")}>
        <div
          className={classNames(
            "flex items-center justify-between",
            glass,
            goldBorder,
            "rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-yellow-300 via-yellow-500 to-amber-700 shadow-inner" />
            <div>
              <div
                className={classNames(
                  "font-serif text-xl md:text-2xl tracking-wide",
                  goldText
                )}
              >
                {" "}
                Hoorain Perfumes{" "}
              </div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-yellow-200/70">
                {" "}
                العطور · عطّار{" "}
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.key}
                onClick={() => openPage(l.key)}
                className={classNames(
                  "px-4 py-2 rounded-xl transition",
                  l.key === page
                    ? "bg-white/10 text-yellow-200"
                    : "hover:bg-white/5 text-yellow-50/80"
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openPage("collections")}
              className="hidden sm:inline-flex px-3 py-2 rounded-xl border border-white/15 hover:border-yellow-400/40 transition"
            >
              {" "}
              Shop{" "}
            </button>
            <button
              onClick={onCart}
              className="relative px-3 py-2 rounded-xl border border-white/15 hover:border-yellow-400/40 transition"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-[10px] px-1.5 py-0.5 rounded-full bg-yellow-400 text-black font-semibold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden mt-3 flex gap-2">
          {links.map((l) => (
            <button
              key={l.key}
              onClick={() => openPage(l.key)}
              className={classNames(
                "flex-1 px-3 py-2 rounded-xl border border-white/10 text-sm",
                l.key === page
                  ? "bg-white/10 text-yellow-200"
                  : "text-yellow-50/80"
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// --------- PAGES ---------
function Home({
  addToCart,
}: {
  addToCart: (id: string, qty?: number) => void;
}) {
  return (
    <div>
      <Hero />
      <USPStrip />
      <Section
        title="Signature Blends"
        subtitle="Modern luxury, crafted in Karnataka."
      >
        <ProductGrid addToCart={addToCart} limit={4} />
      </Section>
      <SplitShowcase />
      <Section
        title="Why Hoorain"
        subtitle="We obsess over quality so you can wear it with confidence."
      >
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              t: "Long-Lasting Oils",
              d: "Premium concentration for projection that lingers all day.",
            },
            {
              t: "Authentic Sourcing",
              d: "Notes sourced from trusted houses — oud, rose, amber & more.",
            },
            {
              t: "Gift-Ready",
              d: "Gold-foiled boxes & complimentary gift wrap on ₹2,999+.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className={classNames("p-6 rounded-2xl", glass, goldBorder)}
            >
              <div className={classNames("font-serif text-xl mb-2", goldText)}>
                {f.t}
              </div>
              <p className="text-yellow-50/80">{f.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function About() {
  return (
    <div>
      <Section
        title="Our Story"
        subtitle="A boutique perfume house from Jamkhandi, blending tradition with modern luxury."
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1545776760-2e4f67fbd87d?q=80&w=1600&auto=format&fit=crop"
            alt="atelier"
            className="w-full h-72 object-cover rounded-2xl border border-white/10"
          />
          <div className="space-y-4 text-yellow-50/80">
            <p>
              {" "}
              At <span className={goldText}>Hoorain Perfumes</span>, we handpick
              oils and aroma molecules from renowned sources and blend them
              meticulously for the subcontinent’s climate. Our palette includes
              rare oud, rose, amber, and musk — composed for balance,
              projection, and elegance.{" "}
            </p>
            <p>
              {" "}
              We believe luxury should feel warm and welcoming. Every bottle
              arrives in a gift-ready box with gold-foil detailing and a
              personal touch from our studio.{" "}
            </p>
          </div>
        </div>
      </Section>
      <Section
        title="Craft & Quality"
        subtitle="Small batches · Strict QC · Honest pricing"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {["Small-Batch Blending", "IFRA-Informed", "Cruelty-Free"].map(
            (t, i) => (
              <div
                key={i}
                className={classNames(
                  "p-6 rounded-2xl h-full",
                  glass,
                  goldBorder
                )}
              >
                <div className={classNames("font-serif text-lg", goldText)}>
                  {t}
                </div>
                <p className="mt-2 text-sm text-yellow-50/80">
                  {" "}
                  Our commitment to quality ensures you get a dependable
                  signature scent every time.{" "}
                </p>
              </div>
            )
          )}
        </div>
      </Section>
    </div>
  );
}

function Collections({
  addToCart,
}: {
  addToCart: (id: string, qty?: number) => void;
}) {
  return (
    <div>
      <Section
        title="Collections"
        subtitle="Explore our best-sellers and limited editions."
      >
        <ProductGrid addToCart={addToCart} />
      </Section>
      <Section
        title="Gifting"
        subtitle="Make it unforgettable with bespoke notes and gift wrap."
      >
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <img
            src="https://images.unsplash.com/photo-1600962815717-d909b6289095?q=80&w=1600&auto=format&fit=crop"
            className="w-full h-72 object-cover rounded-2xl border border-white/10"
          />
          <div className="space-y-3 text-yellow-50/80">
            <p>
              {" "}
              Add a handwritten card, choose ribbon color, and ship directly to
              your loved one.{" "}
            </p>
            <p>
              {" "}
              Corporate gifting? We offer customized sleeves and bulk rates.{" "}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <Section
        title="Contact Us"
        subtitle="We’d love to help you pick your next signature."
      >
        <div className="grid lg:grid-cols-2 gap-8">
          <ContactForm />
          <div className="space-y-4">
            <div className={classNames("p-6 rounded-2xl", glass, goldBorder)}>
              <div className={classNames("font-serif text-xl", goldText)}>
                {" "}
                Studio & Store{" "}
              </div>
              <p className="mt-2 text-yellow-50/80">
                {" "}
                Near Ambedkar Circle, Jamkhandi, Karnataka{" "}
              </p>
              <p className="text-yellow-50/60">
                {" "}
                Open: 09:00 AM – 09:00 PM (Mon–Sat){" "}
              </p>
              <p className="text-yellow-50/60">Phone: +91 8310060176</p>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-72">
              <iframe
                title="map"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Ambedkar%20Circle%20Jamkhandi&output=embed"
              />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

// --------- SECTIONS & COMPONENTS ---------
function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div className="mb-8 md:mb-12">
        <h2 className={classNames("font-serif text-3xl md:text-4xl", goldText)}>
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-yellow-50/80">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % heroImages.length),
      4500
    );
    return () => clearInterval(id);
  }, []);
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative h-[62vh] md:h-[70vh] overflow-hidden rounded-3xl border border-white/10">
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={heroImages[idx]}
              alt="Hoorain hero"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
            <div
              className={classNames(
                "font-serif text-3xl md:text-5xl mb-2",
                goldText
              )}
            >
              {" "}
              Elevate Your Essence{" "}
            </div>
            <p className="max-w-xl text-yellow-50/85">
              {" "}
              Fine attars and perfumes crafted with oud, rose, amber and musk —
              designed for lasting elegance in the Indian climate.{" "}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#collections"
                className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 transition"
              >
                {" "}
                Shop Collections{" "}
              </a>
              <a
                href="#about"
                className="px-5 py-2.5 rounded-xl border border-yellow-400/40 hover:bg-white/5 transition"
              >
                {" "}
                Our Story{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function USPStrip() {
  const items = [
    { t: "Free Gift Wrap", d: "on ₹2,999+" },
    { t: "Ships Pan-India", d: "3–5 business days" },
    { t: "Premium Oils", d: "IFRA-informed" },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 mt-6">
      <div
        className={classNames(
          "grid md:grid-cols-3 gap-3",
          glass,
          goldBorder,
          "rounded-2xl p-3"
        )}
      >
        {items.map((i) => (
          <div key={i.t} className="px-4 py-3 rounded-xl text-center">
            <div className={classNames("font-serif", goldText)}>{i.t}</div>
            <div className="text-yellow-50/70 text-sm">{i.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductGrid({
  addToCart,
  limit,
}: {
  addToCart: (id: string, qty?: number) => void;
  limit?: number;
}) {
  const items = limit ? products.slice(0, limit) : products;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((p) => (
        <motion.div
          key={p.id}
          whileHover={{ y: -4 }}
          className={classNames(
            "rounded-2xl overflow-hidden",
            goldBorder,
            glass
          )}
        >
          <div className="relative h-64">
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute left-3 top-3 px-2 py-1 rounded-lg text-[10px] uppercase tracking-wider bg-white/10 border border-white/20">
              {p.tag}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="font-serif text-lg">{p.name}</div>
                <div className="text-xs text-yellow-50/70">{p.note}</div>
              </div>
              <div className="text-right">
                <div className={classNames("font-semibold", goldText)}>
                  {" "}
                  ₹{p.price.toLocaleString("en-IN")}{" "}
                </div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => addToCart(p.id, 1)}
                className="flex-1 px-3 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:brightness-95"
              >
                {" "}
                Add to Cart{" "}
              </button>
              <a
                href="#contact"
                className="px-3 py-2 rounded-lg border border-white/15 hover:bg-white/5"
              >
                {" "}
                Enquire{" "}
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SplitShowcase() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1556225493-73bf0aadb061?q=80&w=1600&auto=format&fit=crop"
            alt="oud"
            className="w-full h-80 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <div className={classNames("font-serif text-2xl", goldText)}>
              {" "}
              The Oud Edit{" "}
            </div>
            <p className="text-yellow-50/80">
              {" "}
              Deep, resinous, unforgettable — curated oud-centric blends for
              connoisseurs.{" "}
            </p>
          </div>
        </div>
        <div className="relative rounded-3xl overflow-hidden border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1600&auto=format&fit=crop"
            alt="rose"
            className="w-full h-80 md:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-0 p-6">
            <div className={classNames("font-serif text-2xl", goldText)}>
              {" "}
              Rose Reverie{" "}
            </div>
            <p className="text-yellow-50/80">
              {" "}
              A modern take on timeless rose, lifted with musk and citrus
              facets.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return alert("Please fill name and phone.");
    setSent(true); // In real app: POST to your backend or service like Formspree
  };
  return (
    <div className={classNames("p-6 rounded-2xl", glass, goldBorder)}>
      <form onSubmit={onSubmit} className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm text-yellow-200/80">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Your full name"
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <label className="text-sm text-yellow-200/80">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-yellow-200/80">Phone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="+91-"
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <label className="text-sm text-yellow-200/80">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            placeholder="Tell us what you’re looking for"
            rows={5}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-yellow-400/50"
          />
        </div>
        <button className="mt-2 px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 w-max">
          {" "}
          Send Message{" "}
        </button>
        {sent && (
          <div className="text-sm text-green-300/90">
            {" "}
            Thanks! We’ll reach out within 24 hours.{" "}
          </div>
        )}
      </form>
    </div>
  );
}

function Footer({ openPage }: { openPage: (p: Page) => void }) {
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

// --------- CART ---------
function CartDrawer({
  open,
  onClose,
  cart,
  cartTotal,
  setQty,
  removeLine,
}: {
  open: boolean;
  onClose: () => void;
  cart: { id: string; qty: number }[];
  cartTotal: number;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={ref}
            className={classNames(
              "fixed right-0 top-0 h-full w-full sm:w-[28rem] z-50",
              glass,
              goldBorder,
              "shadow-2xl"
            )}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className={classNames("font-serif text-xl", goldText)}>
                {" "}
                Your Cart{" "}
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/5"
              >
                {" "}
                Close{" "}
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-[calc(100%-10rem)] space-y-3">
              {cart.length === 0 && (
                <div className="text-yellow-50/70">
                  {" "}
                  Your cart is empty. Explore our collections to add items.{" "}
                </div>
              )}
              {cart.map((line) => {
                const p = products.find((x) => x.id === line.id)!;
                return (
                  <div
                    key={line.id}
                    className={classNames("p-3 rounded-xl", glass, goldBorder)}
                  >
                    <div className="flex gap-3 items-center">
                      <img
                        src={p.img}
                        className="w-16 h-16 object-cover rounded-lg border border-white/10"
                      />
                      <div className="flex-1">
                        <div className="font-serif">{p.name}</div>
                        <div className="text-xs text-yellow-50/70">
                          {" "}
                          ₹{p.price.toLocaleString("en-IN")}{" "}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => setQty(line.id, line.qty - 1)}
                            className="px-2 rounded-lg border border-white/15"
                          >
                            {" "}
                            -{" "}
                          </button>
                          <span className="min-w-[2ch] text-center">
                            {" "}
                            {line.qty}{" "}
                          </span>
                          <button
                            onClick={() => setQty(line.id, line.qty + 1)}
                            className="px-2 rounded-lg border border-white/15"
                          >
                            {" "}
                            +{" "}
                          </button>
                          <button
                            onClick={() => removeLine(line.id)}
                            className="ml-3 text-xs text-red-300/90 hover:underline"
                          >
                            {" "}
                            Remove{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-yellow-50/80">Subtotal</span>
                <span className={classNames("font-semibold", goldText)}>
                  {" "}
                  ₹{cartTotal.toLocaleString("en-IN")}{" "}
                </span>
              </div>
              <button
                className="w-full px-4 py-2.5 rounded-xl bg-yellow-400 text-black font-semibold hover:brightness-95 disabled:opacity-60"
                disabled={cart.length === 0}
              >
                {" "}
                Checkout (Demo){" "}
              </button>
              <div className="text-[11px] text-yellow-50/60 mt-2">
                {" "}
                * Checkout is a demo in this preview. Connect Razorpay/Stripe
                for live payments.{" "}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
