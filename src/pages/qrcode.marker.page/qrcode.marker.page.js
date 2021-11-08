uxPages
  .controller('QrcodeMarkerCtrl', ['$rootScope', '$scope', 'UtilService',
    function ($rootScope, $scope, UtilService) {

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {
        strText: '',

        qrcode_make_status: false
      };

      // 制作QrCode
      var OBJ_Qrcode = new QRCode(document.getElementById("qrcode"), {
        text: 'null',
        width: 150,
        height: 150,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
      });

      // 生成Qrcode
      $scope.generateQRCode = function () {
        var text = $scope.data.strText;
        if (text) {
          OBJ_Qrcode.clear();
          $scope.data.qrcode_make_status = false;
          if (text.length > 0) {
            OBJ_Qrcode.makeCode(text);
            $scope.data.qrcode_make_status = true;
          }
        }
      }

    }])