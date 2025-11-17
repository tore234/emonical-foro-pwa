/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emonical: {
          sky: "#B4C5F7",
          lilac: "#B29DD9",
          light: "#C5D4F5",
          pale: "#CEEBF8",
          dark: "#2D2D2D",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
