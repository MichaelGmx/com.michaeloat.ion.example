uxPages
  .controller('TestCtrl', ['$rootScope', '$scope', 'UtilService',
    function ($rootScope, $scope, UtilService) {

      $scope.myGoBack = function () {
        UtilService.myGoBack();
      }

      $scope.data = {

      };

      $scope.init = function () {

      }
      $scope.$on('$ionicView.loaded', function () {
        $scope.init();
      });




      $scope.mychathub;

      $scope.UserInfo = {
        AccountCode: 'EW',
        UserName: 'EWUser01',
        FullName: 'EWUser01',
        Avatar: ''
      }
      $scope.groupInfo = {
        GroupCode: 'CUSTSER1'
      }

      $scope.connect = function () {
        $.connection.hub.url = 'http://newapi.q-pets.com/prjOWINSignalR/signalr/hubs';
        $scope.mychathub = $.connection.chatHub;

        //SetUserName(ByVal strAccountCode As String, ByVal strUserName As String, ByVal strFullName As String, ByVal strAvatar As String) As Task
        $.connection.hub.start().done(function () {
          console.log("Connected.");
          $scope.mychathub.server.setUserName($scope.UserInfo.AccountCode, $scope.UserInfo.UserName, $scope.UserInfo.FullName, $scope.UserInfo.Avatar);
        }).fail(function () {
          console.log("Connection failed");
        });
      }

      $scope.joinToGroup = function () {
        if ($scope.mychathub != null) {
          $scope.mychathub.server.joinGroup($scope.groupInfo.GroupCode);
        }
      }

      $scope.sendgroupmessage = function() {
          var groupname = $scope.groupInfo.GroupCode;
          var content = 'Hello';
          $scope.mychathub.server.clientSendSimpleMessage("GROUP", "TEXT", content, groupname, "","");
      }

    }])