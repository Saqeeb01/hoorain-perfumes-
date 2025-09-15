export const pages = ["home", "about", "collections", "contact", "admin"] as const;
export type Page = (typeof pages)[number];
