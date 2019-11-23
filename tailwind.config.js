const { colors } = require("tailwindcss/defaultTheme");

module.exports = {
  theme: {
    extend: {
      // colors: {
      //   blue: {
      //     ...colors.blue,
      //     "500": "#5B89F8",
      //     "600": "#3A6FF0"
      //   },
      //   purple: {
      //     ...colors.purple,
      //     "500": "#5d5afd",
      //     "600": "#4946FE"
      //   }
      // }
    },
    boxShadow: {
      default: "0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)",
      md: "0 5px 0px 0px rgba(0, 0, 0, .3)"
    }
  },
  variants: {},
  plugins: []
};
