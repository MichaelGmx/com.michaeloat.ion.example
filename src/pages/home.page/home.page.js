uxPages
  .controller('HomeCtrl', ['$rootScope', '$scope', '$state', 'UtilService',
    function ($rootScope, $scope, $state, UtilService) {

      $scope.GB_PROJECT = GB_PROJECT;

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {
        lstOfPage: [
          { PageName: 'MediaCapture',        PageState: 'mediaCapture', },
          { PageName: 'BarcodeScanner',      PageState: 'barcodeScanner', },
          { PageName: 'QRcode Marker',       PageState: 'qrcodeMarker', },
          { PageName: 'Font Awesome',        PageState: 'fontAwesome', },
          { PageName: 'H5 QrCode Scanner',   PageState: 'h5QrcodeScanner', },
          { PageName: 'Test',                PageState: 'test', },
        ]
      };

      $scope.goPage = function (page) {
        $state.go(page.PageState);
      }

    }])