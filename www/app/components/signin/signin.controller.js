(function() {
    'use strict';

    angular
        .module('bwcapp.signin')
        .controller('SigninController', SigninController);

    SigninController.$inject = ['$scope', '$state', '$ionicLoading', '$ionicPopup', 'SigninService', 'FacebookService'];

    function SigninController($scope, $state, $ionicLoading, $ionicPopup, SigninService, FacebookService) {

        $scope.focusEmail = false;
        $scope.focusPassword = false;

        $scope.credential = {
            username: "consumer@bw.com",
            password: "password"
        }

        $scope.doFBLogin = function() {
            FacebookService.login().then(
                function(response) {
                    $state.go('home.eventlist');
                },
                function(error) {

                }
            );
        }

        $scope.goForgotPassword = function() {

            // Check email
            if ($scope.credential.username == "") {
                $ionicPopup.alert({
                    title: "Password reset failed",
                    template: "Please enter the email."
                });

                return;
            }

            $ionicLoading.show({
                template: 'Sending request'
            });

            SigninService.resetPassword($scope.credential.username).then(
                function(response) {
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: "Password reset success",
                        template: "The email is sent."
                    });
                },
                function(error) {
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: "Password reset failed",
                        template: "Please check the email you've entered"
                    });
                }
            );
        }

        $scope.doLogin = function() {
            $ionicLoading.show({
                template: 'Signing in'
            });

            SigninService.login($scope.credential.username, $scope.credential.password).then(
                function(response) {
                    $ionicLoading.hide();

                    $state.go('home.eventlist');
                },
                function(error) {
                    $ionicLoading.hide();

                    $ionicPopup.alert({
                        title: "Login Fail",
                        template: "The email/password combination you've entered does not work."
                    });
                }
            );
        }

        $scope.goGuest = function() {

        }

        $scope.goSignUp = function() {
            $state.go('signup1');
        }
    }
})();