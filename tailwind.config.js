module.exports = {
  purge: {
    enabled: true,
    content: ["./src/index.html"],
    css: ["./src/index.scss", "./src/**/*.scss"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
