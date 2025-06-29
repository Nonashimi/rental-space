import type { Config } from "tailwindcss";

export default {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: {
      sm: '640px',
      md: '790px',
      mmd: '946px',
      lg: '1100px',
      xl: '1280px',
    }
  },
  plugins: [
  ],
} satisfies Config;
