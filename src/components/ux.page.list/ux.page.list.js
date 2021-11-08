uxComponents

  .directive("uxPageList", ['$state',
    function ($state) {
      return {
        restrict: "E",
        templateUrl: 'components/ux.page.list/ux.page.list.html' + '?v=' + GB_PROJECT.VERSION,
        scope: {
          pages: '='
        },
        link: function ($scope, $element, $attrs) {

          $scope.goPage = function (page) {
            $state.go(page.PageState);
          }

        }
      }
    }])