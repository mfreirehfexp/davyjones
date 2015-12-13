(function(){
    'use strict';

    angular
        .module('mainApp', [
            'theming','ui.router','users'
        ] )
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/app/users');

            $stateProvider
                .state('app',{
                    url: '/app',
                    views: {
                        'header': {
                            templateUrl: '/src/templates/partials/header.html',
                            controller: 'UserController',
                            controllerAs: 'ul'
                        },
                        'side-bar': {
                            template: '<div></div>'
                        },
                        'content': {
                            templateUrl: '/src/templates/partials/content.html'
                        }
                    }
                })

                .state('app.users', {
                    url: '/users',
                    views: {
                        'side-bar@': {
                            templateUrl: '/src/templates/partials/side-bar.html',
                            controller: 'UserController',
                            controllerAs: 'ul'
                        }
                    }
                })

                .state('app.users.detail', {
                    url: '/:id',
                    views: {
                        'content@': {
                            templateUrl: 'src/users/templates/users.html',
                            parent: 'app.users',
                            controller: 'UserDetailController',
                            controllerAs: 'ud'
                        }
                    }

                });
        }]);


})();

