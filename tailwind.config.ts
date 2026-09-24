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
          bg: "#10170e",
          bgSubtle: "#151e12",
          card: "#1a2517",
          border: "rgba(244, 241, 232, 0.12)",
          lime: "#B8F34A",
          forest: "#283615",
          ivory: "#F4F1E8",
          muted: "#A0AA98",
        },
        l5: {
          bg: "#10170e",
          bgSubtle: "#151e12",
          card: "#1a2517",
          border: "rgba(244, 241, 232, 0.12)",
          lime: "#B8F34A",
          text: "#F4F1E8",
          muted: "#A0AA98",
        },
        kawa: {
          lime: "#c8f53c",
          dark: "#08090c",
          card: "#12141a",
          subtle: "#1c1f28",
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
