import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary1: "#3b1e54",
        primary2: "#9b7ebd",
        primary3: "#d4bee4",
        primary4: "#eeeeee",
      },
      fontFamily: {
        sans: ["var(--font-raleway)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;