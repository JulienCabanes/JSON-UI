module.exports = {
  css: {
    files: [
      {
        expand: true,
        cwd: '.tmp',
        src: [
          '<%= pkg.name %>.css'
        ],
        dest: 'dist/'
      }
    ]
  },
  js: {
    files: [
      {
        expand: true,
        cwd: '.tmp',
        src: [
          '<%= pkg.name %>.js'
        ],
        dest: 'dist/'
      }
    ]
  }
};
