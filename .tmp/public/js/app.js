var app = angular.module('todoMVC', [
  'ui.router',
  'ngAnimate',
  'ui.utils',
  'satellizer',
  'ngFx'
]);
app.config(function($authProvider){
    $authProvider.google({
        clientId: '1081450147778-vhfd66man02n6r64um8fstgbgkf2asp8.apps.googleusercontent.com'
    });
});

app.run(function($rootScope, $state, Auth) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (!Auth.authorize(toState.data.access)) {
            console.log('not authorized');
            event.preventDefault();
            $state.go('login');
        }
    });
});