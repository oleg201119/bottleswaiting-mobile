(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('MusicSearchController', MusicSearchController);

    MusicSearchController.$inject = ['$scope', '$state', 'DJService'];

    function MusicSearchController($scope, $state, DJService) {

        $scope.search = {
            keyword: ''
        };

        $scope.entertainers = [
            {
                croppedUrl: '',
                headliner: true,
                like: true
            }
        ];

        // Init
        $scope.init = function() {

            // Init search keyword
            $scope.search = {
                keyword: ''
            };
        }

        // Search
        $scope.doSearch = function() {

            $scope.entertainers = [];

            DJService.searchDJWithName($scope.search.keyword).then(
                function(response) {
                    angular.forEach(response, function(value, key) {
                        $scope.entertainers.push({
                            croppedUrl: value.croppedUrl,
                            headliner: value.headliner,
                            like: true
                        });
                    });
                },
                function(error) {

                }
            );
        }

        // Go DJ page
        $scope.goDJPage = function(tab) {
            switch(tab) {
                case 'bio':
                    $state.go('home.dj', {tab:'bio'});
                    break;
                case 'music':
                    $state.go('home.dj', {tab:'music'});
                    break;
                case 'video':
                    $state.go('home.dj', {tab:'video'});
                    break;
                case 'upcoming':
                    $state.go('home.dj', {tab:'upcoming'});
                    break;
                default:
                    break;
            }
        }

    }
})();