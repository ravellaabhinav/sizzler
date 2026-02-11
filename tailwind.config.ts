// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: "#120507",
          900: "#1B070A",
          800: "#2A0B11",
          700: "#3A101A",
        },
        gold: {
          400: "#D7B46A",
          500: "#C8A04E",
          600: "#A7842F",
        },
        cream: "#FFF6E6",
        ink: "#0B0A0A",
      },
      fontFamily: {
        serif: ["ui-serif", "Georgia", "Times New Roman", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.25)",
      },

      /* ✅ Added for professional scroll indicator */
      keyframes: {
        "scroll-bounce": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
      },
      animation: {
        "scroll-bounce": "scroll-bounce 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
