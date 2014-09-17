var app = angular.module('todoMVC', [
  'ui.router',
  'ngAnimate',
  'ui.utils',
  'satellizer',
  'ngFx'
]);

app.provider('retrieve', function(){
    return {
        getClientId: function(){
            var myInjector = angular.injector(["ng"]);
            var $http = myInjector.get("$http");
            return $http.get('/auth/retrieveID');
        },
        $get: function () {
            return {
                getClientId: getClientId
            };
        }
    }
});

app.config(function($authProvider, retrieveProvider){
    retrieveProvider.getClientId().success(function(data){
        $authProvider.google({
            clientId: data
        });
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