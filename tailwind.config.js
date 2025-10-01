import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0b0b0d",
        gold: {
          light: "#F1E5AC",
          DEFAULT: "#D4AF37",
          dark: "#B8860B",
        },
        beige: "#F5F5DC",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
        serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [],
};