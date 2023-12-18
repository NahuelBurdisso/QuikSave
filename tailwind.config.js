const { screens } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  screens: {
    xs: "380px",
    supported: "550px",
    ...screens,
  },
  fontFamily: {
    inter: ["Inter", "sans-serif"],
    mono: ["Inter", "monospace"],
  },
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      abbey: {
        50: "#f6f6f6",
        100: "#e7e7e7",
        200: "#d1d1d1",
        300: "#b0b0b0",
        400: "#888888",
        500: "#6d6d6d",
        600: "#5d5d5d",
        700: "#4a4a4a",
        800: "#454545",
        900: "#3d3d3d",
        950: "#262626",
      },
      blue: {
        50: "#bbc5e6",
        100: "#a3b2de",
        200: "#8a9ed5",
        300: "#718bd0",
        400: "#5877c7",
        500: "#3f64c1",
        600: "#3351a7",
        700: "#27408e",
        800: "#1b2e75",
        900: "#0e1d5c",
        950: "#010245",
      },
      purple: {
        50: "#f2eef7",
        100: "#e5d9f0",
        200: "#d7c4e9",
        300: "#caafe2",
        400: "#bd9adc",
        500: "#b08fd0",
        600: "#9a7eb8",
        700: "#846da0",
        800: "#6e5c88",
        900: "#584b70",
        950: "#423a58",
      },
    },
  },
};
