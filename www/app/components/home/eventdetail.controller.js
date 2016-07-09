(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$ionicSideMenuDelegate', '$ionicLoading', '$ionicPopover', 'EventService'];

    function EventDetailController($scope, $rootScope, $state, $stateParams, $ionicSideMenuDelegate, $ionicLoading, $ionicPopover, EventService) {

        console.log('eventId: ' + $stateParams.eventId);

        $scope.initGoogleMap = function() {
            var latLng = new google.maps.LatLng(50.44, 30.55);

            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map_canvas_small_event"), mapOptions);

            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
            });
        }


        $scope.tabIndex = 1;

        $scope.openSideMenu = function() {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.init = function() {
            $ionicPopover.fromTemplateUrl('app/components/home/popover.template.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            $ionicLoading.show({
                template: 'Loading Event Details...'
            });

            EventService.getEvent($stateParams.eventId).then(
                function(response) {
                    console.log(response);

                    $scope.event = response;

                    $scope.initGoogleMap();

                    $ionicLoading.hide();
                }
            );
        }

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

        // Botton buttons
        $scope.goBuyPasses = function() {

            $rootScope.selectedEventId = $stateParams.eventId;
            $state.go('home.ticket');
        }

        $scope.goReserveTable = function() {

        }

        $scope.$on("$ionicView.loaded", function(event, data){
            $scope.init();
        });

    }
})();