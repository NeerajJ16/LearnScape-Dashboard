/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ enables class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        surface: "#1a1a1a",
        border: "#2a2a2a",
        muted: "#777",
        primary: "#3b82f6",
        secondary: "#10b981",
      },
    },
  },
  plugins: [],
}
