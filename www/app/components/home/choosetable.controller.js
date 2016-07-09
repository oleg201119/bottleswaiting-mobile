(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('ChooseTableController', ChooseTableController);

    ChooseTableController.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService', '$ionicTabsDelegate'];

    function ChooseTableController($scope, $rootScope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService, $ionicTabsDelegate) {
        $scope.layoutList = [];
        $scope.tableList = [];

        $scope.tableInformation = [
            {
                status: 'available',
                x: 88,
                y: 42,
                show: false,
                index: 0
            },
            {
                status: 'available',
                x: 142,
                y: 48,
                show: false,
                index: 1
            },
            {
                status: 'unavailable',
                x: 195,
                y: 42,
                show: false,
                index: 2
            },
            {
                status: 'unavailable',
                x: 84,
                y: 431,
                show: false,
                index: 3
            },
            {
                status: 'celebrity',
                x: 137,
                y: 456,
                show: false,
                index: 4
            }
        ];

        $scope.layoutList = [
            {
                name: "Floor1"
            },
            {
                name: "Floor2"
            }
        ];

        $scope.onClickTab = function(index){
            $ionicTabsDelegate.select(index);

            for(var i=0; i<$scope.layoutList.length; i++){
                $("#content" + i).hide();
            }
            $("#content" + index).show();
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

        $scope.onAvailable = function(table) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Payment',
                template: 'Lorem ipsum dolor sit amet, consectetur adipisicing, elit, sed do eiusmod tempor incididunt ut labore et dolore ma...',
                cssClass: 'disclaimer-popup',
                buttons: [{
                    text: 'DOWNPAYMENT',
                    onTap: function(e) {
                        console.log("DownPayment");
                    }
                }, {
                    text: 'PREORDER',
                    onTap: function(e) {
                        $state.go('home.guestboard');
                    }
                }]
            });

            confirmPopup.then(function(res) {
                if(res) {
                    console.log('You are sure');
                } else {
                    console.log('You are not sure');
                }
            });
        }

        $scope.onUnavailable = function(table) {
            //$scope.tableInformation[index].show = !$scope.tableInformation[index].show;
            for(var i=0; i<$scope.tableList.length; i++)
            {
                $scope.tableList[i].show = false;
                if($scope.tableList[i].tableId == table.tableId)
                    $scope.tableList[i].show = true;
            }

        }

        $scope.onCelebrity = function(table) {
            //$scope.tableInformation[index].show = !$scope.tableInformation[index].show;
            for(var i=0; i<$scope.tableList.length; i++)
            {
                $scope.tableList[i].show = false;
                if($scope.tableList[i].tableId == table.tableId)
                    $scope.tableList[i].show = true;
            }
        }

        $scope.onImageClick = function(){
            for(var i=0; i<$scope.tableList.length; i++)
                $scope.tableList[i].show = false;
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            $scope.layoutList = $rootScope.layoutList;
            console.log("layoutList");
            console.log($scope.layoutList);

            $scope.tableList = $rootScope.tableList;
            console.log("tableList");
            console.log($scope.tableList);

            for(var i=0; i<$scope.tableList.length; i++)
            {
                $scope.tableList[i].show = false;
            }
        }

        // Init
        $scope.init();
    }
})();