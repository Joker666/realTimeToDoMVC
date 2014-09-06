app.factory('Auth',['AccessLevels', '$auth', function(AccessLevels, $auth){
    return {
        authorize: function(access) {
            if (access === AccessLevels.user) {
                console.log('is authenticated : ' + this.isAuthenticated());
                return this.isAuthenticated();
            } else {
                return true;
            }
        },
        isAuthenticated: function() {
            return $auth.isAuthenticated();
        }
    }
}]);