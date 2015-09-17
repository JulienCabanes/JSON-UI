module.exports = {
  options: {
    htmlmin: {
      collapseBooleanAttributes:      true,
      collapseWhitespace:             true,
      removeComments:                 true,
      removeEmptyAttributes:          true,
      removeRedundantAttributes:      true,
      removeScriptTypeAttributes:     true,
      removeStyleLinkTypeAttributes:  true
    }
  },
  dist: {
    cwd: 'src',
    src: '**/*.tpl.html',
    dest: '.tmp/<%= pkg.name %>.tpl.js',
    options: {
      module: '<%= pkg.moduleNS %>',
      bootstrap:  function(module, script) {
        return 'angular.module(\'' + module + '\').run([\'$templateCache\', function($templateCache) {' + script + '}]);';
      }
    }
  }
};
