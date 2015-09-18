angular.module('jcab.json-ui').directive('jsonEditor', function() {
  return {
    restrict: 'A',
    scope: {
      data: '=jsonEditor'
    },
    templateUrl: 'json-ui/editor.tpl.html'
  };
});
