(function() {
    'use strict';

    angular
        .module('bwcapp.signup')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['$scope', '$state', 'UserService'];

    function SignupController($scope, $state, UserService) {

        // Focus
        $scope.focusEmail = false;
        $scope.focusPassword= false;
        $scope.focusConfirm = false;
        $scope.focusZipCode = false;
        $scope.focusPromoCode = false;

        $scope.focusFirstName = false;
        $scope.focusLastName = false;
        $scope.focusBirthday = false;
        $scope.focusGender = false;

        $scope.focusCountry = false;
        $scope.focusPhoneNumber = false;

        $scope.focusConfirmNumber = false;
        $scope.focusPromoShare = false;

        // Hint
        $scope.hintPassword = false;
        $scope.hintConfirm = false;
        $scope.hintBirthday = true;
        $scope.hintPhoneNumber = true;

        // Model
        $scope.account = {
            // page 1
            email: '',
            password: '',
            confirm: '',
            zipcode: '',
            promocode: '',

            // page 2
            firstname: '',
            lastname: '',
            birthday: '',
            gender: '',

            // page 3
            country: {
                name: 'United States',
                code: '+1'
            },
            phonenumber: '',

            // page 4
            confirmnumber: '',

            // page 5
            promoShare: ''
        }

        $scope.countries = [
            {
                name: 'United States',
                code: '+1'
            }
        ];

        // Capture photo
        $scope.doCapturePhoto = function() {

        }

        // Resend confirm number
        $scope.resendCode = function() {

        }

        // Share promo code
        $scope.sharePromoCode = function() {

        }

        // Finish
        $scope.goFinish = function() {

            // Go to walk through page
            $state.go('walkthrough');
        }

        // Next action
        $scope.goNext = function(nextState) {

            $scope.user = {
                zip: '89101',
                firstName: 'Consumer',
                lastName: 'User',
                email: 'consumer@bw.com',
                dateOfBirth: (new Date('1982/01/09')).getTime(),
                password: 'password',
                phoneNumber: '12345678',
                promoCode: 'promo123',
                role: 'ROLE_CONSUMER'
            };

            // test
            UserService.createUser($scope.user).then(
                function(response) {
                    console.log('createUser >>');
                    console.log(response);
                },
                function(error) {
                    console.log('createUser >>');
                    console.log(error);
                }
            );
            return;

            switch(nextState) {
                case 'signup1': {

                    break;
                }
                case 'signup2': {

                    break;
                }
                case 'signup3': {

                    break;
                }
                case 'signup4': {

                    break;
                }
                case 'signup5': {

                    break;
                }
            }

            $state.go(nextState);
        }
    }
})();