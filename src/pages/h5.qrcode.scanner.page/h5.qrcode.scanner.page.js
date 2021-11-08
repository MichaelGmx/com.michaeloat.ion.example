uxPages
  .controller('H5QrcodeScannerCtrl', ['$rootScope', '$scope', 'UtilService',
    function ($rootScope, $scope, UtilService) {

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {
        scanResult: ''
      };

      $scope.startScan = function () {
        $scope.data.scanResult = '';

        function onScanSuccess(decodedText, decodedResult) {
          // handle the scanned code as you like, for example:
          // console.log(`Code matched = ${decodedText}`, decodedResult);
          if (decodedResult) {
            $scope.$apply(function () {
              $scope.data.scanResult = decodedResult;

              // html5QrcodeScanner.clear();
              html5QrCode.stop();
            });
          }
          
        }
        
        function onScanFailure(error) {
          // handle scan failure, usually better to ignore and keep scanning.
          // for example:
          // console.warn(`Code scan error = ${error}`);
        }

        const options = { fps: 10, qrbox: {width: 250, height: 250} };
        
        const html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start({ facingMode: { exact: "environment"}}, options, onScanSuccess);

        // var html5QrcodeScanner = new Html5QrcodeScanner(
        //   "reader",
        //   options,
        //   /* verbose= */ false);
        // html5QrcodeScanner.render(onScanSuccess, onScanFailure);
      }

      $scope.init = function () {
        
      }
      $scope.$on('$ionicView.loaded', function () {
        $scope.init();
      });

    }])