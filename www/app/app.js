angular.module('bwcapp',
        [
            'ionic',

            'bwcapp.constant',
            'bwcapp.common',
            'bwcapp.walkthrough',
            'bwcapp.signin',
            'bwcapp.signup',
            'bwcapp.home',

            'restangular',
            'ngCordova',
            'ngStorage',
            'slick',

            'tmh.dynamicLocale',
            'pascalprecht.translate'
        ])

    .constant('availableLanguages', ['en-US'])
    .constant('defaultLanguage', 'en-US')

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function(RestangularProvider, constant){
        RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json; charset=UTF-8'});
        RestangularProvider.setBaseUrl(constant.serviceUrl + "/" + constant.serviceAPIPath + "/");
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            // WalkThrough page
            .state('walkthrough', {
                url: '/walkthrough',
                templateUrl: 'app/components/walkthrough/walkthrough.template.html',
                controller: 'WalkthroughController'
            })

            // Login page
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/components/signin/signin.template.html',
                controller: 'SigninController'
            })

            // Signup page
            .state('signup1', {
                url: '/signup1',
                templateUrl: 'app/components/signup/signup1.template.html',
                controller: 'SignupController'
            })

            .state('signup2', {
                url: '/signup2',
                templateUrl: 'app/components/signup/signup2.template.html',
                controller: 'SignupController'
            })

            .state('signup3', {
                url: '/signup3',
                templateUrl: 'app/components/signup/signup3.template.html',
                controller: 'SignupController'
            })

            .state('signup4', {
                url: '/signup4',
                templateUrl: 'app/components/signup/signup4.template.html',
                controller: 'SignupController'
            })

            .state('signup5', {
                url: '/signup5',
                templateUrl: 'app/components/signup/signup5.template.html',
                controller: 'SignupController'
            })

            // App - abstract template (sidemenu and menu content)
            .state('home', {
                url: '/home',
                abstract: true,
                templateUrl: 'app/components/home/home.template.html',
                controller: 'HomeController'
            })

            // Event list page
            .state('home.eventlist', {
                url: '/eventlist',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/eventlist.template.html',
                        controller: 'EventListController'
                    }
                }
            })

            // Event detail page
            .state('home.eventdetail', {
                url: '/eventdetail/:eventId',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/eventdetail.template.html',
                        controller: 'EventDetailController'
                    }
                }
            })

            // Venue list page
            .state('home.venuelist', {
                url: '/venuelist',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/venuelist.template.html',
                        controller: 'VenueListController'
                    }
                }
            })

            // My reservation page
            .state('home.reservation', {
                url: '/reservation',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/reservation.template.html',
                        controller: 'ReservationController'
                    }
                },
                cache: false
            })

            // Favorites page
            .state('home.favorites', {
                url: '/favorites',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/favorites.template.html',
                        controller: 'FavoritesController'
                    }
                }
            })

            // Location & Date page
            .state('home.location', {
                url: '/location',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/location/location.template.html',
                        controller: 'LocationController'
                    }
                }
            })

            // Music page
            .state('home.music-search', {
                url: '/music-search',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/music-search.template.html',
                        controller: 'MusicSearchController'
                    }
                }
            })

            // DJ page
            .state('home.dj', {
                url: '/dj/:tab',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/dj.template.html',
                        controller: 'DJController'
                    }
                }
            })

            .state('home.ordermore', {
                url: '/ordermore',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/ordermore.template.html',
                        controller: 'OrderMoreController'
                    }
                }
            })

            // Map page
            .state('home.map', {
                url: '/map',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/map/map.template.html',
                        controller: 'MapController'
                    }
                }
            })

            .state('home.whattable', {
                url: '/whattable',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/whattable.template.html',
                        controller: 'WhatTableController'
                    }
                }
            })

            .state('home.choosetable', {
                url: '/choosetable',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/choosetable.template.html',
                        controller: 'ChooseTableController'
                    }
                }
            })

            .state('home.payment', {
                url: '/payment',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/payment.template.html',
                        controller: 'PaymentController'
                    }
                }
            })

            .state('home.split-payment', {
                url: '/split-payment',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/split-payment.template.html',
                        controller: 'PaymentController'
                    }
                }
            })

            .state('home.payment-method', {
                url: '/payment-method',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/payment-method.template.html',
                        controller: 'PaymentController'
                    }
                }
            })

            .state('home.orderdetailfirst', {
                url: '/orderdetailfirst',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/orderdetailfirst.template.html',
                        controller: 'OrderDetailController'
                    }
                }
            })

            .state('home.orderdetailsecond', {
                url: '/orderdetailsecond',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/orderdetailsecond.template.html',
                        controller: 'OrderDetailController'
                    }
                }
            })

            .state('home.preorder', {
                url: '/preorder',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/preorder.template.html',
                        controller: 'PreOrderController'
                    }
                }
            })

            .state('home.guestboard', {
                url: '/guestboard',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/guestboard.template.html',
                        controller: 'GuestBoardController'
                    }
                }
            })

            .state('home.addguest', {
                url: '/addguest',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/addguest.template.html',
                        controller: 'AddGuestController'
                    }
                }
            })

            .state('home.ticket', {
                url: '/ticket',
                views: {
                    'menuContent': {
                        templateUrl: 'app/components/home/ticket.template.html',
                        controller: 'TicketController'
                    }
                }
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/signin');
    });
