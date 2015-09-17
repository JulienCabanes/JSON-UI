'use strict';

angular.module('jcab.json-ui')
  .directive('jsonEditor', function() {
    return {
      restrict: 'A',
      scope: true,
      templateUrl: 'json-ui/editor.tpl.html',
      link: function($scope, $element, $attrs) {
        $scope.$watch($attrs.jsonEditor, function(newValue, oldValue) {
          $scope.data = newValue;
        });
      }
    };
  });
