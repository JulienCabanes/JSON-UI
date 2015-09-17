angular.module('jcab.json-ui').directive('jsonNumber', function() {
  return {
    restrict: 'A',
    templateUrl: 'json-ui/number.tpl.html',
    link: function($scope, $element, $attrs) {
      var scopeKey = 'objData[key]';

      $scope.$watch(scopeKey, function(newValue, oldValue) {
        $scope.strData = newValue;
      });

      $scope.$watch('strData', function(newValue, oldValue) {
        if(!_.isNaN(newValue * 1) && newValue !== '') {
          newValue = newValue * 1;
          $scope.$eval(scopeKey + '=' + newValue);
        } else {
          $scope.$eval(scopeKey + '="' + newValue.replace(/"/gi, '\\"') + '"');
        }
      });
    }
  };
});
