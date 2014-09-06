var app = angular.module('todoMVC', [
  'ui.router',
  'ngAnimate',
  'ui.utils',
  'satellizer',
  'ngFx'
]);
app.config(['$authProvider', function($authProvider){
    $authProvider.google({
        clientId: '1081450147778-b1mbec6ohg4ve6bj9615ofdd4bust91p.apps.googleusercontent.com'
    });
}]);

app.run(['$rootScope', '$state', 'Auth', function($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!Auth.authorize(toState.data.access)) {
            console.log('not authorized');
            event.preventDefault();
            $state.go('login');
        }
    });
}]);