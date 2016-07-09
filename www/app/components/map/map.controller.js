(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('MapController', MapController);

    MapController.$inject = ['$scope', '$state'];

    function MapController($scope, $state) {

        $scope.initGoogleMap = function() {
            var latLng = new google.maps.LatLng(50.44, 30.55);

            var mapOptions = {
                center: latLng,
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map_canvas_full"), mapOptions);

            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function(){

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    position: latLng
                });
            });
        }

        // Init
        $scope.$on("$ionicView.loaded", function(event, data){
            $scope.initGoogleMap();
        });


    }
})();