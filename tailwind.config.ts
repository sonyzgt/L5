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
        l5: {
          bg: "#050706",
          bgSubtle: "#080B09",
          card: "#0d120f",
          border: "rgba(255, 255, 255, 0.12)",
          lime: "#C7FF28",
          text: "#F5F7F2",
          muted: "#9AA09A",
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
    },
  },
  plugins: [],
};
export default config;
