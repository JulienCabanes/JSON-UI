angular.module('jcab.json-ui').directive('jsonArray', function() {
  return {
    restrict: 'A',
    scope: {
      'objData': '=jsonArray'
    },
    templateUrl: 'json-ui/array.tpl.html',
    link: function($scope, $element, $attrs) {
      $scope.add = function() {
        $scope.objData.push(_.cloneDeep(_.last($scope.objData)));
      };
    }
  };
});
