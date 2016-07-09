(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('OrderMoreController', OrderMoreController);

    OrderMoreController.$inject = ['$scope', '$rootScope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService'];

    function OrderMoreController($scope, $rootScope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService) {

        $scope.allDays = [];
        $scope.panelDays = [];
        $scope.barDays = [];
        $scope.venues = [];
        $scope.activeEvents = [];
        $scope.activeEvent = {};
        $scope.availableVenues = [];

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

        $scope.onAvailable = function(index) {
            //$state.go('home.preorder');

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

        $scope.onUnavailable = function(index) {
            //$scope.tableInformation[index].show = !$scope.tableInformation[index].show;
            for(var i=0; i<$scope.tableInformation.length; i++)
                $scope.tableInformation[i].show = false;
            $scope.tableInformation[index].show = true;
        }

        $scope.onCelebrity = function(index) {
            //$scope.tableInformation[index].show = !$scope.tableInformation[index].show;
            for(var i=0; i<$scope.tableInformation.length; i++)
                $scope.tableInformation[i].show = false;
            $scope.tableInformation[index].show = true;
        }

        // Like/Unlike action
        $scope.reverseLike = function(index) {
            $scope.events[index].like = !$scope.events[index].like;
        }

        // Go to the headliner profile page
        $scope.goEntertainerProfile = function() {

        }

        // Go to the Order more page
        $scope.goOrderMore = function () {
            $state.go('home.ordermore');
            $scope.closePopover();
        };

        // Go to the event detail page
        $scope.goEventDetail = function(index) {
            $state.go('home.eventdetail');
        }

        $scope.goWhatTable = function(index) {
            $rootScope.selectedVenue = $scope.availableVenues[index];
            $state.go('home.whattable');
        };

        // Sidemenu
        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            //Get Venue list with city name
            $ionicLoading.show({
                template: 'Loading  Venues...'
            });
            VenueService.getVenueList('LA').then(
                function(response) {
                    $ionicLoading.hide();
                    $scope.venues = response;
                },
                function(error) {
                    $ionicLoading.hide();
                    console.log(error);
                }
            );

            //Get Active Event with today
            $ionicLoading.show({
                template: 'Loading  Active Events...'
            });

            var today = new Date();
            EventService.getEventList('LA', new Date('2015-12-01'), new Date('2016-12-31')).then(
                function(response) {
                    $ionicLoading.hide();
                    angular.forEach(response, function(value, key) {
                        $scope.activeEvents.push({
                            banner: value.croppedUrl,
                            avatar: value.entertainers[0].avatarUrl,
                            eventId: value.eventId,
                            eventName: value.name,
                            venueId: value.venueId,
                            venueName: value.venueName,
                            entertainerName: value.entertainers[0].name,
                            musicType: value.musicType,
                            like: false
                        });
                    });

                    console.log("======= get active event for today ==========");
                    console.log($scope.activeEvents);
                    if(response.length > 0) {
                        $scope.activeEvent = $scope.activeEvents[0];
                        window.localStorage.setItem("activeEvent", JSON.stringify($scope.activeEvent));
                    }

                    for(var i=0; i<$scope.venues.length; i++)
                    {
                        var list = $scope.getEventListForVenueId($scope.venues[i].venueId);
                        if(list.length > 0)
                        {
                            var obj = $scope.venues[i];
                            obj.eventList = list;
                            $scope.availableVenues.push(obj);
                        }
                    }

                    console.log("-------------Active Venue List--------------");
                    console.log($scope.availableVenues);
                },
                function(error) {
                    $ionicLoading.hide();
                    console.log(error);
                }
            );
        };

        $scope.getEventListForVenueId = function(venueId){

            var eventList = [];
            for(var i=0; i<$scope.activeEvents.length; i++){
                if($scope.activeEvents[i].venueId == venueId)
                {
                    eventList.push($scope.activeEvents[i].eventId);
                }
            }

            return eventList;
        };

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.agreeDisclaimer = function () {
            $state.go('home.choosetable');
        };

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });

        $scope.onPreorder = function() {
            console.log("Going to Preorder");
//            $state.go('home.preorder');
        }

        // Init        
        $scope.init();
    }
})();