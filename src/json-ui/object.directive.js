angular.module('jcab.json-ui').directive('jsonObject', function() {
  return {
    restrict: 'A',
    scope: {
      'objData': '=jsonObject'
    },
    templateUrl: 'json-ui/object.tpl.html'
  };
});
