angular.module('jcab.json-ui').directive('jsonAutoGrow', function($window, $timeout) {
  // From https://gist.github.com/thomseddon/4703968
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      element.on('input propertychange', update);
      $timeout(update);

      if(attr.ngModel) {
        scope.$watch(attr.ngModel, update);
      }

      function update() {
        var scrollTop = $window.pageYOffset,
            scrollLeft = $window.pageXOffset,
            width = '100%';

        if(element.val().length <= 10) {
          width = '126px';
        } else if(element.val().length <= 30) {
          width = '320px';
        } else if(element.val().length <= 50) {
          width = '510px';
        }

        element.css({
          width: width,
          height: 'auto',
          overflow: 'hidden'
        });

        var height = element[0].scrollHeight;

        if (height > 0) {
          element.css('height', height + 'px');
        }
        $window.scrollTo(scrollLeft, scrollTop);
      }
    }
  };
});
