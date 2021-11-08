uxComponents

  .directive("uxFooter", [
    function () {
      return {
        restrict: "E",
        templateUrl: 'components/ux.footer/ux.footer.html' + '?v=' + GB_PROJECT.VERSION,
        scope: {},
        link: function ($scope, $element, $attrs) {

          $scope.GB_PROJECT = GB_PROJECT;

        }
      }
    }])