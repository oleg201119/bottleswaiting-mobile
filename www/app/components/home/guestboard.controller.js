(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('GuestBoardController', GuestBoardController);

    GuestBoardController.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService', '$ionicTabsDelegate'];

    function GuestBoardController($scope, $rootScope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService, $ionicTabsDelegate) {

        $scope.topimage = 'img/res/D8BDA078.jpg';
        $scope.maxGuest = 25;
        $scope.minPurchase = 2000;
        $scope.focusETA = false;
        $scope.focusGuest = false;
        $scope.selectedType = 0;

        $scope.selectGuestType = function(typeIndex) {
            $scope.selectedType = typeIndex;
        }

        $scope.doGuestBoardNext = function() {

            if($scope.selectedType == 0)
                $state.go('home.preorder');
            else
                $state.go('home.addguest');
        }

        // Sidemenu
        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
        }

        // Init
        $scope.init();
    }
})();