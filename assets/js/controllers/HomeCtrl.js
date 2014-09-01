app.controller('HomeCtrl', function($scope, $auth, $state, Account, CurrentUser, TodoService){
    Account.getProfile().success(function(data) {
        $scope.user = data[0];
        CurrentUser.id = data[0].id;
        CurrentUser.email = data[0].email;
        TodoService.getAll().success(function(result) {
            $scope.todos = result;
        });
    });

    $scope.logout = function() {
        $auth.logout();
        $state.go('login');
    };

    $scope.removeToDo = function(idx, id){
    	TodoService.remove(id).success(function(result) {
    	    $scope.todos.splice(idx, 1);
    	});
    }

    $scope.doneToDo = function(idx, id, done){
    	TodoService.update(id, null, done).success(function(result) {
    	    // $scope.todos[idx].done = true;
    	});
    }

    $scope.createNewTodo = function(event){
    	TodoService.create($scope.todo.new).success(function(result) {
	         $scope.todo.new = '';
	         $scope.todos.push(result.todos[result.todos.length - 1]);
    	});
    }
})