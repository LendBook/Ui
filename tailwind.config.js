/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    fontFamily: {
      "GothamPro-Regular": ["GothamPro-Regular"],
      "GothamPro-Bold": ["GothamPro-Bold"],
      cocogoose: ["cocogoose"],
    },
    extend: {
      colors: {
        primary: "#003F7D",
        secondary: "#002347",
        success: "#28a745",
        error: "#dc3545",
        warning: "#ffc107",
        info: "#59748d",
        light: "#f8f9fa",
        dark: "#343a40",

        black: "#333333",
        white: "#ffffff",

        bgBtn: "#003F7D",
        bgBtnHover: "#002347",
        borderColor: "#4ACFFF",

        bgLight: "#e9f4ff",
      },
    },
  },
  plugins: [],
};
