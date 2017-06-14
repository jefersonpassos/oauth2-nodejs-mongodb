var appLogin = angular.module('login');

appLogin.controller('loginctrl', function ($scope, $http) {
	$scope.showHints = true;

    $scope.username = "";
    $scope.password = "";

    $scope.api = "@localhost:8081/api/oauth2/authorize?client_id=user_id&response_type=code&redirect_uri=localhost:8081";

    $scope.login = function(){
        $scope.apiTransaction = "http://" + $scope.username+ ":" + $scope.password + $scope.api;
    	location.href = $scope.apiTransaction;

    };

    $scope.transaction = function(id){
        var dataPost = { transaction_id : id };
        $http.post($scope.apiTransaction + "?username="+ $scope.username +"&password=" + $scope.password, dataPost)
        .success( function(data){
            console.log(data);
        });
    }

});