(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('OrderDetailController', OrderDetailController);

    OrderDetailController.$inject = ['$scope', '$state', '$ionicLoading', '$ionicSideMenuDelegate', '$ionicPopover', '$timeout', '$ionicPopup', 'EventService', 'VenueService'];

    function OrderDetailController($scope, $state, $ionicLoading, $ionicSideMenuDelegate, $ionicPopover, $timeout, $ionicPopup, EventService, VenueService) {

        $scope.allDays = [];
        $scope.panelDays = [];
        $scope.barDays = [];
        $scope.venues = [];
        $scope.activeEvents = [];
        $scope.activeEvent = {};

        $scope.bShowTableList = false;
        $scope.tableList = [{id: 1, name: "Floor1 Table 10"}, 
                            {id: 2, name: "Floor1 Table 11"}, 
                            {id: 3, name: "Floor1 Table 12"}, 
                            {id: 4, name: "Floor1 Table 13"},
                            {id: 5, name: "Floor1 Table 14"}];

        // Test data
        $scope.orderDetail = {
            banner: 'img/temp-event-banner0.png',
            avatar: 'img/temp-event-avatar.png',
            eventName: 'Proper Saturday',
            venueName: 'Marquee',
            entertainerName: 'DJ Vice',
            musicType: 'Hip Hop',
            promotionText: 'Sold out'
        };

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
            EventService.getEventList('', new Date('2015-12-01'), new Date('2016-12-31')).then(
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
                },
                function(error) {
                    $ionicLoading.hide();
                    console.log(error);
                }
            );
        };

        // Popover
        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };

        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.showTableList = function() {
            $timeout(function() {
                $scope.bShowTableList = true;
            }, 100);
        };

        $scope.hideTableList = function() {
            $scope.bShowTableList = false;
        };

        $scope.goTable = function(table) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Disclaimer',
                template: 'Payment notification shave been sent to your Co-Payers, via text. Now you shoud pay your portion. Payments will be on hold until all have paid.',
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

        $scope.$on('$destroy', function() {
            $scope.popover.remove();
        });
        

        // Init        
        $scope.init();
    }
})();
