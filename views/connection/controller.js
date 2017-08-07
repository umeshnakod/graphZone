app.controller('connectionController',function ($scope,$state,$sessionStorage,$http) {

	$scope.selectedValue = 'Select DataBase';

	$scope.dataBase = ['mongoDB','Sql'];
	$scope.connection = {};
	$scope.connectDatabase = function (db) {
		// body...
		$scope.selectedValue = db;
		$("#myModal").modal('show');
	}

	$scope.createGraph = function (data) {
		console.log(data)
		// $sessionStorage['connection'] = true;
		// $state.go('root.menu')


		$http.post('/getDataFromSql',data,function (res) {
			console.log('reeeeee',res)
		})
	}
 
})