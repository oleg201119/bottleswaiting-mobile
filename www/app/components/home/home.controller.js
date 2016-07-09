(function() {
    'use strict';

    angular
        .module('bwcapp.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', '$state', 'UserService', 'FacebookService'];

    function HomeController($scope, $state, UserService,FacebookService) {

        $scope.user = {
            firstName: '',
            lastName: '',
            birthday: '',
            avatarUrl: ''
        };

        UserService.getCurrentUser().then(
            function(response) {
                $scope.user = {
                    firstName: response.firstName,
                    lastName: response.lastName,
                    birthday: '01/09/1980',
                    avatarUrl: response.avatarUrl
                };

                if (response.facebookUser) {
                    FacebookService.getUserPhoto().then(
                        function(response) {
                            $scope.user.avatarUrl = response;
                        }
                    );
                }
            });
    }
})();