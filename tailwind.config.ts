import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1C3A2B",
          light: "#2D5A40",
        },
        accent: {
          DEFAULT: "#C8922A",
          dark: "#a8751f",
        },
        neutral: {
          dark: "#1A1A1A",
          mid: "#4A4A4A",
          light: "#F5F2ED",
        },
      },
      fontFamily: {
        heading: ["var(--font-oswald)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      fontSize: {
        // 1.25 modular scale anchored at 16px
        sm: ["0.8rem", { lineHeight: "1.4" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.25rem", { lineHeight: "1.5" }],
        xl: ["1.563rem", { lineHeight: "1.4" }],
        "2xl": ["1.953rem", { lineHeight: "1.3" }],
        "3xl": ["2.441rem", { lineHeight: "1.2" }],
        "4xl": ["3.052rem", { lineHeight: "1.1" }],
        "5xl": ["3.815rem", { lineHeight: "1.05" }],
      },
    },
  },
  plugins: [],
};

export default config;
