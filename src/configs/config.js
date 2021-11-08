uxConfigs

  // 平台樣式css統一（ios、android）
  .config(['$ionicConfigProvider', function ($ionicConfigProvider) {
    ionic.Platform.setPlatform('ios');                                   // 整體設置為ios風格
    // $ionicConfigProvider.navBar.alignTitle('center');                                               // 標題居中（ios默認居中、Android默認居左）
    // $ionicConfigProvider.form.checkbox('circle');                                                   // checkbox 使用circle樣式（ios默認circle、Android默認square）
    // $ionicConfigProvider.backButton.text('').previousTitleText(false).icon('ion-ios-arrow-left');   // 設置返回按鈕 無文本 圖標為ion-ios-arrow-left
  }])

  .config(['$compileProvider', function ($compileProvider) { 
    // CSP fixed(不安全)
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(whatsapp|tel):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^/);
  }])

  // // 插件angular-toastr提示信息 默認設置
  // .config(function(toastrConfig) {
  //   angular.extend(toastrConfig, {
  //     positionClass: 'toast-bottom-center',
  //     timeOut: 2333,
  //     target: 'body'
  //   });
  // })
