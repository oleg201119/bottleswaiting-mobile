(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('TicketController', TicketController);

    TicketController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$ionicSideMenuDelegate', '$ionicPopover', '$ionicPopup', 'EventService', 'VenueService', '$ionicTabsDelegate', '$ionicLoading'];

    function TicketController($scope, $rootScope, $state, $stateParams, $ionicSideMenuDelegate, $ionicPopover, $ionicPopup, EventService, VenueService, $ionicTabsDelegate, $ionicLoading) {
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

        $scope.getVenuePass = function() {

            $ionicLoading.show({
                template: 'Loading Venue Pass...'
            });

            VenueService.getPassFromVenueId($scope.selectedEvent.venueId).then(
                function(response) {
                    console.log("Venue Pass Detail: ");
                    console.log(response);

                    $scope.malePassList = [];
                    $scope.femalePassList = [];

                    for(var i=0; i<response.length; i++)
                    {
                        var obj = response[i];
                        obj.count = 1;

                        if(obj.gender == 'M')
                            $scope.malePassList.push(response[i]);
                        else if(obj.gender == 'F')
                            $scope.femalePassList.push(response[i]);
                    }

                    console.log($scope.malePassList);
                    console.log($scope.femalePassList);

                    $ionicLoading.hide();
                }
            );
        }

        $scope.init = function() {
            $scope.malePassList = [];
            $scope.femalePassList = [];

            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

//            $scope.selectedEventId = $rootScope.selectedEventId;
            $scope.selectedEventId = 3981;
            console.log($scope.selectedEventId);

            $ionicLoading.show({
                template: 'Loading Event Detail...'
            });

            EventService.getEvent($scope.selectedEventId).then(
                function(response) {
                    console.log("Event Detail: " + $scope.selectedEventId );
                    console.log(response);
                    $scope.selectedEvent = {
                        banner: response.croppedUrl,
                        avatar: response.entertainers[0].avatarUrl,
                        eventId: response.eventId,
                        eventName: response.name,
                        venueId: response.venueId,
                        venueName: response.venueName,
                        entertainerName: response.entertainers[0].name,
                        musicType: response.musicType,
                        promotionText: '',
                        like: false
                    };

                    $ionicLoading.hide();

                    $scope.getVenuePass();
                }
            );
        }

        $scope.init();
    }
})();