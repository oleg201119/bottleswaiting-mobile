(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('ReservationController', ReservationController);

    ReservationController.$inject = ['$scope', '$state'];

    function ReservationController($scope, $state) {

        $scope.initGoogleMap = function() {
            var latLng = new google.maps.LatLng(50.44, 30.55);

            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map_canvas_small_reservation"), mapOptions);

            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
            });
        }

        $scope.venue = {
            banner: 'img/temp-event-banner0.png',
            avatar: 'img/temp-event-avatar.png',
            venueLocation: 'Las Vegas, NV',
            venueName: 'Marquee',
            like: true
        };

        $scope.guestlist = [
            "Sam White",
            "Sam White",
            "Sam White",
            "Sam White"
        ];

        $scope.liquorlist = [
            "2 x 1ltr Captian Morgan",
            "2 x 1ltr Captian Morgan"
        ];

        $scope.mixerlist = [
            "1 x 4pk Red Bull",
            "1 x 4pk Red Bull"
        ];

        $scope.members = [
            {
                name: "Sam White",
                card: {
                    number: 9347,
                    amount: "$932.34",
                    percent: "25%"
                }
            },
            {
                name: "Sam White",
                card: {
                    number: 9347,
                    amount: "$932.34",
                    percent: "25%"
                }
            }
        ];

        $scope.$on("$ionicView.loaded", function(event, data){
            $scope.initGoogleMap();
        });

    }
})();