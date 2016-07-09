(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('WhatTableController', WhatTableController);

    WhatTableController.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService'];

    function WhatTableController($scope, $rootScope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService) {

        $scope.bShowTableList = false;
        $scope.tableList = [{id: 1, name: "Floor1 Table 10"},
            {id: 2, name: "Floor1 Table 11"},
            {id: 3, name: "Floor1 Table 12"},
            {id: 4, name: "Floor1 Table 13"},
            {id: 5, name: "Floor1 Table 14"}];

        $scope.layoutList = [];

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

        $scope.showTableList = function() {
            $timeout(function() {
                $scope.bShowTableList = true;
            }, 100);
        };

        $scope.hideTableList = function() {
            $scope.bShowTableList = false;
        };

        $scope.goTable = function(table) {
            $rootScope.tableList = $scope.tableList;
            $rootScope.layoutList = $scope.layoutList;
            $rootScope.eventList = $scope.selectedVenue.eventList;
            $rootScope.selectedTable = table;

            var confirmPopup = $ionicPopup.confirm({
                title: 'Disclaimer',
                template: 'Payment notification shave been sent to your Co-Payers, via text. Now you should pay your portion. Payments will be on hold until all have paid.',
                cssClass: 'disclaimer-popup',
                buttons: [{
                    text: 'CANCEL'
                }, {
                    text: 'AGREE',
                    onTap: function(e) {
                        $scope.agreeDisclaimer();
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
        };

        $scope.agreeDisclaimer = function () {
            $state.go('home.choosetable');
        };

        $scope.iterateEventList = function() {
            $ionicLoading.show({
                template: 'Loading Tables...'
            });

            console.log($scope.selectedVenue);
            $scope.remainedEvent = $scope.selectedVenue.eventList.length;
            $scope.tableList = [];
            $scope.layoutList = [];

            for(var i=0; i<$scope.selectedVenue.eventList.length; i++){
                $scope.loadEventDetailFromId($scope.selectedVenue.eventList[i]);
            }
        }

        $scope.loadEventDetailFromId = function(eventId) {
            EventService.getEvent(eventId).then(
                function(response) {
                    console.log(eventId + ": Event Detail");
                    console.log(response);

                    for(var i=0; i<response.tables.length; i++)
                        $scope.tableList.push(response.tables[i]);

                    for(i=0; i<response.layouts.length; i++)
                        $scope.layoutList.push(response.layouts[i]);

                    $scope.remainedEvent--;
                    if($scope.remainedEvent == 0)
                    {
                        $ionicLoading.hide();
                        $scope.removeRedundantTable();
                        $scope.removeRedundantLayout();
                    }
                },
                function(error) {
                    $scope.remainedEvent--;
                    if($scope.remainedEvent == 0)
                    {
                        $ionicLoading.hide();
                        $scope.removeRedundantTable();
                        $scope.removeRedundantLayout();
                    }
                    console.log(error);
                }
            );
        }

        $scope.removeRedundantTable = function() {
            for(var i=0; i<$scope.tableList.length - 1; i++)
            {
                for(var j=i+1; j<$scope.tableList.length; j++)
                {
                    if($scope.tableList[i].tableId == $scope.tableList[j].tableId)
                        $scope.tableList = $scope.tableList.slice(j);
                }
            }
            console.log("Table List");
            console.log($scope.tableList);
        }

        $scope.removeRedundantLayout = function() {
            for(var i=0; i<$scope.layoutList.length - 1; i++)
            {
                for(var j=i+1; j<$scope.layoutList.length; j++)
                {
                    if($scope.layoutList[i].layoutId == $scope.layoutList[j].layoutId)
                        $scope.layoutList = $scope.layoutList.slice(j);
                }
            }
            console.log("Layout List");
            console.log($scope.layoutList);
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            console.log("Selected Venue");
//            console.log($rootScope.selectedVenue);
            $scope.selectedVenue = $rootScope.selectedVenue;

            $scope.iterateEventList();
        }

        // Init
        $scope.init();
    }
})();