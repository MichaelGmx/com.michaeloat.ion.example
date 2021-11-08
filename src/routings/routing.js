uxRoutings

  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/home');

      // $locationProvider.html5Mode(true);

      $stateProvider
        // 首页
        .state('home', {
          url: '/home',
          templateUrl: 'pages/home.page/home.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'HomeCtrl'
        })

        // Media Capture
        .state('mediaCapture', {
          url: '/mediacapture',
          templateUrl: 'pages/media.capture.page/media.capture.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'MediaCaptureCtrl'
        })

        // Barcode Scanner
        .state('barcodeScanner', {
          url: '/barcodescanner',
          templateUrl: 'pages/barcode.scanner.page/barcode.scanner.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'BarcodeScannerCtrl'
        })

        // QRcode Marker
        .state('qrcodeMarker', {
          url: '/qrcodemarker',
          templateUrl: 'pages/qrcode.marker.page/qrcode.marker.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'QrcodeMarkerCtrl'
        })

        // Font Awesome
        .state('fontAwesome', {
          url: '/fontawesome',
          templateUrl: 'pages/font.awesome.page/font.awesome.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'FontAwesomeCtrl'
        })

        // h5QrcodeScanner
        .state('h5QrcodeScanner', {
          url: '/h5QrcodeScanner',
          templateUrl: 'pages/h5.qrcode.scanner.page/h5.qrcode.scanner.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'H5QrcodeScannerCtrl'
        })

        // Test
        .state('test', {
          url: '/test',
          templateUrl: 'pages/test.page/test.page.html' + '?v=' + GB_PROJECT.VERSION,
          controller: 'TestCtrl'
        })
        

        ;
    }])