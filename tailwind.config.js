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
        primary: "#6cc6a7", //"#98ff98", "#c5ebdf",
        secondary: "#677785", //"#002347",
        success: "#cc88ff",
        error: "#d9dfe6", //"#c1cbd6", //"#d8dfe5", //"#c9dae9", //"#bebebe",
        warning: "#f0f2f5", //"#ffc107",
        info: "#59748d",
        light: "#f0f2f5", //"#f8f9fa",
        dark: "#343a40", //"#677785", //"#343a40",

        black: "#111111",
        white: "#ffffff",

        bgBtn: "#003F7D",
        bgBtnHover: "#002347",
        borderColor: "#4ACFFF",

        bgLight: "#c1cbd6", //"#a7b5c3", //"#f9fafb", //"#f0f2f5", //"#e9f4ff",
      },
      // colors: {
      //   primary: "#003F7D",
      //   secondary: "#677785", //"#002347",
      //   success: "#28a745",
      //   error: "#c9dae9", //"#bebebe",
      //   warning: "#ffc107",
      //   info: "#59748d",
      //   light: "#f8f9fa",
      //   dark: "#343a40", //"#677785", //"#343a40",

      //   black: "#333333",
      //   white: "#ffffff",

      //   bgBtn: "#003F7D",
      //   bgBtnHover: "#002347",
      //   borderColor: "#4ACFFF",

      //   bgLight: "#f0f2f5", //"#e9f4ff",
      // },
    },
    screens: {
      "md-plus": { min: "1000px" }, // Définir une taille d'écran personnalisée légèrement au-dessus de md
    },
  },
  plugins: [],

  variants: {
    extend: {
      transform: ["hover", "group-hover"],
      transitionProperty: ["hover", "group-hover"],
      transitionDuration: ["hover", "group-hover"],
      rotate: ["hover", "group-hover"],
    },
  },
};
