angular.module('jcab.json-ui').factory('jsonDefaultValue', function() {
  return function(type) {
    switch(type) {
      case 'string':
        return '';

      case 'number':
        return 0;

      case 'bool':
        return true;

      case 'array':
        return [];

      case 'object':
        return {};

      default:
        return '';
    }
  };
});
