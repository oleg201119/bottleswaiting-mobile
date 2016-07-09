(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('AddGuestController', AddGuestController);

    AddGuestController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$ionicSideMenuDelegate', '$ionicLoading', '$ionicPopover', 'EventService'];

    function AddGuestController($scope, $rootScope, $state, $stateParams, $ionicSideMenuDelegate, $ionicLoading, $ionicPopover, EventService) {

        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        }

        $scope.closePopover = function() {
            $scope.popover.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        $scope.handlePopover = function(page) {
            $scope.closePopover();

            if (page == 'venues') {
                $state.go('home.venuelist');
            }
        }

        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.addMoreGuest = function() {
            var newGuest = {
                focusFirstName: false,
                focusLastName: false,
                focusPhoneNumber: false,
                focusGender: false,
                firstname: "",
                lastname: "",
                phonenumber: "",
                gender: ""
            };

            $scope.guestList.push(newGuest);
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            $scope.guestList = [];
        }

        $scope.init();
    }
})();