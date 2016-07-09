(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('FavoritesController', FavoritesController);

    FavoritesController.$inject = ['$scope', '$state', '$ionicSideMenuDelegate', '$ionicPopover', 'EventService', 'VenueService'];

    function FavoritesController($scope, $state, $ionicSideMenuDelegate, $ionicPopover, EventService, VenueService) {

        // Go to the headliner profile page
        $scope.goEntertainerProfile = function() {

        }

        // Go to the event detail page
        $scope.goEventDetail = function(eventId) {
            $state.go('home.eventdetail', {eventId: eventId});
        };

        // Sidemenu
        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });
        }

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        }

        $scope.closePopover = function() {
            $scope.popover.hide();
        }

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        $scope.events = [];
        $scope.venues = [];

        $scope.loadFavoriteEvents = function() {

            EventService.getFavoriteEventList().then(
                function(response) {
                    angular.forEach(response, function(value, key) {
                        $scope.events.push({
                            banner: value.croppedUrl,
                            avatar: value.entertainers[0].avatarUrl,
                            eventId: value.eventId,
                            eventName: value.name,
                            venueId: value.venueId,
                            venueName: value.venueName,
                            entertainerName: value.entertainers[0].name,
                            musicType: value.musicType,
                            promotionText: '',
                            like: false
                        });
                    });
                },
                function(error) {

                }
            ).then(
                function() {
                    VenueService.getFavoriteVenueList().then(
                        function(response) {
                            angular.forEach(response, function(value, key) {
                                $scope.venues.push({
                                    banner: value.croppedUrl,
                                    avatar: value.avatarUrl,
                                    venueLocation: 'Las Vegas, NV',
                                    venueName: 'Marquee',
                                    like: true
                                });
                            });
                        },
                        function(error) {

                        }
                    )
                }
            );

        }




        // Init

        $scope.init();
        $scope.loadFavoriteEvents();
    }
})();