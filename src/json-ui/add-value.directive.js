angular.module('jcab.json-ui').directive('jsonAddValue', function() {
  return {
    restrict: 'A',
    templateUrl: 'json-ui/add-value.tpl.html',
    link: function($scope, $element, $attrs) {
      $scope.propType = 'string';

      $scope.addProp = function(type) {
        if(!$scope.propName) {
          alert('Ce champ a besoin d\'un nom');
          return;
        }

        if($scope.objData.hasOwnProperty($scope.propName)) {
          alert('Ce nom existe déjà');
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

        $scope.objData[$scope.propName] = value;
        $scope.propName = '';
      };
    }
  };
});
