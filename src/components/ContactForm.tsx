import React, { useState } from "react";
import { classNames, glass, goldBorder } from "../utils";

export function ContactForm() {
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
