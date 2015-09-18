angular.module('jcab.json-ui').directive('jsonArray', function() {
  return {
    restrict: 'A',
    scope: {
      'objData': '=jsonArray'
    },
    templateUrl: 'json-ui/array.tpl.html'
  };
});
