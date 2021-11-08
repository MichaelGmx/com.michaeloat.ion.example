uxPages
  .controller('MediaCaptureCtrl', ['$rootScope', '$scope', 'UtilService',
    function ($rootScope, $scope, UtilService) {

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {

      };

      /**
       * 拍照
       * 
       * 更多options设置，参考：https://github.com/apache/cordova-plugin-media-capture#captureimageoptions
       */
      $scope.captureImage = function () {
        // capture callback
        var captureSuccess = function(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
              // do something interesting with the file
          }
        };

        // capture error callback
        var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };

        // start image capture
        // navigator.device.capture.captureImage(captureSuccess, captureError, options);
        // limit: 1 表示拍摄1次
        navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 1 });
      }

    }])