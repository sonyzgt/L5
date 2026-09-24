import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        aegis: {
          bg: "#F6F3EC",
          bgSubtle: "#EFECE3",
          card: "#FFFFFF",
          cardSubtle: "#FAF8F5",
          border: "rgba(28, 27, 24, 0.08)",
          ink: "#1C1B18",
          forest: "#283615",
          lime: "#B8F34A",
          muted: "#6B665E",
        },
        l5: {
          bg: "#F6F3EC",
          bgSubtle: "#EFECE3",
          card: "#FFFFFF",
          border: "rgba(28, 27, 24, 0.08)",
          lime: "#B8F34A",
          text: "#1C1B18",
          muted: "#6B665E",
        },
      },
      fontFamily: {
        display: ["Unbounded", "Syne", "-apple-system", "sans-serif"],
        editorial: ["Syne", "PP Neue Corp Tight", "-apple-system", "sans-serif"],
        cursive: ["Caveat", "cursive", "Georgia", "serif"],
        mono: ["Space Grotesk", "Geist Mono", "ui-monospace", "monospace"],
        sans: ["Geist", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        marqueeSlow: "marquee 42s linear infinite",
        marqueeReverse: "marqueeReverse 26s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
