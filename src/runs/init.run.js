uxRuns

.run(['$ionicPlatform', '$location',
  function($ionicPlatform, $location) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      // CodePush
      if (window.codePush) {
        // 立即更新，弹出对话框提示更新信息
        //   codePush.sync(null, {
        //     updateDialog: {
        //      appendReleaseDescription: true,
        //      descriptionPrefix: "\n\nChange log:\n"
        //     },
        //     installMode: InstallMode.IMMEDIATE
        //  });

        // 静默更新，强制更新，在下一次重启时完成更新
        codePush.sync(null, { mandatoryInstallMode: InstallMode.ON_NEXT_RESTART });
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
