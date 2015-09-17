module.exports = {
  css: {
    files: ['src/**/*.{scss,sass}'],
    tasks: ['build:css']
  },
  js: {
    files: ['src/**/*.{js,json,html}'],
    tasks: ['build:js']
  }
};
