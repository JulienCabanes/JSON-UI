angular.module('jcab.json-ui', ['ui.tinymce']);
;angular.module('jcab.json-ui').directive('jsonAddValue', function() {
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
;angular.module('jcab.json-ui').directive('jsonArray', function() {
  return {
    restrict: 'A',
    scope: {
      'objData': '=jsonArray'
    },
    templateUrl: 'json-ui/array.tpl.html',
    link: function($scope, $element, $attrs) {
      $scope.add = function() {
        $scope.objData.push(_.cloneDeep(_.last($scope.objData)));
      };
    }
  };
});
;angular.module('jcab.json-ui').directive('jsonAutoGrow', ['$window', '$timeout', function($window, $timeout) {
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
}]);
;;'use strict';

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
;angular.module('jcab.json-ui').directive('jsonNumber', function() {
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
;angular.module('jcab.json-ui').directive('jsonObject', function() {
  return {
    restrict: 'A',
    scope: {
      'objData': '=jsonObject'
    },
    templateUrl: 'json-ui/object.tpl.html'
  };
});
;angular.module('jcab.json-ui').directive('jsonPushValue', function() {
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
;'use strict';

angular.module('jcab.json-ui')
  .factory('recursiveDirectiveHelper', ['$compile', function($compile) {
    // From http://stackoverflow.com/questions/14430655/recursion-in-angular-directives
    return {
      /**
       * Manually compiles the element, fixing the recursion loop.
       * @param element
       * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
       * @returns An object containing the linking functions.
       */
      compile: function(element, link) {
        // Normalize the link parameter
        if (angular.isFunction(link)) {
          link = {
            post: link
          };
        }

        // Break the recursion loop by removing the contents
        var contents = element.contents()
          .remove();
        var compiledContents;
        return {
          pre: (link && link.pre) ? link.pre : null,
          /**
           * Compiles and re-adds the contents
           */
          post: function(scope, element) {
            // Compile the contents
            if (!compiledContents) {
              compiledContents = $compile(contents);
            }
            // Re-add the compiled contents to the element
            compiledContents(scope, function(clone) {
              element.append(clone);
            });

            // Call the post-linking function, if any
            if (link && link.post) {
              link.post.apply(null, arguments);
            }
          }
        };
      }
    };
  }]);
;angular.module('jcab.json-ui').directive('jsonRteValue', function() {
  return {
    restrict: 'A',
    templateUrl: 'json-ui/rte-value.tpl.html'
  };
});
;angular.module('jcab.json-ui').directive('jsonString', function() {
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
;angular.module('jcab.json-ui').directive('jsonValue', ['recursiveDirectiveHelper', function(recursiveDirectiveHelper) {
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
}]);
;angular.module('jcab.json-ui').run(['$templateCache', function($templateCache) {  'use strict';

  $templateCache.put('json-ui/add-value.tpl.html',
    "<form ng-submit=\"addProp(propType)\" class=\"form-inline text-right\"><input ng-model=\"propName\" class=\"form-control form-control-sm\" placeholder=\"nom du champ\" style=\"width: 240px\"><select ng-model=\"propType\" class=\"form-control\"><option value=\"string\">Texte</option><option value=\"number\">Nombre</option><option value=\"bool\">Booléen</option><option value=\"array\">Tableau</option><option value=\"object\">Objet</option></select><button type=\"submit\" class=\"invisible\">ok</button></form>"
  );


  $templateCache.put('json-ui/array.tpl.html',
    "<table class=\"table table-bordered\"><tr ng-repeat=\"(key, value) in objData track by $index\"><td valign=\"top\" class=\"json-label\">{{ key }}:</td><td valign=\"top\" class=\"json-value\" json-value=\"value\"></td></tr><tr><td colspan=\"2\" class=\"json-add-value text-right\" json-push-value></td></tr></table>"
  );


  $templateCache.put('json-ui/editor.tpl.html',
    "<div class=\"json-ui\" json-value=\"data\"></div>"
  );


  $templateCache.put('json-ui/number.tpl.html',
    "<span class=\"json-field json-number\"><input type=\"number\" ng-model=\"strData\" class=\"form-control\"></span>"
  );


  $templateCache.put('json-ui/object.tpl.html',
    "<table class=\"table table-bordered\"><tr ng-repeat=\"(key, value) in objData\"><td valign=\"top\" class=\"json-label\"><span>{{ key }}:</span></td><td valign=\"top\" class=\"json-value\"><span json-value=\"value\"></span></td></tr><tr><td colspan=\"2\" class=\"json-add-value text-right\" json-add-value></td></tr></table>"
  );


  $templateCache.put('json-ui/push-value.tpl.html',
    "<form ng-submit=\"pushValue(propType)\" class=\"form-inline text-right\"><select ng-model=\"propType\" class=\"form-control\" ng-change=\"pushValue(propType)\"><option value=\"\">Ajouter</option><option value=\"string\">Texte</option><option value=\"number\">Nombre</option><option value=\"bool\">Booléen</option><option value=\"array\">Tableau</option><option value=\"object\">Objet</option></select><span ng-if=\"objData.length > 0\" style=\"color: white\">ou <button type=\"button\" ng-click=\"pushLastClone()\" class=\"btn btn-secondary btn-sm\">dupliquer le dernier élément</button></span> <button type=\"submit\" class=\"invisible\">ok</button></form>"
  );


  $templateCache.put('json-ui/rte-value.tpl.html',
    "<div class=\"modal-backdrop fade in\" style=\"display: block\"></div><div class=\"modal fade in\" style=\"display: block\"><div class=\"modal-dialog modal-lg\"><div class=\"modal-content\"><div class=\"modal-header\"><button ng-click=\"closeRTE()\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Fermer\"><span aria-hidden=\"true\">&times;</span> <span class=\"sr-only\">Fermer</span></button><h4 class=\"modal-tit\">{{ key }}</h4></div><div class=\"modal-body\"><textarea ui-tinymce=\"tinymceOptions\" ng-model=\"objData[key]\"></textarea></div><div class=\"modal-footer\"><button ng-click=\"closeRTE()\" type=\"button\" class=\"btn btn-primary\">Enregistrer</button></div></div></div></div>"
  );


  $templateCache.put('json-ui/string.tpl.html',
    "<span class=\"json-field json-string\"><textarea ng-model=\"objData[key]\" ng-dblclick=\"openRTE()\" json-auto-grow rows=\"1\" cols=\"50\" class=\"form-control\"></textarea></span><div ng-if=\"isRTEOpened\" json-rte-value></div>"
  );


  $templateCache.put('json-ui/value.tpl.html',
    "<span ng-if=\"isString(data)\" json-string=\"data\"></span> <span ng-if=\"isNumber(data)\" json-number=\"data\"></span> <span ng-if=\"isArray(data)\" json-array=\"data\"></span> <span ng-if=\"isObject(data)\" json-object=\"data\"></span>"
  );
}]);