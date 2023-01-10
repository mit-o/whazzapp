/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#252425",
        light: "#fffffe",
        lightplus: "#fdfdfd",
        lightextra: "#f8f8f8",
        gray: "#d1d2d6",
        accent: "#04b7a2",
        accentplus: "#04a592",
      },
    },
  },
  plugins: [],
};
