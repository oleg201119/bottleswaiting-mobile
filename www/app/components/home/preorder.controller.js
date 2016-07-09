(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('PreOrderController', PreOrderController);

    PreOrderController.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService', '$ionicTabsDelegate'];

        function PreOrderController($scope, $rootScope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService, $ionicTabsDelegate) {

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

        $scope.selectLiquor = function(index) {
            if($scope.selectedLiquor == index)
                $scope.selectedLiquor = -1;
            else
                $scope.selectedLiquor = index;
            console.log($scope.selectedLiquor);
        };

        $scope.iterateEventList = function() {
            $ionicLoading.show({
                template: 'Loading Menu Items...'
            });

            $scope.remainedEvent = $scope.eventList.length;
            $scope.menuItemList = [];
            $scope.packageList = [];

            for(var i=0; i<$scope.eventList.length; i++){
                $scope.loadEventDetailFromId($scope.eventList[i]);
            }
        };

        $scope.loadEventDetailFromId = function(eventId) {
            EventService.getEvent(eventId).then(
                function(response) {
                    console.log(eventId + ": Event Detail");
                    console.log(response);

                    for(var i=0; i<response.menuItems.length; i++)
                        $scope.menuItemList.push(response.menuItems[i]);

                    for(i=0; i<response.menuPackages.length; i++)
                    {
                        var obj = response.menuPackages[i];
                        obj.count = 1;
                        $scope.packageList.push(obj);
                    }

                    $scope.remainedEvent--;
                    if($scope.remainedEvent == 0)
                    {
                        $ionicLoading.hide();
                        $scope.removeRedundantMenuItems();
                        $scope.removeRedundantPackages();

                        $scope.loadCelebrityFromId($scope.venueId);
                    }
                },
                function(error) {
                    $scope.remainedEvent--;
                    if($scope.remainedEvent == 0)
                    {
                        $ionicLoading.hide();
                        $scope.removeRedundantMenuItems();
                        $scope.removeRedundantPackages();

                        $scope.loadCelebrityFromId($scope.venueId);
                    }
                    console.log(error);
                }
            );
        };

        $scope.loadCelebrityFromId = function(venueId) {

            $ionicLoading.show({
                template: 'Loading Venue Celebrity...'
            });

            VenueService.getVenueCelebrity(venueId).then(
                function(response) {
                    console.log(venueId + ": Venue Celebrity Detail");
                    console.log(response);

                    $scope.celebrityList = response;

                    $ionicLoading.hide();
                },
                function(error) {
                    $ionicLoading.hide();
                    console.log(error);
                }
            );
        };

        $scope.removeRedundantMenuItems = function() {
            for(var i=0; i<$scope.menuItemList.length - 1; i++)
            {
                for(var j=i+1; j<$scope.menuItemList.length; j++)
                {
                    if($scope.menuItemList[i].menuItemId == $scope.menuItemList[j].menuItemId)
                        $scope.menuItemList.splice(j, 1);
                }
            }
            console.log("Menu Item List");
            console.log($scope.menuItemList);

            for(i=0; i<$scope.menuItemList.length; i++){

                var obj = $scope.menuItemList[i];
                obj.count = 1;
                if($scope.menuItemList[i].type == "MIXER")
                    $scope.mixerList.push(obj);
                else
                    {
                        if($scope.menuItemList[i].type == "CHAMPAGNE")
                            obj.liquorType = 0;
                        else if($scope.menuItemList[i].type == "TEQUILA")
                            obj.liquorType = 1;
                        else if($scope.menuItemList[i].type == "GIN")
                            obj.liquorType = 2;
                        else if($scope.menuItemList[i].type == "SCOTCH")
                            obj.liquorType = 3;
                        else if($scope.menuItemList[i].type == "VODKA")
                            obj.liquorType = 4;

                    $scope.liquorList.push(obj);
                }
            }

            console.log("Liquor List");
            console.log($scope.liquorList);

            console.log("Mixer List");
            console.log($scope.mixerList);
        };

        $scope.removeRedundantPackages = function() {
            for(var i=0; i<$scope.packageList.length - 1; i++)
            {
                for(var j=i+1; j<$scope.packageList.length; j++)
                {
                    if($scope.packageList[i].menuPackageId == $scope.packageList[j].menuPackageId)
                        $scope.packageList.splice(j, 1);
                }
            }
            console.log("Package List");
            console.log($scope.packageList);
        };

        $scope.getTotal = function() {

            var total = 0;
            for(var i=0; i<$scope.liquorList.length; i++){
                total += $scope.liquorList[i].count * $scope.liquorList[i].price
            }

            for(i=0; i<$scope.mixerList.length; i++){
                total += $scope.mixerList[i].count * $scope.mixerList[i].price
            }

            for(i=0; i<$scope.packageList.length; i++){
                total += $scope.packageList[i].count * $scope.packageList[i].price
            }

            return total;
        };

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

//            $scope.eventList = $rootScope.eventList;
//            $scope.venueId = $rootScope.selectedVenue.venueId;
//            $scope.selectedTable = $rootScope.selectedTable;
            $scope.selectedTable ={
                minBuy: 3000
            };

            $scope.venueId = 317;
            $scope.selectedLiquor = -1;
            $scope.eventList = [450, 367];

            $scope.liquorList = [];
            $scope.mixerList = [];

            $scope.iterateEventList();
        };

        // Init
        $scope.init();
    }
})();