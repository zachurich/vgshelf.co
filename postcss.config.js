const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [
    require("postcss-easy-import"),
    require("@csstools/postcss-sass"),
    tailwindcss("./tailwind.config.js"),
    require("autoprefixer")
  ]
};
