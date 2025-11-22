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
        primary: {
          DEFAULT: "#0c4a6e",
          blue: "#0c4a6e",
          ocean: "#0284c7",
          light: "#38bdf8",
          accent: "#0ea5e9",
        },
        success: {
          DEFAULT: "#059669",
          green: "#059669",
        },
        text: {
          dark: "#1e293b",
          light: "#64748b",
        },
      },
    },
  },
  plugins: [],
};
export default config;

