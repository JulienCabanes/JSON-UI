module.exports = {
  options: {
    /** /
    beautify: true,
    compress: false,
    /**/
    banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM") %> */\r\n'
  },
  dist: {
    files: {
      'dist/<%= pkg.name %>.min.js': [
        'dist/<%= pkg.name %>.js'
      ]
    }
  }
};
