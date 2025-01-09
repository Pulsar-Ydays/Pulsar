import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'], // Ajoute JetBrains Mono sous le groupe "mono"
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Ajoutez d'autres couleurs ici si nécessaire...
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        // Plus de couleurs personnalisées...
      },
      keyframes: {
        "spin-right": {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        "spin-left": {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        "gradient-x": {
          "0%": {
            backgroundPosition: "100% 0",
          },
          "100%": {
            backgroundPosition: "0% 0",
          },
        },
      },
      animation: {
        "spin-right": 'spin-right 0.6s linear',
        "spin-left": 'spin-left 0.6s linear',
        "gradient-x": "gradient-x 10s ease-in-out",
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
