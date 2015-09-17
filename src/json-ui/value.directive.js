angular.module('jcab.json-ui').directive('jsonValue', function(recursiveDirectiveHelper) {
  return {
    restrict: 'A',
    scope: true,
    templateUrl: 'json-ui/value.tpl.html',
    compile: function(element) {

      return recursiveDirectiveHelper.compile(element, function($scope, $element, $attrs) {
        $scope.$watch($attrs.jsonValue, function(newValue, oldValue) {
          $scope.data = newValue;
        });

        $scope.isObject = _.isPlainObject;
        $scope.isArray = _.isArray;
        $scope.isString = _.isString;
        $scope.isNumber = _.isNumber;
      });
    }
  };
});
