uxRuns

.run(['$ionicPlatform', '$location', 'UtilService',
  function($ionicPlatform, $location, UtilService) {
    $ionicPlatform.ready(function() {

      // Firebase Cloud Messaging  -by cordova-plugin-firebase-messaging
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.firebase && window.cordova.plugins.firebase.messaging) {
        var mainTopic = "ewarehouse";
        var deviceTopic = "android";

        cordova.plugins.firebase.messaging.onMessage(function(payload) {
          console.log("New foreground FCM message: ", payload);
          // Foreground使用LocalNotification插件(前台不会自动弹出Notification)
          if (payload) {
            if (payload.aps) { // ios 
              UtilService.showLocalNotication(payload.aps.alert.title, payload.aps.alert.body, null, null, payload.eventUrl);
            }
            if (payload.gcm) { // android
              UtilService.showLocalNotication(payload.gcm.title, payload.gcm.body, null, null, payload.eventUrl);
            }
          }
        });
        cordova.plugins.firebase.messaging.onBackgroundMessage(function(payload) {
          console.log("New background FCM message: ", payload);
          if (payload && payload.redirectTo) { // 推送處理，一般是重定向（這裡可以進一步調整）
            UtilService.fcmEvent(payload.redirectTo);
          }
        });
        cordova.plugins.firebase.messaging.requestPermission({forceShow: true}).then(function() {
          console.log("You'll get foreground notifications when a push message arrives");
        });
        cordova.plugins.firebase.messaging.getToken().then(function(token) {
          console.log("Got device token: ", token);
          // var memberCode = '';
          // if (MemberService.checkMemberInfo()) {
          //   memberCode = $rootScope.MemberInfo.MemberCode;
          // }
          // localStorage.setItem('fcmDeviceToken', token);
          // UtilService.fcmDeviceTokenHandle(memberCode, token);  // 保存DeviceToken
        });
        cordova.plugins.firebase.messaging.getToken("apns-string").then(function(token) { // APNS
          console.log("APNS hex device token: ", token);
        });
        // 销毁Token
        // cordova.plugins.firebase.messaging.revokeToken().then(function() {
        //   console.log("Token revoked successfully");
        // });
        cordova.plugins.firebase.messaging.onTokenRefresh(function() {
          console.log("Device token updated");
        });

        // 訂閱 topic
        cordova.plugins.firebase.messaging.subscribe(mainTopic);
        cordova.plugins.firebase.messaging.subscribe(deviceTopic);
      }


      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      // 狀態欄設置（主要是顏色）
      if (window.StatusBar) {
        if (cordova.platformId == 'android') {
          StatusBar.backgroundColorByHexString("#387ef5");
        } else {
          $cordovaStatusbar.overlaysWebView(false);
          // $cordovaStatusbar.style(2);
          $cordovaStatusbar.styleHex('#387ef5');
          // StatusBar.styleLightContent();
          $cordovaStatusbar.styleColor('#387ef5');
        }
      }

      // 主頁點擊Back Button 退出 (Only Work on CordovaApp)
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        function showConfirm() {
          var confirmPopup = $ionicPopup.confirm({
            title: '<strong>退出?</strong>',
            template: '您確定要退出嗎？',
            buttons: [
              { text: '取消', type: 'button-bg-light' },
              { text: '退出', type: 'button-assertive', onTap: function (e) { return true; } }
            ]
          });
          confirmPopup.then(function (res) {
            if (res) {
              ionic.Platform.exitApp();
            }
          });
        }

        if ($location.path() == '/home') {
          showConfirm();
        } else if ($ionicHistory.backView()) {
          $ionicHistory.goBack();
        }
        return false;
      }, 101);

    });
  }])
