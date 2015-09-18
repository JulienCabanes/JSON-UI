angular.module('jcab.json-ui').directive('jsonAddValue', function(jsonDefaultValue) {
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

        $scope.objData[$scope.propName] = jsonDefaultValue(type);
        $scope.propName = '';
      };
    }
  };
});
