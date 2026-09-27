/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        space: {
          900: "#05050A",
          800: "#0B0F19",
          700: "#111827",
        },
        cyanGlow: "#00F0FF",
        cosmicPurple: "#8A2BE2",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};