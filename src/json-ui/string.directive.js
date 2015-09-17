angular.module('jcab.json-ui').directive('jsonString', function() {
  return {
    restrict: 'A',
    templateUrl: 'json-ui/string.tpl.html',
    link: function($scope) {
      $scope.isRTEOpened = false;

      $scope.openRTE = function() {
        $scope.isRTEOpened = true;
      };
      $scope.closeRTE = function() {
        $scope.isRTEOpened = false;
      };

      $scope.tinymceOptions = {
        inline: false,
        menu: false,
        menubar: false,
        min_height: 300,
        plugins : 'autolink link lists preview',
        skin: 'lightgray',
        theme : 'modern',
        content_style: [
          '#tinymce { font-size: 20px; line-height: 1.4; font-family: font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;}',
          '#tinymce p, #tinymce div { margin: 1em 0; }'
        ].join(''),
        // force_br_newlines : false,
        // force_p_newlines : false,
        forced_root_block : '',

        onChange: function(e) {
          console.log('e: ', e);
          // put logic here for keypress and cut/paste changes
        },
      };

      $scope.$watch('objData[key]', function(newValue, oldValue) {
        if(newValue.match(/<p/gi)) {
          $scope.tinymceOptions.forced_root_block = 'p';
        } else if(newValue.match(/<div/gi)) {
          $scope.tinymceOptions.forced_root_block = 'div';
        } else {
          $scope.tinymceOptions.forced_root_block = '';
        }
      });


    }
  };
});
