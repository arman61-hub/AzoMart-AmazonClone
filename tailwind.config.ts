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
        amazon: {
          DEFAULT: '#FF9900',
          dark: '#131921',
          light: '#232F3E',
          yellow: '#FFD814',
          'yellow-hover': '#F7CA00',
          river: '#007185',
        }
      },
    },
  },
  plugins: [],
};
export default config;

