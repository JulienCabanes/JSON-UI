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

        $scope.isString = _.isString;
        $scope.isNumber = _.isNumber;
        $scope.isBoolean = _.isBoolean;
        $scope.isArray = _.isArray;
        $scope.isObject = _.isPlainObject;
      });
    }
  };
});
