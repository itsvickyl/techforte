/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#00FFFF",
          glow: "rgba(0, 255, 255, 0.5)",
          dark: "#00b3b3",
        },
        primary: "#0a0a0a",
      },
      fontFamily: {
        heading: ['Orbitron', '"Bitcount Grid Double"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3)',
        'neon-lg': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(0, 255, 255, 0.3)',
      },
    },
  },
  plugins: [],
}
