module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        secondary: "#9277FF",
        darkBlue: "#1E2139",
        navyBlue: "#252945",
        lightGray: "#DFE3FA",
        gray: "#888EB0",
        mediumBlue: "#7E88C3",
        dark: "#0C0E16",
        red: "#EC5757",
        lightPurple: "#9277FF",
        lightBg: "#F8F8FB",
        darkBg: "#141625",
      },
      fontFamily: {
        spartan: ["Spartan", "sans-serif"],
      },
      fontWeight: {
        medium: 500,
        semiBold: 600,
        bold: 700,
        extraBold: 900,
      },
      spacing: {
        85: "85px",
      },
      screens: {
        lg: "1024px",
      },
    },
  },
  variants: {},
  plugins: [],
};
