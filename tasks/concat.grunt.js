module.exports = {
  options: {
    separator: ';',
  },
  js: {
    src: [
      'src/**/*.js',
      '.tmp/<%= pkg.name %>.tpl.js'
    ],
    dest: '.tmp/<%= pkg.name %>.js'
  },
};
