(function () {

angular
  .module('app')
  .directive('slickAutofocus', function () {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        elem[0].focus();
      }
    };
  });

})();
