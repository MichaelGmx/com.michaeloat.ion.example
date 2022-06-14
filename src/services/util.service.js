uxServices
  .factory('UtilService', ['$ionicLoading', '$ionicHistory', '$state', 'toastr',
    function ($ionicLoading, $ionicHistory, $state, toastr) {
      return {

        /**
         * 返回 上一頁
         */
        myGoBack: function () {
          if ($ionicHistory.backView()) {
            // var stateName = $ionicHistory.backView().stateName;
            // if (stateName === 'login' || stateName === 'memberPwdForgot' || stateName === 'register' || stateName === 'reg') {
            //   $state.go('tabs.home');
            // } else {
            //   $ionicHistory.goBack();
            // }
            $ionicHistory.goBack();
          } else {
            $state.go('home');
          }
        },

        /**
         * 加載 指示器 顯示
         * @param {string=} type   方式
         */
        loadingStart: function (type) {
          if (type && type === 'payment') {
            $ionicLoading.show({ template: '<strong>請稍後...</strong><p>正在跳至付款頁面</p><p>請勿關閉頁面或作其他操作</p>' });
          } else {
            $ionicLoading.show({ template: '<ion-spinner icon="android"></ion-spinner>' });
            // $ionicLoading.show({ templateUrl: 'modals/loading.html' + '?v=' + GB_PROJECT.VERSION });
          }
        },

        loadingEnd: function () {
          $ionicLoading.hide();
        },

        /**
         * 控制台 信息輸出（僅在開發時顯示）
         * @param {string} msg 
         */
        consoleLog: function (msg) {
          if (GB_PROJECT.ENV !== 'REAL') {
            console.log(msg);
          }
        },

        /**
         * 彈出提示 （全局设置在js/config.js中）
         * @param {string} title        標題
         * @param {string=} text        內容
         * @param {string=} type        類型：'warning' | 'success' | 'error', 默认: 'warning'
         * @param {string=} autoDismiss 是否自动隐藏：'auto' | 'manual'，默认：'auto'
         */
        toast: function (title, text, type, autoDismiss) {
          var useType = type ? type : 'warning';
          if (autoDismiss && autoDismiss === 'manual') {
            toastr[useType](text, title, {
              closeButton: true, autoDismiss: false, timeOut: 0
            });
          } else {
            toastr[useType](text, title);
          }
        },




        /**
         * 弹出 Local Notification
         * @param {string} str_Title - 标题
         * @param {string} str_Text - 内容
         * @param {string} str_Icon - 图标
         * @param {string} lstOf_Image - 图片
         * @param {string} obj_Data - 附加内容
         */
        showLocalNotication: function (str_Title, str_Text, str_Icon, lstOf_Image, obj_Data) {
          if (window.cordova && window.cordova.plugins && window.cordova.plugins.notification && window.cordova.plugins.notification.local) {
            window.cordova.plugins.notification.local.schedule({
              id: (new Date()).valueOf(),  // 使用 时间戳 作id
              title: str_Title,
              text: str_Text,
              icon: str_Icon,
              attachments: lstOf_Image,
              data: obj_Data
            });
          }
        },

        // FCM Event 處理
        fcmEvent: function (str_Evnet) {
          if (str_Evnet) {
            var tmpUrl = str_Evnet;
            if (str_Evnet.indexOf("/") == 0) {   // 若是/開頭
              tmpUrl = str_Evnet.slice(1);
            }
            if (str_Evnet.indexOf("http") == 0) {   // 若是http開頭
              tmpUrl = str_Evnet.split('#/')[1];
            }
            window.location.hash = '#/' + tmpUrl;
            // var arr_Event = str_Evnet.split(',');
            // var obj_Event = new Object();
            // obj_Event[arr_Event[1]] = arr_Event[2];
            // $state.go(arr_Event[0], obj_Event);
          }
        },

      }
    }])