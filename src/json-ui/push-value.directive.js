angular.module('jcab.json-ui').directive('jsonPushValue', function(jsonDefaultValue) {
  return {
    restrict: 'A',
    templateUrl: 'json-ui/push-value.tpl.html',
    link: function($scope, $element, $attrs) {
      $scope.propType = '';

      $scope.pushLastClone = function() {
        $scope.objData.push(angular.copy($scope.objData[$scope.objData.length - 1]));
      };

      $scope.pushValue = function(type) {
        if(!type) {
          alert('Type inconnu');
          return;
        }

        $scope.objData.push(jsonDefaultValue(type));
        $scope.propType = '';
      };
    }
  };
});
