uxDirectives

  // 圖片路徑無法訪問，給出替代圖
  // https://stackoverflow.com/questions/16310298/if-a-ngsrc-path-resolves-to-a-404-is-there-a-way-to-fallback-to-a-default/27928897
  .directive('errSrc', [function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attrs) {
        $element.bind('error', function () {   // 圖片路徑訪問有誤
          if ($attrs.src != $attrs.errSrc) {
            $attrs.$set('src', $attrs.errSrc);
          }
        });

        $attrs.$observe('ngSrc', function (value) {  // 圖片路徑為空
          if (!value && $attrs.errSrc) {
            $attrs.$set('src', $attrs.errSrc);
          }
        });
      }
    }
  }])

  ;