module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // <= 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#f8fdfa",
          200: "#e5f6ee",
          300: "#A5DEC4",
        },
        "brand-nav": {
          200: "#a5dec4",
          800: "#307046"
        },
        "brand-light": {
          600: "#3e3f59",
        },
        "brand-pill-light": {
          300: "#5fd49f"
        },
        "brand-dark": {
          500: "#54556e",
          900: "#383952",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-dark-mode")(),
  ],
};
