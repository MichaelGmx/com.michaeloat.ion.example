uxPages
  .controller('BarcodeScannerCtrl', ['$rootScope', '$scope', 'UtilService',
    function ($rootScope, $scope, UtilService) {

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {
        strResult: ''
      };

      /**
       * 扫一扫
       * 
       * 参考：https://github.com/phonegap/phonegap-plugin-barcodescanner
       */
      $scope.scan = function () {
        if (cordova && cordova.plugins && cordova.plugins.barcodeScanner) {
          cordova.plugins.barcodeScanner
            .scan(function (result) {
              //alert("We got a barcode\n" +
              //      "Result: " + result.text + "\n" +
              //      "Format: " + result.format + "\n" +
              //      "Cancelled: " + result.cancelled);
              $scope.$apply(function () {
                $scope.data.strResult = result.text;
              });
            },function (error) {
              alert("Scanning failed: " + error);
            },{
              preferFrontCamera: false, // iOS and Android
              showFlipCameraButton: true, // iOS and Android
              showTorchButton: true, // iOS and Android
              torchOn: false, // Android, launch with the torch switched on (if available)
              saveHistory: true, // Android, save scan history (default false)
              prompt: "请将二维码/条形码 放置在扫描区内", // Android
              //resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              resultDisplayDuration: 0, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
              // formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
              orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
              disableAnimations: true, // iOS
              disableSuccessBeep: false // iOS and Android
            }
          );
        }
      }

      $scope.init = function () {
        
      }
      $scope.$on('$ionicView.loaded', function () {
        $scope.init();
      });

    }])