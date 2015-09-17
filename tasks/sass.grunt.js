module.exports = {
  options: {
    sourcemap: 'none',
    style: 'expanded',
    precision: 10,
    lineNumbers: false
  },
  src: {
    files: [{
      expand: true,
      cwd: 'src',
      src: ['**/*.{scss,sass}'],
      dest: '.tmp',
      ext: '.css'
    }]
  }
};
