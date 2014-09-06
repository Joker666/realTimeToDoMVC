app.config( ['$stateProvider', '$authProvider', '$urlRouterProvider', 'AccessLevels',
    function($stateProvider, $authProvider, $urlRouterProvider, AccessLevels) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl',
            data: {
                access: AccessLevels.anonymous
            }
        });
    $stateProvider
        .state('user', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: AccessLevels.user
            }
        })
        .state('user.home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        });
}]);