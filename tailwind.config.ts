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
        primary: "#DA458F",
        secondary: "#DA34DD",
      },
      fontFamily: {
        interSans: "var(--font-inter-sans)",
        bebasneue: "var(--font-bebas-neue)",
        tekoSans: "var(--font-teko-sans)",
      },
    },
  },
  plugins: [],
} satisfies Config;
