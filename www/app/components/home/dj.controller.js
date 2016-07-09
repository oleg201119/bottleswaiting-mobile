(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('DJController', DJController);

    DJController.$inject = ['$scope', '$state', '$stateParams', 'DJService'];

    function DJController($scope, $state, $stateParams, DJService) {

        $scope.tab = $stateParams.tab;

        console.log($scope.tab);


        $scope.entertainer = {
            croppedUrl: '',
            name: 'VICE',
            headliner: true,

            bio: '',
            music: [
                {
                    track: 'Black Widow (Vice Remix)',
                    artist: 'Iggy Azalea Ft. Rita Ora',
                    time: '5:51'
                },
                {
                    track: 'Hey Now (Vice Remix)',
                    artist: 'London Grammar',
                    time: '4:23'
                },
                {
                    track: 'Mayer Hawthore (Vice Remix)',
                    artist: 'Crime Ft. Kendrick Lamar',
                    time: '5:12'
                }
            ],
            video: [],
            upcoming: [
                {
                    date: 'Thu, Jun 11',
                    location: 'West Hollywood, CA',
                    venue: '1 Oak LA'
                },
                {
                    date: 'Sat, Jun 13',
                    location: 'San Francisco, CA',
                    venue: 'Temple SF'
                },
                {
                    date: 'Sun, Jun 14',
                    location: 'Los Angeles, CA',
                    venue: 'XIV'
                }
            ]
        }

        $scope.selectDJPage = function(tab) {
            $scope.tab = tab;

            switch(tab) {
                case 'bio': {
                    break;
                }

                case 'music': {
                    break;
                }

                case 'video': {
                    break;
                }

                case 'upcoming': {
                    break;
                }

                default:
                    break;
            }
        }



    }
})();