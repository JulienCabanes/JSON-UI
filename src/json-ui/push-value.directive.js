angular.module('jcab.json-ui').directive('jsonPushValue', function() {
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

        var value;
        switch(type) {
          case 'string':
            value = '';
            break;
          case 'number':
            value = 0;
            break;
          case 'bool':
            value = true;
            break;
          case 'array':
            value = [];
            break;
          case 'object':
            value = {};
            break;
        }

        $scope.objData.push(value);
        $scope.propType = '';
      };
    }
  };
});
