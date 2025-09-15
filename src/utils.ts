export function classNames(...arr: (string | false | undefined)[]) {
  return arr.filter(Boolean).join(" ");
}

// Gold gradient and luxury helpers
export const goldText =
  "bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-500 bg-clip-text text-transparent";
export const goldBorder = "border border-yellow-400/40";
export const glass =
  "backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/2.5";
