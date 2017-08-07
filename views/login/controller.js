app.controller('loginController',function ($scope,$state,$sessionStorage) {


	$scope.login = function ($scope) {
		// body...
        $sessionStorage['token'] = 'umesh'
		$state.go('root.menu');
	}

	$scope.showPassword = function () {
    
    var key_attr = $('#key').attr('type');
    
    if(key_attr != 'text') {
        
        $('.checkbox').addClass('show');
        $('#key').attr('type', 'text');
        
    } else {
        
        $('.checkbox').removeClass('show');
        $('#key').attr('type', 'password');
        
    }
    
}


})