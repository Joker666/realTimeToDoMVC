app.controller('HomeCtrl', function($scope, $auth, $state, $filter, Account, CurrentUser, TodoService){
    Account.getProfile().success(function(data) {
        $scope.user = data[0];
        CurrentUser.id = data[0].id;
        CurrentUser.email = data[0].email;
        TodoService.getAll().success(function(result) {
            $scope.todos = result;
            $scope.$watch('todos', function () {
              var remainingTodos = _.filter($scope.todos, { 'done': false });
              $scope.remainingCount = remainingTodos.length;
              $scope.completedCount = $scope.todos.length - $scope.remainingCount;
              $scope.allChecked = !$scope.remainingCount;
            }, true);
        });
    });

    io.socket.get('/todo/subscribe');
    io.socket.on('todo', function (msg) {
       //console.log(msg);


       switch(msg.verb) {
            case 'created':
                $scope.todos.push(msg.data);
                $scope.$apply();
                break;
            case 'updated':
                var haveToUpdate = _.find($scope.todos, { 'id': msg.id });
                if(msg.data.done !== haveToUpdate.done){
                    haveToUpdate.done = msg.data.done;
                }
                $scope.$apply();
                break;
            case 'destroyed':
                _.remove($scope.todos, { 'id': msg.id });
                $scope.$apply();
                break;

            default: return;

       }

    });

    $scope.logout = function() {
        $auth.logout();
        $state.go('login');
    };

    $scope.removeToDo = function(idx, id){
    	TodoService.remove(id).success(function(result) {
    	    // $scope.todos.splice(idx, 1);
    	});
    }

    $scope.doneToDo = function(idx, id, done){
    	TodoService.update(id, null, done).success(function(result) {
    	    // $scope.todos[idx].done = true;
    	});
    }

    $scope.createNewTodo = function(event){
    	TodoService.create($scope.newTodo).success(function(result) {
	        $scope.newTodo = '';
	        // $scope.todos.push(result.todos[result.todos.length - 1]);
    	});
    }

    $scope.clearCompletedTodos = function () {
      angular.forEach($scope.todos, function (todo) {
        if (todo.done) {
          TodoService.remove(todo.id).success(function(result) {});
        }
      });
    };

    $scope.markAll = function (allChecked) {
      angular.forEach($scope.todos, function (todo) {
        todo.done = !allChecked;
        TodoService.update(todo.id, null, todo.done).success(function(result) {});
      });
    };
})