app.controller('loginController',function ($scope,$state) {


	$scope.login = function ($scope) {
		// body...
		$state.go('root.menu')
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