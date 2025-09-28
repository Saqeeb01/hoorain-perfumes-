export const pages = [
  "home",
  "about",
  "collections",
  "contact",
  "admin",
  "product",
] as const;
export type Page = (typeof pages)[number];

export const categories = ["all", "perfumes", "attar", "agarbatti"] as const;
export type Category = (typeof categories)[number];
