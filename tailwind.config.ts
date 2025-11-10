import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AEstruct brand colors
        primary: {
          DEFAULT: "#1B4D89", // Deep cobalt blue
          dark: "#153A6A",
          light: "#2461A7",
        },
        accent: {
          DEFAULT: "#D97228", // Burnt orange
          dark: "#B85E20",
          light: "#E68A45",
        },
        highlight: {
          DEFAULT: "#F2C94C", // Yellow
          dark: "#E0B73D",
          light: "#F5D670",
        },
      },
      fontFamily: {
        sans: ["Aptos", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
