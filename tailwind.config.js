/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skyblue: {
          50: "#ecf6fe",
          100: "#9dcffb",
          200: "#85c4fa",
          300: "#6db8f8",
          400: "#3ca0f6",
          500: "#2394f5",
          600: "#0b88f4",
          700: "#096dc3",
          800: "#085fab",
        },
        white: "#ffffff",
        red: "#ff0000",
        black: {
          200: "#4D4D4D",
        },
      },
      gridTemplateColumns: {
        "4rem-cols-3": "4rem 1fr 1fr 1fr",
        "1-2": "1fr 2fr",
      },
    },
  },
  plugins: [],
};
